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

## Empfehlung
SmartWebsite Plus bei STRATO in ein Webhosting-Paket mit PHP + SFTP umstellen (Domain und Postfächer bleiben), neue Seite per SFTP hochladen, Domain auf den Webspace zeigen lassen, SSL aktivieren.

## Offen (wartet auf Zugangsdaten vom Kunden)
- [x] Paket geklärt: STRATO SmartWebsite Plus (Baukasten, kein Webspace) – kein IONOS-Vertrag
- [ ] Tarifwechsel bei STRATO auf Webhosting mit PHP + SFTP
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
