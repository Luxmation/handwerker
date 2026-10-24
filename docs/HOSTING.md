# Hosting & E-Mail – Stand 24.10.2026

## Ist-Zustand (per DNS geprüft)
| Was | Anbieter | Nachweis |
|---|---|---|
| Domain handwerker-blesius.de + DNS | **STRATO** | Nameserver `docks03.rzone.de`, `shades12.rzone.de` |
| E-Mail (info@handwerker-blesius.de) | **STRATO** | MX `smtpin.rzone.de` |
| Website (alt) | **IONOS MyWebsite Now** (Baukasten, WordPress-basiert, gesperrt) | A-Record 212.227.172.250, `server: IONOS Webserver`, Plugins `go-x-*` |
| Formular (alt) | eingebaute Baukasten-Funktion von IONOS | kein eigenes Server-Skript |

- DMARC: `v=DMARC1;p=reject;` – **kein SPF-Eintrag** gefunden. Mails im Namen der Domain von fremden Servern werden daher abgelehnt.
  → Kunde sollte bei STRATO einen SPF-Eintrag setzen (STRATO-Hilfe „SPF-Record“). Unser Formular sendet deshalb per **SMTP-Login über das STRATO-Postfach** (DMARC-sicher).

## Empfehlung
Alles zu STRATO bündeln: STRATO-Webhosting mit PHP buchen (oder vorhandenen Webspace nutzen), neue Seite per SFTP hochladen, Domain im STRATO-Kundenbereich auf den STRATO-Webspace zeigen lassen, danach IONOS kündigen.
Alternative: bei IONOS bleiben und dort von MyWebsite Now auf ein Webhosting-Paket (mit SFTP + PHP) umstellen; E-Mail bleibt bei STRATO.

## Offen (wartet auf Zugangsdaten vom Kunden)
- [ ] Welches Paket bei IONOS? (Kundenlogin → Verträge: „MyWebsite Now …“ = nur Baukasten)
- [ ] Gibt es bei STRATO schon Webspace?
- [ ] SMTP-Zugang für info@handwerker-blesius.de (Server `smtp.strato.de`, Port 465 SSL, Benutzer = volle Mailadresse) → in `anfrage-config.php` auf dem Server eintragen (nie ins Repo)
- [ ] SFTP-Zugang des Webspace
- [ ] SPF-Eintrag bei STRATO
- [ ] Nach Livegang: IONOS kündigen, Google Search Console + Sitemap einreichen, Google-Unternehmensprofil-Link prüfen

## Deployment
```
python3 build.py          # erzeugt dist/
# dist/ komplett per SFTP in das Web-Verzeichnis hochladen
# anfrage-config.php (Vorlage: anfrage-config.example.php) mit SMTP-Daten auf dem Server anlegen
```
