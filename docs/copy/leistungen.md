# Copy-Deck: Leistungen – Übersicht

Stand: 24.10.2026 · Seite `src/pages/leistungen.html` · Ausgabe `leistungen/`
Quellen: BRIEF.md (Fakten, Bilder), SPEC.md (Struktur, SEO), REDESIGN-TASTE.md (Inventar), HOSTING.md (Technik), `src/images.json`.
Schreibregeln: taste-skill `references/copy.md` + House rules (keine Eyebrows, keine 01/02-Nummern, kein betontes Akzentwort, keine Mono-Labels).

Alle Texte sind veröffentlichungsreif. Stellen, die der Kunde bestätigen muss, sind im Text mit **[bestätigen]** markiert und am Ende gesammelt.

---

## 1. Seitenkopf

```
<!--
title: Bodenbeläge verlegen in Wermelskirchen | Handwerker Blesius
description: Parkett, Vinyl, Laminat, Teppich und Treppen: Beratung, Verkauf und Verlegung aus einer Hand, mit Untergrundvorbereitung. Jetzt unverbindlich anfragen.
path: leistungen/
nav: leistungen
css: leistungen
jsonld: leistungen
-->
```

- `title`: 59 Zeichen. Suchbegriff vorn („Bodenbeläge verlegen“), Ort, Marke.
- `description`: 151 Zeichen. Nutzen (alles aus einer Hand, inkl. Untergrund) + Aufforderung.
- `css: leistungen` nur, falls der Wegweiser eigene Stile braucht. Sonst weglassen.
- `jsonld: leistungen` → `src/jsonld/leistungen.json` (Inhalt unter Punkt 6).

---

## 2. Argument

Vorab, in je einer Zeile:

- **Wer liest:** Eigentümer, Mieter und Betriebe in Wermelskirchen und Umgebung, die einen neuen Boden planen. Sie wissen meist, *dass* sie einen wollen, aber noch nicht genau, *welchen*.
- **Was ist das, unter Freunden gesagt:** Ein Bodenlegerbetrieb aus Wermelskirchen, der berät, das Material liefert und selbst verlegt. Untergrund, Treppen und Leisten gehören dazu.
- **Was soll man nach einem Bildschirm glauben:** Hier bekomme ich jeden gängigen Boden, und alles darunter und drumherum wird mit erledigt.
- **Was macht das glaubhaft:** echte Fotos aus Projekten, ein konkreter Leistungsumfang, ein ehrlicher Vergleich der Beläge und der Wegweiser.
- **Was tut man danach:** Angebot anfragen (Fotos + ungefähre Fläche) oder anrufen.

| Abschnitt | Behauptung | Beweis |
|---|---|---|
| Seitenkopf (Hero) | Blesius verlegt alle gängigen Bodenbeläge in Wermelskirchen und Umgebung, mit allem, was dazugehört. | Echtes Foto (Boden + Podeststufe), vollständige Aufzählung der Leistungen im Untersatz, Region. |
| Aus einer Hand | Ein Betrieb berät, liefert und verlegt. Sie haben einen Ansprechpartner. | Konkreter Umfang jedes Teils; Foto einer laufenden Verlegung durch das eigene Team. |
| Bodenbeläge | Jeder Belag hat Räume, in denen er stark ist, und Räume, in die er nicht gehört. Wir sagen beides. | Vier Beläge mit Stärken, Grenzen und passenden Räumen; Vergleichstabelle; Fotos aus Projekten. |
| Wegweiser | Sie können in zehn Sekunden selbst sehen, welcher Boden zu Ihrem Raum passt. | Live-Ding: Raum + Wunsch → begründete Ersteinschätzung mit Link und vorausgefüllter Anfrage. |
| Treppen | Treppen werden Stufe für Stufe angepasst und passen danach zum Boden. | Drei echte Treppenfotos (gerade, gewendelt, offen); Arbeitsweise konkret beschrieben. |
| Untergrund | Jede Verlegung beginnt beim Untergrund, und den bereiten wir selbst vor. | Foto eines vorbereiteten Estrichs; die Arbeitsschritte aus dem Leistungsumfang. |
| Leisten & Übergänge | Fertig ist ein Boden erst an der Kante: Leisten, Profile, Türen, Zargen sind Teil des Auftrags. | Flur-Foto mit Zargen und Leisten auf ganzer Länge; vier konkrete Detailbereiche. |
| Privat & Gewerbe | Wir verlegen für Haushalte und Betriebe und planen nach der Nutzung. | Konkrete Objektarten aus dem Leistungsumfang; Region; deutschlandweit bei größeren Projekten. |
| Ablauf | Fünf klare Schritte, ein Ansprechpartner. | Die Schritte mit dem, was in jedem passiert; Teamfoto. |
| Projekte | Die Fotos zeigen unsere Arbeit. | Vier Projektfotos, Link zur Projektseite. |
| Häufige Fragen | Wir beantworten die Fragen vor dem Auftrag offen, auch die nach dem Preis. | Sechs ehrliche, allgemein gültige Antworten. |
| Abschluss | Der erste Schritt ist klein. | Fotos + ungefähre Fläche genügen; Telefon, WhatsApp, Formular; Öffnungszeiten. |

---

## 3. Abschnitte

### 3.1 Seitenkopf (`.page-hero`)

**Brotkrumen:** Startseite › Leistungen

**H1:** Bodenbeläge in Wermelskirchen
*(29 Zeichen)*

**Untersatz (Lead):**
Parkett, Vinyl, Laminat und Teppich, dazu Treppen, Untergrund und Leisten: Wir beraten, liefern und verlegen selbst.

**Zusatzzeile (kleiner, unter dem Lead):**
Für Häuser, Wohnungen und Gewerbeflächen in Wermelskirchen, im Bergischen Land und in Köln.

**Aktionen:**
- Button (primär): **Angebot anfragen** → `{{root}}kontakt/`
- Textlink: **Welcher Boden passt?** → `#wegweiser`
- Telefon steht im Header (Desktop) und in der Mobilbar. Kein drittes Element im Hero.

**Bild:** `podest-led`
- Alt: „Wohnraum mit Eichenboden und Podeststufe, in der Stufe eine LED-Lichtleiste“
- Bildunterschrift: Wohnraum mit Podeststufe in Eiche
- Hinweis: `pos="50% 62%"` (Stufe im Bild halten). `loading="eager" fetchpriority="high"`.

---

### 3.2 Aus einer Hand (`id="aus-einer-hand"`)

**H2:** Vom Aufmaß bis zur Leiste
*(25 Zeichen)*

**Untersatz:**
Wir beraten, verkaufen den Belag und verlegen ihn selbst. So haben Sie für alles, was Ihren Boden betrifft, einen Ansprechpartner.

**H3: Beratung vor Ort**
Wir sehen uns den Raum an, in dem der neue Boden liegen soll: wie er genutzt wird, woran er grenzt, wo Türen und Treppen sind und worauf der Belag liegen wird. Daraus ergibt sich, welcher Boden passt und welche Vorarbeiten nötig sind. Optik und Farbton besprechen wir am selben Termin.

**H3: Material von uns**
Belag, Sockelleisten, Übergangsprofile und Verlegematerial bekommen Sie von uns, aufeinander abgestimmt. Sie müssen nichts selbst bestellen, abholen oder zusammensuchen.

**H3: Verlegung durch unser Team**
Unser Team **[bestätigen: nur eigenes Team]** bereitet den Untergrund vor, verlegt den Boden, setzt Leisten und Profile und schließt an Türen und Zargen an. Am Ende gehen wir den fertigen Boden gemeinsam mit Ihnen durch.

**Textlink:** So läuft ein Auftrag ab → `#ablauf`

**Bild:** `kamin-verlegung`
- Alt: „Eichendielen werden in einem Wohnraum mit Kamin verlegt, eine Diele liegt noch lose“
- Bildunterschrift: Mitten in der Verlegung: Eichendielen am Kamin
- Hinweis: Hochformat, neben dem Text (Split). `pos="50% 60%"`.

---

### 3.3 Bodenbeläge (`id="belaege"`)

**H2:** Jeder Belag hat seinen Raum
*(27 Zeichen)*

**Untersatz:**
Parkett, Vinyl, Laminat und Teppich unterscheiden sich in Gefühl, Pflege und Belastbarkeit. Wir sagen Ihnen offen, was wo passt und was nicht.

Darstellung: vier Zeilen im Wechsel Bild/Text (keine Reihe gleicher Karten). Jede Zeile verlinkt auf ihre Unterseite.

#### Parkett → `{{root}}leistungen/parkett/`

**H3:** Parkett
**Kurzsatz:** Echtes Holz, als Landhausdiele oder im Fischgrätmuster.

Wir verlegen Fertigparkett: eine Nutzschicht aus echtem Holz auf einem formstabilen Träger. Holz fühlt sich warm an, jede Diele hat ihr eigenes Bild, und je nach Stärke der Nutzschicht lässt sich die Oberfläche später abschleifen und neu ölen oder versiegeln. Holz arbeitet mit der Luftfeuchtigkeit und mag keine stehende Nässe. In Wohnräumen, Schlafzimmern und Fluren ist es deshalb am besten aufgehoben. In der Küche geht es, wenn Wasser zügig aufgewischt wird.

**Gut geeignet für:** Wohn- und Esszimmer, Schlafzimmer, Flur, Büro
**Link:** Mehr über Parkett

**Bild:** `wohnzimmer-eiche`
- Alt: „Heller Wohnraum mit Eichenboden und Deckenstrahlern“
- Bildunterschrift: Wohnraum mit Eichenboden **[bestätigen: Parkett?]**

#### Vinyl → `{{root}}leistungen/vinyl/`

**H3:** Vinyl
**Kurzsatz:** Klick oder Klebe, in Holz- oder Steinoptik, auch für Küche und Bad.

Vinyl ist elastisch, leise beim Gehen und an der Oberfläche unempfindlich gegen Wasser. Klick-Vinyl wird schwimmend verlegt und ist schnell begehbar. Klebe-Vinyl wird vollflächig verklebt, liegt besonders ruhig und eignet sich für Bäder und große Flächen. Weil Vinyl dünn ist, zeichnet sich jede Unebenheit darunter ab. Ein sauber gespachtelter Untergrund ist bei Vinyl deshalb Pflicht.

**Gut geeignet für:** Küche, Bad, Flur, Kinderzimmer, Büro und Laden
**Link:** Mehr über Vinyl

**Bild:** `bad-vinyl`
- Alt: „Badezimmer mit grauem Vinylboden in Steinoptik, Badewanne und Holztür“
- Bildunterschrift: Bad mit Vinyl in Steinoptik

#### Laminat → `{{root}}leistungen/laminat/`

**H3:** Laminat
**Kurzsatz:** Kratzfest und pflegeleicht, für Räume mit viel Betrieb.

Laminat besteht aus einer Trägerplatte aus Holzwerkstoff, einer Dekorschicht und einer harten, abriebfesten Deckschicht. Die Nutzungsklasse zeigt, für welche Beanspruchung es gedacht ist, vom Schlafzimmer bis zum Büro. Verlegt wird es schwimmend auf einer Dämmunterlage. Die richtige Unterlage entscheidet mit darüber, wie leise der Boden später klingt. Nässe an den Fugen verträgt Laminat schlecht, im Bad raten wir deshalb zu Vinyl.

**Gut geeignet für:** Wohn- und Schlafräume, Flur, Büro, Mietwohnungen
**Link:** Mehr über Laminat

**Bild:** keines. Es gibt kein Foto, das sicher Laminat zeigt (`dachgeschoss` ist laut BRIEF Vinyl in Holzoptik).
Stattdessen eine **Schnittzeichnung als Inline-SVG** (echte Information, keine Deko), Beschriftung von oben nach unten:
Deckschicht · Dekorschicht · Trägerplatte aus Holzwerkstoff · Gegenzug · Dämmunterlage
- Textalternative (`role="img"` + `aria-label`): „Schnittzeichnung: Aufbau eines Laminatbodens von der Deckschicht bis zur Dämmunterlage“
- Unterschrift: Aufbau eines Laminatbodens, schematisch
- Sobald ein Laminat-Projektfoto da ist, ersetzt es die Zeichnung **[bestätigen]**.

#### Teppich → `{{root}}leistungen/teppich/`

**H3:** Teppich
**Kurzsatz:** Weich, warm und leise, für Räume, in denen es ruhig sein soll.

Teppich dämpft Trittschall und Hall im Raum deutlich und fühlt sich unter nackten Füßen warm an. Im Schlafzimmer, im Kinderzimmer und auf Treppen kommen diese Stärken zur Geltung, im Büro macht er Schritte und Gespräche leiser. Damit er glatt und sicher liegt, braucht Teppich einen ebenen, sauberen Untergrund. In Küche, Bad und Eingangsbereich ist er fehl am Platz.

**Gut geeignet für:** Schlafzimmer, Kinderzimmer, Treppen, Büro
**Link:** Mehr über Teppich

**Bild:** keines vorhanden. Typografisch lösen: das Wort „Teppich“ groß auf einer ruhigen Tonfläche (`--bg-3` oder Graphit), daneben die Liste „Gut geeignet für“. Kein Ersatzfoto, keine Musterfläche.

#### Vergleichstabelle (echte `<table>`, darf Linien haben)

**H3:** Die vier Beläge im Vergleich
*(28 Zeichen)*

| | Parkett | Vinyl | Laminat | Teppich |
|---|---|---|---|---|
| Material | Nutzschicht aus Echtholz auf einem Träger | Elastischer Kunststoff | Holzwerkstoff mit Dekor und harter Deckschicht | Textil |
| Gefühl beim Gehen | Warm, natürlich | Weich, leise | Fest, eher hart im Klang | Weich, sehr leise |
| Im Bad | Nur bedingt | Geeignet, am besten verklebt | Nicht empfohlen | Nicht geeignet |
| Später renovieren | Je nach Nutzschicht abschleifbar | Nicht abschleifbar | Nicht abschleifbar | Wird bei Bedarf erneuert |
| Pflege | Nebelfeucht wischen, geölte Flächen gelegentlich nachpflegen | Feucht wischen | Nebelfeucht wischen, keine stehende Nässe | Saugen, Flecken früh behandeln |
| Typische Räume | Wohnen, Schlafen, Flur | Küche, Bad, Flur, Kinderzimmer | Wohnen, Schlafen, Büro | Schlafen, Kinderzimmer, Treppe, Büro |

**Notiz unter der Tabelle:**
Allgemeine Eigenschaften. Je nach Produkt gibt es Unterschiede. Welche Ausführung zu Ihrem Raum passt, klären wir bei der Beratung.

(Die Tabelle ist zugleich die Ausweichlösung, wenn der Wegweiser ohne JavaScript nicht läuft.)

---

### 3.4 Wegweiser (`id="wegweiser"`) – Live-Ding, siehe auch Punkt 7

**H2:** Welcher Boden passt zum Raum?
*(29 Zeichen)*

**Untersatz:**
Wählen Sie den Raum und das, was Ihnen am wichtigsten ist. Sie erhalten eine erste Einschätzung mit Begründung.

**Feld 1, Legende:** Raum
Wohn- und Esszimmer · Schlaf- und Kinderzimmer · Küche · Bad · Flur und Eingang · Treppe · Büro oder Laden
*(Als Auswahlknöpfe/Radio-Chips, nicht als Fließtext mit Mittelpunkten.)*

**Feld 2, Legende:** Am wichtigsten ist mir
| Wahl | Hilfszeile darunter |
|---|---|
| Echtes Holz | Natürliches Material, später renovierbar |
| Unempfindlich bei Nässe | Spritzwasser, nasse Schuhe, häufiges Wischen |
| Robust im Alltag | Kinder, Haustiere, Stuhlrollen, viel Lauf |
| Leise und warm | Weicher Tritt, weniger Hall |

**Leerzustand (Ergebnisfeld, vor der Auswahl):**
Wählen Sie Raum und Wunsch. Hier erscheint dann unsere Einschätzung.

**Ergebnis-Aufbau:**
- Zeile 1 (groß): **Unsere erste Einschätzung: {Empfehlung}**
- Begründung (Text aus der Tabelle in Punkt 7)
- Falls vorhanden: **Auch denkbar:** {Alternative}
- Textlink: **Mehr über {Belag}** → Unterseite
- Button (primär, gleicher Name wie überall): **Angebot anfragen** → `{{root}}kontakt/?raum=…&wunsch=…&bodenart=…`
- Hilfszeile unter dem Button: Ihre Auswahl wird ins Anfrageformular übernommen.
- Feste Notiz im Ergebnisfeld (immer sichtbar):
  Eine erste Orientierung ohne Besichtigung. Ob der Belag zu Ihrem Untergrund, einer Fußbodenheizung und Ihrem Geschmack passt, klären wir beim Termin vor Ort.

**Ohne JavaScript (statt der Auswahl):**
Der Wegweiser braucht JavaScript. Die Übersicht „Die vier Beläge im Vergleich“ weiter oben hilft Ihnen genauso, oder Sie rufen uns an: 0159&nbsp;0171&nbsp;7249.

---

### 3.5 Treppen (`id="treppen"`)

**H2:** Treppen, die zum Boden passen
*(29 Zeichen)*

**Untersatz:**
Wir belegen gerade und gewendelte Treppen, Stufe für Stufe angepasst und abgestimmt auf die Böden darüber und darunter.

**Text:**
Eine Treppe sieht man von zwei Etagen aus. Deshalb planen wir sie zusammen mit den angrenzenden Böden: gleiche Holzart oder gleiches Dekor, saubere Übergänge an An- und Austritt. Jede Stufe wird einzeln aufgemessen und zugeschnitten, bei gewendelten Treppen nach Schablone. Tritt- und Setzstufen stimmen wir aufeinander ab, die Stufenkanten werden sauber ausgebildet.

Eine bestehende Treppe lässt sich oft neu belegen, ohne dass sie ausgebaut werden muss **[bestätigen: Treppenrenovierung/Überbelegen]**. Ob das bei Ihrer Treppe geht, sehen wir beim Termin vor Ort.

**Link:** Mehr über Treppen → `{{root}}leistungen/treppen/`

**Bilder:**
1. `treppe-eiche` (groß)
   - Alt: „Treppe mit Trittstufen aus Eiche und schwarzem Metallgeländer“
   - Bildunterschrift: Treppe mit Eichenstufen und Metallgeländer
2. `treppe-wendel` (klein)
   - Alt: „Gewendelte Treppe mit Holztrittstufen und weißen Setzstufen“
   - Bildunterschrift: Gewendelte Treppe, jede Stufe einzeln angepasst
3. `treppe-weiss` (klein)
   - Alt: „Gerade Treppe mit weißen Setzstufen und Holztrittstufen“
   - Bildunterschrift: Weiße Setzstufen, Trittstufen in Holz

---

### 3.6 Untergrund (`id="untergrund"`)

**H2:** Der Untergrund kommt zuerst
*(27 Zeichen)*

**Untersatz:**
Was unter dem neuen Boden liegt, entscheidet, wie lange er gut aussieht. Deshalb prüfen und bereiten wir den Untergrund selbst vor.

**Text:**
Ein neuer Belag liegt nur so eben und so ruhig wie der Grund darunter. Unebenheiten, alte Kleberreste oder ein zu feuchter Estrich zeigen sich sonst später als offene Fugen, Knarzen oder Wölbungen. Wir prüfen den Untergrund beim Aufmaß, bevor wir ein Angebot schreiben. Was an Vorarbeit nötig ist, steht dann im Angebot, und Sie wissen vorher, was auf Sie zukommt.

**Liste (Reihenfolge durch Position, keine Nummern):**
- Untergrund prüfen: Ebenheit, Festigkeit und Feuchte
- Alte Beläge entfernen, samt Kleberresten
- Schleifen und Fräsen, bis der Grund tragfähig und sauber ist
- Grundieren, damit Spachtelmasse und Kleber halten
- Spachteln und Nivellieren, bis Unebenheiten ausgeglichen sind

**Link:** Mehr zur Untergrundvorbereitung → `{{root}}leistungen/untergrund/`

**Bild:** `untergrund`
- Alt: „Geschliffener und gespachtelter Estrich, vorbereitet für die Verlegung“
- Bildunterschrift: Vorbereiteter Estrich vor der Verlegung
- Hinweis: Der Vorher/Nachher-Regler gehört auf die Untergrund-Unterseite und die Startseite, hier nur das Einzelbild.

---

### 3.7 Leisten, Profile, Übergänge (`id="leisten"`)

Kein eigener Unterseiten-Pfad (laut SPEC sechs Leistungsseiten). Dieser Abschnitt ist deshalb das Ziel für alle Links zu Sockelleisten und Übergängen: `{{root}}leistungen/#leisten`.

**H2:** Sauber bis an die Kante
*(23 Zeichen)*

**Untersatz:**
Sockelleisten, Übergangsprofile und Anschlüsse an Türen und Zargen liefern und setzen wir mit, passend zum Belag.

**Einleitung:**
Ob ein Boden fertig wirkt, sieht man an den Rändern: an der Wand, an der Tür, am Übergang zum nächsten Raum. Diese Stellen planen wir beim Aufmaß mit, nicht erst am letzten Tag.

**H3: Sockelleisten**
Sie decken die Fuge an der Wand ab, die ein Boden zum Arbeiten braucht, und schützen die Wand beim Wischen und Saugen. Höhe, Form und Farbe stimmen wir auf Boden, Türen und Wände ab, ob im Holzton des Bodens oder in Weiß **[bestätigen: Leistenarten]**.

**H3: Übergangsprofile**
Wo zwei Beläge aufeinandertreffen oder sich die Höhe ändert, sorgt ein passendes Profil für einen sicheren, sauberen Übergang. Schwimmend verlegte Böden brauchen an Türdurchgängen außerdem oft eine Bewegungsfuge, die ein Profil abdeckt.

**H3: Türen und Zargen**
An der Zarge soll der Boden sauber anschließen, ohne breite Fuge und ohne Silikon. Wo es die Zarge zulässt, kürzen wir sie unten passend ein, damit der Belag darunter verschwindet **[bestätigen]**. Wird der neue Boden höher als der alte, prüfen wir beim Aufmaß, ob die Türen danach noch frei laufen.

**H3: Zubehör**
Trittschalldämmung, Grundierung, Kleber, Abschlussprofile an Treppen und Fenstertüren: Was zur Verlegung gehört, bringen wir mit.

**Bild:** `flur-eiche`
- Alt: „Langer Flur mit Eichendielen, weißen Sockelleisten und Türzargen auf beiden Seiten“
- Bildunterschrift: Flur in Eiche: Leisten und Zargenanschlüsse auf ganzer Länge
- Hinweis: Hochformat, `pos="50% 70%"` (Boden und Zargen im Bild).

---

### 3.8 Privat und Gewerbe (`id="privat-gewerbe"`)

**H2:** Für Zuhause und für Gewerbe
*(27 Zeichen)*

**Untersatz:**
Ein Kinderzimmer braucht etwas anderes als eine Ladenfläche. Belag, Planung und Ablauf richten wir danach aus, wer den Boden nutzt.

**H3: Privat**
Ein einzelnes Zimmer, eine ganze Etage oder das Haus nach dem Kauf: Wir verlegen in Häusern und Wohnungen und bei Renovierungen. Wohnen Sie während der Arbeiten im Haus, sprechen wir vorher ab, welcher Raum wann frei sein muss.

**H3: Gewerbe**
Büros, Ladenflächen und Gewerbeobjekte brauchen Böden, die viel Betrieb aushalten. Wir wählen Belag und Nutzungsklasse nach der Beanspruchung und planen die Arbeiten mit Ihnen so, dass Ihr Betrieb möglichst wenig gestört wird **[bestätigen: Arbeiten abschnittsweise/außerhalb der Öffnungszeiten?]**. Größere Projekte übernehmen wir deutschlandweit.

**Einsatzgebiet (ein Satz, keine Ortsliste mit Mittelpunkten):**
Unser Betrieb sitzt in Wermelskirchen. Unterwegs sind wir vor allem in Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln.

**Textlink:** Mehr über uns → `{{root}}ueber-uns/`

**Bild:** `langer-raum`
- Alt: „Langer, offener Raum mit rustikalem Eichenboden und weißer Holzdecke“
- Bildunterschrift: Große Fläche in Eiche rustikal
- Hinweis: Ort und Raumnutzung nicht nennen (unbekannt).

---

### 3.9 Ablauf (`id="ablauf"`)

**H2:** So läuft Ihr Auftrag ab
*(23 Zeichen)*

**Untersatz:**
Ein Ansprechpartner von der ersten Nachricht bis zur Übergabe. Sie wissen jederzeit, was als Nächstes passiert.

**Schritte (`<ol>`, Reihenfolge durch Position; keine sichtbaren 01/02):**

- **Anfrage**
  Rufen Sie an, schreiben Sie per WhatsApp oder nutzen Sie das Formular. Fotos vom Raum und vom jetzigen Boden und die ungefähre Fläche in m² helfen uns schon sehr.
- **Beratung und Aufmaß vor Ort**
  Wir kommen vorbei, messen auf, prüfen den Untergrund und besprechen mit Ihnen Belag, Optik, Leisten und Übergänge.
- **Individuelles Angebot**
  Sie erhalten ein Angebot, das auf Ihren Raum, den Untergrund und das gewählte Material abgestimmt ist. Erst wenn Sie zustimmen, planen wir den Termin.
- **Untergrund und Verlegung**
  Zuerst wird der Untergrund vorbereitet, dann verlegt. Leisten, Profile und Anschlüsse gehören dazu.
- **Saubere Übergabe**
  Wir räumen auf, gehen den fertigen Boden mit Ihnen durch und sagen Ihnen, worauf Sie bei der Pflege achten sollten **[bestätigen]**.

**Textlink:** Fotos per WhatsApp schicken → `https://wa.me/4915901717249`

**Bild:** `handwerker`
- Alt: „Ein Handwerker aus unserem Team kniet mit einer Säge auf einem neu verlegten Holzboden“
- Bildunterschrift: Aus unserem Team
- Pflicht: nie als Marcel Blesius beschriften. `pos="50% 30%"`.

---

### 3.10 Projekte (`id="projekte"`)

**H2:** Böden aus unseren Projekten
*(27 Zeichen)*

**Untersatz:**
Wohnräume, Küchen, Bäder und Treppen, die wir verlegt haben. Auf der Projektseite finden Sie weitere Fotos, nach Bodenart sortiert.

**Bilder (vier, ungleich groß; keine Orte, keine m²):**
1. `fischgraet-raum`
   - Alt: „Heller Wohnraum mit Boden im Fischgrätmuster“
   - Bildunterschrift: Wohnraum im Fischgrätmuster
2. `kueche-eiche`
   - Alt: „Offene Küche mit Kochinsel und LED-Sockel auf Eichen-Landhausdiele“
   - Bildunterschrift: Küche mit Kochinsel, Eichen-Landhausdiele
3. `eiche-rustikal`
   - Alt: „Wohnraum mit Eichenboden in rustikaler Sortierung mit Astbild“
   - Bildunterschrift: Wohnraum, Eiche rustikal
4. `vinyl-grau`
   - Alt: „Raum mit grauem Vinylboden in Dielenoptik und weißen Sockelleisten“
   - Bildunterschrift: Vinylboden in Grau

**Textlink:** Alle Projekte ansehen → `{{root}}projekte/`

Hinweis: Material beim Fischgrätboden bewusst offen gelassen („Fischgrätmuster“), weil BRIEF „Parkett/Vinyl“ nennt **[bestätigen]**.

---

### 3.11 Häufige Fragen (`id="fragen"`, `.faq` mit details/summary)

**H2:** Häufige Fragen
*(14 Zeichen)*

**Untersatz:**
Was vor einem neuen Boden oft gefragt wird, kurz und offen beantwortet.

Die sechs Fragen und Antworten stehen unter Punkt 4. Der Text dort ist wortgleich mit dem JSON-LD (Punkt 6).

---

### 3.12 Abschluss (`.cta-band`)

**H2:** Erzählen Sie uns von Ihrem Boden
*(32 Zeichen)*

**Untersatz:**
Ein paar Fotos und die ungefähre Fläche genügen für den Anfang. Wir melden uns mit einem Termin für Beratung und Aufmaß.

**Aktionen:**
- Button (primär): **Angebot anfragen** → `{{root}}kontakt/`
- Textlink: **0159&nbsp;0171&nbsp;7249** → `tel:+4915901717249`
- Textlink: **Fotos per WhatsApp schicken** → `https://wa.me/4915901717249`

**Zeile darunter:**
Erreichbar Mo–Fr 07:30–17:00 und Sa&nbsp;08:00–14:00.

Hinweis: Der globale Partial `cta-band.html` enthält noch Eyebrow und ein kursives `<em>`-Wort. Beides widerspricht den House rules. Text oben ist die bereinigte Fassung.

---

## 4. FAQ (6 Fragen)

**Was kostet ein neuer Boden?**
Das hängt von Belag, Fläche und Untergrund ab und davon, was dazukommt: ob ein alter Belag entfernt, der Estrich gespachtelt oder eine Treppe belegt werden muss. Deshalb nennen wir hier keine Preise. Nach Beratung und Aufmaß vor Ort erhalten Sie ein individuelles Angebot. Für eine erste Einschätzung helfen uns Fotos und die ungefähre Fläche.

**Was brauchen Sie für eine erste Einschätzung?**
Fotos vom Raum und vom jetzigen Boden, die ungefähre Fläche in m², Ihren Ort und, wenn schon klar, den gewünschten Belag und Zeitraum. Schicken Sie uns das per WhatsApp, über das Formular oder erzählen Sie es uns am Telefon.

**Muss der alte Boden raus?**
Nicht immer. Manche Beläge lassen sich auf einen festen, ebenen Altbelag verlegen, etwa auf Fliesen, wenn Höhen und Fugen passen. Weiche, lose oder unebene Beläge wie Teppich müssen in der Regel heraus, ebenso Kleberreste, die sich sonst durchdrücken. Was bei Ihnen sinnvoll ist, prüfen wir beim Aufmaß.

**Geht das auch mit Fußbodenheizung?**
In vielen Fällen ja. Parkett, Vinyl, Laminat und Teppich gibt es in Ausführungen, die für Fußbodenheizung geeignet sind. Wichtig sind ein Belag, der die Wärme gut durchlässt, die passende Verlegeart und ein Heizestrich, der vor dem Verlegen nach Protokoll aufgeheizt wurde. Das klären wir vor Ort.

**Wie lange dauert die Verlegung?**
Das hängt vor allem von Fläche, Belag und Untergrund ab. Ein Klick-Belag auf ebenem Untergrund ist schneller verlegt als ein verklebter Boden auf einem Estrich, der erst gespachtelt werden muss, denn Spachtelmasse und Kleber brauchen Zeit zum Trocknen. Nach dem Aufmaß sagen wir Ihnen, mit wie vielen Tagen Sie rechnen sollten.

**Wo sind Sie im Einsatz?**
Unser Betrieb sitzt in Wermelskirchen. Wir verlegen vor allem in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln. Größere Projekte übernehmen wir deutschlandweit. Liegt Ihr Ort nicht auf der Liste, fragen Sie einfach nach.

---

## 5. Interne Links

| Ziel | Linktext | Wo auf der Seite |
|---|---|---|
| `{{root}}` | Startseite | Brotkrumen |
| `{{root}}leistungen/parkett/` | Mehr über Parkett | Bodenbeläge, Wegweiser-Ergebnis |
| `{{root}}leistungen/vinyl/` | Mehr über Vinyl | Bodenbeläge, Wegweiser-Ergebnis |
| `{{root}}leistungen/laminat/` | Mehr über Laminat | Bodenbeläge, Wegweiser-Ergebnis |
| `{{root}}leistungen/teppich/` | Mehr über Teppich | Bodenbeläge, Wegweiser-Ergebnis |
| `{{root}}leistungen/treppen/` | Mehr über Treppen | Treppen, Wegweiser-Ergebnis (Raum „Treppe“) |
| `{{root}}leistungen/untergrund/` | Mehr zur Untergrundvorbereitung | Untergrund |
| `{{root}}leistungen/#leisten` | (Anker für Leisten & Übergänge) | Ziel aus Footer, Header-Untermenü und Unterseiten |
| `{{root}}projekte/` | Alle Projekte ansehen | Projekte |
| `{{root}}ueber-uns/` | Mehr über uns | Privat und Gewerbe |
| `{{root}}kontakt/` | Angebot anfragen | Hero, Wegweiser (mit Parametern), Abschluss |
| `#wegweiser` | Welcher Boden passt? | Hero |
| `#ablauf` | So läuft ein Auftrag ab | Aus einer Hand |
| `tel:+4915901717249` | 0159&nbsp;0171&nbsp;7249 | Abschluss (plus Header/Mobilbar) |
| `https://wa.me/4915901717249` | Fotos per WhatsApp schicken | Ablauf, Abschluss |

Rückverweise, die auf den Unterseiten gesetzt werden sollten: „Alle Leistungen im Überblick“ → `{{root}}leistungen/` und „Sockelleisten und Übergänge“ → `{{root}}leistungen/#leisten`.

---

## 6. JSON-LD (`src/jsonld/leistungen.json`)

BreadcrumbList + Service mit Leistungskatalog + FAQPage. Der Betrieb wird über `@id` aus dem Layout referenziert. Kein `aggregateRating`, keine Preise.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://handwerker-blesius.de/" },
        { "@type": "ListItem", "position": 2, "name": "Leistungen", "item": "https://handwerker-blesius.de/leistungen/" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://handwerker-blesius.de/leistungen/#service",
      "name": "Bodenbeläge: Beratung, Verkauf und Verlegung",
      "serviceType": "Bodenlegerarbeiten",
      "url": "https://handwerker-blesius.de/leistungen/",
      "description": "Beratung, Verkauf und Verlegung von Parkett, Vinyl, Laminat und Teppich, Treppen belegen, Untergrundvorbereitung sowie Sockelleisten, Übergangsprofile und Anschlüsse an Türen und Zargen. Für Privat- und Gewerbekunden.",
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
        { "@type": "BusinessAudience", "audienceType": "Gewerbekunden" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Leistungen rund um den Boden",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Parkett verlegen", "url": "https://handwerker-blesius.de/leistungen/parkett/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vinyl verlegen", "url": "https://handwerker-blesius.de/leistungen/vinyl/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Laminat verlegen", "url": "https://handwerker-blesius.de/leistungen/laminat/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Teppich verlegen", "url": "https://handwerker-blesius.de/leistungen/teppich/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Treppen belegen", "url": "https://handwerker-blesius.de/leistungen/treppen/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Untergrundvorbereitung", "url": "https://handwerker-blesius.de/leistungen/untergrund/" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sockelleisten, Übergangsprofile und Anschlüsse", "url": "https://handwerker-blesius.de/leistungen/#leisten" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Was kostet ein neuer Boden?",
          "acceptedAnswer": { "@type": "Answer", "text": "Das hängt von Belag, Fläche und Untergrund ab und davon, was dazukommt: ob ein alter Belag entfernt, der Estrich gespachtelt oder eine Treppe belegt werden muss. Deshalb nennen wir hier keine Preise. Nach Beratung und Aufmaß vor Ort erhalten Sie ein individuelles Angebot. Für eine erste Einschätzung helfen uns Fotos und die ungefähre Fläche." }
        },
        {
          "@type": "Question",
          "name": "Was brauchen Sie für eine erste Einschätzung?",
          "acceptedAnswer": { "@type": "Answer", "text": "Fotos vom Raum und vom jetzigen Boden, die ungefähre Fläche in m², Ihren Ort und, wenn schon klar, den gewünschten Belag und Zeitraum. Schicken Sie uns das per WhatsApp, über das Formular oder erzählen Sie es uns am Telefon." }
        },
        {
          "@type": "Question",
          "name": "Muss der alte Boden raus?",
          "acceptedAnswer": { "@type": "Answer", "text": "Nicht immer. Manche Beläge lassen sich auf einen festen, ebenen Altbelag verlegen, etwa auf Fliesen, wenn Höhen und Fugen passen. Weiche, lose oder unebene Beläge wie Teppich müssen in der Regel heraus, ebenso Kleberreste, die sich sonst durchdrücken. Was bei Ihnen sinnvoll ist, prüfen wir beim Aufmaß." }
        },
        {
          "@type": "Question",
          "name": "Geht das auch mit Fußbodenheizung?",
          "acceptedAnswer": { "@type": "Answer", "text": "In vielen Fällen ja. Parkett, Vinyl, Laminat und Teppich gibt es in Ausführungen, die für Fußbodenheizung geeignet sind. Wichtig sind ein Belag, der die Wärme gut durchlässt, die passende Verlegeart und ein Heizestrich, der vor dem Verlegen nach Protokoll aufgeheizt wurde. Das klären wir vor Ort." }
        },
        {
          "@type": "Question",
          "name": "Wie lange dauert die Verlegung?",
          "acceptedAnswer": { "@type": "Answer", "text": "Das hängt vor allem von Fläche, Belag und Untergrund ab. Ein Klick-Belag auf ebenem Untergrund ist schneller verlegt als ein verklebter Boden auf einem Estrich, der erst gespachtelt werden muss, denn Spachtelmasse und Kleber brauchen Zeit zum Trocknen. Nach dem Aufmaß sagen wir Ihnen, mit wie vielen Tagen Sie rechnen sollten." }
        },
        {
          "@type": "Question",
          "name": "Wo sind Sie im Einsatz?",
          "acceptedAnswer": { "@type": "Answer", "text": "Unser Betrieb sitzt in Wermelskirchen. Wir verlegen vor allem in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln. Größere Projekte übernehmen wir deutschlandweit. Liegt Ihr Ort nicht auf der Liste, fragen Sie einfach nach." }
        }
      ]
    }
  ]
}
```

---

## 7. Live-Ding: Wegweiser „Welcher Boden passt zum Raum?“

**Warum es echten Nutzen hat:** Die häufigste offene Frage vor der Anfrage ist „welcher Boden für welchen Raum“. Der Wegweiser beantwortet sie in zwei Klicks, begründet die Antwort, nennt Grenzen offen und führt mit vorausgefüllter Anfrage direkt zum Formular. Keine Preise, keine Produktnamen, keine Garantien.

**Bedienung:** Zwei Gruppen Radio-Chips (`fieldset` + `legend`), daumentauglich (mind. 44&nbsp;px), per Tastatur bedienbar. Das Ergebnisfeld ist `aria-live="polite"`. Ohne JS: Hinweistext aus 3.4, keine leere Fläche.

**Formular-Übergabe:** Button-Link `{{root}}kontakt/?raum=bad&wunsch=nass&bodenart=Vinyl`. Auf der Kontaktseite setzt `site.js` daraus:
- `#cf-bodenart` = Wert der Spalte „Bodenart im Formular“ (muss exakt einer Option entsprechen: Parkett, Vinyl, Laminat, Teppich, Treppe, Untergrund, Noch offen)
- `#cf-nachricht` (nur wenn leer) = „Raum: {Raum}. Am wichtigsten ist mir: {Wunsch}. Erste Einschätzung aus dem Wegweiser: {Empfehlung}.“

**Schlüssel:** Raum `wohnen` · `schlafen` · `kueche` · `bad` · `flur` · `treppe` · `gewerbe`; Wunsch `holz` · `nass` · `robust` · `leise`.

**Ergebnisse (28 Kombinationen):**

| Raum | Wunsch | Empfehlung (Zeile 1) | Begründung | Auch denkbar | Bodenart im Formular | Link |
|---|---|---|---|---|---|---|
| Wohn- und Esszimmer | Echtes Holz | Parkett | Im Wohnzimmer zeigt Parkett, was es kann: echtes Holz, warm unter den Füßen, als Landhausdiele oder im Fischgrätmuster. Je nach Nutzschicht lässt es sich später abschleifen und auffrischen. | – | Parkett | parkett |
| Wohn- und Esszimmer | Unempfindlich bei Nässe | Vinyl | Wenn öfter etwas verschüttet wird oder der Essbereich an die Küche grenzt, ist Vinyl die entspanntere Wahl. Die Oberfläche ist unempfindlich gegen Wasser, und es gibt Holzoptiken, die natürlich wirken. | Parkett mit versiegelter Oberfläche, wenn Nässe zügig aufgewischt wird | Vinyl | vinyl |
| Wohn- und Esszimmer | Robust im Alltag | Laminat | Mit Kindern, Haustieren oder Stuhlrollen zählt eine harte Oberfläche. Laminat ist besonders kratz- und abriebfest. Welche Nutzungsklasse sinnvoll ist, klären wir vor Ort. | Vinyl: etwas weniger hart, dafür leiser und elastischer | Laminat | laminat |
| Wohn- und Esszimmer | Leise und warm | Teppich | Teppich dämpft Schritte und Hall am deutlichsten und ist warm unter den Füßen. | Vinyl, wenn es ein Hartboden sein soll: leiser als Laminat und angenehm beim Gehen | Teppich | teppich |
| Schlaf- und Kinderzimmer | Echtes Holz | Parkett | Parkett passt gut ins Schlafzimmer: natürliches Material, warm unter den Füßen, leicht sauber zu halten. Im Kinderzimmer lassen sich kleine Kratzer bei geölten Oberflächen oft stellenweise ausbessern. | – | Parkett | parkett |
| Schlaf- und Kinderzimmer | Unempfindlich bei Nässe | Vinyl | Im Kinderzimmer geht schon mal ein Glas um. Vinyl ist an der Oberfläche unempfindlich gegen Wasser, elastisch und leise. | – | Vinyl | vinyl |
| Schlaf- und Kinderzimmer | Robust im Alltag | Vinyl | Vinyl ist robust, elastisch und leiser als Laminat. Das passt zu Kinderzimmern, in denen gespielt, gebaut und gerannt wird. | Laminat: noch kratzfester, klingt aber härter | Vinyl | vinyl |
| Schlaf- und Kinderzimmer | Leise und warm | Teppich | Im Schlafzimmer ist Teppich die naheliegende Wahl: weich, warm und leise. Er dämpft auch den Trittschall, den sonst die Räume darunter hören. | – | Teppich | teppich |
| Küche | Echtes Holz | Parkett | Parkett in der Küche geht, mit einer widerstandsfähigen Oberfläche und der Gewohnheit, Wasser zügig aufzuwischen. | Vinyl in Holzoptik, wenn es unkomplizierter sein soll | Parkett | parkett |
| Küche | Unempfindlich bei Nässe | Vinyl | In der Küche ist Vinyl eine sichere Wahl: unempfindlich gegen Spritzwasser, angenehm unter den Füßen und leise. Verklebt liegt es besonders dicht. | – | Vinyl | vinyl |
| Küche | Robust im Alltag | Vinyl | Vinyl ist elastisch und unempfindlich gegen Wasser. Das passt zum Alltag in der Küche. | Laminat: kratzfester, verträgt aber keine Nässe an den Fugen | Vinyl | vinyl |
| Küche | Leise und warm | Vinyl | Vinyl ist leiser als Laminat oder Fliese und angenehm unter den Füßen, wenn man länger am Herd steht. Teppich gehört nicht in die Küche. | – | Vinyl | vinyl |
| Bad | Echtes Holz | Vinyl in Holzoptik | Holzoptik im Bad setzen Sie am sichersten mit Vinyl um. Echtes Parkett im Bad ist möglich, verlangt aber geeignete Produkte und viel Sorgfalt im Alltag. Ob es bei Ihnen sinnvoll ist, besprechen wir vor Ort. | – | Vinyl | vinyl |
| Bad | Unempfindlich bei Nässe | Vinyl, verklebt | Im Bad eignet sich verklebtes Vinyl: Es liegt vollflächig auf, hat keine offenen Klickfugen, und die Oberfläche ist unempfindlich gegen Wasser. Voraussetzung ist ein sorgfältig vorbereiteter Untergrund. | – | Vinyl | vinyl |
| Bad | Robust im Alltag | Vinyl | Vinyl ist im Bad robust und pflegeleicht, in Stein- oder Holzoptik. Von Laminat und Teppich raten wir hier ab. | – | Vinyl | vinyl |
| Bad | Leise und warm | Vinyl | Vinyl fühlt sich im Bad wärmer an als Fliese und ist leiser beim Gehen. | – | Vinyl | vinyl |
| Flur und Eingang | Echtes Holz | Parkett | Eichendiele im Flur verbindet die Räume, besonders wenn sie in den angrenzenden Zimmern weiterläuft. Im Eingangsbereich hilft eine Fußmatte, damit Sand und Nässe nicht ins Holz getragen werden. | – | Parkett | parkett |
| Flur und Eingang | Unempfindlich bei Nässe | Vinyl | Nasse Schuhe, Schirme, Straßenschmutz: Im Eingang ist Vinyl unempfindlich und leicht zu wischen. | – | Vinyl | vinyl |
| Flur und Eingang | Robust im Alltag | Vinyl | Im Flur wird viel gelaufen, am Eingang oft mit nassen Schuhen. Vinyl hält das aus und ist leiser als Laminat. | Laminat mit passender Nutzungsklasse, wenn der Flur nicht direkt am Eingang liegt | Vinyl | vinyl |
| Flur und Eingang | Leise und warm | Vinyl | Vinyl macht Schritte im Flur leiser als Laminat. | Teppich für einen Flur im Obergeschoss, fern vom Eingang | Vinyl | vinyl |
| Treppe | Echtes Holz | Treppe mit Holzstufen | Holzstufen lassen Treppe und Boden zusammengehören, besonders wenn oben oder unten Parkett liegt. Ob wir Ihre vorhandene Treppe neu belegen können, sehen wir vor Ort. | – | Treppe | treppen |
| Treppe | Unempfindlich bei Nässe | Treppe mit Vinyl | Für eine Treppe am Eingang oder zum Keller ist Vinyl eine gute Wahl: unempfindlich und leicht zu wischen. Passende Stufenkanten schützen die Vorderkante. | – | Treppe | treppen |
| Treppe | Robust im Alltag | Treppe mit Vinyl | Auf Treppen werden vor allem die Kanten beansprucht. Vinyl mit passenden Stufenkanten ist strapazierfähig und leise. | Holzstufen, die sich je nach Aufbau später abschleifen lassen | Treppe | treppen |
| Treppe | Leise und warm | Treppe mit Teppich | Teppich macht Treppen leise und angenehm unter den Füßen, gerade nachts und in Häusern mit Kindern. | – | Treppe | treppen |
| Büro oder Laden | Echtes Holz | Parkett | Parkett macht Büros und Läden wohnlicher. Bei viel Laufverkehr achten wir auf eine strapazierfähige Oberfläche und eine Nutzschicht, die sich später abschleifen lässt. | – | Parkett | parkett |
| Büro oder Laden | Unempfindlich bei Nässe | Vinyl | Für Ladenflächen mit Kundschaft, Teeküchen und Eingänge ist Vinyl praktisch: unempfindlich gegen Nässe, leicht zu reinigen und leise. Für gewerbliche Flächen wählen wir eine passende Nutzungsklasse. | – | Vinyl | vinyl |
| Büro oder Laden | Robust im Alltag | Vinyl, verklebt | Gewerblich genutzte Böden brauchen die passende Nutzungsklasse. Verklebtes Vinyl hält viel Betrieb aus und lässt sich gut reinigen. | Laminat für den Gewerbebereich, vor allem in Büros | Vinyl | vinyl |
| Büro oder Laden | Leise und warm | Teppich | Im Büro dämpft Teppich Schritte und Stimmen. Gespräche und Telefonate werden angenehmer. | – | Teppich | teppich |

Links aus der Spalte „Link“ zeigen auf `{{root}}leistungen/{link}/`, Linktext „Mehr über {Parkett|Vinyl|Laminat|Teppich|Treppen}“.

---

## 8. Vom Kunden zu bestätigen

1. **Eigenes Team:** Verlegen ausschließlich eigene Mitarbeiter, oder auch Partner/Subunternehmer? (Text: „Verlegung durch unser Team“.)
2. **Material:** Liefern Sie bei jedem Auftrag auch Verlegematerial (Dämmung, Grundierung, Kleber) mit? (Text: „Was zur Verlegung gehört, bringen wir mit.“)
3. **Nur Material oder nur Verlegung:** Verkaufen Sie Belag auch ohne Verlegung, und verlegen Sie Material, das Kunden selbst gekauft haben? (Steht bewusst nicht im Text; bei Ja eine FAQ ergänzen.)
4. **Muster und Ausstellung:** Bringen Sie Muster zum Beratungstermin mit, oder gibt es einen Ort, an dem man Beläge ansehen kann? (Steht bewusst nicht im Text.)
5. **Parkett:** Nur Fertigparkett, oder auch Massivparkett? Schwimmend und/oder verklebt? Bieten Sie das Abschleifen/Renovieren bestehender Parkettböden an? (Text nennt nur Fertigparkett.)
6. **Teppich:** Welche Formen verlegen Sie (Bahnenware verklebt oder verspannt, Teppichfliesen für Büros)?
7. **Treppen:** Mit welchen Belägen belegen Sie Treppen (Holz/Parkett, Vinyl, Laminat, Teppich)? Renovieren Sie bestehende Treppen, ohne sie auszubauen? (Text und Wegweiser setzen Holz, Vinyl und Teppich auf Treppen voraus.)
8. **Sockelleisten:** Bieten Sie Leisten im Holzton des Bodens und in Weiß an? Weitere Arten?
9. **Zargen und Türen:** Kürzen Sie Zargen unten ein, damit der Boden darunter läuft? Kürzen Sie auch Türblätter, wenn der neue Boden höher wird? (Text sagt nur, dass Sie das beim Aufmaß prüfen.)
10. **Gewerbe:** Sind Arbeiten abschnittsweise, abends oder am Wochenende möglich? (Text: „möglichst wenig gestört“.)
11. **Übergabe:** Geben Sie bei der Übergabe Pflegehinweise (mündlich oder schriftlich)?
12. **Altbelag:** Entsorgen Sie den entfernten Altbelag mit? (Steht bewusst nicht im Text.)
13. **Fotos:** Zeigen alle Fotos von Ihnen verlegte Böden? Welches Material liegt auf `wohnzimmer-eiche`, `kueche-eiche`, `flur-eiche` (Parkett?) und auf den Fischgrät-Fotos (Parkett oder Vinyl)?
14. **Laminat-Foto:** Gibt es ein Foto eines von Ihnen verlegten Laminatbodens? Bis dahin steht dort eine Schnittzeichnung.

---

## 9. Hinweise für den Bau (intern, nicht für den Kunden)

- **Startseite prüfen:** Dort steht `dachgeschoss` unter „Laminat“. Laut BRIEF zeigt das Bild Vinyl in Holzoptik. Entweder Bild tauschen oder Laminat dort typografisch lösen wie hier.
- **Wegweiser-Übergabe:** `site.js` braucht ein kleines Stück Code, das auf `kontakt/` die URL-Parameter `raum`, `wunsch`, `bodenart` liest und `#cf-bodenart` bzw. `#cf-nachricht` vorbelegt (Nachricht nur, wenn das Feld leer ist). Werte gegen die Optionsliste prüfen, nichts ungeprüft ins DOM schreiben.
- **Anker `#leisten`:** Im Header-Untermenü und im Footer-Leistungsblock einen Eintrag „Leisten und Übergänge“ → `{{root}}leistungen/#leisten` ergänzen.
- **Projekte-Filter:** Falls die Projektseite Filter-Anker bekommt (`#parkett` usw.), können die Beläge-Zeilen zusätzlich auf „Projekte mit Parkett“ verlinken. Bis dahin nur „Alle Projekte ansehen“.
- **House rules:** Keine Eyebrows über den H2, kein kursives Akzentwort, keine Mono-Labels, keine Nummern an den Ablauf-Schritten (`<ol>` ohne sichtbare Ziffern-Deko). Partial `cta-band.html` entsprechend bereinigen.
- **Typografie:** Geschützte Leerzeichen in der Telefonnummer (0159&nbsp;0171&nbsp;7249), zwischen „Sa“ und Uhrzeit und bei „44&nbsp;px“. „m²“ immer mit hochgestellter Zwei (Zeichen ², nicht `m2`).
