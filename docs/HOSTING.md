# Hosting & E-Mail – Live-Stand 26.10.2026

Keine Passwörter in dieser Datei, im Repo oder im Chat. `anfrage-config.php` liegt nur auf dem Server.

## Live
- **Live seit** 25.10.2026, ca. 22:36 Uhr unter https://handwerker-blesius.de. www → ohne www per `.htaccess`.
- Ausgeliefert wurde `Blesius-Launch-Paket-26-10-2118.zip` plus eine Direktänderung im HTML (Google-Bewertung 8 → 22,
  19 Stellen). Seit 26.10.2026 steht die 22 auch in `build.py` (`GOOGLE`).

## STRATO-Pakete
| Paket | Auftrag | Stand |
|---|---|---|
| **Hosting Basic** | **10194357** | aktiv seit 25.10.2026; 12 Monate 1,00 €/Monat, danach 9,00 €/Monat; nächstmögliche Kündigung zum 25.10.2027 |
| Zusatz „STRATO Mail Business 1 Liz.“ | (im Hosting-Paket) | kostenpflichtig: 12 Monate 3,00 €/Monat, danach 6,00 €/Monat (Notwendigkeit mit STRATO klären), dazu eine inklusive Lizenz |
| SmartWebsite Plus (alte Seite, Baukasten) | 9197444 | **gekündigt zum 24.11.2026** |
| marketingRadar | 9197445 | **gekündigt zum 24.11.2026** |

- Bis zum 24.11.2026 liegen im alten Paket die Sicherungs-Postfächer `backup_0001@` (= altes rechnung@) und
  `backup_0002@` (= altes info@).
- **AVV** mit STRATO besteht (erstmals 25.01.2025, zuletzt 21.10.2026).

## Webspace
- **PHP** 8.4.
- **SSL:** STRATO SSL Basic (Sectigo), gültig 25.10.2026–24.04.2027. „SSL erzwingen“ bei STRATO ist **aus**
  (die Umleitung auf https macht die `.htaccess`; beides zugleich gäbe eine Schleife).
- **Domain-Ziel:** Domainverwaltung → handwerker-blesius.de → Webserver → Umleitung **„Intern“ → `/website`**
  (die neue STRATO-Plattform erlaubt das Hauptverzeichnis `/` nicht als Ziel).
- **SFTP:** Server `5021745754.ssh.w2.strato.hosting`, Port 22, Benutzer `su640258`, Typ SFTP, Stammverzeichnis `/`.
- Webspace-Ordner **`/website/`** = Inhalt von `dist/` inkl. `.htaccess`, dazu `anfrage-config.php` (nur auf dem Server:
  nicht löschen, nicht überschreiben).

## DNS (Nameserver `docks03.rzone.de`, `shades12.rzone.de`)
| Eintrag | vorher | jetzt |
|---|---|---|
| A @ / www | 212.227.172.250 / 217.160.0.28 | **217.160.0.6** (STRATO Standard-IP) |
| AAAA @ / www | – | **2001:8d8:100f:f000::200** |
| MX | 5 smtpin.rzone.de | unverändert |
| DMARC | `v=DMARC1;p=reject;` | unverändert |
| SPF | keiner | **`v=spf1 redirect=_spf.strato.com`** (STRATO-Regel „Standard STRATO Mailserver“, 25.10.2026) |

## E-Mail
- Postfächer info@, rechnung@, webmaster@ von STRATO ins neue Paket umgezogen, Inhalte vollständig
  (info@ 1,04 GB, rechnung@ 75,99 MB), Passwörter neu vergeben.
- DKIM: kein Eintrag in der Domain gefunden, mit STRATO klären.
- Das Formular (`anfrage.php`) sendet per SMTP-Login über `info@handwerker-blesius.de`
  (`smtp.strato.de`, Port 465 SSL; Werte in `anfrage-config.php` auf dem Server).

## Upload (Windows, Claude Desktop)
```
sftp -oBatchMode=no -b befehle.txt su640258@5021745754.ssh.w2.strato.hosting
```
- STRATO verlangt existierende Zielordner: vor `put -r ordner` erst `-mkdir ordner`.
- Danach **alle Ordner `chmod 755`**, sonst 403 in Unterordnern (Dateien 644).
- Ziel ist `/website/`, nicht `/`. `anfrage-config.php` nicht anfassen.
- Bei Updates nur geänderte, neue und weggefallene Dateien übertragen (Liste kommt mit jedem neuen Launch-Paket).

## Tests beim Livegang (25.10.2026)
- 17/17 Prüfungen bestanden: Weiterleitungen (http → https, www → ohne www, alte URLs), Sicherheits-Header, 404-Seite,
  Caching, Sperre für `anfrage-config.php`, PHP.
- 210 Dateien live abgerufen, alle ok.
- Formulare Kontakt und Bewerbung: Testanfragen vom Mailserver angenommen.

## Offen
- [ ] Google Search Console: Domain-Property per DNS-TXT bestätigen, `https://handwerker-blesius.de/sitemap.xml` einreichen (geplant 26.10.2026)
- [ ] Marcel: neue Postfach-Passwörter auf seinen Geräten eintragen, Eingang der zwei Testmails („TEST Livegang“) bestätigen
- [ ] Bezahlte Mail-Business-Lizenz mit STRATO klären
- [ ] DKIM mit STRATO klären
- [ ] Firmierung im STRATO-Kundenkonto („Handwerkerservice Blesius GmbH“) vs. Impressum („Handwerker Blesius GmbH“) mit Marcel klären
- [ ] Google-Unternehmensprofil: Website-Link `https://handwerker-blesius.de` prüfen

## Deployment
```
python3 build.py          # erzeugt dist/ (CSS/JS mit Inhalts-Stempel ?v=…, daher kein veralteter Cache nach Updates)
# Launch-Paket: website/ (= dist/ ohne anfrage-config.example.php) per SFTP nach /website/ hochladen
```
- Nie direkt in `dist/` ändern, sondern in `src/`, `static/`, `build.py` und neu bauen.

## Vorgeschichte (bis 25.10.2026)
- Alte Website: STRATO SmartWebsite Plus (Baukasten unter presence.strato.de), technisch auf IONOS-Servern desselben
  Konzerns (daher A-Record 212.227.172.250 und „IONOS“ in den Headern). Kein eigener IONOS-Vertrag.
- Der Baukasten hatte keinen Webspace, kein SFTP, kein PHP. Darum der Wechsel auf Hosting Basic.
- Vor dem Livegang gab es keinen SPF-Eintrag (DMARC `p=reject`); das Formular sendet deshalb per SMTP-Login über das
  STRATO-Postfach statt über PHP-`mail()`.
