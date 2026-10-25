# Übergabe an Claude Desktop: Livegang der Website Handwerker Blesius bei STRATO

Stand: 25.10.2026 · Repo `Luxmation/handwerker` (privat), Branch `main`, Commit `977de1c` oder neuer
Auftraggeber im Chat: **Arthur** (Agentur Luxmation). Kunde: **Handwerker Blesius GmbH**, Geschäftsführer Marcel Blesius.

---

## 0. Auftrag in drei Sätzen

Die neue Website ist fertig gebaut, getestet und liegt als statisches HTML samt kleinem PHP-Formularskript in `dist/`.
Sie soll die alte STRATO-SmartWebsite unter **https://handwerker-blesius.de** ersetzen, die E-Mail-Postfächer bleiben unangetastet.
Dafür muss bei STRATO das Paket von „SmartWebsite Plus“ auf ein Webhosting-Paket mit PHP + SFTP umgestellt, die Domain auf den Webspace gelegt, SSL aktiviert, die Seite hochgeladen und alles getestet werden.

---

## 1. Regeln (bitte strikt einhalten)

1. **Passwörter nie in den Chat, ins Repo, in Logs oder in Screenshots.** Arthur loggt sich selbst bei STRATO ein und tippt
   Passwörter selbst in Passwortfelder, Terminal-Abfragen oder die Datei `anfrage-config.php`. Wenn ein Schritt ein Passwort braucht:
   anhalten und Arthur bitten, es selbst einzugeben.
2. **Vor allem, was sich nicht rückgängig machen lässt oder Geld kostet, kurz bei Arthur bestätigen:**
   Paketwechsel/Buchung (Preis nennen), Kündigungen, DNS-Änderungen, Löschen von Dateien auf dem Server.
3. **E-Mail nicht anfassen:** keine Änderungen an Postfächern, MX-Einträgen (`smtpin.rzone.de`) oder dem DMARC-Eintrag.
   Bei DNS nur die A-Records für `handwerker-blesius.de` und `www` ändern. Vorher alle alten Werte notieren.
4. **Keine erfundenen Inhalte** auf der Website: keine Bewertungen, Zitate, Jahreszahlen, Garantien, Preise, „Meisterbetrieb“.
   Die Google-Bewertung „5,0 · 8“ steht in `build.py` (`GOOGLE`) und stammt aus öffentlich einsehbaren Angaben zum Google-Profil.
5. **Git:** Commits nur nach `Luxmation/handwerker`, Branch `main`. Keine Modellbezeichnungen in Commit-Texten.
   `anfrage-config.php` niemals committen (steht in `.gitignore`).
6. Bei Unklarheit in der STRATO-Oberfläche: nicht raten, sondern die STRATO-Hilfe lesen oder Arthur fragen.
   STRATO-Hotline: **030 / 300 146 0** (Mo–Fr 8–20 Uhr, Sa/So 10–18:30 Uhr, Kundennummer + Service-PIN nötig).

---

## 2. Ausgangslage (per DNS und Kundenlogin geprüft)

| Was | Stand |
|---|---|
| Domain `handwerker-blesius.de` + DNS | STRATO (Nameserver `docks03.rzone.de`, `shades12.rzone.de`) |
| E-Mail `info@handwerker-blesius.de` | STRATO-Postfach (MX `smtpin.rzone.de`) – **bleibt so** |
| Alte Website | STRATO **SmartWebsite Plus** (Baukasten, Auftrag 9197444). Läuft technisch auf IONOS-Servern desselben Konzerns (A-Record `212.227.172.250`, www `217.160.0.28`). **Kein eigener IONOS-Vertrag, dort nichts zu tun.** |
| Weiteres Paket | „STRATO marketingRadar“ (Auftrag 9197445), wird für die neue Seite nicht gebraucht. Kündigen nur nach Rücksprache. |
| Mail-Sicherheit | DMARC `p=reject`, **kein SPF-Eintrag** (siehe Schritt H) |
| Freigabe | Marcel hat dem Paketwechsel zugestimmt. Er zahlt danach eher weniger: SmartWebsite Plus ca. 12 €/Monat, Hosting Basic ca. 10 €, Starter ca. 6 € (Richtwerte, echte Preise im Login prüfen). |

Die SmartWebsite Plus hat keinen Webspace, kein SFTP und kein PHP. Darum ist der Paketwechsel nötig.

---

## 3. Projekt, Dateien, lokaler Test

```
git clone https://github.com/Luxmation/handwerker.git && cd handwerker
python3 build.py                 # erzeugt dist/ (Live-Version, CSS/JS mit ?v=…-Stempel)
php -S localhost:8000 -t dist    # lokal ansehen: http://localhost:8000  (PHP 8.x nötig)
```

- `dist/` ist im Repo eingecheckt und aktuell. Neu bauen schadet nicht.
- Alternativ hat Arthur das fertige Paket **`Blesius-Upload-Paket.zip`** (aus dem vorherigen Chat). Darin:
  `website/` (= `dist/` ohne Config-Vorlage), `anfrage-config-VORLAGE.php`, `ANLEITUNG-STRATO.txt`.
- Quellen: `src/pages/*.html` (Seiten), `src/layout.html`, `src/partials/`, `static/` (CSS, JS, Bilder, Videos, `.htaccess`, `anfrage.php`).
  **Nie direkt in `dist/` ändern**, sondern in `src/`/`static/` ändern und neu bauen.
- Wichtige Dateien in `dist/`:
  - `.htaccess`: HTTPS-Umleitung, www → ohne www, 404-Seite, Weiterleitungen alter URLs
    (`/uber-uns`, `/referenzen`, `/jetzt-bewerben`, `/datenschutzerklarung`), Caching, Sicherheits-Header,
    Sperre für `anfrage-config.php`.
  - `anfrage.php`: Formular-Versand (Kontakt + Bewerbung) per SMTP-Login über das STRATO-Postfach, ohne Datenbank.
  - `anfrage-config.example.php`: Vorlage. **Nicht hochladen**, stattdessen `anfrage-config.php` anlegen (Schritt F).
- Doku: `docs/HOSTING.md` (Hosting-Stand), `docs/BILDNACHWEIS.md` (Pexels-Beispielbilder), `SPEC.md` (Gestaltung/Technik).
- 15 Seiten: Start, Leistungen (+ Parkett, Vinyl, Laminat, Teppich, Treppen, Untergrund), Projekte, Über uns, Karriere,
  Kontakt, Impressum, Datenschutz, 404.

Lokaler Vorab-Test (vor dem Paketwechsel, damit nach dem Umschalten nichts mehr überrascht):
- alle Seiten öffnen, keine kaputten Bilder, keine JS-Fehler in der Konsole
- Formular absenden → lokal kommt die Fehlermeldung „konnte gerade nicht gesendet werden …“ (kein Mailserver). **Das ist erwartet.**

---

## 4. Livegang Schritt für Schritt

Nach jedem Schritt kurz an Arthur melden, was erledigt ist.

### A. Auftragsverarbeitung (AVV) – Pflicht, zuerst
Die Datenschutzerklärung sagt, dass mit STRATO ein AVV besteht. Er muss vor dem Livegang abgeschlossen sein.
- Kundenlogin → **Kontoinformation → Auftragsverarbeitung**. Vertrag wählen, Ablauf folgen, PDF speichern.
- Steht dort, dass die AVV schon Vertragsbestandteil ist (bei Verträgen ab 18.07.2022 üblich), ist nichts weiter zu tun.

### B. Paketwechsel SmartWebsite Plus → Webhosting (Bestätigung durch Arthur nötig)
- Kundenlogin → Paket „SmartWebsite Plus“ → **„Paket upgraden“ → Reiter „Hosting“** → **Hosting Basic**
  (Starter nur, wenn PHP **und** SFTP ausdrücklich enthalten sind). Preis und Einrichtungsgebühr vorher Arthur nennen.
- **Achtung:** Laut STRATO-Hilfe geht der Wechsel vom Baukasten/Shop ins Hosting teils **nur zum Vertragsende**.
  Wenn das angezeigt wird: anhalten, Arthur informieren. Mögliche Wege (mit STRATO klären):
  1. Wechsel zum Vertragsende vormerken (dann bis dahin warten), oder
  2. jetzt ein Hosting-Paket zusätzlich buchen und die Domain samt Postfächern dorthin umziehen.
     **Nur, wenn STRATO bestätigt, dass die Postfächer dabei erhalten bleiben.**
- Fragen an STRATO, falls nötig: sofortiger Wechsel möglich? Bleiben Domain und Postfächer unverändert? Einrichtungsgebühr?
  Monatspreis danach? Speicherdauer der Server-Logfiles (nur zur Info)?
- STRATO meldet per E-Mail, wenn der Wechsel fertig ist. **Ab dann ist die alte Seite weg**, also Schritte C–G zügig durchziehen.

### C. Hosting-Paket einrichten
1. **SSL** für `handwerker-blesius.de` **und** `www.handwerker-blesius.de` aktivieren (im Paket enthalten).
   Die `.htaccess` leitet auf https um. Ohne aktives SSL lädt die Seite nicht. Falls STRATO selbst eine
   „HTTPS erzwingen“-Option hat, **nur eine** der beiden Umleitungen nutzen (sonst droht eine Umleitungsschleife).
2. **PHP-Version** auf 8.2 oder neuer stellen.
3. **SFTP-Zugang** anlegen: Paket → **Datenbanken und Webspace → SFTP & SSH**. Arthur vergibt das Passwort selbst.
   Notieren (ohne Passwort): Servername (Form `501…ssh.w….strato.hosting`), Benutzername, Port 22.

### D. Domain auf den Webspace legen (Bestätigung durch Arthur nötig)
- Paket → **Domainverwaltung** → `handwerker-blesius.de` → verwalten:
  - eine bestehende Weiterleitung auf die SmartWebsite entfernen
  - Ziel = Webspace, Hauptverzeichnis `/` (bzw. laut STRATO-Hilfe A-Record auf die STRATO-Standard-IP)
  - dasselbe für `www`
- **Nur A-Records (@, www) anfassen.** MX, TXT (DMARC) und alles andere bleibt. Alte Werte vorher notieren.
- Prüfen: `dig +short handwerker-blesius.de A`, `dig +short www.handwerker-blesius.de A`, `dig +short handwerker-blesius.de MX`
  (MX muss weiter `smtpin.rzone.de` sein). Die Umstellung kann je nach TTL ein paar Stunden brauchen.

### E. Website hochladen
Inhalt von `dist/` (nicht den Ordner selbst) ins Hauptverzeichnis der Domain auf dem Webspace, **inklusive `.htaccess`**,
**ohne** `anfrage-config.example.php`. Eine STRATO-Platzhalterseite (z. B. `index.html`) im Ziel vorher löschen oder überschreiben.

Variante Terminal (Arthur gibt das Passwort bei der Abfrage selbst ein):
```
lftp -u "SFTP-BENUTZER" sftp://SFTP-SERVER -e "mirror -R --verbose --exclude-glob anfrage-config.example.php dist/ /; bye"
```
(Zielpfad `/` nur, wenn das Hauptverzeichnis der Domain wirklich `/` ist. Vorher mit `ls` prüfen.)
Variante FileZilla: Protokoll SFTP, Port 22, „Anzeige versteckter Dateien erzwingen“ einschalten (wegen `.htaccess`),
dann den Inhalt von `dist/` hochziehen. Umfang ca. 34 MB, rund 180 Dateien.

### F. Formular-Versand einrichten
- `static/anfrage-config.example.php` als **`anfrage-config.php`** kopieren (außerhalb des Repos, z. B. Schreibtisch).
- Werte stimmen schon: `smtp.strato.de`, Port `465`, Benutzer `info@handwerker-blesius.de`.
  **Arthur trägt das Postfach-Passwort bei `smtp_pass` selbst ein.**
- Datei neben `anfrage.php` hochladen. Danach die lokale Kopie löschen.
- Prüfen: `curl -sI https://handwerker-blesius.de/anfrage-config.php` → muss **403** liefern.

### G. Tests nach dem Upload
```
curl -sI http://handwerker-blesius.de/            # 301 → https://handwerker-blesius.de/
curl -sI https://www.handwerker-blesius.de/       # 301 → https://handwerker-blesius.de/
curl -sI https://handwerker-blesius.de/           # 200, Header X-Content-Type-Options, Referrer-Policy, X-Frame-Options
curl -sI https://handwerker-blesius.de/gibtsnicht # 404 (eigene Fehlerseite)
curl -sI https://handwerker-blesius.de/uber-uns/  # 301 → /ueber-uns/
curl -s  https://handwerker-blesius.de/sitemap.xml | head
curl -sI https://handwerker-blesius.de/assets/css/site.css   # Cache-Control: public, max-age=604800
```
Im Browser (Desktop + Handy-Ansicht):
- alle Menüpunkte und Unterseiten, Bilder und Videos laden, keine Konsolenfehler, Schloss-Symbol aktiv
- **Kontaktformular** mit Test-Anfrage → grüne Bestätigung → Mail kommt bei `info@handwerker-blesius.de` an (auch Spam prüfen)
- **Bewerbungsformular** (Karriere) ebenso
- Impressum und Datenschutz lesbar, Links zu WhatsApp/Instagram/Google Maps funktionieren

### H. Nacharbeiten (nach erfolgreichem Livegang)
1. **SPF-Eintrag** bei STRATO setzen. Den von STRATO dokumentierten Wert bzw. die SPF-Option im DNS-Menü verwenden
   (STRATO-Hilfe „SPF“). Wegen DMARC `p=reject` wichtig für die Zustellung. Vorher Arthur fragen.
2. **Google Search Console:** Domain-Property per DNS-TXT-Eintrag bestätigen (kein Eingriff in die Website nötig),
   `https://handwerker-blesius.de/sitemap.xml` einreichen.
3. **Google-Unternehmensprofil:** prüfen, dass dort `https://handwerker-blesius.de` als Website steht.
4. `docs/HOSTING.md` aktualisieren (Paket, Datum, SFTP-Servername **ohne** Passwort, erledigte Punkte abhaken), committen.
5. marketingRadar: Arthur fragen, ob Marcel es weiter braucht. Kündigung nur auf ausdrücklichen Wunsch.

---

## 5. Fehlerbehebung

| Symptom | Ursache / Lösung |
|---|---|
| Umleitungsschleife / „zu viele Weiterleitungen“ | SSL noch nicht aktiv, oder STRATO-HTTPS-Zwang **und** `.htaccess` gleichzeitig → eins davon abschalten |
| Seite lädt ohne Design, alte URLs 404, kein https-Redirect | `.htaccess` fehlt (versteckte Datei nicht hochgeladen) |
| Formular: „konnte gerade nicht gesendet werden“ | `anfrage-config.php` fehlt/falscher Ort, Passwort falsch, oder Port 465 gesperrt → `'smtp_port' => 587` testen. Fehlerdetails im PHP-Fehlerlog des Pakets |
| Formular: HTTP 500 ohne JSON | PHP-Version zu alt oder Syntaxfehler in `anfrage-config.php` (Hochkommas, Komma am Zeilenende) |
| Mails kommen nicht an, Formular meldet Erfolg | Spam-Ordner; SPF fehlt (Schritt H1) |
| Noch alte Seite sichtbar | DNS-Umstellung läuft noch, Browser-Cache; `dig` prüfen |
| 403 auf alles | Dateirechte; Ordner 755, Dateien 644 |

---

## 6. Offene Punkte (blockieren den Livegang nicht)

- **Laminat/Teppich-Fotos:** Zurzeit Beispielbilder von Pexels (`laminat-raum`, `teppich-raum`, `teppich-boden`),
  überall als „Beispielbild“ gekennzeichnet und im Impressum genannt. Schickt Marcel eigene Fotos: Bilder in
  `static/assets/img/` als `-800`/`-1600` in JPG + WebP anlegen, Größe in `src/images.json` eintragen, Verweise tauschen,
  `docs/BILDNACHWEIS.md` und den Bildnachweis im Impressum anpassen, neu bauen und hochladen.
- **Hochformat-Imagefilm (30 s, von Luxmation produziert, nicht auf der Website):** Sprecher am 25.10.2026 im
  bezahlten ElevenLabs-Plan neu erzeugt (lizenziert), Film damit neu gerendert. Offen nur noch: prüfen, ob die
  Epidemic-Sound-Lizenz der Musik Werbung für Kunden abdeckt.
  (Der Film auf „Über uns“ und die vier Clips auf der Startseite sind Marcels eigenes Material, davon nicht betroffen.)
- **Clip `1111.mov`** von Marcel: noch offen, ob er einen der vier Startseiten-Clips ersetzen soll.
- Google-Bewertung in `build.py` (`GOOGLE`: 5,0 · 8) gelegentlich aktualisieren.

---

## 7. Öffentliche Firmendaten (stehen so im Impressum)

Handwerker Blesius GmbH · Neuenhöhe 17, 42929 Wermelskirchen · Geschäftsführer Marcel Blesius
Telefon/WhatsApp 0159 0171 7249 · info@handwerker-blesius.de · Amtsgericht Köln HRB 122801 · USt-IdNr. DE454037857
Handwerkskammer zu Köln, Verzeichnis der handwerksähnlichen Gewerbe, Betriebsnummer 1239168
Instagram @handwerkerblesius

---

## 8. Was am Ende an Arthur gemeldet werden soll

- welches Paket gebucht wurde, zu welchem Preis, ab wann
- AVV erledigt (ja/nein)
- DNS: alte und neue A-Records, MX unverändert bestätigt
- Ergebnis aller Tests aus Schritt G (inkl. Formular-Testmail angekommen)
- was noch offen ist (z. B. SPF, Search Console), und der Commit mit dem aktualisierten `docs/HOSTING.md`
