# Copy-Deck: Treppen

Seite `leistungen/treppen/` · Quelldatei-Vorschlag `src/pages/leistungen-treppen.html` · Stand 24.10.2026

Alle Texte sind veröffentlichungsreif. Zwischen Zahl und Einheit, in der Telefonnummer, zwischen Postleitzahl und Ort und vor „Uhr“ stehen geschützte Leerzeichen (U+00A0). Überschriften haben keinen Schlusspunkt, kein kursives oder farbiges Wort und keine Eyebrow darüber. Die Bildnamen stammen aus `src/images.json`. Alle Fotos auf dieser Seite sind eigene Fotos des Kunden.

---

## 1. Seitenkopf

```
<!--
title: Treppen belegen in Wermelskirchen | Handwerker Blesius
description: Tritt- und Setzstufen, Kanten und Übergänge passend zum Boden – für gerade, gewendelte und offene Treppen im Bergischen Land. Jetzt Angebot anfragen.
path: leistungen/treppen/
nav: leistungen
css: leistungen
jsonld: service-treppen, faq-treppen, breadcrumb-treppen
-->
```

| Feld | Länge | Grenze |
|---|---|---|
| title | 54 Zeichen | ≤ 60 |
| description | 149 Zeichen | ≤ 155 |
| H1 „Treppen in Wermelskirchen“ | 25 Zeichen | ≤ 32 |

Open Graph: `og:title` = title, `og:description` = description, Bild seitenbezogen `treppe-eiche-1600.jpg` (sonst global `assets/img/og-image.jpg`).

**Teaser für die Leistungsübersicht und die Startseite:**
Treppen: Tritt- und Setzstufen, Kanten und Übergänge passend zum Boden. Für gerade, gewendelte und offene Treppen, Stufe für Stufe angepasst.

---

## 2. Argument

Wer liest: Hausbesitzer und Wohnungseigentümer im Bergischen Land und in Köln, deren Treppe nicht mehr zum Haus passt. Abgetretener Teppich, Fliesen oder Kunststein, die nicht mehr gefallen, Holzstufen mit Macken oder eine rohe Betontreppe im Neubau. Oft kommt die Treppe zur Sprache, wenn ohnehin ein neuer Boden geplant ist. Die Fragen dahinter: Muss die Treppe raus? Geht das auch bei meiner gewendelten Treppe? Was wird aus dem Geländer? Und wird die erste Stufe hinterher zur Stolperkante?

Was sie nach einem Bildschirm glauben sollen: Blesius belegt Treppen Stufe für Stufe, passend zum Boden, auch gewendelte und offene. Die alte Treppe muss dafür in vielen Fällen nicht ausgebaut werden. Die Treppen auf den Fotos hat dieser Betrieb selbst belegt.

Was sie als Nächstes tun: den Treppen-Steckbrief ausfüllen und anfragen, Fotos per WhatsApp schicken oder anrufen.

| Abschnitt | Behauptung | Beweis |
|---|---|---|
| Kopf | Treppen in Wermelskirchen, belegt und renoviert von dem Betrieb, der auch den Boden verlegt | großes Foto `treppe-eiche` (Stufen und Böden in derselben Eiche), Region, Telefon, Anfrage-Knopf |
| Die Treppe gehört zum Boden | Eine Treppe wirkt erst fertig, wenn sie zu den Böden oben und unten passt | `podest-led`: Stufen und Boden aus derselben Eiche; vier Punkte, die abgestimmt werden |
| Was an jeder Stufe stimmen muss | An fünf Stellen entscheidet sich, ob eine Stufe sauber aussieht und sicher ist | Schnittzeichnung einer Stufe, jede Stelle erklärt |
| Gerade, gewendelt oder offen | Jede Treppenform verlangt ein eigenes Vorgehen, Blesius belegt alle drei | drei echte Fotos (`treppe-weiss`, `treppe-wendel`, Ausschnitt aus `treppe-eiche`), Vorgehen je Form |
| Renovieren statt ausbauen | Eine feste alte Treppe kann in vielen Fällen bleiben | Vorgehen je Untergrund (Beton, Holz, Fliese/Stein, alter Belag), Hinweis zu den Stufenhöhen, Foto aus dem Team |
| Welcher Belag auf Stufen passt | Holz, Vinyl, Laminat und Teppich verhalten sich auf der Treppe unterschiedlich | Vergleichstabelle mit fünf Kriterien |
| So entsteht Ihre neue Treppe | Der Weg zur fertigen Treppe ist klar | fünf Schritte aus dem tatsächlichen Ablauf |
| Ihre Treppe in vier Angaben | Für das erste Gespräch genügen vier Angaben und ein paar Fotos | Live-Ding: Treppen-Steckbrief mit Fotoliste und Übergabe ans Formular |
| Häufige Fragen zu Treppen | Offene Fragen werden ehrlich beantwortet | fünf Antworten ohne Preise und Garantien |
| Was zur Treppe dazugehört | Oben und unten geht es mit dem Boden weiter | Links zu Böden, Untergrund und Projekten |
| Abschluss | Der erste Schritt ist klein | Fotos und Stufenzahl genügen; Telefon, WhatsApp, Formular |

Eine eigene Galerie „Treppen aus unseren Projekten“ entfällt bewusst: Es gibt drei Treppenfotos, und alle drei tragen bereits einen Abschnitt. Weitere Fotos zeigt die Projektseite (Link in „Was zur Treppe dazugehört“).

Layout-Hinweis: Benachbarte Abschnitte wechseln die Form. Kopf mit Bild → Text und Bild nebeneinander → Zeichnung mit Erklärliste → ungleiche Bildgruppe → Bild links, Liste rechts → volle Tabelle → Schrittfolge → Werkzeug → FAQ → Linkliste → CTA-Band.

---

## 3. Abschnitte

### Kopf (`.page-hero`)

**Breadcrumb:** Start › Leistungen › Treppen
(`{{root}}` › `{{root}}leistungen/` › aktuelle Seite, `aria-current="page"`)

**H1:** Treppen in Wermelskirchen

**Untersatz (`.lead`):**
Wir belegen und renovieren Treppen, Stufe für Stufe angepasst und passend zu den Böden oben und unten.

**Text:**
Für gerade, gewendelte und offene Treppen in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln. Größere Projekte übernehmen wir deutschlandweit.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Treppe`
- Sekundär (Ghost-Button mit Telefon-Icon): **0159 0171 7249** → `tel:+4915901717249`
- Kleine Zeile darunter: Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr

**Bild:** `treppe-eiche` · `pos="58% 72%"` · `loading="eager" fetchpriority="high"`
Ausschnitt: Stufen, Geländerpfosten und Boden in der Bildmitte und unten. Die noch unverputzten Wandanschlüsse am rechten Bildrand und links unten so weit wie möglich abschneiden (siehe Punkt 8). Die offene Stahltreppe oben links darf angeschnitten werden.
- Alt: Blick in ein Treppenhaus: Stufen aus rustikaler Eiche führen nach oben und nach unten, der Boden davor und der Flur unten sind in derselben Eiche belegt, dazu ein schmiedeeisernes Geländer
- Bildunterschrift: Treppe und Flur in derselben Eiche

---

### Die Treppe gehört zum Boden

**H2:** Die Treppe gehört zum Boden (27 Zeichen)

**Untersatz:**
Sie sehen Ihre Treppe von zwei Etagen aus, deshalb planen wir sie zusammen mit den Böden, an die sie grenzt.

**Text:**
Eine neue Treppe in einem anderen Holzton als der Flur wirkt schnell wie nachträglich eingebaut, ein neuer Boden neben einer alten Treppe ebenso. Kommen Treppe und Boden aus einer Hand, stimmen wir beides von Anfang an aufeinander ab:

- **Holz oder Dekor.** Dieselbe Holzart oder dasselbe Dekor wie auf dem Boden, oder ein bewusster Kontrast, etwa Trittstufen in Holz und Setzstufen in Weiß.
- **Farbton und Sortierung.** Eine lebhafte, rustikale Eiche auf dem Boden und eine ganz ruhige auf den Stufen passen selten zusammen. Wir wählen beides so, dass es wie aus einem Stück wirkt.
- **Übergänge.** Wo die unterste Stufe beginnt und die oberste in den Flur übergeht, schließen Treppe und Boden sauber aneinander an, ohne Stolperkante.
- **Höhen.** Jeder neue Belag trägt etwas auf. Damit die erste und die letzte Stufe so hoch bleiben wie alle anderen, planen wir die Höhen von Treppe und Böden gemeinsam.

**Satz unter der Liste:**
Das gilt auch für einzelne Stufen und Podeste im Wohnraum. Sie bekommen dieselbe Sorgfalt wie eine ganze Treppe.

**Bild:** `podest-led` · `pos="50% 72%"` (das hängende Kabel und das Werkzeug oben rechts abschneiden)
- Alt: Wohnraum auf zwei Ebenen: breite Stufen mit Kanten aus Eiche verbinden die Landhausdiele oben und unten, unter einer Stufe leuchtet ein LED-Band
- Bildunterschrift: Podeststufen und Boden aus derselben Eiche

---

### Was an jeder Stufe stimmen muss

**H2:** Was an jeder Stufe stimmen muss (31 Zeichen)

**Untersatz:**
An fünf Stellen entscheidet sich, ob eine Stufe sauber aussieht und sicher begehbar ist.

**Erklärliste (`dl`, Begriff fett, Erklärung daneben):**

- **Trittstufe.** Die Fläche, auf die Sie treten. Kaum eine Treppe ist ganz gleichmäßig gebaut: Wände laufen schief, Stufen sind unterschiedlich tief. Deshalb wird jede Trittstufe einzeln aufgemessen und zugeschnitten. Vollflächig verklebt liegt sie fest, ohne zu wackeln oder hohl zu klingen.
- **Setzstufe.** Die senkrechte Fläche zwischen zwei Tritten. Sie kann im selben Holz oder Dekor belegt werden oder bewusst abgesetzt, zum Beispiel in Weiß. Weiße Setzstufen wirken leicht, zeigen aber Spuren von Schuhspitzen eher als Holz.
- **Stufenkante.** Die Vorderkante trägt beim Gehen die größte Last. Je nach Belag wird sie aus demselben Material geformt oder mit einem passenden Kantenprofil geschützt. Eine gut erkennbare Kante hilft außerdem, die Stufe im Halbdunkel zu sehen.
- **Wandanschluss.** Wo Stufe und Wand zusammentreffen, fällt jede Ungenauigkeit auf. Die Stufen werden an den Verlauf der Wand angepasst, je nach Treppe schließt eine passende Leiste den Übergang.
- **Antritt und Austritt.** Die unterste und die oberste Stufe verbinden die Treppe mit den Böden. Hier achten wir darauf, dass alle Stufen gleich hoch bleiben und der Übergang zum Boden ohne Stolperkante gelingt.

**Zeichnung (statt Foto, inline-SVG):** Schnitt durch zwei Stufen, von der Seite gesehen.
- Inhalt: die bestehende Stufe als Fläche in Graphit `#525252`, darauf eine schmale Kleberschicht, die neue Trittstufe im Holz-Mittelton aus den Fotos mit leicht überstehender Kante, davor die neue Setzstufe in hellem Ton.
- Beschriftung im Textschnitt (keine Mono, keine Versalien): Trittstufe · Setzstufe · Stufenkante · Kleber · bestehende Stufe. Zuordnung über kurze Führungsstriche, keine Rahmen, kein Raster.
- `role="img"` mit `aria-label="Schnitt durch zwei Stufen: Auf der bestehenden Stufe liegen eine Kleberschicht, die neue Trittstufe mit Stufenkante und davor die neue Setzstufe."`
- Bewegung: `data-draw`, die Schichten bauen sich von unten nach oben auf (bestehende Stufe, Kleber, Setzstufe, Trittstufe), danach erscheinen die Beschriftungen. Bei `prefers-reduced-motion` steht die fertige Zeichnung.

*(Kein Foto. Zeichnung und Liste tragen den Abschnitt; Desktop: Zeichnung links, Liste rechts. Handy: Zeichnung oben, Liste darunter.)*

---

### Gerade, gewendelt oder offen

**H2:** Gerade, gewendelt oder offen (28 Zeichen)

**Untersatz:**
Jede Treppenform verlangt ein eigenes Vorgehen bei Aufmaß und Zuschnitt, und wir belegen alle drei.

Aufbau: keine Reihe gleicher Karten. Desktop: links groß die gewendelte Treppe (Hochformat), rechts übereinander die gerade (Querformat) und die offene (kleiner Ausschnitt). Handy: untereinander in der Reihenfolge gerade, gewendelt, offen.

**Tafel „Gerade Treppe“**

H3: Gerade Treppe

Die Stufen liegen hintereinander und sind alle gleich breit. Das macht die Planung übersichtlich, aber nicht beliebig: Auch eine gerade Treppe ist selten ganz gleichmäßig gebaut, und Wände laufen kaum je genau parallel. Deshalb messen wir auch hier jede Stufe einzeln auf, damit die Fugen an der Wand schmal und gleichmäßig bleiben.

Bild: `treppe-weiss` · `pos="50% 88%"` · Bildrahmen breit (etwa 21:9), damit der Hund oben auf dem Absatz und die Pflanze unten rechts aus dem Bild fallen. Bei höherem Rahmen nur mit Freigabe (Punkt 8).
- Alt: Gerade Treppe mit Trittstufen im warmen Holzton und weißen Setzstufen, oben und unten derselbe Boden, links ein Handlauf aus Holz
- Bildunterschrift: Gerade Treppe, Holztritte mit weißen Setzstufen

**Tafel „Gewendelte Treppe“**

H3: Gewendelte Treppe

Wo die Treppe die Richtung wechselt, hat jede Stufe eine andere Form: innen schmal, außen breit. Keine Stufe passt auf die nächste. Wir nehmen deshalb jede Stufe mit einer Schablone ab und schneiden sie danach zu, damit sie an Wand und Kante genau anliegt. Bei Treppen mit Zwischenpodest wird das Podest wie eine kleine Bodenfläche belegt und mit den Stufen davor und dahinter sauber verbunden.

Bild: `treppe-wendel` · `pos="50% 62%"`
- Alt: Gewendelte Treppe mit Trittstufen in dunklem Holzton und weißen Setzstufen, an der Wand ein weißer Handlauf
- Bildunterschrift: Gewendelte Treppe, jede Stufe einzeln angepasst

**Tafel „Offene Treppe“**

H3: Offene Treppe

Ohne Setzstufen sieht man jede Stufe von oben, von vorn, von der Seite und von unten. Kanten und Stirnseiten müssen deshalb ringsum sauber sein, und die Befestigung der Stufen soll nicht ins Auge fallen. Ob vorhandene Stufen belegt werden können oder ob neue Stufen sinnvoller sind, hängt von ihrem Zustand und ihrer Stärke ab. Das sehen wir uns vor Ort an.

Bild: Ausschnitt aus `treppe-eiche` · `pos="12% 10%"` · nur klein (höchstens etwa 420 px breit), weil der Ausschnitt in der Quelldatei nur rund 700 px breit ist
- Alt: Offene Treppe mit Stufen aus Eiche auf einer schwarzen Stahlwange, daneben ein schmiedeeisernes Geländer
- Bildunterschrift: Offene Treppe, Eichenstufen auf Stahl
- Falls der Kunde verneint, dass diese Stufen von seinem Team stammen (Punkt 8): Bild weglassen, die Tafel bleibt als Text neben den beiden anderen.

**Zeile unter den Tafeln (mit Anker-Link):**
Sie sind nicht sicher, welche Form Ihre Treppe hat? Im [Treppen-Steckbrief](#steckbrief) sehen Sie alle Formen von oben.

---

### Renovieren statt ausbauen

**H2:** Renovieren statt ausbauen (25 Zeichen)

**Untersatz:**
Ist Ihre alte Treppe fest und tragfähig, kann sie in vielen Fällen bleiben und bekommt neue Stufen auf die alten.

**Text:**
Ein Ausbau ist laut, staubig und betrifft oft das ganze Treppenhaus, mit Wänden und Geländer. Bei einer Renovierung bleibt die Treppe stehen: Wir bereiten die vorhandenen Stufen vor und belegen sie neu. Was dafür zu tun ist, hängt davon ab, woraus Ihre Treppe besteht.

**Erklärliste (`dl`):**

- **Beton.** Oft im Neubau oder im Keller. Ausgebrochene Kanten und Unebenheiten werden gespachtelt und ausgeglichen, die Stufen anschließend grundiert, damit der Kleber sicher hält.
- **Holz.** Eine Holztreppe muss fest sein, bevor sie belegt wird. Was wackelt oder nachgibt, wird vorher befestigt, alte Lack- und Farbschichten werden angeschliffen.
- **Fliese, Kunststein oder Naturstein.** Sitzen die Platten fest, können sie meist bleiben. Die glatte Oberfläche wird angeschliffen und grundiert. Lose oder hohl klingende Platten müssen vorher heraus.
- **Teppich, PVC oder Linoleum.** Der alte Belag kommt herunter, samt Kleberresten. Erst danach zeigt sich, in welchem Zustand die Stufe darunter ist.

**Hinweis (als hervorgehobener Absatz, keine Box mit Linie, sondern Tonstufe im Hintergrund):**
Der neue Belag macht jede Stufe um seine Stärke höher. Zwischen den Stufen gleicht sich das aus, an der untersten und der obersten Stufe nicht. Wir messen die Höhen deshalb vor Beginn nach und planen die angrenzenden Böden mit, damit am Ende alle Stufen gleich hoch sind. [Warum das wichtig ist](#faq)

**Link:** Mehr zur Untergrundvorbereitung → `{{root}}leistungen/untergrund/`

**Bild:** `handwerker` · `pos="50% 35%"` · Hochformat, links neben der Liste
- Alt: Ein Mitarbeiter von Handwerker Blesius kniet mit einer Säge auf einem neu verlegten Holzboden
- Bildunterschrift: Aus unserem Team

---

### Welcher Belag auf Stufen passt

**H2:** Welcher Belag auf Stufen passt (30 Zeichen)

**Untersatz:**
Auf der Treppe zählen Halt unter den Füßen, belastbare Kanten und wie laut jeder Schritt klingt.

**Vergleichstabelle (echte `<table>` mit `<caption class="visually-hidden">Bodenbeläge auf der Treppe im Vergleich</caption>`; Linien sind bei Tabellen erlaubt; am Handy waagerecht wischbar im eigenen Container mit `tabindex="0"` und `aria-label`, die Seite selbst scrollt nicht quer):**

| | Holz | Vinyl | Laminat | Teppich |
|---|---|---|---|---|
| Wirkung | echtes Holz, warm, jede Stufe ein Einzelstück | Holz- oder Steinoptik, viele Dekore | Holzoptik, viele Dekore | weich und wohnlich |
| Halt | gut bei geölter oder matt lackierter Oberfläche, glänzender Lack ist mit Socken glatt | griffig, besonders mit strukturierter Oberfläche | eher glatt, eine strukturierte Oberfläche hilft | sehr guter Halt |
| Klang | gedämpft, wenn vollflächig verklebt | leise | eher hart und hörbar | am leisesten |
| Kanten | lassen sich bei ausreichender Stärke abschleifen und auffrischen | mit passendem Kantenprofil gut geschützt | empfindlichste Stelle, braucht ein Kantenprofil und verträgt keine stehende Nässe | wird an der Kante mit der Zeit am stärksten abgetreten |
| Passt zu | Treppen im Wohnbereich, besonders neben Parkett | Treppen am Eingang und zum Keller, Häusern mit Kindern und Hund | Treppen neben einem Laminatboden, wo es trocken bleibt | Treppen zu Schlafräumen, Häusern mit kleinen Kindern |

**Text unter der Tabelle:**
Meist wirkt eine Treppe am ruhigsten im selben Belag wie der Flur, an den sie grenzt. Welcher Belag zu Ihrer Treppe, Ihrem Alltag und Ihren Böden passt, besprechen wir mit Ihnen beim Termin vor Ort.

**Links (Fließtext):**
Mehr zu den Belägen: [Parkett](leistungen/parkett/), [Vinyl](leistungen/vinyl/), [Laminat](leistungen/laminat/), [Teppich](leistungen/teppich/).

*(Kein Bild. Die Tabelle trägt den Abschnitt. Spalten nach Kundenbestätigung kürzen, siehe Punkt 8.)*

---

### So entsteht Ihre neue Treppe

**H2:** So entsteht Ihre neue Treppe (28 Zeichen)

**Untersatz:**
Fünf Schritte von der ersten Nachricht bis zur Übergabe, damit Sie jederzeit wissen, was als Nächstes kommt.

**Schritte (`ol`, Reihenfolge über die Position, keine „01“-Nummern):**

1. **Anfrage.** Rufen Sie an, schreiben Sie per WhatsApp oder nutzen Sie das Formular. Fotos der Treppe und die Zahl der Stufen helfen uns bei der Vorbereitung. Welche Fotos wir brauchen, zeigt Ihnen der Treppen-Steckbrief weiter unten.
2. **Beratung und Aufmaß.** Wir kommen zu Ihnen, sehen uns die Treppe und die angrenzenden Böden an, prüfen die Stufen und messen jede einzeln. Dabei besprechen wir Belag, Farbton, Kanten und das Geländer.
3. **Angebot.** Sie erhalten ein individuelles Angebot für Vorbereitung, Material und Verlegung, auf Wunsch zusammen mit dem Boden.
4. **Vorbereitung und Verlegung.** Der alte Belag kommt herunter, die Stufen werden vorbereitet. Dann schneiden wir Stufe für Stufe zu und verlegen, mit Kanten, Wandanschlüssen und Übergängen zum Boden.
5. **Übergabe.** Wir räumen auf, gehen die Treppe mit Ihnen ab und erklären Ihnen, wie Sie den Belag pflegen.

**CTA:** Angebot anfragen → `{{root}}kontakt/?bodenart=Treppe`

---

### Ihre Treppe in vier Angaben (Live-Ding, `id="steckbrief"`)

**H2:** Ihre Treppe in vier Angaben (27 Zeichen)

**Untersatz:**
Wählen Sie Form und Bauart, zählen Sie die Stufen und sagen Sie uns, was heute darauf liegt.

**Text:**
Daraus entstehen Ihre Anfrage und eine kurze Liste der Fotos, die uns für den ersten Termin weiterhelfen.

Vollständige Spezifikation in Punkt 7. Sichtbare Texte:

**Gruppe „Form, von oben gesehen“** (Auswahlkacheln mit kleiner Draufsicht als SVG)
- Gerade
- Viertelgewendelt (L-Form)
- Halbgewendelt (U-Form)
- Mit Podest
- Andere Form, etwa Spindel- oder Bogentreppe

**Gruppe „Bauart“**
- Geschlossen, mit Setzstufen
- Offen, ohne Setzstufen

**Feld „Anzahl der Stufen“** (Zahl mit Minus- und Plus-Knopf)
Hilfetext: Zählen Sie jede Stufe, auf die Sie treten. Der Boden oben zählt nicht mit.

**Gruppe „Was liegt heute auf der Treppe?“**
- Teppich
- Holz
- Fliese oder Stein
- Beton ohne Belag
- PVC oder Linoleum
- Weiß ich nicht

**Ergebnis (rechts bzw. darunter, `aria-live="polite"`):**

Zwischentitel (als `p`, fett): Ihre Treppe
Beispielzeile: Viertelgewendelte Treppe, geschlossen, mit Setzstufen, 14 Stufen, heute mit Teppich belegt.

Zwischentitel: Diese Fotos helfen uns
(Liste wächst mit der Auswahl, siehe Punkt 7)

Knöpfe:
- Primär: **Mit diesen Angaben anfragen**
- Textlink: **Fotos per WhatsApp schicken**
- Textlink: **Per E-Mail schicken**

Kleine Zeile: Ihre Auswahl wird nicht gespeichert und erst übertragen, wenn Sie die Anfrage absenden.

---

### Häufige Fragen zu Treppen

**H2:** Häufige Fragen zu Treppen (25 Zeichen) · `id="faq"`

**Untersatz:**
Kurze, ehrliche Antworten, alles Weitere klären wir gern am Telefon oder direkt an Ihrer Treppe.

Antworten siehe Punkt 4 (`.faq`, `details`/`summary`, die erste Frage offen).

---

### Was zur Treppe dazugehört

**H2:** Was zur Treppe dazugehört (25 Zeichen)

**Untersatz:**
Eine Treppe endet nicht an der letzten Stufe, oben und unten geht es mit dem Boden weiter.

Vier Verweise als Liste (Text, keine gleichförmigen Karten; Bilder gibt es auf dieser Seite schon genug):

- **Parkett** → `{{root}}leistungen/parkett/`
  Echtholz als Landhausdiele oder Fischgrät, passend zu Stufen aus Holz.
- **Vinyl** → `{{root}}leistungen/vinyl/`
  Unempfindlich und leise, für Flure, Küchen, Bäder und die Treppe am Eingang.
- **Untergrund** → `{{root}}leistungen/untergrund/`
  Prüfen, alte Beläge entfernen, schleifen, grundieren und spachteln, auf Böden wie auf Stufen.
- **Projekte** → `{{root}}projekte/` (falls die Projektseite einen Filter per Anker bekommt: `{{root}}projekte/#treppe`)
  Treppen und Böden, die unser Team verlegt hat, nach Bodenart sortiert.

**Zeile darunter (Fließtext mit Links):**
Außerdem: [Laminat](leistungen/laminat/) für Wohnräume mit viel Betrieb, [Teppich](leistungen/teppich/) für Schlafzimmer und leise Treppen, und [alle Leistungen](leistungen/) im Überblick.

---

### Abschluss (CTA-Band, Treppen-Fassung)

**H2:** Zeigen Sie uns Ihre Treppe (26 Zeichen)

**Untersatz:**
Ein paar Fotos und die Zahl der Stufen genügen für den Anfang, danach vereinbaren wir einen Termin für Beratung und Aufmaß.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Treppe`
- Sekundär: **0159 0171 7249** → `tel:+4915901717249`
- Textlink: **Fotos per WhatsApp schicken** → `https://wa.me/4915901717249`

**Zwei kleine Zeilen:**
Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr
Neuenhöhe 17, 42929 Wermelskirchen

Umsetzung: Das vorhandene Partial `src/partials/cta-band.html` hat eine Eyebrow („Unverbindlich anfragen“) und ein kursives Wort (`<em>Boden.</em>`). Beides verstößt gegen die House rules. Eyebrow und `<em>` entfernen und Überschrift/Untersatz per Parameter oder als Treppen-Fassung direkt in die Seite setzen (wie auf der Parkett-Seite).

---

## 4. FAQ

Der Text der Antworten ist wortgleich im JSON-LD (`faq-treppen.json`) enthalten.

**Muss die alte Treppe dafür ausgebaut werden?**
In vielen Fällen nicht. Treppen aus Beton, Holz, Fliese oder Stein lassen sich neu belegen, wenn sie fest und tragfähig sind. Lose Stufen werden vorher befestigt, hohl liegende Fliesen und alte Beläge wie Teppich oder PVC kommen heraus, Unebenheiten werden ausgeglichen. Ob das bei Ihrer Treppe so geht, sehen wir beim Termin vor Ort.

**Werden die Stufen durch den neuen Belag höher?**
Jede Stufe wird um die Stärke des neuen Belags höher. Zwischen den Stufen gleicht sich das aus, weil alle gleich viel dazubekommen. An der untersten und der obersten Stufe aber nicht: Bleibt der Boden unten, wie er ist, wird die erste Stufe höher. Bleibt der Boden oben, wie er ist, wird die letzte niedriger. Ungleich hohe Stufen sind eine Stolperfalle. Deshalb planen wir die Höhen von Treppe und angrenzenden Böden gemeinsam, bevor wir beginnen.

**Ist eine belegte Treppe rutschig?**
Das hängt vom Belag und seiner Oberfläche ab. Teppich gibt den meisten Halt. Bei Holz ist eine geölte oder matt lackierte Oberfläche griffiger als glänzender Lack, und Vinyl mit strukturierter Oberfläche ist ebenfalls griffig. Glatte Oberflächen können mit Socken rutschig sein. Gut erkennbare Stufenkanten helfen zusätzlich, besonders im Halbdunkel. Bei der Auswahl achten wir mit Ihnen darauf, dass die Treppe zu allen passt, die sie täglich benutzen, auch zu Kindern und älteren Menschen.

**Was passiert mit dem Geländer?**
Das hängt davon ab, wie es befestigt ist. Sitzt das Geländer seitlich an der Wange oder an der Wand, stört es beim Belegen meist nicht. Stehen die Pfosten auf den Stufen, werden die neuen Stufen um die Pfosten herum eingepasst, oder das Geländer wird für die Arbeiten abgenommen und danach wieder befestigt. Was bei Ihrer Treppe nötig ist, klären wir beim Aufmaß.

**Was kostet es, eine Treppe zu belegen?**
Das lässt sich ohne Blick auf die Treppe nicht seriös sagen. Der Preis hängt von der Zahl der Stufen ab, von der Form (gewendelte Stufen machen mehr Arbeit als gerade), vom Belag, davon, ob Setzstufen und Wandanschlüsse mit belegt werden, und davon, wie viel an den alten Stufen vorzubereiten ist. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Fotos und die Zahl der Stufen helfen uns, den Termin gut vorzubereiten.

*Reserve-Frage (nur wenn der Kunde Abschleifen anbietet, siehe Punkt 8):*
**Lässt sich eine Holztreppe auch abschleifen statt belegen?**
Bei massiven Holzstufen oft ja: Sie werden abgeschliffen und neu geölt oder lackiert. Voraussetzung ist, dass das Holz stark genug ist und die Stufen fest sitzen. Bei furnierten Stufen oder dünnen Holzauflagen geht das nur eingeschränkt oder gar nicht. Ob Abschleifen oder neu Belegen bei Ihrer Treppe sinnvoller ist, besprechen wir vor Ort.

---

## 5. Interne Links

| Ziel | Linktext | Stelle |
|---|---|---|
| `{{root}}` | Start | Breadcrumb |
| `{{root}}leistungen/` | Leistungen / alle Leistungen | Breadcrumb, „Was zur Treppe dazugehört“ |
| `{{root}}leistungen/parkett/` | Parkett | „Welcher Belag auf Stufen passt“, „Was zur Treppe dazugehört“ |
| `{{root}}leistungen/vinyl/` | Vinyl | „Welcher Belag auf Stufen passt“, „Was zur Treppe dazugehört“ |
| `{{root}}leistungen/laminat/` | Laminat | „Welcher Belag auf Stufen passt“, „Was zur Treppe dazugehört“ |
| `{{root}}leistungen/teppich/` | Teppich | „Welcher Belag auf Stufen passt“, „Was zur Treppe dazugehört“ |
| `{{root}}leistungen/untergrund/` | Mehr zur Untergrundvorbereitung / Untergrund | „Renovieren statt ausbauen“, „Was zur Treppe dazugehört“ |
| `{{root}}projekte/` (ggf. `#treppe`) | Projekte | „Was zur Treppe dazugehört“ |
| `{{root}}kontakt/?bodenart=Treppe` | Angebot anfragen | Kopf, Ablauf, Abschluss |
| `{{root}}kontakt/?bodenart=Treppe&form=…&bauart=…&stufen=…&belag=…` | Mit diesen Angaben anfragen | Treppen-Steckbrief |
| `#steckbrief` | Treppen-Steckbrief | „Gerade, gewendelt oder offen“ |
| `#faq` | Warum das wichtig ist | „Renovieren statt ausbauen“ (Hinweis zu den Höhen) |
| `tel:+4915901717249` | 0159 0171 7249 | Kopf, Abschluss |
| `https://wa.me/4915901717249` | Fotos per WhatsApp schicken | Steckbrief (mit Text), Abschluss |
| `mailto:info@handwerker-blesius.de` | Per E-Mail schicken | Steckbrief (mit Betreff und Text) |

Rückverweise auf diese Seite von: Startseite (Leistungsliste), `leistungen/` (Abschnitt Treppen und Wegweiser), `leistungen/parkett/`, `leistungen/vinyl/`, `leistungen/laminat/` und `leistungen/teppich/` (jeweils „Was zum … dazugehört“), `leistungen/untergrund/`, `projekte/` (Bildunterschriften der Treppenfotos).

---

## 6. JSON-LD

Drei Dateien in `src/jsonld/`. Der Betrieb selbst (`HomeAndConstructionBusiness`, `@id` `https://handwerker-blesius.de/#betrieb`) steht global im Layout und wird hier nur referenziert. Kein `aggregateRating`, kein `offers` mit Preis.

**`service-treppen.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://handwerker-blesius.de/leistungen/treppen/#leistung",
  "name": "Treppen belegen und renovieren",
  "serviceType": "Treppenrenovierung",
  "description": "Beratung, Verkauf und Verlegung von Treppenbelägen: Tritt- und Setzstufen, Stufenkanten, Wandanschlüsse und Übergänge für gerade, gewendelte und offene Treppen, passend zum Boden und mit Vorbereitung der vorhandenen Stufen.",
  "url": "https://handwerker-blesius.de/leistungen/treppen/",
  "image": "https://handwerker-blesius.de/assets/img/treppe-eiche-1600.jpg",
  "provider": { "@id": "https://handwerker-blesius.de/#betrieb" },
  "areaServed": [
    { "@type": "City", "name": "Wermelskirchen" },
    { "@type": "City", "name": "Remscheid" },
    { "@type": "City", "name": "Solingen" },
    { "@type": "City", "name": "Wuppertal" },
    { "@type": "City", "name": "Burscheid" },
    { "@type": "City", "name": "Bergisch Gladbach" },
    { "@type": "City", "name": "Köln" }
  ],
  "audience": { "@type": "Audience", "audienceType": "Privatkunden" }
}
```

**`faq-treppen.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://handwerker-blesius.de/leistungen/treppen/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Muss die alte Treppe dafür ausgebaut werden?",
      "acceptedAnswer": { "@type": "Answer", "text": "In vielen Fällen nicht. Treppen aus Beton, Holz, Fliese oder Stein lassen sich neu belegen, wenn sie fest und tragfähig sind. Lose Stufen werden vorher befestigt, hohl liegende Fliesen und alte Beläge wie Teppich oder PVC kommen heraus, Unebenheiten werden ausgeglichen. Ob das bei Ihrer Treppe so geht, sehen wir beim Termin vor Ort." }
    },
    {
      "@type": "Question",
      "name": "Werden die Stufen durch den neuen Belag höher?",
      "acceptedAnswer": { "@type": "Answer", "text": "Jede Stufe wird um die Stärke des neuen Belags höher. Zwischen den Stufen gleicht sich das aus, weil alle gleich viel dazubekommen. An der untersten und der obersten Stufe aber nicht: Bleibt der Boden unten, wie er ist, wird die erste Stufe höher. Bleibt der Boden oben, wie er ist, wird die letzte niedriger. Ungleich hohe Stufen sind eine Stolperfalle. Deshalb planen wir die Höhen von Treppe und angrenzenden Böden gemeinsam, bevor wir beginnen." }
    },
    {
      "@type": "Question",
      "name": "Ist eine belegte Treppe rutschig?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das hängt vom Belag und seiner Oberfläche ab. Teppich gibt den meisten Halt. Bei Holz ist eine geölte oder matt lackierte Oberfläche griffiger als glänzender Lack, und Vinyl mit strukturierter Oberfläche ist ebenfalls griffig. Glatte Oberflächen können mit Socken rutschig sein. Gut erkennbare Stufenkanten helfen zusätzlich, besonders im Halbdunkel. Bei der Auswahl achten wir mit Ihnen darauf, dass die Treppe zu allen passt, die sie täglich benutzen, auch zu Kindern und älteren Menschen." }
    },
    {
      "@type": "Question",
      "name": "Was passiert mit dem Geländer?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das hängt davon ab, wie es befestigt ist. Sitzt das Geländer seitlich an der Wange oder an der Wand, stört es beim Belegen meist nicht. Stehen die Pfosten auf den Stufen, werden die neuen Stufen um die Pfosten herum eingepasst, oder das Geländer wird für die Arbeiten abgenommen und danach wieder befestigt. Was bei Ihrer Treppe nötig ist, klären wir beim Aufmaß." }
    },
    {
      "@type": "Question",
      "name": "Was kostet es, eine Treppe zu belegen?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das lässt sich ohne Blick auf die Treppe nicht seriös sagen. Der Preis hängt von der Zahl der Stufen ab, von der Form (gewendelte Stufen machen mehr Arbeit als gerade), vom Belag, davon, ob Setzstufen und Wandanschlüsse mit belegt werden, und davon, wie viel an den alten Stufen vorzubereiten ist. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Fotos und die Zahl der Stufen helfen uns, den Termin gut vorzubereiten." }
    }
  ]
}
```

**`breadcrumb-treppen.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://handwerker-blesius.de/" },
    { "@type": "ListItem", "position": 2, "name": "Leistungen", "item": "https://handwerker-blesius.de/leistungen/" },
    { "@type": "ListItem", "position": 3, "name": "Treppen", "item": "https://handwerker-blesius.de/leistungen/treppen/" }
  ]
}
```

Wird die Reserve-Frage freigegeben, kommt sie als sechste `Question` mit wortgleicher Antwort dazu. Falls der Kunde auch Gewerbetreppen belegt (Punkt 8), `audience` wie auf der Parkett-Seite um `Gewerbekunden` erweitern.

---

## 7. Live-Ding: Treppen-Steckbrief

**Kundennutzen:** Wer eine Treppe renovieren lassen will, weiß selten, wie man sie beschreibt („die mit dem Knick“), und schickt Fotos, auf denen das Wichtige fehlt. Dann braucht es Rückfragen, bevor überhaupt ein Termin steht. Der Steckbrief zeigt die Treppenformen von oben, fragt nur die vier Dinge ab, die für die Vorbereitung wirklich zählen, und sagt dem Kunden genau, welche Fotos er machen soll. Die Angaben landen fertig formuliert im Anfrageformular, in WhatsApp oder in einer E-Mail. Das spart dem Kunden das Erklären und dem Betrieb die erste Rückfrage. Kein Preis, keine Schätzung, kein Speichern.

**Platz:** eigener Abschnitt nach „So entsteht Ihre neue Treppe“, als Beweis, dass der erste Schritt klein ist. Anker `#steckbrief`, verlinkt aus „Gerade, gewendelt oder offen“ und aus Schritt 1 des Ablaufs.

**Aufbau (Desktop zweispaltig: links die Angaben, rechts das Ergebnis, das beim Scrollen stehen bleibt; Handy: alles untereinander, das Ergebnis unter den Angaben):**

Ein echtes `<form method="get" action="{{root}}kontakt/">` mit `<input type="hidden" name="bodenart" value="Treppe">`. Vier `fieldset` mit `legend`:

| Gruppe | Feldname | Werte (value → sichtbarer Text) |
|---|---|---|
| Form, von oben gesehen | `form` | `gerade` → Gerade · `viertel` → Viertelgewendelt (L-Form) · `halb` → Halbgewendelt (U-Form) · `podest` → Mit Podest · `andere` → Andere Form, etwa Spindel- oder Bogentreppe |
| Bauart | `bauart` | `geschlossen` → Geschlossen, mit Setzstufen · `offen` → Offen, ohne Setzstufen |
| Anzahl der Stufen | `stufen` | Zahl 1–40, `inputmode="numeric"`, startet leer; Minus- und Plus-Knopf (mindestens 44 × 44 px) |
| Was liegt heute auf der Treppe? | `belag` | `teppich` → Teppich · `holz` → Holz · `fliese` → Fliese oder Stein · `beton` → Beton ohne Belag · `pvc` → PVC oder Linoleum · `unbekannt` → Weiß ich nicht |

- Form-Kacheln: Radio-Buttons, visuell als Kacheln mit kleiner SVG-Draufsicht (Stufen als schmale Rechtecke in Holz-Mittelton, Fugen in Graphit `#525252`, Laufrichtung als kleiner Pfeil; flach, keine Linienraster). SVG `aria-hidden="true"`, die Beschriftung trägt die Information. Ausgewählte Kachel: orange Fläche hinter dem Symbol oder orange Rahmen von 2 px (Fokus bleibt sichtbar).
- Alle Gruppen sind optional. Was nicht gewählt ist, steht im Ergebnis als „noch offen“.

**Ergebnis-Zeile (live):** Zusammensetzung aus vier Teilen, getrennt durch Kommas, Satzende mit Punkt.

| Teil | Text |
|---|---|
| Form | Gerade Treppe · Viertelgewendelte Treppe · Halbgewendelte Treppe · Treppe mit Podest · Treppe in anderer Form · (leer:) Treppe, Form noch offen |
| Bauart | geschlossen, mit Setzstufen · offen, ohne Setzstufen · (leer: weglassen) |
| Stufen | 1 Stufe · 14 Stufen · (leer:) Stufen noch nicht gezählt |
| Belag | heute mit Teppich belegt · heute Holz · heute Fliese oder Stein · heute Beton ohne Belag · heute PVC oder Linoleum · heutiger Belag noch unklar · (leer: weglassen) |

Beispiel: „Viertelgewendelte Treppe, geschlossen, mit Setzstufen, 14 Stufen, heute mit Teppich belegt.“

**Fotoliste „Diese Fotos helfen uns“ (wächst mit der Auswahl):**

Immer:
- Die ganze Treppe von unten
- Die ganze Treppe von oben
- Eine Stufe von der Seite, am besten mit angelegtem Zollstock
- Die unterste und die oberste Stufe mit dem Boden davor

Zusätzlich je nach Auswahl:
- Form `viertel`, `halb`, `andere`: Die Wendelung von oben, möglichst senkrecht nach unten fotografiert
- Form `podest`: Das Podest mit den Stufen davor und dahinter
- Bauart `offen`: Eine Stufe von unten, damit wir sehen, wie sie befestigt ist
- Belag `teppich` oder `pvc`: Wenn es geht, eine Ecke des alten Belags anheben und zeigen, was darunter liegt
- Belag `fliese`: Lose oder hohl klingende Platten, falls es welche gibt
- Belag `beton`: Falls bekannt, wie hoch die fertigen Böden oben und unten werden

Am Ende immer (klein): Steht das Geländer auf den Stufen, hilft ein Foto vom Fuß eines Pfostens.

**Knöpfe:**
- Primär **Mit diesen Angaben anfragen**: sendet das Formular (GET) an `{{root}}kontakt/?bodenart=Treppe&form=viertel&bauart=geschlossen&stufen=14&belag=teppich`.
- Textlink **Fotos per WhatsApp schicken**: `https://wa.me/4915901717249?text=` + URL-kodiert: „Guten Tag, ich interessiere mich für eine neue Treppe. {Ergebnis-Zeile} Die Fotos schicke ich hier mit.“
- Textlink **Per E-Mail schicken**: `mailto:info@handwerker-blesius.de?subject=Anfrage%20Treppe&body=` + URL-kodiert: „Guten Tag, ich interessiere mich für eine neue Treppe. {Ergebnis-Zeile} Fotos hänge ich an. Mein Name: … Meine Telefonnummer: …“
- Kleine Zeile: Ihre Auswahl wird nicht gespeichert und erst übertragen, wenn Sie die Anfrage absenden.

**Übergabe ans Formular:** Auf `kontakt/` liest `site.js` die Parameter. `bodenart=Treppe` wird gegen die Optionsliste geprüft und gesetzt. Ist das Nachrichtenfeld leer, kommt hinein: „Treppe: {Ergebnis-Zeile} Fotos schicke ich per WhatsApp oder E-Mail.“ Das Feld „ca. m²“ bleibt leer, die Vorbelegungs-Notiz über dem Formular lautet: „Ihre Angaben aus dem Treppen-Steckbrief sind eingetragen. Bitte noch Name und Telefon oder E-Mail ergänzen. Die Fläche können Sie bei einer Treppe leer lassen.“ Der Kunde kann alles ändern. Nichts wird gespeichert oder gezählt (keine Cookies, kein Tracking, siehe `docs/HOSTING.md`). Das Kontaktformular hat keinen Datei-Upload, deshalb führen WhatsApp und E-Mail die Fotos.

**Ohne JavaScript:** Das Formular funktioniert trotzdem (GET an die Kontaktseite, dort werden die Parameter dann ignoriert). Die Ergebnis-Zeile ist ausgeblendet, die Fotoliste steht vollständig mit allen Punkten da, der WhatsApp-Link geht ohne vorbereiteten Text, der E-Mail-Link nur mit Betreff.

**Bewegung:** Beim Wählen einer Form zeichnet sich die Draufsicht in der Kachel Stufe für Stufe nach (0,4 s, `data-draw`-Logik). Die Ergebnis-Zeile wechselt mit kurzer Blende (0,2 s), neue Fotolisten-Punkte steigen 8 px ein. Die Plus-/Minus-Knöpfe haben Druck-Feedback (`scale(0.97)`). Bei `prefers-reduced-motion`: sofortiger Wechsel ohne Weg.

**Barrierefreiheit:** echte Radio-Buttons und Labels, Pfeiltasten wechseln innerhalb einer Gruppe, das Ergebnis ist `aria-live="polite"`, die Zahl ist ein echtes `input type="number"` mit `min="1" max="40"` und Label.

---

## 8. Vom Kunden zu bestätigen

1. **Beläge auf Treppen:** Mit welchen Belägen belegen Sie Treppen: Holz, Vinyl, Laminat, Teppich? Die Vergleichstabelle zeigt alle vier als allgemeine Information. Spalten, die Sie nicht anbieten, nehmen wir heraus (gilt auch für die Links darunter und die Satzteile „leise Treppen“ beim Teppich und „Treppe am Eingang“ beim Vinyl).
2. **Renovieren ohne Ausbau:** Belegen Sie bestehende Treppen, ohne sie auszubauen? Auf welchen Untergründen: Beton, Holz, Fliese, Kunststein, Naturstein? Belegen Sie auch rohe Betontreppen im Neubau? Die Abschnitte „Renovieren statt ausbauen“ und die erste FAQ-Antwort setzen das voraus.
3. **Holz auf den Stufen:** Verwenden Sie Massivholzstufen, Renovierungsstufen mit Parkett-Oberfläche oder beides? Die Seite spricht bisher nur von „Holz“. Bei Antwort ergänzen wir einen Satz in der Tafel „Gerade Treppe“ oder im Abschnitt „Welcher Belag auf Stufen passt“.
4. **Offene Treppen und neue Stufen:** Belegen Sie offene Treppen? Ersetzen Sie auch Stufen durch neue, oder nur belegen? Stammt die offene Treppe mit Eichenstufen auf Stahl oben links auf `treppe-eiche` von Ihrem Team? Bei Nein entfällt das Bild in der Tafel „Offene Treppe“.
5. **Schablone bei gewendelten Treppen:** Stimmt „Wir nehmen jede Stufe mit einer Schablone ab“? Falls Sie anders aufmessen, passen wir den Satz an.
6. **Geländer:** Nehmen Sie Geländer selbst ab und befestigen sie wieder, oder übernimmt das ein anderer Betrieb? Die FAQ-Antwort ist bewusst so formuliert, dass sie beides offenlässt.
7. **Materialien auf den Fotos:**
   - `treppe-eiche`: Eiche massiv oder belegt? Sind die Setzstufen ebenfalls Eiche? Haben Sie Stufen, Podest und Flur in einem Auftrag belegt?
   - `treppe-weiss`: Woraus sind die Trittstufen (Vinyl, Laminat, Holz)? Sind die Setzstufen weiß belegt oder gestrichen?
   - `treppe-wendel`: Woraus sind die Trittstufen? Bisher steht nur „dunkler Holzton“.
   Bei Antwort ergänzen wir die Bildunterschriften (z. B. „Gewendelte Treppe, Trittstufen in Vinyl“).
8. **Fotos veröffentlichen:**
   - `treppe-eiche` zeigt noch unverputzte Wandanschlüsse rechts und links unten. Wir schneiden sie weitgehend weg. Gibt es ein Foto nach den Malerarbeiten?
   - `treppe-weiss`: Oben auf dem Absatz liegt ein Hund, unten rechts steht eine Pflanze. Wir schneiden beides weg. Soll der Hund drinbleiben dürfen, braucht es die Zustimmung der Eigentümer.
   - Haben die Bauherren der Veröffentlichung aller Treppenfotos zugestimmt?
9. **Podest:** Haben Sie die Podeststufen auf `podest-led` belegt? (Gleiche Frage wie auf der Parkett-Seite.) Bauen Sie auch LED-Bänder in Stufen ein? Bisher wird das nicht behauptet; bei Ja wäre es ein guter Satz für diese Seite.
10. **Wandanschluss und Leisten:** Setzen Sie an Treppen Sockelleisten oder Treppenleisten ein? Der Text sagt bisher nur „je nach Treppe schließt eine passende Leiste den Übergang“.
11. **Kantenprofile:** Welche Kantenprofile verwenden Sie (im Dekor, Aluminium, Edelstahl)? Der Text bleibt bisher allgemein.
12. **Andere Formen:** Belegen Sie auch Spindel- und Bogentreppen? Der Steckbrief bietet „Andere Form“ an, verspricht aber nichts.
13. **Pflege-Erklärung bei der Übergabe:** Dürfen wir „erklären Ihnen, wie Sie den Belag pflegen“ zusagen? (Gleiche Frage wie auf der Parkett-Seite.)
14. **Abschleifen statt belegen:** Schleifen Sie Holztreppen auch ab und ölen oder lackieren sie neu? Bei Ja kommt die Reserve-Frage in die FAQ und ins JSON-LD.
15. **Gewerbe:** Belegen Sie auch Treppen in Büros, Praxen oder Mehrfamilienhäusern (Treppenhäuser)? Bei Ja ergänzen wir einen Satz im Kopf und `Gewerbekunden` im JSON-LD.
16. **Fotos per WhatsApp und E-Mail:** Ist es Ihnen recht, dass der Steckbrief Kunden ausdrücklich bittet, Fotos per WhatsApp oder an info@handwerker-blesius.de zu schicken? Ist der vorbereitete Text („Guten Tag, ich interessiere mich für eine neue Treppe …“) in Ordnung?

**Für die Umsetzung (nicht Kunde):**
- Vorbelegung über `?bodenart=Treppe&form=…&bauart=…&stufen=…&belag=…` in `static/assets/js/site.js` ergänzen (gleiches Muster wie Aufmaß-Rechner und Parkett-Musterwahl, Nachrichtenzeile nur setzen, wenn das Feld leer ist oder noch die alte Vorbelegung enthält).
- Zwei SVG-Zeichnungen anlegen: Schnitt durch zwei Stufen (Abschnitt „Was an jeder Stufe stimmen muss“) und fünf Draufsichten für den Steckbrief. Flache Flächen in den Holztönen der Fotos und in Graphit, keine Haarlinien-Raster.
- Tabelle „Welcher Belag auf Stufen passt“: am Handy im eigenen, waagerecht scrollbaren Container, damit die Seite keine Querscrollbar bekommt.
- Im CTA-Band-Partial Eyebrow und `<em>` entfernen (House rules).
- Projekte-Filter: Anker oder Parameter für „Treppe“ festlegen und den Link in „Was zur Treppe dazugehört“ anpassen.
- Datenschutzerklärung: Hinweis auf WhatsApp- und E-Mail-Links prüfen (Daten fließen erst, wenn der Kunde selbst sendet).
