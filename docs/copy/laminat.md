# Copy-Deck: Laminat

Seite `leistungen/laminat/` · Quelldatei-Vorschlag `src/pages/leistungen-laminat.html` · Stand 24.10.2026

Alle Texte sind veröffentlichungsreif. Zwischen Zahl und Einheit, in der Telefonnummer und vor „Uhr“ stehen geschützte Leerzeichen (U+00A0). Überschriften haben keinen Schlusspunkt, kein kursives oder farbiges Wort und keine Eyebrow darüber. Die Bildnamen stammen aus `src/images.json`.

**Zur Bildlage:** Es gibt kein Foto, das sicher Laminat zeigt. `dachgeschoss` und `dach-sonne` zeigen Böden in Holzoptik, deren Material nicht belegt ist (BRIEF.md nennt bei `dachgeschoss` sogar Vinyl). Beide Fotos werden deshalb nur als „Boden in Holzoptik“ beschriftet. Sie stehen dort, wo es um Optik und Renovierung geht, und nicht im Seitenkopf, wo jedes Foto als Beweis „Das ist Laminat“ gelesen würde. Den Seitenkopf trägt eine Schnittzeichnung des Bodenaufbaus, die echte Information zeigt. Bestätigt der Kunde ein Laminat-Foto, wird es Kopfbild (Punkt 8).

---

## 1. Seitenkopf

```
<!--
title: Laminat verlegen in Wermelskirchen | Handwerker Blesius
description: Laminat für Wohnräume, Büros und Mietobjekte: beraten, geliefert und verlegt auf passender Trittschalldämmung, im Bergischen Land und Köln. Jetzt anfragen.
path: leistungen/laminat/
nav: leistungen
css: leistungen
jsonld: service-laminat, faq-laminat, breadcrumb-laminat
-->
```

| Feld | Länge | Grenze |
|---|---|---|
| title | 55 Zeichen | ≤ 60 |
| description | 155 Zeichen | ≤ 155 |
| H1 „Laminat in Wermelskirchen“ | 25 Zeichen | ≤ 32 |

Open Graph: `og:title` = title, `og:description` = description, Bild `assets/img/og-image.jpg` (global). Kein seitenbezogenes Bild, solange kein Laminat-Foto bestätigt ist.

**Teaser für die Leistungsübersicht und die Startseite:**
Laminat: kratzfest, pflegeleicht und meist günstiger als Parkett. Für Wohn- und Schlafräume, Büros und Mietwohnungen, verlegt auf passender Trittschalldämmung.

---

## 2. Argument

Wer liest: Eigentümer, Vermieter und Mieter im Bergischen Land und in Köln, die renovieren und einen Boden suchen, der gut aussieht, viel aushält und nicht so viel kostet wie Parkett. Dazu Betriebe mit Büro- oder Ladenfläche. Viele haben Laminat schon im Baumarkt gesehen. Sie fragen sich, ob es billig wirkt, ob es laut ist, ob es in Küche oder Keller darf, welche Nutzungsklasse sie brauchen und ob es auf die Fußbodenheizung kann.

Was sie nach einem Bildschirm glauben sollen: Blesius berät, liefert und verlegt Laminat aus einer Hand, sagt offen, wo es passt und wo nicht, und legt es auf die richtige Unterlage und einen vorbereiteten Untergrund.

Was sie als Nächstes tun: Angebot anfragen, mit Fotos und der ungefähren Fläche, oder anrufen.

| Abschnitt | Behauptung | Beweis |
|---|---|---|
| Kopf | Laminat in Wermelskirchen, beraten, verkauft und verlegt von einem Betrieb | Schnittzeichnung des Bodenaufbaus, Region, Telefon, Anfrage-Knopf |
| Was Laminat kann und was nicht | Stärken und Grenzen folgen aus dem Aufbau, und wir nennen beide | Zeichnung oben, je fünf Stärken und Grenzen mit Begründung |
| Worauf Sie beim Dekor achten | Ob Laminat natürlich wirkt, entscheiden Format, Kante und Oberfläche, nicht nur das Dekor | Foto eines Bodens in Holzoptik (`dachgeschoss`), fünf konkrete Kriterien |
| Für welche Räume Laminat passt | Laminat passt in viele Räume, aber nicht ins Bad, und jeder Raum braucht seine Klasse | Raum-Check (Live-Ding) und Tabelle mit sieben Räumen, Erklärung der Nutzungsklasse |
| Die Unterlage macht den Klang | Wie leise Laminat ist, entscheidet vor allem die Unterlage | Trittschall und Gehschall erklärt, vier Kriterien für die Wahl der Unterlage |
| Für Mietwohnung und Büro | Wo Mieter wechseln oder viele Menschen laufen, ist Laminat eine gute Wahl | konkrete Punkte für Vermieter und für Gewerbe, Foto einer Renovierung (`dach-sonne`) |
| Wo sich Sparen lohnt | Laminat ist preisbewusst, wir sagen offen, wo Sparen sinnvoll ist und wo nicht | zwei Listen ohne Preise, Hinweis auf das individuelle Angebot |
| Laminat braucht ebenen Grund | Schwimmend verlegt heißt nicht: auf alles | Foto vom vorbereiteten Estrich (`untergrund`), Untergrund-Leistungen laut Kundenangaben |
| So verlegen wir Laminat | Der Weg zum fertigen Boden ist klar | fünf Schritte aus dem tatsächlichen Ablauf, Foto aus dem Team |
| Häufige Fragen zu Laminat | Offene Fragen werden ehrlich beantwortet | sechs Antworten ohne Preise und Garantien |
| Was zum Laminat dazugehört | Für nasse Räume, Kanten und Übergänge gibt es die passende Lösung | Links zu Vinyl (mit Foto `bad-vinyl`), Leisten, Untergrund und anderen Böden |
| Abschluss | Der erste Schritt ist klein | Fotos und Fläche genügen; Telefon, WhatsApp, Formular |

Es gibt bewusst keine Projektgalerie: Solange kein Foto sicher Laminat zeigt, verweist die Seite auf die Projektseite, statt fremde Böden als Laminat auszugeben.

---

## 3. Abschnitte

### Kopf (`.page-hero`)

**Breadcrumb:** Start › Leistungen › Laminat
(`{{root}}` › `{{root}}leistungen/` › aktuelle Seite, `aria-current="page"`)

**H1:** Laminat in Wermelskirchen

**Untersatz (`.lead`):**
Kratzfest, pflegeleicht und meist günstiger als Parkett: Wir beraten, liefern und verlegen Laminat, mit passender Trittschalldämmung und sauberen Anschlüssen.

**Text:**
Für Wohnungen, Häuser, Mietobjekte und Büros in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln. Größere Projekte übernehmen wir deutschlandweit.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Laminat`
- Sekundär (Ghost-Button mit Telefon-Icon): **0159 0171 7249** → `tel:+4915901717249`
- Kleine Zeile darunter: Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr

**Bild: Schnittzeichnung (Inline-SVG, kein Foto).** Gemeinsames Partial `src/partials/laminat-aufbau.html`, das auch `leistungen/` nutzt (dort kleiner, ohne Estrich-Schichten).
Eine Diele im Schnitt, die Schichten leicht auseinandergezogen, Beschriftung rechts neben jeder Schicht (Satzschreibung, mindestens 14 px, keine Versalien). Von oben nach unten:

| Schicht | Beschriftung |
|---|---|
| Deckschicht | Deckschicht: klares Melaminharz, hart und abriebfest |
| Dekorschicht | Dekor: das gedruckte Holz- oder Steinbild |
| Trägerplatte (mit angedeuteter Nut und Feder an der Kante) | Trägerplatte aus Holzfaser (HDF) mit Klickverbindung |
| Gegenzug | Gegenzug: hält die Diele gerade |
| Unterlage | Trittschalldämmung |
| Folie | Dampfbremse auf mineralischem Estrich |
| Estrich | Estrich |

Flächen flach in Holz-Mitteltönen (Dekor) und Grautönen (Kern, Estrich), die Dämmung in Graphit `#525252`, Orange nur für die Klickverbindung. Keine Verläufe, keine Schatten.
- `role="img"`, `aria-label`: Schnittzeichnung eines schwimmend verlegten Laminatbodens: Deckschicht, Dekor, Trägerplatte mit Klickverbindung, Gegenzug, Trittschalldämmung, Dampfbremse und Estrich
- Bildunterschrift: Aufbau eines schwimmend verlegten Laminatbodens, schematisch
- Bewegung: `data-draw`, die Schichten setzen sich beim Laden von unten nach oben aufeinander, Beschriftungen blenden nacheinander ein (`data-draw-label`). Reduziert: fertige Zeichnung.

---

### Was Laminat kann und was nicht

**H2:** Was Laminat kann und was nicht (30 Zeichen)

**Untersatz:**
Stärken und Grenzen stecken im Aufbau: oben eine harte Schutzschicht, im Kern Holzfaser.

**Text:**
Eine Laminatdiele besteht aus mehreren Schichten, wie die Zeichnung oben zeigt. Ganz oben liegt eine klare, harte Deckschicht aus Melaminharz, darunter das gedruckte Dekor. Den Kern bildet eine Trägerplatte aus hochverdichteter Holzfaser, kurz HDF, mit der Klickverbindung an den Kanten. Ein Gegenzug auf der Unterseite hält die Diele gerade. Aus diesem Aufbau ergibt sich, was Laminat gut kann und was ihm schadet.

**Spalte links, H3:** Was Laminat kann

- **Kratz- und abriebfest.** Die harte Deckschicht steckt Stuhlbeine, Spielzeug und Straßenschuhe deutlich besser weg als Holz. Wie viel ein Boden aushält, zeigt seine Nutzungsklasse.
- **Pflegeleicht.** Fegen oder saugen, ab und zu nebelfeucht wischen. Ölen, wachsen oder versiegeln müssen Sie Laminat nie.
- **Lichtbeständig.** Das gedruckte Dekor verändert sich im Sonnenlicht in der Regel kaum. Wo lange ein Teppich lag, bleibt kein heller Fleck zurück, wie es bei Holz vorkommen kann.
- **Schnell verlegt, später wieder lösbar.** Die Dielen werden verklickt und liegen schwimmend auf der Unterlage. Es muss kein Kleber trocknen, und bei einem späteren Wechsel lässt sich der Boden ohne Kleberreste ausbauen.
- **Meist günstiger als Parkett.** In der Regel kostet Laminat weniger als ein Holzboden. Worauf es beim Sparen ankommt, lesen Sie [weiter unten](#sparen).

**Spalte rechts, H3:** Was Laminat nicht verträgt

- **Stehende Nässe.** Die Oberfläche ist dicht, die Fugen sind es nicht. Dringt Wasser in die Fugen, quillt die Holzfaser im Kern, und die Kanten heben sich. Das geht nicht mehr zurück. Verschüttetes deshalb gleich aufwischen, und im Bad lieber Vinyl.
- **Feuchte von unten.** Ein zu feuchter Estrich oder ein feuchter Keller schadet der Trägerplatte genauso. Auf mineralischem Estrich gehört deshalb eine Dampfbremse unter die Dämmung, und die Feuchte des Untergrunds prüfen wir vor der Verlegung.
- **Abschleifen.** Das Dekor ist ein bedrucktes Papier unter der Deckschicht. Abschleifen und neu versiegeln wie bei Parkett geht deshalb nicht. Eine beschädigte Diele wird ausgetauscht.
- **Eine ungeeignete Unterlage.** Laminat ist hart. Liegt es auf der falschen Unterlage oder auf unebenem Grund, klingt es beim Gehen laut und hohl. Was dagegen hilft, steht [bei der Unterlage](#unterlage).
- **Feste Einbauten.** Ein schwimmender Boden muss sich bewegen können. Er braucht Abstand zur Wand, auf großen Flächen und in Türdurchgängen Bewegungsfugen unter einem Profil, und eine schwere Küchenzeile sollte nicht auf ihm stehen. Wo der Boden endet und wo Profile sitzen, legen wir beim Aufmaß fest.

*(Kein Foto. Die Zeichnung im Kopf ist der Beweis, die zwei Listen tragen den Abschnitt; auf dem Desktop nebeneinander, am Handy untereinander.)*

---

### Worauf Sie beim Dekor achten

**H2:** Worauf Sie beim Dekor achten (28 Zeichen)

**Untersatz:**
Laminat gibt es in Holz- und Steinoptik, von hell bis dunkel. Ob es natürlich wirkt, entscheiden Format, Kante und Oberfläche.

**Text:**
Das Holz oder der Stein auf einer Laminatdiele ist gedruckt. Deshalb ist die Auswahl groß: Eiche hell, natur oder rustikal mit Ästen, graue und gekalkte Töne, Beton- und Fliesenoptik. Auf dem Foto im Prospekt sehen sich viele Dekore ähnlich. Im Raum machen diese Details den Unterschied:

**Liste (`dl`, Begriff fett):**

- **Format.** Lange, breite Dielen lassen große Räume ruhig wirken, ähnlich einer Landhausdiele. Schmalere Dielen passen gut in kleinere Zimmer. Für Steinoptik gibt es Formate wie Fliesen.
- **Fase.** Eine kleine abgeschrägte Kante zeichnet jede Diele einzeln nach, wie bei Parkett. Ohne Fase wirkt die Fläche glatter und geschlossener.
- **Oberfläche.** Strukturierte Oberflächen fühlen sich holziger an, besonders wenn die Prägung der gedruckten Maserung folgt. Auf matten Oberflächen fallen Staub und feine Kratzer weniger auf als auf glänzenden.
- **Wiederholung.** Ein gedrucktes Dekor wiederholt sich nach einer bestimmten Zahl von Dielen. Beim Verlegen mischen wir deshalb Dielen aus mehreren Paketen, damit gleiche Bilder nicht nebeneinanderliegen.
- **Ihr Licht.** Ein Dekor wirkt im eigenen Raum anders als im Prospekt oder im Laden. Sehen Sie es sich, wenn möglich, bei Tageslicht und bei Lampenlicht an.

*Optionaler Satz, nur nach Freigabe (Punkt 8):* Auch das Fischgrätmuster gibt es als Laminat. Sprechen Sie uns an, wenn Sie dieses Bild suchen.

**Bild:** `dachgeschoss` · `pos="68% 70%"` (die weiße Wandscheibe links abschneiden, Fenster und Boden im Bild)
- Alt: Dachgeschosszimmer mit Dachschräge und zwei Fenstern, durchgehender Boden in warmem Holzton, weiße Sockelleisten
- Bildunterschrift: Dachgeschoss, Boden in Holzoptik

---

### Für welche Räume Laminat passt (mit Raum-Check)

**H2:** Für welche Räume Laminat passt (30 Zeichen) · `id="raeume"`

**Untersatz:**
In Wohn- und Schlafräume, Büros und Mietwohnungen. Ins Bad gehört es nicht.

Hier sitzt das Live-Ding (Punkt 7). Mit JavaScript steht oben der Raum-Check, die Tabelle liegt darunter in einem `details` „Alle Räume im Überblick“. Ohne JavaScript ist die Tabelle offen und der Raum-Check ausgeblendet.

**Tabelle (echte `<table>`, `<caption class="visually-hidden">Eignung von Laminat je Raum mit Richtwerten für die Nutzungsklasse</caption>`):**

| Raum | Passt Laminat? | Nutzungsklasse (Richtwert) | Darauf achten |
|---|---|---|---|
| Wohn- und Esszimmer | Gut geeignet | 22 oder höher, bei viel Betrieb 23 | Filzgleiter unter Stuhl- und Tischbeine. Das Dekor am besten im eigenen Licht ansehen. |
| Schlaf- und Kinderzimmer | Gut geeignet | 21 oder höher im Schlafzimmer, 23 im Kinderzimmer | Laminat ist hart. Zum Spielen auf dem Boden ist ein Teppich angenehm. Wer es insgesamt leiser mag, fragt nach Vinyl. |
| Küche | Nur mit Vorsicht | 23 oder höher | Eine schwere Küchenzeile sollte nicht auf schwimmend verlegtem Laminat stehen. Wo der Boden endet, legen wir beim Aufmaß fest. |
| Bad | Nicht empfohlen | – | Es gibt Laminat, das für Feuchträume angeboten wird. Ob es zu Ihrem Bad passt, prüfen wir gern. Die sichere Wahl bleibt Vinyl. |
| Flur und Eingang | Im Flur gut, am Eingang mit Schmutzfang | 23 oder höher | Wo der Eingang oft nass wird, ist Vinyl die entspanntere Wahl. |
| Büro oder Laden | Gut geeignet, mit Gewerbeklasse | 31 oder höher im Büro, 32 oder 33 bei viel Kundschaft | Unter Bürostühlen weiche Rollen für Hartböden oder eine Schutzmatte. Am Eingang eine Schmutzfangzone. |
| Keller | Nur wenn der Raum trocken ist | je nach Nutzung des Raums | Der Untergrund muss dauerhaft trocken bleiben, auch im Sommer, wenn sich in Kellern leicht Feuchtigkeit niederschlägt. |

**Notiz unter der Tabelle:**
Richtwerte ohne Besichtigung. Ob Laminat zu Ihrem Untergrund und Ihrer Nutzung passt, klären wir beim Termin vor Ort.

**H3:** Was die Nutzungsklasse sagt (27 Zeichen)

Jedes Laminat ist in eine Nutzungsklasse eingestuft, die auf der Packung und im Datenblatt steht. Die Klassen 21 bis 23 gelten für Wohnräume, ab 31 beginnen die Klassen für gewerblich genutzte Räume. Je höher die Zahl, desto mehr Betrieb hält der Boden aus. Ein Laminat mit Gewerbeklasse ist deshalb auch im Flur eines Einfamilienhauses gut aufgehoben. Oft steht daneben eine Abriebklasse mit den Buchstaben AC. Sie beschreibt, wie widerstandsfähig die Deckschicht ist.

*(Kein Foto. Raum-Check und Tabelle tragen den Abschnitt.)*

---

### Die Unterlage macht den Klang

**H2:** Die Unterlage macht den Klang (29 Zeichen) · `id="unterlage"`

**Untersatz:**
Wie leise Laminat ist, hängt nicht nur an der Diele, sondern vor allem daran, worauf sie liegt.

**Text:**
Laminat wird in aller Regel schwimmend verlegt. Die Dielen sind miteinander verklickt und liegen lose auf einer Dämmunterlage. Sie gleicht kleine Unebenheiten aus, entlastet die Klickverbindung und dämpft zwei Arten von Schall.

**Spalte links, H3:** Trittschall
Das ist der Schall, den Schritte in die Decke leiten. Er kommt in den Räumen darunter an: im Mehrfamilienhaus bei den Nachbarn, im eigenen Haus im Wohnzimmer unter dem Kinderzimmer. Eine gute Trittschalldämmung verringert ihn deutlich.

**Spalte rechts, H3:** Gehschall
Das ist der Klang im Raum selbst, das typische Klacken von Absätzen auf hartem Boden. Ihn mindern Unterlagen, die dicht an der Diele anliegen und Schwingungen dämpfen. Manches Laminat hat eine solche Dämmung schon auf der Unterseite.

**Liste darunter (Einleitung + `ul`, fetter Anfang):**
Welche Unterlage wir wählen, hängt von vier Dingen ab:

- **Vom Untergrund.** Auf mineralischem Estrich kommt eine Dampfbremse dazu, als eigene Folie oder schon in der Unterlage.
- **Von der Heizung.** Liegt eine Fußbodenheizung, muss die Unterlage Wärme gut durchlassen und dafür freigegeben sein.
- **Von der Lage des Raums.** Im Obergeschoss und im Mehrfamilienhaus zählt vor allem der Trittschall, im großen Wohnraum eher der Gehschall.
- **Vom Laminat.** Eine zu weiche Unterlage gibt unter Last nach, und die Klickverbindung leidet. Der Hersteller gibt vor, welche Unterlagen zu seinem Laminat passen.

**Abschlusssatz:**
Teppiche, Vorhänge und Polstermöbel nehmen dem Raum zusätzlich Hall.

*(Kein Foto. Auf dem Desktop zwei Spalten für Tritt- und Gehschall, die Liste darunter über die volle Breite.)*

---

### Für Mietwohnung und Büro

**H2:** Für Mietwohnung und Büro (24 Zeichen)

**Untersatz:**
Wo Mieter wechseln oder viele Menschen laufen, zählt ein Boden, der viel aushält und schnell liegt.

**H3:** Für Vermieter und Eigentümer
Zwischen zwei Mietverhältnissen ist die Zeit oft knapp. Laminat ist zügig verlegt, ein ruhiges Holzdekor passt zu den meisten Einrichtungen, und die harte Oberfläche steckt Umzüge und Alltag gut weg. Wir entfernen den alten Belag, prüfen den Untergrund und verlegen neu, mit Sockelleisten und Übergängen. Im Mehrfamilienhaus achten wir auf eine gute Trittschalldämmung, damit es unten ruhig bleibt.

**Hinweis (abgesetzt, normaler Text):**
Bewahren Sie nach der Verlegung ein paar übrige Dielen auf. Wird später eine beschädigt, lässt sie sich im selben Dekor ersetzen.

**H3:** Für Büros und Gewerbeflächen
In Büros und Ladenflächen braucht Laminat eine Nutzungsklasse für gewerbliche Räume, je nach Betrieb 31, 32 oder 33. Unter Bürostühlen schützen weiche Rollen für Hartböden oder eine Schutzmatte die Oberfläche. Eine Schmutzfangzone am Eingang hält Sand und Nässe vom Boden fern. Den Zeitplan stimmen wir mit Ihnen ab, damit Ihr Betrieb möglichst wenig gestört wird.

**CTA (sekundär, Textlink):** Für Ihr Objekt anfragen → `{{root}}kontakt/?bodenart=Laminat`

**Bild:** `dach-sonne` · `pos="50% 82%"` (unten anschneiden: Boden und Lichtfleck im Bild, offene Decke und Material auf der Fensterbank weitgehend draußen)
- Alt: Dachgeschoss im Ausbau: Sonnenlicht fällt durch eine Fenstertür auf einen Boden in Holzoptik, die Wände sind noch gespachtelt
- Bildunterschrift: Dachgeschoss im Ausbau, Boden in Holzoptik

---

### Wo sich Sparen lohnt

**H2:** Wo sich Sparen lohnt (20 Zeichen) · `id="sparen"`

**Untersatz:**
Laminat ist die Wahl für alle, die auf den Preis achten. Wir sagen Ihnen offen, wo Sie sparen können und wo nicht.

**Spalte links, H3:** Hier können Sie sparen

- **Beim Dekor.** Besondere Formate, aufwendige Prägungen und ausgefallene Dekore kosten mehr, halten aber nicht länger. Wie lange ein Boden schön bleibt, entscheidet die Nutzungsklasse.
- **Bei der Klasse, wo wenig los ist.** Im Schlaf- oder Gästezimmer genügt eine niedrigere Nutzungsklasse als im Flur.

**Spalte rechts, H3:** Hier lohnt es sich nicht

- **An der Unterlage.** Sie entscheidet über den Klang und über die Lebensdauer der Klickverbindung. Eine zu dünne oder zu weiche Unterlage hören Sie jeden Tag.
- **Am Untergrund.** Unebenheiten zeigen sich bei Laminat als Federn, Knacken oder offene Fugen. Was der Untergrund braucht, steht vorher im Angebot.
- **An der Klasse, wo viel los ist.** Im Flur, im Kinderzimmer und im Büro nutzt sich eine zu niedrige Nutzungsklasse sichtbar ab.
- **An den Kanten.** Sockelleisten und Übergangsprofile machen den Boden fertig. Eine offene Fuge an der Tür sieht man jeden Tag.

**Abschlusssatz:**
Nach dem Aufmaß erhalten Sie ein individuelles Angebot für Material, Untergrund und Verlegung. Fragen Sie uns ruhig, wo es günstiger geht.

*(Kein Foto, keine Preise. Auf dem Desktop zwei Spalten; die rechte Liste ist länger, das ist gewollt.)*

---

### Laminat braucht ebenen Grund

**H2:** Laminat braucht ebenen Grund (28 Zeichen)

**Untersatz:**
Schwimmend verlegt heißt nicht: auf alles. Die Dielen liegen nur so ruhig wie der Boden darunter.

**Text:**
Die Unterlage gleicht nur kleine Unebenheiten aus. Größere Mulden und Wellen spürt man später beim Gehen: Der Boden federt, die Klickverbindungen knacken, und an den Stößen können Fugen aufgehen. Ein zu feuchter Estrich lässt die Trägerplatte von unten aufquellen. Bevor wir Laminat verlegen, prüfen wir deshalb Ebenheit, Festigkeit und Feuchte des Untergrunds. Was nicht passt, machen wir passend:

- Alte Beläge entfernen, samt Kleberresten
- Schleifen und fräsen, bis der Estrich tragfähig und sauber ist
- Grundieren, damit die Spachtelmasse sicher hält
- Spachteln und nivellieren, bis die Fläche eben ist

Ein fester, ebener Fliesenboden kann oft liegen bleiben, Teppichboden kommt vorher heraus. Wird der neue Boden höher als der alte, prüfen wir beim Aufmaß, ob Türen und Übergänge dazu passen.

**Link:** Mehr zur Untergrundvorbereitung → `{{root}}leistungen/untergrund/`

**Bild:** `untergrund` · `pos="50% 62%"`
- Alt: Vorbereiteter Estrich nach dem Schleifen und Spachteln, bereit für den neuen Boden
- Bildunterschrift: Vorher: geschliffener und gespachtelter Estrich

---

### So verlegen wir Laminat

**H2:** So verlegen wir Laminat (23 Zeichen) · `id="ablauf"`

**Untersatz:**
Fünf Schritte von der Anfrage bis zur Übergabe. Sie wissen jederzeit, was als Nächstes kommt.

**Schritte (`ol`, Reihenfolge über die Position, keine „01“-Nummern):**

1. **Anfrage.** Rufen Sie an, schreiben Sie per WhatsApp oder nutzen Sie das Formular. Fotos vom Raum und die ungefähre Fläche in m² helfen uns bei der Vorbereitung. Sagen Sie uns auch, ob eine Fußbodenheizung liegt und wie stark der Raum genutzt wird.
2. **Beratung und Aufmaß.** Wir kommen zu Ihnen, messen auf, prüfen den Untergrund und besprechen Dekor, Nutzungsklasse und Unterlage.
3. **Angebot.** Sie erhalten ein individuelles Angebot für Material, Untergrund und Verlegung.
4. **Untergrund und Verlegung.** Je nach Herstellerangabe liegen die Pakete vorher eine Zeit lang im Raum, damit sich das Laminat an Temperatur und Luftfeuchte gewöhnt. Dann bereiten wir den Untergrund vor, legen Dampfbremse und Dämmung aus und verlegen die Dielen mit Abstand zur Wand und versetzten Stößen. Sockelleisten und Übergangsprofile schließen den Boden ab.
5. **Übergabe.** Wir räumen auf, gehen den fertigen Boden mit Ihnen durch und erklären Ihnen die Pflege.

**CTA:** Angebot anfragen → `{{root}}kontakt/?bodenart=Laminat`

**Bild:** `handwerker` · `pos="50% 35%"` (Gesicht und Säge im Bild; Hochformat neben der Schrittliste)
- Alt: Mitarbeiter im Firmenpullover von Handwerker Blesius kniet mit einer Säge auf einem neu verlegten Boden in hellem Holzton
- Bildunterschrift: Aus unserem Team

---

### Häufige Fragen zu Laminat

**H2:** Häufige Fragen zu Laminat (25 Zeichen) · `id="faq"`

**Untersatz:**
Kurze, ehrliche Antworten. Alles Weitere besprechen wir gern am Telefon oder vor Ort.

Antworten siehe Punkt 4 (`.faq`, `details`/`summary`, die erste Frage offen).

---

### Was zum Laminat dazugehört

**H2:** Was zum Laminat dazugehört (26 Zeichen)

**Untersatz:**
Ein Boden ist erst fertig, wenn Kanten, Übergänge und die Räume daneben dazu passen.

Drei Verweise (als Liste, Bild nur beim ersten, keine Reihe gleicher Karten):

- **Vinyl für Bad und Küche** → `{{root}}leistungen/vinyl/`
  Wo es nass wird, ist Vinyl die bessere Wahl, in Holz- oder Steinoptik. So bekommt jeder Raum den Boden, der zu ihm passt.
  Bild: `bad-vinyl` · `pos="45% 60%"` · Alt: Blick durch eine Holztür in ein Bad mit Vinylboden in grauer Steinoptik, dahinter eine Badewanne · Bildunterschrift: Bad mit Vinyl in Steinoptik
- **Sockelleisten und Übergänge** → `{{root}}leistungen/#leisten`
  Passende Sockelleisten, Übergangsprofile zu Fliesen und anderen Böden, saubere Anschlüsse an Türen und Zargen.
- **Untergrund** → `{{root}}leistungen/untergrund/`
  Prüfen, alte Beläge entfernen, schleifen, grundieren, spachteln.

**Zeile darunter (Fließtext mit Links):**
Doch lieber ein anderer Boden? [Parkett](leistungen/parkett/) für echtes Holz, [Teppich](leistungen/teppich/) für Schlafzimmer und Treppen. Für die Treppe selbst: [Treppen](leistungen/treppen/), Stufe für Stufe angepasst. Wie unsere Böden im fertigen Raum aussehen, zeigen die [Projekte](projekte/).

---

### Abschluss (CTA-Band, Laminat-Fassung)

**H2:** Planen Sie Ihr Laminat mit uns (30 Zeichen)

**Untersatz:**
Ein paar Fotos und die ungefähre Fläche genügen für den Anfang. Wir melden uns und vereinbaren einen Termin für Beratung und Aufmaß.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Laminat`
- Sekundär: **0159 0171 7249** → `tel:+4915901717249`
- Textlink: **Fotos per WhatsApp schicken** → `https://wa.me/4915901717249`

**Zwei kleine Zeilen:**
Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr
Neuenhöhe 17, 42929 Wermelskirchen

Umsetzung: wie bei Parkett. Das Partial `src/partials/cta-band.html` hat eine Eyebrow und ein kursives Wort; beides entfernen und Überschrift/Untersatz als Laminat-Fassung setzen.

---

## 4. FAQ

Sechs Fragen. Der Text der Antworten ist wortgleich im JSON-LD (`faq-laminat.json`) enthalten.

**Laminat oder Vinyl: Was passt besser?**
Beide gibt es in Holz- und Steinoptik, und beide sind pflegeleicht. Laminat hat eine sehr harte Oberfläche und ist besonders kratzfest, klingt beim Gehen aber härter und verträgt keine Nässe in den Fugen. Vinyl ist elastischer, leiser und unempfindlich gegen Wasser. Für Bad, Küche und Eingang ist deshalb Vinyl die bessere Wahl, in Wohn- und Schlafräumen und im Büro ist Laminat oft die preisgünstigere. Was zu Ihrem Raum passt, besprechen wir gern vor Ort.

**Kann Laminat in die Küche oder ins Bad?**
In die Küche nur mit Vorsicht. Laminat verträgt Spritzer, aber kein Wasser, das in den Fugen stehen bleibt, und ein undichter Geschirrspüler kann den Boden in kurzer Zeit beschädigen. Es gibt Laminat mit besonders geschützten Kanten, für die Küche empfehlen wir trotzdem meist Vinyl. Im Bad mit Dusche oder Wanne raten wir von Laminat ab. Dort ist Vinyl die sichere Wahl.

**Kann Laminat auf eine Fußbodenheizung?**
Ja, wenn Laminat und Unterlage vom Hersteller für Fußbodenheizung freigegeben sind. Die Unterlage muss die Wärme gut durchlassen, sonst reagiert die Heizung träge. Auf den Heizestrich gehört eine Dampfbremse unter die Dämmung. Außerdem muss der Heizestrich vor dem Verlegen nach Protokoll aufgeheizt und ausreichend trocken sein. Das klären wir vor der Verlegung.

**Wie pflege ich Laminat richtig?**
Am besten trocken, mit Besen oder Staubsauger mit Hartbodendüse, denn Sand wirkt unter Schuhsohlen wie Schleifpapier. Zum Wischen das Tuch gut auswringen und einen milden Reiniger nehmen, der für Laminat geeignet ist. Dampfreiniger, Scheuermittel, Wachs und Öl gehören nicht auf Laminat. Filzgleiter unter Stuhl- und Tischbeinen und eine Fußmatte am Eingang halten Kratzer fern.

**Lässt sich eine beschädigte Diele austauschen?**
Ja. Abschleifen lässt sich Laminat nicht, aber einzelne Dielen können ersetzt werden. Liegt die Diele nah an der Wand, wird der Boden bis dorthin aufgenommen und neu verklickt. Mitten im Raum wird die beschädigte Diele herausgetrennt und eine neue eingesetzt. Damit das Dekor passt, lohnt es sich, nach der Verlegung ein paar Dielen aufzuheben.

**Was kostet Laminat pro Quadratmeter?**
Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt vom Laminat selbst ab, also von Nutzungsklasse, Format und Oberfläche, außerdem von der Unterlage, von der Vorarbeit am Untergrund und von Leisten und Übergängen. In der Regel ist Laminat günstiger als Parkett. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten.

*Reserve-Fragen (nur wenn eine Frage getauscht werden soll; dann auch im JSON-LD tauschen):*

**Kann Laminat auf alte Fliesen?**
Oft ja. Ist der Fliesenboden fest, eben und trocken, kann er als Untergrund dienen. Breite, tiefe Fugen werden vorher ausgeglichen, damit sie sich nicht abzeichnen. Der neue Boden liegt dann höher als der alte, und Türen und Übergänge müssen dazu passen. Das prüfen wir beim Aufmaß.

**Warum klingt Laminat manchmal hohl?**
Laminat ist hart und liegt lose auf seiner Unterlage. Ist die Unterlage ungeeignet oder der Untergrund uneben, entsteht ein hohler, klackernder Klang. Eine passende Dämmung und ein ebener Untergrund helfen am meisten. Teppiche, Vorhänge und Polstermöbel nehmen dem Raum zusätzlich Hall.

---

## 5. Interne Links

| Ziel | Linktext | Stelle |
|---|---|---|
| `{{root}}` | Start | Breadcrumb |
| `{{root}}leistungen/` | Leistungen | Breadcrumb |
| `{{root}}leistungen/vinyl/` | Vinyl für Bad und Küche / Mehr über Vinyl | „Was zum Laminat dazugehört“ (mit Bild), Raum-Check (Küche, Bad, Flur) |
| `{{root}}leistungen/parkett/` | Parkett | „Was zum Laminat dazugehört“ |
| `{{root}}leistungen/teppich/` | Teppich | „Was zum Laminat dazugehört“ |
| `{{root}}leistungen/treppen/` | Treppen | „Was zum Laminat dazugehört“ |
| `{{root}}leistungen/untergrund/` | Mehr zur Untergrundvorbereitung / Untergrund | „Laminat braucht ebenen Grund“, „Was zum Laminat dazugehört“ |
| `{{root}}leistungen/#leisten` | Sockelleisten und Übergänge | „Was zum Laminat dazugehört“ |
| `{{root}}projekte/` | Projekte | „Was zum Laminat dazugehört“ |
| `{{root}}kontakt/?bodenart=Laminat` | Angebot anfragen / Für Ihr Objekt anfragen | Kopf, Mietwohnung und Büro, Ablauf, Abschluss |
| `{{root}}kontakt/?bodenart=…&raum=…&check=laminat` | Angebot anfragen | Raum-Check |
| `#sparen` | weiter unten | „Was Laminat kann und was nicht“ |
| `#unterlage` | bei der Unterlage | „Was Laminat kann und was nicht“ |
| `tel:+4915901717249` | 0159 0171 7249 | Kopf, Abschluss |
| `https://wa.me/4915901717249` | Fotos per WhatsApp schicken | Abschluss |

Rückverweise auf diese Seite von: Startseite (Leistungsliste), `leistungen/` (Beläge, Wegweiser), `leistungen/parkett/` („Laminat, wenn es vor allem robust und pflegeleicht sein soll“), `leistungen/vinyl/` (Vergleich), `leistungen/untergrund/`.

---

## 6. JSON-LD

Drei Dateien in `src/jsonld/`. Der Betrieb selbst (`HomeAndConstructionBusiness`, `@id` `https://handwerker-blesius.de/#betrieb`) steht global im Layout und wird hier nur referenziert. Kein `aggregateRating`, kein `offers` mit Preis, vorerst kein `image` (es gibt noch kein bestätigtes Laminat-Foto; danach `"image": "https://handwerker-blesius.de/assets/img/<name>-1600.jpg"` ergänzen).

**`service-laminat.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://handwerker-blesius.de/leistungen/laminat/#leistung",
  "name": "Laminat verlegen",
  "serviceType": "Laminatverlegung",
  "description": "Beratung, Verkauf und Verlegung von Laminat für Wohnräume, Büros und Mietobjekte, schwimmend auf passender Trittschalldämmung, mit Untergrundvorbereitung, Sockelleisten und Übergangsprofilen.",
  "url": "https://handwerker-blesius.de/leistungen/laminat/",
  "provider": {
    "@id": "https://handwerker-blesius.de/#betrieb"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Wermelskirchen"
    },
    {
      "@type": "City",
      "name": "Remscheid"
    },
    {
      "@type": "City",
      "name": "Solingen"
    },
    {
      "@type": "City",
      "name": "Wuppertal"
    },
    {
      "@type": "City",
      "name": "Burscheid"
    },
    {
      "@type": "City",
      "name": "Bergisch Gladbach"
    },
    {
      "@type": "City",
      "name": "Köln"
    }
  ],
  "audience": [
    {
      "@type": "Audience",
      "audienceType": "Privatkunden"
    },
    {
      "@type": "Audience",
      "audienceType": "Gewerbekunden"
    },
    {
      "@type": "Audience",
      "audienceType": "Vermieter"
    }
  ]
}
```

**`faq-laminat.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://handwerker-blesius.de/leistungen/laminat/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Laminat oder Vinyl: Was passt besser?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beide gibt es in Holz- und Steinoptik, und beide sind pflegeleicht. Laminat hat eine sehr harte Oberfläche und ist besonders kratzfest, klingt beim Gehen aber härter und verträgt keine Nässe in den Fugen. Vinyl ist elastischer, leiser und unempfindlich gegen Wasser. Für Bad, Küche und Eingang ist deshalb Vinyl die bessere Wahl, in Wohn- und Schlafräumen und im Büro ist Laminat oft die preisgünstigere. Was zu Ihrem Raum passt, besprechen wir gern vor Ort."
      }
    },
    {
      "@type": "Question",
      "name": "Kann Laminat in die Küche oder ins Bad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In die Küche nur mit Vorsicht. Laminat verträgt Spritzer, aber kein Wasser, das in den Fugen stehen bleibt, und ein undichter Geschirrspüler kann den Boden in kurzer Zeit beschädigen. Es gibt Laminat mit besonders geschützten Kanten, für die Küche empfehlen wir trotzdem meist Vinyl. Im Bad mit Dusche oder Wanne raten wir von Laminat ab. Dort ist Vinyl die sichere Wahl."
      }
    },
    {
      "@type": "Question",
      "name": "Kann Laminat auf eine Fußbodenheizung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wenn Laminat und Unterlage vom Hersteller für Fußbodenheizung freigegeben sind. Die Unterlage muss die Wärme gut durchlassen, sonst reagiert die Heizung träge. Auf den Heizestrich gehört eine Dampfbremse unter die Dämmung. Außerdem muss der Heizestrich vor dem Verlegen nach Protokoll aufgeheizt und ausreichend trocken sein. Das klären wir vor der Verlegung."
      }
    },
    {
      "@type": "Question",
      "name": "Wie pflege ich Laminat richtig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Am besten trocken, mit Besen oder Staubsauger mit Hartbodendüse, denn Sand wirkt unter Schuhsohlen wie Schleifpapier. Zum Wischen das Tuch gut auswringen und einen milden Reiniger nehmen, der für Laminat geeignet ist. Dampfreiniger, Scheuermittel, Wachs und Öl gehören nicht auf Laminat. Filzgleiter unter Stuhl- und Tischbeinen und eine Fußmatte am Eingang halten Kratzer fern."
      }
    },
    {
      "@type": "Question",
      "name": "Lässt sich eine beschädigte Diele austauschen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Abschleifen lässt sich Laminat nicht, aber einzelne Dielen können ersetzt werden. Liegt die Diele nah an der Wand, wird der Boden bis dorthin aufgenommen und neu verklickt. Mitten im Raum wird die beschädigte Diele herausgetrennt und eine neue eingesetzt. Damit das Dekor passt, lohnt es sich, nach der Verlegung ein paar Dielen aufzuheben."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet Laminat pro Quadratmeter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt vom Laminat selbst ab, also von Nutzungsklasse, Format und Oberfläche, außerdem von der Unterlage, von der Vorarbeit am Untergrund und von Leisten und Übergängen. In der Regel ist Laminat günstiger als Parkett. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten."
      }
    }
  ]
}
```

**`breadcrumb-laminat.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Start",
      "item": "https://handwerker-blesius.de/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Leistungen",
      "item": "https://handwerker-blesius.de/leistungen/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Laminat",
      "item": "https://handwerker-blesius.de/leistungen/laminat/"
    }
  ]
}
```

---

## 7. Live-Ding: Raum-Check

**Kundennutzen:** Die zwei Fragen, mit denen die meisten Laminat-Kunden kommen, lauten: „Darf das in meinen Raum?“ und „Welche Nutzungsklasse brauche ich?“ Im Baumarkt beantwortet sie niemand, und die falsche Klasse oder Laminat in der Küche merkt man erst Monate später. Der Raum-Check beantwortet beides mit einem Tipp, ehrlich, auch mit „Nicht empfohlen“. Die Wahl wird ins Anfrageformular übernommen, sodass der Kunde nichts erklären muss. Das spart beim ersten Telefonat die Rückfrage nach Raum und Nutzung. Keine Preise, keine Rechnerei.

**Platz:** im Abschnitt „Für welche Räume Laminat passt“, als Beweis der Behauptung. Kein eigener Abschnitt, keine eigene Überschrift.

**Aufbau:**
- `fieldset` mit `legend` **Wählen Sie Ihren Raum** und sieben echten Radio-Buttons als Chips (Pfeiltasten wechseln, Fokus sichtbar): Wohn- und Esszimmer · Schlaf- und Kinderzimmer · Küche · Bad · Flur und Eingang · Büro oder Laden · Keller. (Die Mittelpunkte hier dienen nur der Aufzählung im Deck; auf der Seite sind es einzelne Chips.)
- Ergebnisfeld daneben (Handy: darunter), `aria-live="polite"`.
- **Leerzustand:** Wählen Sie einen Raum. Hier erscheint dann, ob Laminat passt und welche Nutzungsklasse sinnvoll ist.
- **Ergebnis:**
  - Zeile 1 (groß): {Ergebnis}
  - **Nutzungsklasse:** {Nutzungsklasse}
  - {Begründung}
  - **Darauf achten:** {Darauf achten}
  - Button (primär, gleicher Name wie überall): **Angebot anfragen** → `{{root}}kontakt/?bodenart={bodenart}&raum={Schlüssel}&check=laminat`
  - Hilfszeile unter dem Button: Raum und Bodenart werden ins Anfrageformular übernommen.
  - Falls vorhanden: Textlink {Zusatzlink} → `{{root}}leistungen/vinyl/`
- **Feste Notiz im Ergebnisfeld (immer sichtbar):** Richtwerte ohne Besichtigung. Ob Laminat zu Ihrem Untergrund und Ihrer Nutzung passt, klären wir beim Termin vor Ort.

**Daten (sieben Räume):**

| Schlüssel `raum` | Chip | Ergebnis (Zeile 1) | Nutzungsklasse | Begründung | Darauf achten | `bodenart` | Zusatzlink |
|---|---|---|---|---|---|---|---|
| `wohnen` | Wohn- und Esszimmer | Gut geeignet | 22 oder höher, bei viel Betrieb 23 | Im Wohnzimmer zeigt Laminat seine Stärken: kratzfest unter Stühlen und Spielzeug, lichtbeständig vor großen Fenstern und leicht sauber zu halten. Mit einer guten Unterlage bleibt der Raum angenehm ruhig. | Filzgleiter unter Stuhl- und Tischbeine. Das Dekor am besten im eigenen Licht ansehen. | Laminat | – |
| `schlafen` | Schlaf- und Kinderzimmer | Gut geeignet | 21 oder höher im Schlafzimmer, 23 im Kinderzimmer | Im Schlafzimmer wird wenig gelaufen, dort genügt eine niedrige Nutzungsklasse. Im Kinderzimmer wird gespielt, gebaut und gerannt, dort lohnt sich eine höhere. Liegt der Raum im Obergeschoss, achten wir besonders auf die Trittschalldämmung. | Laminat ist hart. Zum Spielen auf dem Boden ist ein Teppich angenehm. Wer es insgesamt leiser mag, fragt nach Vinyl. | Laminat | – |
| `kueche` | Küche | Nur mit Vorsicht | 23 oder höher | Laminat verträgt Spritzer, aber kein Wasser, das in den Fugen steht. Ein undichter Geschirrspüler kann den Boden in kurzer Zeit beschädigen. Für die Küche empfehlen wir deshalb meist Vinyl. | Eine schwere Küchenzeile sollte nicht auf schwimmend verlegtem Laminat stehen. Wo der Boden endet, legen wir beim Aufmaß fest. | Noch offen | Mehr über Vinyl |
| `bad` | Bad | Nicht empfohlen | – | Im Bad mit Dusche oder Wanne raten wir von Laminat ab. Nässe in den Fugen lässt den Kern aus Holzfaser aufquellen. Vinyl ist hier die sichere Wahl, auch in Holz- oder Steinoptik. | Es gibt Laminat, das für Feuchträume angeboten wird. Ob es zu Ihrem Bad passt, prüfen wir gern. Die sichere Wahl bleibt Vinyl. | Vinyl | Mehr über Vinyl |
| `flur` | Flur und Eingang | Im Flur gut, am Eingang mit Schmutzfang | 23 oder höher | Im Flur wird viel gelaufen, hier zahlt sich eine hohe Nutzungsklasse aus. Direkt an der Haustür kommen Sand und nasse Schuhe dazu. Eine große Fußmatte oder eine Schmutzfangzone hält beides vom Laminat fern. | Wo der Eingang oft nass wird, ist Vinyl die entspanntere Wahl. | Laminat | Mehr über Vinyl |
| `gewerbe` | Büro oder Laden | Gut geeignet, mit Gewerbeklasse | 31 oder höher im Büro, 32 oder 33 bei viel Kundschaft | Für Büros und Ladenflächen gibt es Laminat in Nutzungsklassen für gewerbliche Räume. Es ist kratzfest, leicht zu reinigen und in ruhigen Dekoren zu haben. | Unter Bürostühlen weiche Rollen für Hartböden oder eine Schutzmatte. Am Eingang eine Schmutzfangzone. | Laminat | – |
| `keller` | Keller | Nur wenn der Raum trocken ist | je nach Nutzung des Raums | In einem trockenen, beheizten Kellerraum, etwa einem Hobby- oder Gästezimmer, ist Laminat möglich, mit Dampfbremse unter der Dämmung. Ob der Boden trocken genug ist, prüfen wir vorher. In feuchte Keller gehört kein Laminat. | Der Untergrund muss dauerhaft trocken bleiben, auch im Sommer, wenn sich in Kellern leicht Feuchtigkeit niederschlägt. | Laminat | – |

Die Schlüssel `wohnen`, `schlafen`, `kueche`, `bad`, `flur` und `gewerbe` sind dieselben wie im Wegweiser auf `leistungen/`. Neu ist nur `keller`.

**Übergabe ans Formular:** Auf `kontakt/` liest `site.js` die Parameter. `bodenart` wird gegen die Optionsliste geprüft (Parkett, Vinyl, Laminat, Teppich, Treppe, Untergrund, Noch offen) und gesetzt. Ist das Nachrichtenfeld leer, kommt hinein: „Raum: {Chip}. Erste Einschätzung von der Laminat-Seite: {Ergebnis}.“ Beispiel: „Raum: Küche. Erste Einschätzung von der Laminat-Seite: Nur mit Vorsicht.“ Der Kunde kann alles ändern. Nichts wird gespeichert oder gezählt (keine Cookies, kein Tracking, siehe `docs/HOSTING.md`).

**Bewegung:** Ergebniswechsel mit kurzer Blende und 8 px Hub (0,3 s), die gewählte Chip-Fläche wechselt in Orange mit dunkler Schrift. Bei `prefers-reduced-motion`: sofortiger Wechsel.

**Ohne JavaScript:** Fieldset und Ergebnisfeld sind ausgeblendet, die Tabelle aus Abschnitt 3 ist offen und zeigt dieselben Inhalte. Die Anfrage-Links im Kopf und im Abschluss funktionieren ohnehin.

---

## 8. Vom Kunden zu bestätigen

1. **Fotos `dachgeschoss` und `dach-sonne`:** Welches Material liegt dort, Laminat oder Vinyl, und hat Ihr Team es verlegt? Bei Laminat: Bildunterschrift „Laminat in Holzoptik“ (oder das genaue Dekor), `dachgeschoss` wird Kopfbild, die Schnittzeichnung rückt in den Abschnitt „Was Laminat kann und was nicht“, und das Foto kommt ins Service-JSON-LD. Bei Vinyl: Beide Fotos wandern auf die Vinyl-Seite, und der Dekor-Abschnitt braucht ein anderes Bild.
2. **Laminat-Projektfotos:** Gibt es Fotos von Laminatböden, die Ihr Team verlegt hat? Dann bekommt die Seite eine kleine Galerie „Laminat aus unseren Projekten“ wie die Parkett-Seite.
3. **Verlegeart:** Verlegen Sie Laminat immer schwimmend, oder auch verklebt? (Text: „in aller Regel schwimmend“.)
4. **Dekor mischen:** Stimmt der Satz „Beim Verlegen mischen wir Dielen aus mehreren Paketen“?
5. **Muster:** Bringen Sie Dekormuster zum Termin mit? Bisher steht nur „Sehen Sie es sich, wenn möglich, bei Tageslicht und bei Lampenlicht an“. Bei Ja: „Wir bringen Muster zum Termin mit.“
6. **Fischgrät aus Laminat:** Haben Sie das im Angebot? (optionaler Satz im Dekor-Abschnitt)
7. **Raum-Check:** Passen die Richtwerte für die Nutzungsklasse und die Einschätzungen zu Ihrer Beratung, vor allem Küche („Nur mit Vorsicht, meist Vinyl“), Bad („Nicht empfohlen“) und Keller („Nur wenn der Raum trocken ist“)?
8. **Vermieter:** Arbeiten Sie für Vermieter und Hausverwaltungen? Darf der Abschnitt „Für Vermieter und Eigentümer“ so stehen?
9. **Gewerbe:** Verlegen Sie Laminat in Gewerbeklasse in Büros und Ladenflächen? Können Sie zusagen, den Zeitplan so abzustimmen, dass der Betrieb „möglichst wenig gestört“ wird (abschnittsweise, abends, am Wochenende)?
10. **Material:** Liefern Sie Dämmung, Dampfbremse, Sockelleisten und Profile immer mit? (Text: „Welche Unterlage wir wählen“.)
11. **Altbelag:** Entfernen steht im Text. Entsorgen Sie ihn auch? (Steht bewusst nicht im Text.)
12. **Übergabe:** Erklären Sie bei der Übergabe die Pflege? (gleicher Satz wie auf der Parkett-Seite)
13. **Übrige Dielen:** Lassen Sie dem Kunden Restdielen da? Bisher gibt der Text nur den Tipp, welche aufzuheben.
14. **Treppen mit Laminat:** Belegen Sie Treppen auch mit Laminat? Bisher wird das auf der Seite nicht behauptet.
15. **Türen und Zargen:** Kürzen Sie Türen oder Zargen, wenn der Boden höher wird? (Text: „prüfen wir beim Aufmaß, ob Türen und Übergänge dazu passen“.)

**Für die Umsetzung (nicht Kunde):**
- Partial `src/partials/laminat-aufbau.html` (Inline-SVG) neu anlegen und auf `leistungen/` und hier einbinden. Auf `leistungen/` ohne Dampfbremse und Estrich, hier mit.
- `site.js`: Raum-Schlüssel `keller` („Keller“) ergänzen und den Parameter `check=laminat` für den Nachrichtentext auswerten. Werte nur aus einer festen Liste übernehmen, nichts ungeprüft ins DOM schreiben.
- Anker: `#raeume`, `#unterlage`, `#sparen`, `#ablauf`, `#faq`.
- Im CTA-Band-Partial Eyebrow und `<em>` entfernen (House rules).
- Lint-Hinweis: Das Wort „robust“ steht in `lint.mjs` auf der Liste der Werbefloskeln (WARN). Auf dieser Seite kommt es deshalb nicht vor; im Parkett-Deck steht es im Verweis auf Laminat („wenn es vor allem robust und pflegeleicht sein soll“) und sollte dort „strapazierfähig“ heißen.
