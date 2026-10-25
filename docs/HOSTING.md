# Hosting & E-Mail – Stand 25.10.2026

## Ist-Zustand (per DNS geprüft)
| Was | Anbieter | Nachweis |
|---|---|---|
| Domain handwerker-blesius.de + DNS | **STRATO** | Nameserver `docks03.rzone.de`, `shades12.rzone.de` |
| E-Mail (info@handwerker-blesius.de) | **STRATO** | MX `smtpin.rzone.de` |
| Website (alt) | **IONOS MyWebsite Now** (Baukasten, WordPress-basiert, gesperrt) | A-Record 212.227.172.250, `server: IONOS Webserver`, Plugins `go-x-*` |
| Formular (alt) | eingebaute Baukasten-Funktion von IONOS | kein eigenes Server-Skript |

- DMARC: `v=DMARC1;p=reject;` – **kein SPF-Eintrag** gefunden. Mails im Namen der Domain von fremden Servern werden daher abgelehnt.
  → Kunde sollte bei STRATO einen SPF-Eintrag setzen (STRATO-Hilfe „SPF-Record“). Unser Formular sendet deshalb per **SMTP-Login über das STRATO-Postfach** (DMARC-sicher).

## Update 25.10.2026 (Kundenlogin STRATO gesehen)
- Kunde hat **nur STRATO** – zu Recht: Pakete „STRATO SmartWebsite Plus“ (Auftrag 9197444, Domain handwerker-blesius.de)
  und „STRATO marketingRadar“ (9197445). **Die alte Website ist die STRATO SmartWebsite** (Baukasten unter presence.strato.de).
  Sie läuft technisch auf Servern von IONOS (gleicher Konzern, gleiche Baukasten-Plattform `go-x`, daher A-Record
  212.227.172.250 und „IONOS“ in den Headern). **Es gibt keinen eigenen IONOS-Vertrag – nichts bei IONOS zu kündigen.**
- SmartWebsite Plus ist ein reiner Baukasten (Menü: Übersicht, Webseite, Online Shop, Apps, Einstellungen) – kein Webspace,
  kein SFTP, kein PHP. Die neue Seite (statisches HTML + `anfrage.php`) lässt sich dort nicht hochladen.
- **Weg:** Bei STRATO das Paket auf ein Webhosting-Paket mit PHP + SFTP umstellen (Tarifwechsel), Domain und
  E-Mail-Postfächer behalten. Danach Domain auf den Webspace zeigen lassen, SSL aktivieren, Seite hochladen.
- Aus der Claude-Cloud-Umgebung sind SFTP/FTP zu STRATO nicht erreichbar (nur HTTPS) → Upload per SFTP-Programm
  (FileZilla/Cyberduck) mit fertigem Paket aus `dist/`.

## Livegang-Paket (25.10.2026)
- Paket für den Kunden: `Blesius-Upload-Paket.zip` = `website/` (Inhalt von `dist/` ohne Config-Vorlage),
  `anfrage-config-VORLAGE.php`, `ANLEITUNG-STRATO.txt` (Schritt für Schritt: AVV → Paketwechsel → SSL/PHP/Domain/SFTP
  → Upload mit FileZilla → anfrage-config.php → Tests).
- Laut STRATO-Hilfe geht der Wechsel Baukasten/Shop → Hosting teils nur zum Vertragsende („Paket upgraden“ → Reiter Hosting).
  Falls so: mit STRATO klären, ob ein Hosting-Paket dazugebucht und Domain + Postfächer umgezogen werden können.
- AVV: Kundenlogin → Kontoinformation → Auftragsverarbeitung (bei Verträgen ab 18.07.2022 schon enthalten).
  Die Datenschutzerklärung nennt den AVV als abgeschlossen → **vor dem Upload erledigen**.
- SFTP (neue STRATO-Plattform): Paket → Datenbanken und Webspace → SFTP & SSH, persönlicher Servername (…ssh.w….strato.hosting).
- CSS/JS tragen in der Live-Version einen Inhalts-Stempel (`?v=…`, build.py), daher nach Updates kein veralteter Cache.

## Empfehlung
SmartWebsite Plus bei STRATO in ein Webhosting-Paket mit PHP + SFTP umstellen (Domain und Postfächer bleiben), neue Seite per SFTP hochladen, Domain auf den Webspace zeigen lassen, SSL aktivieren.

## Offen (wartet auf Zugangsdaten vom Kunden)
- [x] Paket geklärt: STRATO SmartWebsite Plus (Baukasten, kein Webspace) – kein IONOS-Vertrag
- [ ] AVV im STRATO-Kundenlogin abschließen (vor Livegang)
- [ ] Tarifwechsel bei STRATO auf Webhosting mit PHP + SFTP (Anleitung im Upload-Paket)
- [ ] SMTP-Zugang für info@handwerker-blesius.de (Server `smtp.strato.de`, Port 465 SSL, Benutzer = volle Mailadresse) → in `anfrage-config.php` auf dem Server eintragen (nie ins Repo)
- [ ] SFTP-Zugang des Webspace
- [ ] SPF-Eintrag bei STRATO
- [ ] Nach Livegang: Google Search Console + Sitemap einreichen, Google-Unternehmensprofil-Link prüfen

## Deployment
```
python3 build.py          # erzeugt dist/
# dist/ komplett per SFTP in das Web-Verzeichnis hochladen
# anfrage-config.php (Vorlage: anfrage-config.example.php) mit SMTP-Daten auf dem Server anlegen
```
