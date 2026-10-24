# Copy-Deck: Teppich

Seite `leistungen/teppich/` · Quelldatei-Vorschlag `src/pages/leistungen-teppich.html` · Stand 24.10.2026

Alle Texte sind veröffentlichungsreif. Zwischen Zahl und Einheit, in der Telefonnummer, in der Hausnummer und vor „Uhr“ stehen geschützte Leerzeichen (U+00A0). Überschriften haben keinen Schlusspunkt, kein kursives oder farbiges Wort und keine Eyebrow darüber. Die Bildnamen stammen aus `src/images.json`. Aufbau, Schreibweisen und Link-Parameter folgen den Copy-Decks Parkett und Vinyl (`docs/copy/parkett.md`, `docs/copy/vinyl.md`), damit die Leistungsseiten wie aus einem Guss wirken.

Fachaussagen sind allgemein gültig formuliert („in der Regel“, „je nach Herstellerangabe“). Es stehen keine Preise, Garantien, Markennamen, Prüfsiegel, Jahreszahlen oder Projektzahlen auf der Seite.

**Besonderheit dieser Seite: Es gibt kein Foto eines Teppichbodens.** Deshalb gilt:

- Kein Foto auf dieser Seite zeigt oder behauptet Teppich. Fotos stehen nur dort, wo sie etwas Wahres belegen: den vorbereiteten Untergrund (`untergrund`), das Team (`handwerker`, `team-ruecken`) und, im Verweis auf die Treppen-Seite, eine Treppe mit Holzstufen, die auch so beschriftet ist (`treppe-wendel`).
- Teppich selbst erscheint als flache Erklärzeichnung: Schnitt durch den Bodenaufbau (Kopf), Draufsicht Bahn und Fliese, Flor im Querschnitt (Live-Ding), Treppenkante in der Seitenansicht. Das sind Zeichnungen, die etwas erklären, was ein Foto ohnehin nicht zeigen würde. Sie sind keine Ersatzbilder und sehen auch nicht so aus: flache Flächen in Graphit `#525252`, den Tonstufen des Hintergrunds und der Tinte, keine Verläufe, keine Schatten, keine Linienraster, keine Nummern. Beschriftungen in der Textschrift.
- Die fehlenden Fotos werden im Text zum Argument: Teppich wählt man am Muster, nicht am Bildschirm (Abschnitt „Teppich muss man fühlen“).
- Sobald der Kunde echte Fotos von Teppichböden liefert, die sein Team verlegt hat, sind die Plätze dafür markiert (Kopf, Treppe, neue Galerie vor den FAQ).

---

## 1. Seitenkopf

```
<!--
title: Teppichboden verlegen in Wermelskirchen | Handwerker Blesius
description: Warm und leise: Teppichboden als Bahnenware oder Fliese für Schlafzimmer, Treppe und Büro. Beratung, Verkauf und Verlegung samt Untergrund. Jetzt anfragen.
path: leistungen/teppich/
nav: leistungen
css: leistungen
jsonld: service-teppich, faq-teppich, breadcrumb-teppich
-->
```

| Feld | Länge | Grenze |
|---|---|---|
| title | 60 Zeichen | ≤ 60 |
| description | 155 Zeichen | ≤ 155 |
| H1 „Teppichboden in Wermelskirchen“ | 30 Zeichen | ≤ 32 |

Im Menü und in der Breadcrumb heißt die Seite kurz „Teppich“. In H1 und Title steht „Teppichboden“, weil Kunden so suchen („Teppichboden verlegen“, „Teppichboden Wermelskirchen“). Der Begriff „Teppichverlegung“ kommt im Text und im JSON-LD vor.

Open Graph: `og:title` = title, `og:description` = description. Bild: das globale `assets/img/og-image.jpg`. Kein seitenbezogenes Bild, weil keins Teppich zeigt.

**Teaser für die Leistungsübersicht und die Startseite** (deckt sich mit `docs/copy/leistungen.md`):
Teppich: weich, warm und leise, als Bahnenware oder Teppichfliese. Für Schlafzimmer, Kinderzimmer, Treppen und Büros, verlegt auf einem sauber vorbereiteten Untergrund.

---

## 2. Argument

Wer liest:

- Paare und Familien im Bergischen Land und in Köln, die Schlaf- oder Kinderzimmer erneuern und es dort warm und ruhig haben möchten.
- Bewohner von Etagenwohnungen, die weniger Trittschall für die Nachbarn unten wollen, oft auf Wunsch von Vermieter oder Hausverwaltung.
- Hausbesitzer, deren Treppe leiser und griffiger werden soll.
- Gewerbekunden mit Büro oder Besprechungsraum, in denen es hallt.
- Und eine zweite, große Gruppe: Menschen, die ihren alten Teppich loswerden wollen und einen Betrieb suchen, der ihn sauber herausnimmt und den Untergrund für den nächsten Boden vorbereitet.

Sie wissen, dass Teppich warm und leise ist. Unsicher sind sie bei Flor und Faser, bei Bahnenware oder Fliesen, bei Fußbodenheizung, Allergie, Flecken und Pflege, bei der Frage, ob der alte Belag liegen bleiben kann, und beim Preis.

Was sie nach einem Bildschirm glauben sollen: Blesius berät, liefert und verlegt Teppichboden aus einer Hand, sagt ehrlich, wo Teppich passt und wo nicht, und arbeitet vom Untergrund bis zur Treppenkante sorgfältig.

Was sie als Nächstes tun: den passenden Flor wählen und damit anfragen, Fotos per WhatsApp schicken oder anrufen.

| Abschnitt | Behauptung | Beweis |
|---|---|---|
| Kopf | Teppichboden in Wermelskirchen, beraten, verkauft und verlegt von einem Betrieb | H1 mit Ort, Region, Telefon, Anfrage-Knopf; Schnittzeichnung des Bodenaufbaus, die sich von unten nach oben aufbaut, vom Estrich bis zum Flor |
| Was Teppich besser kann | Teppich ist wärmer unter den Füßen und leiser als ein Hartboden, hat aber klare Grenzen | fünf Stärken mit Begründung (Luft zwischen den Fasern, Schall im Raum, Trittschall nach unten, Griffigkeit, Fläche ohne Fuge) und vier ehrlich benannte Grenzen |
| Bahnenware oder Teppichfliesen | Raum und Nutzung entscheiden, ob Teppich von der Rolle oder als Fliese kommt | zwei Tafeln mit Draufsicht-Zeichnung, Verlegung, Ausbesserung und passenden Räumen |
| Welcher Flor zu Ihnen passt | Der Flor bestimmt, wie sich ein Teppich anfühlt und was er aushält | Live-Ding Florwahl: vier Florarten im Querschnitt, Eigenschaften, Räume, Übergabe der Wahl ins Formular; dazu ein Absatz zu den Fasern |
| Für welche Räume Teppich passt | Teppich gehört dorthin, wo es warm und ruhig sein soll, nicht dorthin, wo es nass wird | Raumliste mit klaren Ausnahmen (Bad, Küche, Hauseingang → Vinyl) |
| Teppich auf der Treppe | Auf der Treppe zeigt die Kante, wie sorgfältig gearbeitet wurde | Arbeitsweise Stufe für Stufe, zwei Kantenlösungen als Seitenansicht, Flor-Empfehlung für Stufen |
| Was unter den Teppich gehört | Auch Teppich braucht einen vorbereiteten Untergrund, und alter Teppich muss raus | Foto vom vorbereiteten Estrich (`untergrund`), Untergrund-Leistungen laut Kundenangaben |
| Teppich muss man fühlen | Teppich wählt man am Muster und im eigenen Licht, nicht am Bildschirm | Beratung mit Mustern vor Ort **[bestätigen]**, Liste für die Vorbereitung, Foto des Teams (`team-ruecken`) |
| Vom Muster bis zur Übergabe | Der Weg zum fertigen Teppichboden ist klar | fünf Schritte aus dem tatsächlichen Ablauf, Foto aus dem Team (`handwerker`) |
| So bleibt Teppich schön | Wenige Gewohnheiten genügen | sechs konkrete Pflegeregeln |
| Häufige Fragen zu Teppich | Offene Fragen werden ehrlich beantwortet | fünf Antworten ohne Preise und Garantien |
| Was zum Teppich dazugehört | Zum Boden gehören Treppe, Kanten und Übergänge | Links zu Treppen, Untergrund, Leisten, Projekten und den anderen Böden |
| Abschluss | Der erste Schritt ist klein | Fotos, Fläche und Florwahl genügen; Telefon, WhatsApp, Formular |

---

## 3. Abschnitte

### Kopf (`.page-hero`, ohne Foto)

**Breadcrumb:** Start › Leistungen › Teppich
(`{{root}}` › `{{root}}leistungen/` › aktuelle Seite, `aria-current="page"`)

**H1:** Teppichboden in Wermelskirchen

**Untersatz (`.lead`):**
Als Bahnenware oder Teppichfliese, für Wohnräume, Treppen und Büros: Wir beraten, verkaufen und verlegen ihn, den Untergrund eingeschlossen.

**Text:**
Für Wohnungen, Häuser und Büros in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln. Größere Projekte übernehmen wir deutschlandweit.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Teppich`
- Sekundär (Ghost-Button mit Telefon-Icon): **0159 0171 7249** → `tel:+4915901717249`
- Kleine Zeile darunter: Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr

**Grafik statt Foto: Schnitt durch einen verklebten Teppichboden** (Inline-SVG, rechte Spalte des Kopfs, am Handy unter dem Text)

Fünf waagerechte Schichten, von unten nach oben:

| Schicht | Beschriftung | Darstellung |
|---|---|---|
| unten, am dicksten | Estrich | Graphit `#525252`, flache Fläche |
| darüber, dünn | Spachtelmasse | eine Tonstufe heller als der Estrich, Oberkante vollkommen gerade |
| sehr dünn | Kleber | dunkelste Stufe (`--bg`), kaum sichtbar, wie in echt |
| dünn | Teppichrücken | `--bg-3` |
| oben | Flor | dichte, senkrechte Fasern in Tinte (`#ECEAE6`), Striche ab 3 px mit runden Enden, kein Haarstrich |

Beschriftung rechts neben jeder Schicht in der Textschrift, ohne Hinweislinien, ohne Nummern. Alle Schichten links bündig und rechts angeschnitten, damit es wie ein Schnitt aussieht, nicht wie ein Diagramm. Orange höchstens auf einer einzigen Beschriftung, und nur, wenn auf dem Bildschirm sonst nur der Anfrage-Knopf orange ist.

- `role="img"` mit `aria-label`: Schnitt durch einen verklebten Teppichboden. Von unten nach oben: Estrich, Spachtelmasse, Kleber, Teppichrücken und Flor.
- Bildunterschrift: Schnitt durch einen verklebten Teppichboden

**Bewegung:** Die Zeichnung baut sich beim Laden einmal von unten nach oben auf: Estrich, Spachtelmasse, Kleber, Rücken, dann wachsen die Fasern aus dem Rücken (`scaleY` von der Unterkante, Staffel 20 ms). So „verlegt“ sich der Boden wie die Dielen auf der Startseite. Bei `prefers-reduced-motion` und ohne JavaScript: fertige Zeichnung.

**Später, mit echtem Foto:** Liefert der Kunde ein Foto eines von seinem Team verlegten Teppichbodens, ersetzt es die Zeichnung im Kopf. Die Zeichnung wandert dann in den Abschnitt „Was unter den Teppich gehört“.

---

### Was Teppich besser kann

**H2:** Was Teppich besser kann (23 Zeichen)

**Untersatz:**
Unter nackten Füßen fühlt sich Teppich wärmer an als jeder Hartboden, und im Raum ist er deutlich leiser.

**Text (`dl`, Begriff fett, Erklärung daneben):**

- **Warm unter den Füßen.** Zwischen den Fasern sitzt Luft. Deshalb entzieht Teppich der Haut kaum Wärme und fühlt sich auch im Winter und barfuß angenehm an.
- **Leiser im Raum.** Der Flor schluckt Schall, statt ihn zurückzuwerfen. Schritte, Stimmen und Musik klingen gedämpft, und in großen oder sparsam möblierten Räumen hallt es weniger.
- **Leiser für die Nachbarn.** Teppich dämpft auch den Trittschall, der sonst durch die Decke in die Räume darunter dringt. In Etagenwohnungen ist das oft der wichtigste Grund für Teppich.
- **Griffig und weich.** Auf Teppich rutscht man weniger leicht aus, und ein Sturz fällt weicher aus. Das zählt auf Treppen, im Kinderzimmer und für ältere Menschen.
- **Eine ruhige Fläche.** Viele Wohn- und Schlafräume lassen sich mit Bahnenware ohne Naht auslegen, von Wand zu Wand.

**H3:** Was Teppich nicht mag (21 Zeichen)

- **Nässe.** In Bad und Küche und direkt am Hauseingang ist Teppich fehl am Platz. Wasser, Fett und Straßenschmutz setzen sich im Flor fest.
- **Flecken, die warten.** Verschüttetes lässt sich meist gut entfernen, wenn Sie es sofort aufnehmen. Eingetrocknet wird es schwieriger.
- **Druck auf einer Stelle.** Schwere Möbel und Stuhlrollen hinterlassen Druckstellen, und auf viel begangenen Wegen legt sich der Flor mit der Zeit. Untersetzer, passende Rollen und der richtige Flor halten das in Grenzen.
- **Seltenes Saugen.** Teppich hält Staub im Flor fest, statt ihn aufzuwirbeln. Damit das so bleibt, will er regelmäßig gesaugt werden.

*(Kein Bild. Der Abschnitt ist typografisch: am Desktop zwei Spalten, links die Stärken, rechts die Grenzen auf einer Tonstufe heller (`--bg-2`). Keine Häkchen- oder Kreuz-Icons, die Wörter tragen.)*

---

### Bahnenware oder Teppichfliesen

**H2:** Bahnenware oder Teppichfliesen (30 Zeichen)

**Untersatz:**
Teppich kommt von der Rolle oder als Fliese, je nachdem, wie der Raum genutzt wird.

Zwei Tafeln nebeneinander (Handy: untereinander), jede mit Draufsicht-Zeichnung, H3, Text, kleiner Tabelle und Anfrage-Link.

**Tafel „Bahnenware“**

H3: Bahnenware

Bahnenware wird von der Rolle geschnitten, meist in Breiten von vier oder fünf Metern. Viele Wohn- und Schlafräume lassen sich damit ohne Naht auslegen. Wo eine Naht nötig ist, planen wir sie so, dass sie möglichst wenig auffällt: in Richtung des Lichteinfalls und abseits der Laufwege. Alle Bahnen liegen in derselben Florrichtung, sonst wirkt die Farbe von Bahn zu Bahn verschieden.

| | |
|---|---|
| Wirkung | ruhig und wohnlich, von Wand zu Wand |
| Verlegung | vollflächig verklebt oder mit lösbarer Fixierung |
| Später ausbessern | meist nur als ganze Fläche oder Bahn |
| Passt zu | Wohn-, Schlaf- und Kinderzimmern, Treppen |

Button (sekundär, Textlink-Stil): **Mit Bahnenware anfragen** → `{{root}}kontakt/?bodenart=Teppich&form=bahn`

Zeichnung (Draufsicht, `aria-hidden="true"`): ein Raumgrundriss als flache Fläche in `--bg-3`, darin eine breite Bahn über die ganze Fläche und ein schmaler Streifen am Rand, getrennt durch eine Naht als 4 px breite Lücke im Hintergrundton (keine Linie). Ein kleiner Pfeil in Tinte zeigt die gemeinsame Florrichtung.

**Tafel „Teppichfliesen“**

H3: Teppichfliesen

Teppichfliesen sind Platten, häufig 50 × 50 cm groß, mit einem schweren, formstabilen Rücken. Sie werden lose aufgelegt und mit einer lösbaren Fixierung gegen Verrutschen gesichert. Ist eine Fliese verschmutzt oder beschädigt, wird nur sie ersetzt. In Büros mit Doppel- oder Hohlboden bleiben so auch Bodentanks und Kabelwege erreichbar. Je nach Verlegerichtung entsteht eine ruhige Fläche oder ein Schachbrett aus Licht und Schatten.

| | |
|---|---|
| Wirkung | sachlich, je nach Verlegung ruhig oder gemustert |
| Verlegung | lose aufgelegt, mit lösbarer Fixierung |
| Später ausbessern | einzelne Fliesen tauschen |
| Passt zu | Büros, Besprechungsräumen, Hobbyräumen |

Button (sekundär, Textlink-Stil): **Mit Teppichfliesen anfragen** → `{{root}}kontakt/?bodenart=Teppich&form=fliese`

Zeichnung (Draufsicht, `aria-hidden="true"`): vier mal drei Quadrate mit 4 px Fuge im Hintergrundton, im Wechsel zwei Tonstufen (`--bg-3` und eine Stufe heller). Das zeigt das Schachbrett, das entsteht, wenn jede zweite Fliese um 90 Grad gedreht liegt.

**Text unter den Tafeln:**
Im Wohnbereich ist Bahnenware die Regel, im Büro die Fliese. Ausnahmen gibt es in beide Richtungen, zum Beispiel Teppichfliesen im Kinderzimmer, wo nach einem Malheur eine einzelne Fliese getauscht werden kann.

**Bewegung:** Die Zeichnungen legen sich beim Einscrollen einmal ein: die Bahn rollt von links aus (`clip-path` von links nach rechts, 0,8 s), die Fliesen erscheinen in der Reihenfolge, in der man sie verlegt, von einer Ecke aus (Staffel 40 ms). Reduced Motion: fertig.

---

### Welcher Flor zu Ihnen passt (mit Florwahl)

`id="flor"`

**H2:** Welcher Flor zu Ihnen passt (27 Zeichen)

**Untersatz:**
Flor nennt man die Fasern, auf denen Sie laufen, und von ihm hängt ab, wie sich der Teppich anfühlt und was er aushält.

Hier sitzt das Live-Ding (siehe Punkt 7). Ohne JavaScript stehen alle vier Tafeln untereinander, mit JavaScript schaltet die Florwahl zwischen ihnen um.

**Bedienelement:** Gruppenname „Florart“ (für Screenreader, sichtbar als kleine Zeile oder nur `aria-label`) · Schalter **Schlinge** · **Velours** · **Frisé** · **Hochflor**. Start: Schlinge.

**Tafel „Schlinge“**

H3: Schlinge

Das Garn bildet geschlossene Schlaufen, die nicht aufgeschnitten werden. Die Oberfläche ist fest, leicht strukturiert und sehr strapazierfähig, Trittspuren bleiben kaum zurück. Bei groben Schlingen können die Krallen von Katzen und Hunden hängen bleiben und einzelne Schlaufen herausziehen. Eine Variante aus kräftigem, oft meliertem Garn heißt Berber.

| | |
|---|---|
| Gefühl | fest, strukturiert |
| Im Alltag | robust, unempfindlich gegen Trittspuren |
| Passt zu | Treppen, Fluren im Obergeschoss, Büros, Kinderzimmern |
| Weniger geeignet | grobe Schlingen in Haushalten mit Katzen |

Link: **Mit Schlinge anfragen** → `{{root}}kontakt/?bodenart=Teppich&flor=schlinge`

Querschnitt: auf dem Rücken eine Reihe geschlossener, gleich hoher Bögen, dicht an dicht.

**Tafel „Velours“**

H3: Velours

Hier sind die Schlaufen aufgeschnitten, die kurzen Fasern stehen dicht und aufrecht. Das ergibt eine samtweiche, gleichmäßige Fläche mit feinem Schimmer. Je nach Lichteinfall zeigt Velours hellere und dunklere Stellen, weil die Fasern unterschiedlich liegen. Das ist eine Eigenschaft des Flors, kein Fehler. Auf viel begangenen Wegen bilden sich mit der Zeit Laufstraßen.

| | |
|---|---|
| Gefühl | samtig, weich |
| Im Alltag | zeigt Fußspuren und Licht und Schatten |
| Passt zu | Wohn- und Schlafzimmern |
| Weniger geeignet | Flure und Räume mit viel Betrieb |

Link: **Mit Velours anfragen** → `{{root}}kontakt/?bodenart=Teppich&flor=velours`

Querschnitt: kurze, senkrechte Fasern, sehr dicht, oben gerade abgeschnitten.

**Tafel „Frisé“**

H3: Frisé

Auch hier ist der Flor aufgeschnitten, das Garn aber stark gedreht, sodass es sich kräuselt. Die Oberfläche wirkt lebendig und matt. Trittspuren, Fusseln und kleine Flecken fallen weniger auf als bei Velours. Frisé ist weich und zugleich strapazierfähig und passt deshalb in viele Wohnräume.

| | |
|---|---|
| Gefühl | weich, lebendig |
| Im Alltag | verzeiht Trittspuren und Fusseln |
| Passt zu | Wohnzimmern, Kinderzimmern, Treppen |
| Weniger geeignet | wenn Sie eine ganz glatte, ruhige Fläche suchen |

Link: **Mit Frisé anfragen** → `{{root}}kontakt/?bodenart=Teppich&flor=frise`

Querschnitt: kurze Fasern mit kleinen Wellen und Locken, unterschiedlich geneigt.

**Tafel „Hochflor“**

H3: Hochflor

Lange, lockere Fasern von einigen Zentimetern, in die man beim Gehen einsinkt. Hochflor ist besonders weich und warm. Dafür braucht er mehr Pflege: Krümel und Staub sinken tief ein, und der Flor will regelmäßig gesaugt und aufgelockert werden. Auf Treppen, unter Bürostühlen und am Esstisch ist er fehl am Platz.

| | |
|---|---|
| Gefühl | sehr weich, kuschelig |
| Im Alltag | braucht mehr Pflege |
| Passt zu | Schlafzimmern und ruhigen Wohnbereichen |
| Weniger geeignet | Treppen, Flure, Büros, Essbereiche |

Link: **Mit Hochflor anfragen** → `{{root}}kontakt/?bodenart=Teppich&flor=hochflor`

Querschnitt: lange, weiche Fasern, die sich zur Seite neigen und übereinander fallen, gut doppelt so hoch wie bei Velours.

**Zeile unter der Bühne:**
Noch unsicher? Dann wählen wir den Flor gemeinsam am Muster aus. → **Angebot anfragen** (Textlink, `{{root}}kontakt/?bodenart=Teppich`)

**Text unter der Florwahl („Neben dem Flor zählt die Faser“, als fetter Satzanfang, keine eigene Überschrift):**
**Neben dem Flor zählt die Faser.** Polyamid gilt als besonders strapazierfähig und elastisch, Polyester als weich und farbintensiv, Polypropylen als unempfindlich gegen Flecken. Wolle ist ein Naturmaterial, elastisch und von Natur aus schmutzabweisend. Daneben gibt es Nadelvlies, einen sehr robusten Belag ohne Flor für Arbeits- und Hobbyräume. Was zu Ihrem Raum passt, besprechen wir am Muster.

---

### Für welche Räume Teppich passt

**H2:** Für welche Räume Teppich passt (30 Zeichen)

**Untersatz:**
Überall dort, wo es warm und ruhig sein soll und wenig Wasser und Straßenschmutz auf den Boden kommen.

**Text (Liste, `dl` oder kurze Absätze mit fettem Raumnamen):**

- **Schlafzimmer.** Hier spielt Teppich seine Stärken am meisten aus: warm beim Aufstehen, leise in der Nacht. Auch ein weicher Velours oder ein Hochflor ist hier gut aufgehoben.
- **Kinderzimmer.** Weich zum Spielen auf dem Boden und leiser für alle anderen im Haus. Ein kurzer, strapazierfähiger Flor lässt sich gut saugen, und Teppichfliesen können nach einem Malheur einzeln getauscht werden.
- **Wohnzimmer.** Teppich macht große Räume ruhiger und wohnlicher. Grenzt der Essplatz an die Küche, schließen wir dort mit einem Übergangsprofil an einen Hartboden an, der Krümel und Spritzer besser verträgt.
- **Treppe.** Leise, griffig und weich unter den Füßen, gerade nachts und mit Kindern. Mehr dazu [weiter unten](#treppe).
- **Büro und Besprechungsraum.** Teppich dämpft Schritte, Stimmen und Telefonate. Für Arbeitsräume gibt es Teppich in Nutzungsklassen für gewerbliche Beanspruchung, und wo Bürostühle rollen, muss der Belag für Stuhlrollen geeignet sein.
- **Nicht in Bad, Küche und Hauseingang.** Wasser, Fett und Straßenschmutz setzen sich im Flor fest. Dort raten wir Ihnen zu [Vinyl](leistungen/vinyl/), das nach Holz oder Stein aussieht und Nässe verträgt.

**Hinweis-Zeile (unter der Liste):**
Sie haben eine Fußbodenheizung? Teppich ist möglich, wenn er dafür geeignet ist. Mehr dazu in den [Fragen unten](#faq).

*(Kein Bild. Typografische Liste; am Desktop zweispaltig, die Ausnahme „Nicht in Bad, Küche und Hauseingang“ als letzte Zeile über die ganze Breite.)*

---

### Teppich auf der Treppe

`id="treppe"`

**H2:** Teppich auf der Treppe (22 Zeichen)

**Untersatz:**
Auf der Treppe wird Teppich Stufe für Stufe angepasst, und an der Kante zeigt sich, wie sorgfältig gearbeitet wurde.

**Text:**
Jede Stufe bekommt ihr eigenes Stück, für die Trittstufe und, wenn Sie möchten, auch für die Setzstufe. Wir schneiden die Stücke genau zu und verkleben sie vollflächig, damit nichts wellt oder verrutscht. Bei gewendelten Treppen ist jede Stufe anders geformt und wird einzeln angepasst.

**H3:** Zwei Lösungen für die Kante (27 Zeichen)

- **Umgeschlagen.** Der Teppich läuft über die Vorderkante der Stufe und wird darunter befestigt. Das wirkt weich und wie aus einem Guss.
- **Mit Kantenprofil.** Ein Profil schützt die Vorderkante, an der Teppich am stärksten beansprucht wird, und macht die Stufe gut sichtbar. Das ist praktisch auf Treppen, die viel benutzt werden.

**Text danach:**
Auf Stufen gehört ein dichter, kurzer Flor, zum Beispiel Schlinge oder Frisé. Hochflor gibt unter dem Fuß zu sehr nach und ist auf der Treppe nicht sicher. Ob Ihre Treppe vorher vorbereitet werden muss, etwa weil alte Stufen uneben oder lose sind, sehen wir beim Termin vor Ort.

**Link:** Mehr zum Belegen von Treppen → `{{root}}leistungen/treppen/`

**Zeichnung (Seitenansicht, `role="img"`):** zwei kleine Profile nebeneinander, je drei Stufen. Links läuft die Teppichschicht (Tinte) ohne Unterbrechung um die Vorderkante, rechts endet sie an einem kleinen Kantenprofil in Graphit. Die Stufe selbst als flache Fläche in `--bg-3`.
- `aria-label`: Zwei Treppenstufen in der Seitenansicht. Links ist der Teppich um die Vorderkante geschlagen, rechts schließt er an einem Kantenprofil ab.
- Unterschriften unter den Profilen: Umgeschlagen · Mit Kantenprofil (als zwei getrennte `figcaption`, nicht als Zeile mit Mittelpunkt)

*(Kein Projektfoto: Alle Treppenfotos aus den Projekten zeigen Holzstufen und würden hier Teppich vortäuschen. Liefert der Kunde ein Foto einer mit Teppich belegten Treppe, ersetzt es die Zeichnung.)*

---

### Was unter den Teppich gehört

**H2:** Was unter den Teppich gehört (28 Zeichen)

**Untersatz:**
Teppich verzeiht kleine Unebenheiten eher als ein dünner Hartboden, aber Grate, Kleberreste und lose Stellen zeichnen sich mit der Zeit doch ab.

**Text:**
Vor allem kurzer Flor und Streiflicht vom Fenster machen jede Kante darunter sichtbar. Und ein Kleber hält nur auf einem Untergrund, der tragfähig, sauber und trocken ist. Deshalb prüfen wir vor jeder Verlegung Ebenheit, Festigkeit und Feuchte. Was nicht passt, machen wir passend:

- Alte Beläge entfernen, samt Kleberresten
- Schleifen und fräsen, bis der Estrich tragfähig und sauber ist
- Grundieren, damit Spachtelmasse und Kleber sicher halten
- Spachteln und nivellieren, bis die Fläche eben ist

Wo Rücken und Nutzung es erlauben, ist eine lösbare Fixierung statt eines festen Klebers eine Überlegung wert: Beim nächsten Bodenwechsel lässt sich der Teppich dann leichter und mit weniger Rückständen entfernen.

**H3:** Wenn der alte Teppich raus soll (31 Zeichen)

Oft ist Teppich nicht der neue, sondern der alte Boden. Wir nehmen ihn heraus, entfernen Kleberreste und alte Unterlagen und bereiten den Estrich so vor, dass der nächste Boden gut darauf liegt, ob neuer Teppich, [Parkett](leistungen/parkett/), [Vinyl](leistungen/vinyl/) oder [Laminat](leistungen/laminat/). Einen neuen Boden einfach auf den alten Teppich zu legen, ist keine gute Idee: Er federt, liegt nicht fest und hält nicht lange.

**Link:** Mehr zur Untergrundvorbereitung → `{{root}}leistungen/untergrund/`

**Bild:** `untergrund` · `pos="50% 62%"`
- Alt: Vorbereiteter Estrich nach dem Schleifen und Spachteln, glatt und sauber, bereit für einen neuen Bodenbelag
- Bildunterschrift: Vorher: geschliffener und gespachtelter Estrich

(Bildunterschrift bewusst ohne Angabe, welcher Boden danach verlegt wurde.)

---

### Teppich muss man fühlen (Musterberatung)

**H2:** Teppich muss man fühlen (23 Zeichen)

**Untersatz:**
Wie weich ein Flor ist und wie seine Farbe in Ihrem Licht wirkt, zeigt Ihnen erst ein Muster in der Hand.

**Text:**
Zur Beratung bringen wir Muster mit, passend zu dem, was Sie uns vorab über Raum und Nutzung erzählt haben. **[bestätigen, siehe Punkt 8]** So sehen Sie Farbe und Flor dort, wo der Teppich später liegt: im Tageslicht am Fenster und abends unter Ihren Lampen. Sie fühlen den Flor mit der Hand und mit dem nackten Fuß und sehen das Muster neben Ihren Möbeln, Türen und Wänden.

Ein Hinweis vorab: Auf der ganzen Fläche wirkt eine Farbe meist kräftiger als auf dem kleinen Muster. Wer zwischen zwei Tönen schwankt, liegt mit dem ruhigeren oft richtig.

*Ersatztext, falls keine Muster mitgebracht werden:* Muster sehen Sie bei der Beratung, bevor Sie sich entscheiden. Wo und wie, sprechen wir bei Ihrer Anfrage ab. So prüfen Sie Farbe und Flor im Tageslicht und mit der Hand, statt nach einem Foto zu wählen.

**H3:** Das hilft uns beim Termin (25 Zeichen)

- Fotos von den Räumen und, wenn es um sie geht, von der Treppe
- die ungefähre Fläche in m² oder die Raummaße
- ob eine Fußbodenheizung liegt
- was jetzt auf dem Boden liegt
- ob Haustiere im Haus leben und ob Bürostühle auf dem Teppich rollen werden
- ob Sie schon einen Flor oder eine Farbe im Kopf haben

**Textlink:** **Fotos per WhatsApp schicken** → `https://wa.me/4915901717249`

**Bild:** `team-ruecken` · klein, höchstens 400 px breit (Original 539 × 670 px)
- Alt: Zwei Mitarbeiter von hinten, auf ihren Pullovern das Logo von Handwerker Blesius
- Bildunterschrift: Unser Team

---

### Vom Muster bis zur Übergabe

**H2:** Vom Muster bis zur Übergabe (27 Zeichen)

**Untersatz:**
So läuft ein Teppichauftrag bei uns ab, und Sie wissen jederzeit, was als Nächstes kommt.

**Schritte (`ol`, Reihenfolge über die Position, keine „01“-Nummern):**

1. **Anfrage.** Rufen Sie an, schreiben Sie per WhatsApp oder nutzen Sie das Formular. Fotos vom Raum, die ungefähre Fläche in m² und Ihre Florwahl von oben helfen uns bei der Vorbereitung.
2. **Beratung und Aufmaß.** Wir kommen zu Ihnen, messen auf, prüfen den Untergrund und zeigen Ihnen Muster. Bei einer Treppe nehmen wir jede Stufe einzeln auf.
3. **Angebot.** Sie erhalten ein individuelles Angebot für Material, Untergrund und Verlegung.
4. **Untergrund und Verlegung.** Je nach Herstellerangabe liegt der Teppich vorher eine Zeit lang im Raum, damit er sich an Temperatur und Raumklima gewöhnt. Dann bereiten wir den Untergrund vor und verlegen in einheitlicher Florrichtung, mit sorgfältig gesetzten Nähten, Sockelleisten und Übergangsprofilen. Wann schwere Möbel wieder hineindürfen, sagen wir Ihnen.
5. **Übergabe.** Wir räumen auf, gehen den fertigen Boden mit Ihnen durch und erklären Ihnen die Pflege.

**CTA:** Angebot anfragen → `{{root}}kontakt/?bodenart=Teppich`

**Bild:** `handwerker` · `pos="50% 40%"`
- Alt: Handwerker aus dem Team von Handwerker Blesius im Firmenpullover, kniend mit einer Säge auf einem neu verlegten Boden
- Bildunterschrift: Aus unserem Team

(Nie als Marcel Blesius beschriften. Der Boden im Bild ist ein Hartboden; die Bildunterschrift behauptet deshalb keinen Teppich.)

---

### So bleibt Teppich schön

**H2:** So bleibt Teppich schön (23 Zeichen)

**Untersatz:**
Ein paar Gewohnheiten genügen, damit Ihr Teppichboden lange schön bleibt.

**Liste (`ul`, fetter Anfang):**

- **Regelmäßig saugen.** In viel genutzten Räumen am besten mehrmals in der Woche. Sand und Staub, die tief im Flor sitzen, scheuern die Fasern auf Dauer ab.
- **Die passende Düse.** Kurzer, geschnittener Flor verträgt meist eine Bürstwalze. Schlingen und langer Flor werden mit einer glatten Düse geschont. Im Zweifel gilt die Pflegeanleitung des Herstellers.
- **Flecken sofort tupfen.** Verschüttetes mit einem hellen, saugfähigen Tuch aufnehmen, von außen nach innen und ohne zu reiben. Dann mit wenig lauwarmem Wasser nacharbeiten.
- **Wenig Wasser.** Teppich wird nie nass gewischt. Zu viel Feuchtigkeit kann Rücken und Kleber schaden und Ränder hinterlassen.
- **Schutz an den richtigen Stellen.** Eine Fußmatte vor der Tür hält Schmutz zurück, Untersetzer unter schweren Möbeln verteilen den Druck, und Bürostühle brauchen Rollen, die für Teppich geeignet sind.
- **Ab und zu gründlich.** Je nach Nutzung braucht Teppich gelegentlich eine Grundreinigung, zum Beispiel per Sprühextraktion. Wie oft und womit, steht in der Pflegeanleitung des Herstellers.

**Abschlusssatz:**
Bei der Übergabe erklären wir Ihnen, was Ihr Teppich braucht.

*(Kein Bild. Die Liste trägt den Abschnitt; auf dem Desktop zweispaltig.)*

---

### Platz für Teppich-Projektfotos (erst nach Lieferung)

Solange es keine Fotos gibt, entfällt dieser Abschnitt ganz. Kein Platzhalter auf der Seite, keine Ersatzbilder.

Mit Fotos: **H2** Teppich aus unseren Projekten (29 Zeichen) · Untersatz: Alle Fotos auf dieser Seite zeigen Böden, die unser Team verlegt hat. · Galerie wie auf der Parkett-Seite (Bildunterschrift = Raum und Florart, ohne Ort, Jahr oder m²) · Link „Alle Projekte ansehen“ → `{{root}}projekte/`. Platz: zwischen „So bleibt Teppich schön“ und den FAQ.

---

### Häufige Fragen zu Teppich

**H2:** Häufige Fragen zu Teppich (25 Zeichen) · `id="faq"`

**Untersatz:**
Kurze, ehrliche Antworten, alles Weitere besprechen wir gern am Telefon oder vor Ort.

Antworten siehe Punkt 4 (`.faq`, `details`/`summary`, die erste Frage offen).

---

### Was zum Teppich dazugehört

**H2:** Was zum Teppich dazugehört (26 Zeichen)

**Untersatz:**
Ein Teppichboden ist erst fertig, wenn Kanten, Übergänge und die Treppe dazu passen.

Drei Verweise (als Liste mit Bild nur beim ersten, keine Reihe gleicher Karten):

- **Treppen** → `{{root}}leistungen/treppen/`
  Stufen passend zum Boden belegen, gerade oder gewendelt.
  Bild: `treppe-wendel` · `pos="50% 60%"` · Alt: Gewendelte Treppe mit Trittstufen aus Holz · Bildunterschrift: Gewendelte Treppe aus unseren Projekten, hier mit Holzstufen
- **Untergrund** → `{{root}}leistungen/untergrund/`
  Prüfen, alte Beläge entfernen, schleifen, grundieren, spachteln.
- **Sockelleisten und Übergänge** → `{{root}}leistungen/#leisten`
  Sockelleisten, Übergangsprofile zu Fliese, Parkett oder Vinyl und saubere Anschlüsse an Türen und Zargen.

**Zeile darunter (Fließtext mit Links):**
Doch lieber ein Hartboden? [Parkett](leistungen/parkett/) für echtes Holz unter den Füßen, [Vinyl](leistungen/vinyl/) für Küche und Bad, [Laminat](leistungen/laminat/) für Räume mit viel Betrieb. Weitere Böden sehen Sie in [unseren Projekten](projekte/).

---

### Abschluss (CTA-Band, Teppich-Fassung)

**H2:** Planen Sie Ihren Teppichboden (29 Zeichen)

**Untersatz:**
Ein paar Fotos, die ungefähre Fläche und Ihre Florwahl genügen für den Anfang.

**Text:**
Wir melden uns und vereinbaren einen Termin für Beratung und Aufmaß.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Teppich`
- Sekundär: **0159 0171 7249** → `tel:+4915901717249`
- Textlink: **Fotos per WhatsApp schicken** → `https://wa.me/4915901717249`

**Zwei kleine Zeilen:**
Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr
Neuenhöhe 17, 42929 Wermelskirchen

Umsetzung: wie auf der Parkett- und der Vinyl-Seite. Das Partial `src/partials/cta-band.html` ohne Eyebrow und ohne `<em>`, Überschrift und Untersatz per Parameter oder als Teppich-Fassung direkt in der Seite.

---

## 4. FAQ

Fünf Fragen (die SPEC verlangt 3–5, die Aufgabe 4–6). Der Text der Antworten ist wortgleich im JSON-LD (`faq-teppich.json`) enthalten.

**Kann Teppich auf eine Fußbodenheizung?**
Ja, wenn der Teppich dafür geeignet ist. Weil Teppich etwas dämmt, kommt es auf einen niedrigen Wärmedurchlasswiderstand an. Ob ein Teppich passt, steht in den Produktangaben des Herstellers. Dünner, dichter Teppich lässt die Wärme besser durch als dicker Hochflor, und vollflächig verklebt gibt er sie besser an den Raum ab als lose verlegt. Eine zusätzliche Unterlage muss ebenfalls für Fußbodenheizung geeignet sein. Der Heizestrich muss vorher nach Protokoll aufgeheizt und trocken sein. Das klären wir vor der Verlegung.

**Wird Teppich verklebt oder lose verlegt?**
Bahnenware wird in der Regel vollflächig verklebt oder mit einer lösbaren Fixierung verlegt. Verklebt liegt sie fest, wellt nicht und verträgt Bürostühle und Fußbodenheizung gut. Eine Fixierung hält den Teppich ebenfalls sicher, lässt sich beim nächsten Bodenwechsel aber leichter entfernen. Teppichfliesen werden lose aufgelegt und fixiert, damit sie sich einzeln tauschen lassen. In kleinen Räumen genügt manchmal ein Verlegeband am Rand, der Teppich wirft dann aber leichter Falten. Was zu Ihrem Raum passt, entscheiden wir beim Aufmaß.

**Ist Teppich für Allergiker geeignet?**
Pauschal lässt sich das nicht beantworten. Teppich hält Staub im Flor fest, statt ihn beim Gehen aufzuwirbeln, wie es auf glatten Böden geschieht. Damit das ein Vorteil bleibt, muss er regelmäßig und gründlich gesaugt werden, am besten mit einem Staubsauger mit Feinstaubfilter. Kurzer, dichter Flor lässt sich gründlicher reinigen als langer. Wer eine Hausstauballergie hat, bespricht die Wahl des Bodens am besten auch mit der Ärztin oder dem Arzt.

**Kann der alte Teppich liegen bleiben?**
In der Regel nicht. Auf altem Teppich liegt kein neuer Boden fest: Er federt, kann Wellen werfen, und Kleber findet keinen Halt. Außerdem bleiben Staub und Gerüche im alten Belag eingeschlossen. Wir nehmen den alten Teppich heraus, entfernen Kleberreste und bereiten den Untergrund für den neuen Boden vor, ob Teppich, Parkett, Vinyl oder Laminat.

**Was kostet Teppichboden pro Quadratmeter?**
Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt von Faser, Flor und Qualität des Teppichs ab, davon, ob Bahnenware oder Fliesen verlegt werden, und davon, wie viel am Untergrund zu tun ist. Bei Treppen kommt es auf Zahl und Form der Stufen an. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten.

*Reserve-Frage (nur wenn eine sechste gewünscht ist, dann auch ins JSON-LD übernehmen):*

**Riecht ein neuer Teppichboden?**
In den ersten Tagen kann ein neuer Teppich etwas riechen, auch durch den Kleber. Gründliches Lüften hilft, und der Geruch lässt in der Regel bald nach. Wer empfindlich ist, achtet bei der Auswahl auf emissionsarme Teppiche und Kleber. Dazu beraten wir Sie gern.

---

## 5. Interne Links

| Ziel | Linktext | Stelle |
|---|---|---|
| `{{root}}` | Start | Breadcrumb |
| `{{root}}leistungen/` | Leistungen | Breadcrumb |
| `{{root}}leistungen/#leisten` | Sockelleisten und Übergänge | „Was zum Teppich dazugehört“ |
| `{{root}}leistungen/parkett/` | Parkett | „Wenn der alte Teppich raus soll“, „Was zum Teppich dazugehört“ |
| `{{root}}leistungen/vinyl/` | Vinyl | Räume (Bad, Küche, Hauseingang), „Wenn der alte Teppich raus soll“, „Was zum Teppich dazugehört“ |
| `{{root}}leistungen/laminat/` | Laminat | „Wenn der alte Teppich raus soll“, „Was zum Teppich dazugehört“ |
| `{{root}}leistungen/treppen/` | Mehr zum Belegen von Treppen / Treppen | „Teppich auf der Treppe“, „Was zum Teppich dazugehört“ (mit Bild) |
| `{{root}}leistungen/untergrund/` | Mehr zur Untergrundvorbereitung / Untergrund | „Was unter den Teppich gehört“, „Was zum Teppich dazugehört“ |
| `{{root}}projekte/` | unseren Projekten | Zeile unter „Was zum Teppich dazugehört“; später „Alle Projekte ansehen“ in der Galerie |
| `{{root}}kontakt/?bodenart=Teppich` | Angebot anfragen | Kopf, Florwahl („Noch unsicher?“), Ablauf, Abschluss |
| `{{root}}kontakt/?bodenart=Teppich&form=bahn` / `…&form=fliese` | Mit Bahnenware anfragen / Mit Teppichfliesen anfragen | Tafeln „Bahnenware“ und „Teppichfliesen“ |
| `{{root}}kontakt/?bodenart=Teppich&flor=…` | Mit Schlinge / Velours / Frisé / Hochflor anfragen | Florwahl |
| `#treppe` | weiter unten | Räume (Treppe) |
| `#faq` | Fragen unten | Räume (Fußbodenheizung) |
| `#flor` | – | Sprungziel, zum Beispiel aus der Leistungsübersicht oder dem Wegweiser |
| `tel:+4915901717249` | 0159 0171 7249 | Kopf, Abschluss |
| `https://wa.me/4915901717249` | Fotos per WhatsApp schicken | „Teppich muss man fühlen“, Abschluss |

Rückverweise auf diese Seite von: Startseite (Leistungsliste), `leistungen/` (Bodenbeläge, Wegweiser-Ergebnisse „Leise und warm“), `leistungen/parkett/`, `leistungen/vinyl/` und `leistungen/laminat/` (jeweils „Doch lieber ein anderer Boden?“), `leistungen/treppen/` (Treppe mit Teppich), `leistungen/untergrund/` („alten Teppich entfernen“).

---

## 6. JSON-LD

Drei Dateien in `src/jsonld/`. Der Betrieb selbst (`HomeAndConstructionBusiness`, `@id` `https://handwerker-blesius.de/#betrieb`) steht global im Layout und wird hier nur referenziert. Kein `aggregateRating`, kein `offers` mit Preis. Kein `image` im Service, weil es kein Foto eines Teppichbodens gibt; sobald eins vorliegt, ergänzen.

**`service-teppich.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://handwerker-blesius.de/leistungen/teppich/#leistung",
  "name": "Teppichboden verlegen",
  "serviceType": "Teppichverlegung",
  "description": "Beratung, Verkauf und Verlegung von Teppichboden als Bahnenware oder Teppichfliesen für Wohnräume, Treppen und Büros, mit Untergrundvorbereitung, Entfernung alter Beläge, Sockelleisten und Übergangsprofilen.",
  "url": "https://handwerker-blesius.de/leistungen/teppich/",
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
  "audience": [
    { "@type": "Audience", "audienceType": "Privatkunden" },
    { "@type": "Audience", "audienceType": "Gewerbekunden" }
  ]
}
```

**`faq-teppich.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://handwerker-blesius.de/leistungen/teppich/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kann Teppich auf eine Fußbodenheizung?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja, wenn der Teppich dafür geeignet ist. Weil Teppich etwas dämmt, kommt es auf einen niedrigen Wärmedurchlasswiderstand an. Ob ein Teppich passt, steht in den Produktangaben des Herstellers. Dünner, dichter Teppich lässt die Wärme besser durch als dicker Hochflor, und vollflächig verklebt gibt er sie besser an den Raum ab als lose verlegt. Eine zusätzliche Unterlage muss ebenfalls für Fußbodenheizung geeignet sein. Der Heizestrich muss vorher nach Protokoll aufgeheizt und trocken sein. Das klären wir vor der Verlegung." }
    },
    {
      "@type": "Question",
      "name": "Wird Teppich verklebt oder lose verlegt?",
      "acceptedAnswer": { "@type": "Answer", "text": "Bahnenware wird in der Regel vollflächig verklebt oder mit einer lösbaren Fixierung verlegt. Verklebt liegt sie fest, wellt nicht und verträgt Bürostühle und Fußbodenheizung gut. Eine Fixierung hält den Teppich ebenfalls sicher, lässt sich beim nächsten Bodenwechsel aber leichter entfernen. Teppichfliesen werden lose aufgelegt und fixiert, damit sie sich einzeln tauschen lassen. In kleinen Räumen genügt manchmal ein Verlegeband am Rand, der Teppich wirft dann aber leichter Falten. Was zu Ihrem Raum passt, entscheiden wir beim Aufmaß." }
    },
    {
      "@type": "Question",
      "name": "Ist Teppich für Allergiker geeignet?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pauschal lässt sich das nicht beantworten. Teppich hält Staub im Flor fest, statt ihn beim Gehen aufzuwirbeln, wie es auf glatten Böden geschieht. Damit das ein Vorteil bleibt, muss er regelmäßig und gründlich gesaugt werden, am besten mit einem Staubsauger mit Feinstaubfilter. Kurzer, dichter Flor lässt sich gründlicher reinigen als langer. Wer eine Hausstauballergie hat, bespricht die Wahl des Bodens am besten auch mit der Ärztin oder dem Arzt." }
    },
    {
      "@type": "Question",
      "name": "Kann der alte Teppich liegen bleiben?",
      "acceptedAnswer": { "@type": "Answer", "text": "In der Regel nicht. Auf altem Teppich liegt kein neuer Boden fest: Er federt, kann Wellen werfen, und Kleber findet keinen Halt. Außerdem bleiben Staub und Gerüche im alten Belag eingeschlossen. Wir nehmen den alten Teppich heraus, entfernen Kleberreste und bereiten den Untergrund für den neuen Boden vor, ob Teppich, Parkett, Vinyl oder Laminat." }
    },
    {
      "@type": "Question",
      "name": "Was kostet Teppichboden pro Quadratmeter?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt von Faser, Flor und Qualität des Teppichs ab, davon, ob Bahnenware oder Fliesen verlegt werden, und davon, wie viel am Untergrund zu tun ist. Bei Treppen kommt es auf Zahl und Form der Stufen an. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten." }
    }
  ]
}
```

**`breadcrumb-teppich.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://handwerker-blesius.de/" },
    { "@type": "ListItem", "position": 2, "name": "Leistungen", "item": "https://handwerker-blesius.de/leistungen/" },
    { "@type": "ListItem", "position": 3, "name": "Teppich", "item": "https://handwerker-blesius.de/leistungen/teppich/" }
  ]
}
```

---

## 7. Live-Ding: Florwahl (Schlinge, Velours, Frisé, Hochflor)

**Kundennutzen:** Die meisten Kunden wissen, dass sie Teppich möchten, kennen aber die Namen der Florarten nicht und wissen nicht, was sie für Treppe, Katze oder Bürostuhl bedeuten. Ein Foto könnte das auch nicht zeigen, denn der Unterschied liegt in der Faser. Die Florwahl zeigt jede Florart im Querschnitt, sagt in vier Zeilen, wie sie sich anfühlt, was sie aushält und wohin sie passt, und gibt die Wahl an das Anfrageformular weiter. So weiß Blesius schon vor dem Termin, welche Muster er mitbringen soll, und der Kunde muss nichts erklären oder abtippen. Die Florwahl empfiehlt kein Produkt und nennt keinen Preis.

**Platz:** im Abschnitt „Welcher Flor zu Ihnen passt“, als Beweis der Behauptung. Kein eigener Abschnitt.

**Aufbau:**
- Vier Schalter als Segment (`role="radiogroup"` mit `aria-label="Florart"`, je `role="radio"` und `aria-checked`, Pfeiltasten wechseln) oder Tabs (`role="tablist"`). Beschriftung: **Schlinge**, **Velours**, **Frisé**, **Hochflor**. Start: Schlinge. Segmente mindestens 44 px hoch, am Handy in einer Zeile, sonst zwei mal zwei.
- Darunter eine Bühne: links der Querschnitt als Inline-SVG (Rücken als flaches Band in Graphit `#525252`, Fasern in Tinte, Striche ab 3 px mit runden Enden, `aria-hidden="true"`, weil der Text die Information trägt), rechts H3, Text und die kleine Tabelle (Gefühl, Im Alltag, Passt zu, Weniger geeignet) aus Abschnitt 3.
- Querschnitte: Schlinge = geschlossene, gleich hohe Bögen · Velours = kurze, dichte, gerade abgeschnittene Fasern · Frisé = kurze, gekräuselte Fasern · Hochflor = lange, zur Seite fallende Fasern, gut doppelt so hoch. Alle vier auf derselben Grundlinie und im selben Maßstab, damit der Höhenunterschied ehrlich ist.
- Unter der Bühne der Anfrage-Link der aktiven Tafel: **Mit Schlinge anfragen** bzw. **Mit Velours anfragen**, **Mit Frisé anfragen**, **Mit Hochflor anfragen**.
- Kleine Zeile darunter: Ihre Wahl landet nur im Anfrageformular. Es wird nichts gespeichert.

**Bewegung:** Beim Wechsel sinken die Fasern der alten Florart in den Rücken, die neuen wachsen heraus (`scaleY` von der Unterkante, Staffel 15–20 ms von links nach rechts, 0,5 s, expo-out). Text und Tabelle blenden mit 80 ms Versatz ein. Bei `prefers-reduced-motion`: sofortiger Wechsel.

**Übergabe ans Formular:** Der Link öffnet `kontakt/?bodenart=Teppich&flor=schlinge` (Werte: `schlinge`, `velours`, `frise`, `hochflor`). Aus dem Abschnitt „Bahnenware oder Teppichfliesen“ kommt `form=bahn` oder `form=fliese` dazu. `site.js` liest die Parameter auf der Kontaktseite: Bodenart „Teppich“ wird ausgewählt, ins Nachrichtenfeld kommt (nur wenn es leer ist) zum Beispiel „Interesse: Teppich, Flor Schlinge.“ oder „Interesse: Teppich, Teppichfliesen.“. Nur die Werte aus dieser Liste werden übernommen (Whitelist), alles andere wird ignoriert. Der Kunde kann alles ändern. Keine Cookies, kein Tracking, keine Speicherung (siehe `docs/HOSTING.md`).

| Parameter | Wert | Text im Nachrichtenfeld |
|---|---|---|
| `flor` | `schlinge` | Flor Schlinge |
| `flor` | `velours` | Flor Velours |
| `flor` | `frise` | Flor Frisé |
| `flor` | `hochflor` | Flor Hochflor |
| `form` | `bahn` | Bahnenware |
| `form` | `fliese` | Teppichfliesen |

**Ohne JavaScript:** Alle vier Tafeln stehen vollständig untereinander, jede mit Querschnitt, Text, Tabelle und Anfrage-Link. Die Schalter sind ausgeblendet. Die Links funktionieren trotzdem, die Parameter werden dann einfach ignoriert.

**Erweiterung, nur mit echtem Material:** Liefert der Kunde Nahaufnahmen seiner Muster (eigene Fotos, kein Stock, keine KI), kann jede Tafel neben dem Querschnitt ein kleines Foto des Flors zeigen.

---

## 8. Vom Kunden zu bestätigen

1. **Muster zum Termin.** Bringen Sie Teppichmuster zur Beratung mit, oder sieht der Kunde sie an einem anderen Ort? Der Abschnitt „Teppich muss man fühlen“ und Schritt 2 im Ablauf sagen bisher „Zur Beratung bringen wir Muster mit“ und „zeigen Ihnen Muster“. Wenn nicht: Ersatztext aus Abschnitt 3 nehmen und Schritt 2 anpassen.
2. **Formen und Verlegearten.** Verlegen Sie Bahnenware verklebt und mit lösbarer Fixierung? Auch lose mit Verlegeband? Verspannen Sie Teppich (auf Nagelleisten)? Verlegen Sie Teppichfliesen? Die Seite nennt bisher: verklebt, fixiert, lose mit Verlegeband (nur FAQ), Teppichfliesen. Verspannen ist bewusst nicht erwähnt.
3. **Sortiment.** Welche Florarten und Fasern verkaufen Sie? Die Florwahl zeigt Schlinge (mit Berber), Velours, Frisé und Hochflor, der Text nennt Polyamid, Polyester, Polypropylen, Wolle und Nadelvlies. Was fehlt, was bieten Sie nicht an?
4. **Treppen mit Teppich.** Belegen Sie Treppen mit Teppich? Mit umgeschlagener Kante, mit Kantenprofil oder beidem? Auch die Setzstufen? Auch gewendelte Treppen?
5. **Gewerbe.** Verlegen Sie Teppich und Teppichfliesen in Büros? Auch auf Doppel- oder Hohlböden? Der Text nennt beides.
6. **Fotos von Teppichböden.** Gibt es Fotos von Teppichböden oder Treppen mit Teppich, die Ihr Team verlegt hat, und dürfen sie veröffentlicht werden? Dann ersetzen sie die Zeichnung im Kopf und an der Treppe, und die Galerie „Teppich aus unseren Projekten“ wird freigeschaltet.
7. **Alten Teppich entfernen.** Gehört die Entsorgung des alten Teppichs dazu? Bisher steht nur „Wir nehmen ihn heraus, entfernen Kleberreste und alte Unterlagen“.
8. **Sockelleisten bei Teppich.** Bieten Sie textile Sockelleisten (aus dem Teppich gekettelt) an, oder nur Holz- bzw. weiße Leisten? Bisher steht nur „Sockelleisten“.
9. **Pflege-Erklärung bei der Übergabe.** Dürfen wir „erklären Ihnen die Pflege“ und „Bei der Übergabe erklären wir Ihnen, was Ihr Teppich braucht“ zusagen?
10. **Fachaussagen gegenlesen.** Alle Aussagen sind allgemein gehalten. Bitte prüfen, ob sie zu den Produkten passen, die Sie verkaufen, vor allem: Rollenbreiten meist vier oder fünf Meter, Teppichfliesen häufig 50 × 50 cm, Akklimatisieren je nach Herstellerangabe, Bürstwalze nur bei kurzem, geschnittenem Flor, Velours zeigt Licht und Schatten, Farbe wirkt auf der Fläche kräftiger als auf dem Muster.
11. **Allergiker-Frage.** Sind Sie einverstanden, dass die FAQ diese Frage beantwortet? Die Antwort bleibt bewusst vorsichtig und verweist auf den Arzt.
12. **Gewendelte Treppe (`treppe-wendel`).** Darf das Foto im Verweis auf die Treppen-Seite stehen, beschriftet als „Gewendelte Treppe aus unseren Projekten, hier mit Holzstufen“? Hat Ihr Team diese Treppe belegt?
13. **Einverständnis der Bauherren:** Dürfen `untergrund` und `treppe-wendel` veröffentlicht werden? Ist der Mitarbeiter auf `handwerker` und sind die beiden auf `team-ruecken` mit der Veröffentlichung einverstanden?

**Für die Umsetzung (nicht Kunde):**
- Formular-Prefill in `static/assets/js/site.js` um `flor` und `form` erweitern (Whitelist und Texte aus Punkt 7). `muster` (Parkett) und `raum`, `optik`, `heizung`, `boden` (Vinyl) bleiben.
- Im CTA-Band-Partial Eyebrow und `<em>` entfernen (House rules), wie auf der Parkett- und der Vinyl-Seite.
- Vier Zeichnungen als Inline-SVG: Schnitt im Kopf, Draufsicht Bahn und Fliese, vier Flor-Querschnitte, Treppenkante. Flache Flächen, keine Verläufe, keine Schatten, keine Linienraster, keine Nummern, Beschriftung in der Textschrift. Die Zeichnungen dürfen nicht wie Fotos oder Produktabbildungen wirken.
- Sprungziele `id="flor"`, `id="treppe"`, `id="faq"` setzen.
- Leistungsübersicht: Der Teppich-Eintrag in `docs/copy/leistungen.md` kann auf `{{root}}leistungen/teppich/#flor` verlinken, sobald die Seite steht.
- Wegweiser in `docs/copy/leistungen.md`: Das Ergebnis „Treppe · Leise und warm“ verlinkt auf `treppen`. Zusätzlich passt der Link `{{root}}leistungen/teppich/#treppe`.
