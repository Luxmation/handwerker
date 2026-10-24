<?php
/**
 * Formular-Versand für handwerker-blesius.de (Kontakt-Anfrage und Bewerbung).
 * Läuft auf normalem PHP-Webhosting (z. B. IONOS) mit der PHP-Funktion mail().
 * Antwortet immer mit JSON: {"ok":true} oder {"ok":false,"error":"…"}.
 *
 * Anpassen: EMPFAENGER und ABSENDER (Absender muss eine Adresse der eigenen Domain sein).
 */
const EMPFAENGER = 'info@handwerker-blesius.de';
const ABSENDER   = 'website@handwerker-blesius.de';
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
$datenschutz = feld('datenschutz');

// Pflichtfelder
if ($name === '')                         antwort(false, 'Bitte geben Sie Ihren Namen an.', 422);
if ($email === '' && $telefon === '')     antwort(false, 'Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.', 422);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) antwort(false, 'Die E-Mail-Adresse scheint nicht zu stimmen.', 422);
if ($typ === 'anfrage' && $nachricht === '' && $bodenart === '') antwort(false, 'Bitte beschreiben Sie kurz Ihr Vorhaben.', 422);
if ($datenschutz === '')                  antwort(false, 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.', 422);

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
$text .= "Datenschutz-Einwilligung: erteilt\n";
$text .= 'Gesendet: ' . date('d.m.Y H:i') . " Uhr über handwerker-blesius.de\n";

$header = [
    'From: Website Handwerker Blesius <' . ABSENDER . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: handwerker-blesius.de',
];
if ($email !== '') $header[] = 'Reply-To: ' . $email;

$ok = mail(EMPFAENGER, '=?UTF-8?B?' . base64_encode($betreff) . '?=', $text, implode("\r\n", $header), '-f' . ABSENDER);

$ok ? antwort(true) : antwort(false, 'Die Nachricht konnte gerade nicht gesendet werden. Bitte rufen Sie uns an: 0159 0171 7249.', 500);
