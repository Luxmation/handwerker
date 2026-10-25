<?php
/**
 * Formular-Versand für handwerker-blesius.de (Kontakt-Anfrage und Bewerbung).
 * Läuft auf normalem PHP-Webhosting (STRATO oder IONOS).
 * Versand per SMTP-Login über das eigene Postfach (siehe anfrage-config.example.php),
 * ohne Config-Datei als Rückfall über PHP mail().
 * Antwortet immer mit JSON: {"ok":true} oder {"ok":false,"error":"…"}.
 */
// Zugangsdaten stehen in anfrage-config.php (liegt nur auf dem Server, nie im Repo).
// Vorlage: anfrage-config.example.php. Ohne Config wird PHP mail() versucht.
$CFG = is_file(__DIR__ . '/anfrage-config.php') ? (require __DIR__ . '/anfrage-config.php') : [];
define('EMPFAENGER', $CFG['empfaenger'] ?? 'info@handwerker-blesius.de');
define('ABSENDER',   $CFG['absender']   ?? ($CFG['smtp_user'] ?? 'info@handwerker-blesius.de'));
const MIN_SEKUNDEN = 3;     // schneller abgeschickt = vermutlich Bot
const MAX_LAENGE   = 5000;  // Zeichen pro Feld

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function antwort(bool $ok, string $fehler = '', int $status = 200): void {
    http_response_code($status);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $fehler], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    antwort(false, 'Nur POST erlaubt.', 405);
}

function feld(string $name): string {
    $wert = $_POST[$name] ?? '';
    if (!is_string($wert)) return '';
    $wert = trim(str_replace("\0", '', $wert));
    return mb_substr($wert, 0, MAX_LAENGE);
}

// Spam-Schutz: Honeypot (für Menschen unsichtbares Feld) und Mindestzeit
if (feld('website') !== '') antwort(true);                 // Bot: still „erfolgreich“
$start = (int) feld('_t');
if ($start > 0 && (time() - intdiv($start, 1000)) < MIN_SEKUNDEN) antwort(true);

$typ       = feld('formular') === 'bewerbung' ? 'bewerbung' : 'anfrage';
$name      = feld('name');
$email     = feld('email');
$telefon   = feld('telefon');
$ort       = feld('ort');
$bodenart  = feld('bodenart');
$flaeche   = feld('flaeche');
$stelle    = feld('stelle');
$nachricht = feld('nachricht');

// Pflichtfelder (Bewerbung in Du-Form wie auf der Karriere-Seite)
$du = $typ === 'bewerbung';
if ($name === '')                         antwort(false, $du ? 'Bitte gib Deinen Namen an.' : 'Bitte geben Sie Ihren Namen an.', 422);
if ($email === '' && $telefon === '')     antwort(false, $du ? 'Bitte gib eine Telefonnummer oder E-Mail-Adresse an.' : 'Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.', 422);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) antwort(false, 'Die E-Mail-Adresse scheint nicht zu stimmen.', 422);
if ($typ === 'anfrage' && $nachricht === '' && $bodenart === '') antwort(false, 'Bitte beschreiben Sie kurz Ihr Vorhaben.', 422);

// Schutz vor Header-Injection
foreach ([$name, $email] as $w) {
    if (preg_match('/[\r\n]/', $w)) antwort(false, 'Ungültige Eingabe.', 422);
}

$betreff = $typ === 'bewerbung'
    ? 'Bewerbung über die Website: ' . $name . ($stelle ? " ($stelle)" : '')
    : 'Anfrage über die Website: ' . $name . ($bodenart ? " – $bodenart" : '');

$zeilen = [
    'Formular'   => $typ === 'bewerbung' ? 'Bewerbung' : 'Anfrage',
    'Name'       => $name,
    'E-Mail'     => $email,
    'Telefon'    => $telefon,
    'PLZ / Ort'  => $ort,
    'Stelle'     => $stelle,
    'Bodenart'   => $bodenart,
    'Fläche ca.' => $flaeche ? $flaeche . ' m²' : '',
];
$text = '';
foreach ($zeilen as $k => $v) {
    if ($v !== '') $text .= str_pad($k . ':', 13) . $v . "\n";
}
$text .= "\nNachricht:\n" . ($nachricht !== '' ? $nachricht : '–') . "\n\n";
$text .= 'Gesendet: ' . date('d.m.Y H:i') . " Uhr über handwerker-blesius.de\n";

$betreffKodiert = '=?UTF-8?B?' . base64_encode($betreff) . '?=';
$header = [
    'From: =?UTF-8?B?' . base64_encode('Website Handwerker Blesius') . '?= <' . ABSENDER . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: handwerker-blesius.de',
];
if ($email !== '') $header[] = 'Reply-To: ' . $email;

$ok = !empty($CFG['smtp_host'])
    ? smtp_senden($CFG, EMPFAENGER, $betreffKodiert, $text, $header)
    : mail(EMPFAENGER, $betreffKodiert, $text, implode("\r\n", $header), '-f' . ABSENDER);

$ok ? antwort(true) : antwort(false, $du ? 'Deine Bewerbung konnte gerade nicht gesendet werden. Bitte ruf uns an: 0159 0171 7249.' : 'Die Nachricht konnte gerade nicht gesendet werden. Bitte rufen Sie uns an: 0159 0171 7249.', 500);


/**
 * Schlanker SMTP-Versand mit Login (SSL 465 oder STARTTLS 587), ohne Zusatzbibliothek.
 * Sendet über das eigene Postfach (z. B. STRATO) – damit besteht die Mail SPF/DKIM/DMARC.
 */
function smtp_senden(array $c, string $an, string $betreff, string $text, array $header): bool {
    $host = $c['smtp_host']; $port = (int)($c['smtp_port'] ?? 465);
    $ziel = ($port === 465 ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $s = @stream_socket_client($ziel, $errno, $errstr, 15);
    if (!$s) { error_log("SMTP-Verbindung fehlgeschlagen: $errstr"); return false; }
    stream_set_timeout($s, 15);
    $lesen = function () use ($s): string { $r = ''; while (($z = fgets($s, 515)) !== false) { $r .= $z; if (isset($z[3]) && $z[3] === ' ') break; } return $r; };
    $cmd = function (string $befehl, array $ok) use ($s, $lesen): bool {
        if ($befehl !== '') fwrite($s, $befehl . "\r\n");
        $antwort = $lesen();
        if (!in_array((int)substr($antwort, 0, 3), $ok, true)) { error_log('SMTP: ' . trim($antwort)); return false; }
        return true;
    };
    $name = 'handwerker-blesius.de';
    if (!$cmd('', [220]) || !$cmd("EHLO $name", [250])) return false;
    if ($port !== 465) {
        if (!$cmd('STARTTLS', [220])) return false;
        if (!stream_socket_enable_crypto($s, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) return false;
        if (!$cmd("EHLO $name", [250])) return false;
    }
    if (!$cmd('AUTH LOGIN', [334]) || !$cmd(base64_encode($c['smtp_user']), [334]) || !$cmd(base64_encode($c['smtp_pass']), [235])) return false;
    if (!$cmd('MAIL FROM:<' . ABSENDER . '>', [250]) || !$cmd('RCPT TO:<' . $an . '>', [250, 251]) || !$cmd('DATA', [354])) return false;
    $kopf = array_merge(['Date: ' . date('r'), 'To: <' . $an . '>', 'Subject: ' . $betreff, 'MIME-Version: 1.0',
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $name . '>'], $header);
    $body = preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], "\n", $text));
    $daten = implode("\r\n", $kopf) . "\r\n\r\n" . str_replace("\n", "\r\n", $body) . "\r\n.";
    if (!$cmd($daten, [250])) return false;
    $cmd('QUIT', [221]);
    fclose($s);
    return true;
}
