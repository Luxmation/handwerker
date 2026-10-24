# Copy-Deck: Vinyl

Seite `leistungen/vinyl/` · Quelldatei-Vorschlag `src/pages/leistungen-vinyl.html` · Stand 24.10.2026

Alle Texte sind veröffentlichungsreif. Zwischen Zahl und Einheit, in der Telefonnummer, in der Hausnummer und vor „Uhr“ stehen geschützte Leerzeichen (U+00A0). Überschriften haben keinen Schlusspunkt, kein kursives oder farbiges Wort und keine Eyebrow darüber. Die Bildnamen stammen aus `src/images.json`. Aufbau, Schreibweisen und Link-Parameter folgen dem Copy-Deck Parkett (`docs/copy/parkett.md`), damit die Leistungsseiten wie aus einem Guss wirken.

Fachaussagen sind allgemein gültig formuliert („in der Regel“, „wenn der Hersteller es freigibt“). Es stehen keine Preise, Garantien, Markennamen, Jahreszahlen oder Projektzahlen auf der Seite.

---

## 1. Seitenkopf

```
<!--
title: Vinylboden verlegen in Wermelskirchen | Handwerker Blesius
description: Klick- oder Klebevinyl in Holz- und Steinoptik, auch für Küche und Bad: Beratung, Verkauf und Verlegung samt Untergrund. Jetzt Angebot anfragen.
path: leistungen/vinyl/
nav: leistungen
css: leistungen
jsonld: service-vinyl, faq-vinyl, breadcrumb-vinyl
-->
```

| Feld | Länge | Grenze |
|---|---|---|
| title | 58 Zeichen | ≤ 60 |
| description | 144 Zeichen | ≤ 155 |
| H1 „Vinylboden in Wermelskirchen“ | 28 Zeichen | ≤ 32 |

Im Menü und in der Breadcrumb heißt die Seite kurz „Vinyl“. In H1 und Title steht „Vinylboden“, weil Kunden so suchen („Vinylboden verlegen“, „Vinylboden Wermelskirchen“).

Open Graph: `og:title` = title, `og:description` = description. Bild global `assets/img/og-image.jpg`. Seitenbezogen eignet sich ein Querformat besser als das Hochformat aus dem Kopf: `bad-vinyl-1600.jpg`, so beschnitten, dass Duschgel und Handtuch am Wannenrand nicht zu sehen sind.

**Teaser für die Leistungsübersicht und die Startseite:**
Vinyl: Klick oder Klebe, in Holz- oder Steinoptik. Fußwarm, leise im Raum und pflegeleicht, mit dem passenden Produkt auch für Küche und Bad.

---

## 2. Argument

Wer liest: Hausbesitzer, Wohnungseigentümer, Vermieter und Mieter im Bergischen Land und in Köln, die Küche, Bad, Dachgeschoss oder die ganze Wohnung erneuern. Dazu Gewerbekunden mit Büro oder Ladenfläche. Sie haben von Vinyl gehört, weil es nach Holz oder Stein aussieht und Wasser verträgt. Unsicher sind sie bei Klick oder Klebe, beim Bad, bei Fußbodenheizung, beim Trittschall für die Nachbarn unten und bei der Frage, ob es auf die alten Fliesen kann.

Was sie nach einem Bildschirm glauben sollen: Blesius berät, liefert und verlegt Vinyl aus einer Hand, sagt mir ehrlich, wo Vinyl passt und wo nicht, und bereitet den Untergrund so vor, dass sich nichts durchdrückt.

Was sie als Nächstes tun: die vier Fragen zum Raum beantworten und mit diesen Angaben anfragen, Fotos per WhatsApp schicken oder anrufen.

| Abschnitt | Behauptung | Beweis |
|---|---|---|
| Kopf | Vinylboden in Wermelskirchen, beraten, verkauft und verlegt von einem Betrieb | großes Projektfoto (`vinyl-grau`) mit Dielen und Sockelleisten, Region, Telefon, Anfrage-Knopf |
| Holzoptik oder Steinoptik | Vinyl bringt das Bild von Holz oder Stein in jeden Raum | zwei echte Böden nebeneinander: Holzoptik im Dachgeschoss (`dachgeschoss`), Steinoptik im Bad (`bad-vinyl`), je mit Wirkung, Format, passenden Räumen |
| Was Vinyl kann und was nicht | Vinyl hat klare Stärken und ein paar Grenzen, und beides sollte man vorher kennen | Aufbau in drei Schichten, ehrliche Liste mit sechs Eigenschaften, auch den unbequemen |
| Für welche Räume Vinyl passt | Vinyl passt fast überall, im Bad aber nur mit dem richtigen Produkt | Raumliste mit klaren Grenzen (Holzfaserträger, Wintergarten, Duschbereich) und das Live-Ding „Vier Fragen zu Ihrem Raum“ |
| Klickvinyl oder Klebevinyl | Untergrund, Fläche und Nutzung entscheiden über das System | Gegenüberstellung beider Systeme, Vergleichstabelle mit sieben Kriterien, Schnittzeichnung der Schichten |
| Trittschall und Fußbodenheizung | Diese zwei Fragen klären wir vor jeder Vinylverlegung | Erklärung Trittschall/Gehschall, Regeln zur Unterlage, Bedingungen für Fußbodenheizung |
| Vinyl zeigt jede Unebenheit | Ein dünner Boden ist nur so gut wie sein Untergrund | Foto vom vorbereiteten Estrich (`untergrund`), Untergrund-Leistungen laut Kundenangaben |
| So bleibt Vinyl schön | Vinyl braucht wenig Pflege, aber die richtige | sechs konkrete Pflegeregeln, darunter die Gummi-Falle |
| Vom Aufmaß bis zur Übergabe | Der Weg zum fertigen Boden ist klar | fünf Schritte aus dem tatsächlichen Ablauf |
| Fischgrät geht auch in Vinyl (nur nach Bestätigung) | Auch das klassische Muster gibt es in Vinyl, und wir verlegen es | drei echte Fotos (`fischgraet-raum`, `fischgraet-hell`, `fischgraet-weit`) |
| Häufige Fragen zu Vinyl | Offene Fragen werden ehrlich beantwortet | fünf Antworten ohne Preise und Garantien |
| Was zum Vinylboden dazugehört | Zum Boden gehören Leisten, Übergänge und oft die Treppe | Links zu Treppen, Untergrund, Zubehör und den anderen Böden, ein Treppenfoto (`treppe-weiss`) |
| Abschluss | Der erste Schritt ist klein | Fotos, Fläche und der Hinweis zur Fußbodenheizung genügen; Telefon, WhatsApp, Formular |

---

## 3. Abschnitte

### Kopf (`.page-hero`)

**Breadcrumb:** Start › Leistungen › Vinyl
(`{{root}}` › `{{root}}leistungen/` › aktuelle Seite, `aria-current="page"`)

**H1:** Vinylboden in Wermelskirchen

**Untersatz (`.lead`):**
Klick- oder Klebevinyl in Holz- und Steinoptik, für Wohnräume, Küche und Bad: Wir beraten, verkaufen und verlegen es, den Untergrund eingeschlossen.

**Text:**
Für Wohnungen, Häuser, Büros und Ladenflächen in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln. Größere Projekte übernehmen wir deutschlandweit.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Vinyl`
- Sekundär (Ghost-Button mit Telefon-Icon): **0159 0171 7249** → `tel:+4915901717249`
- Kleine Zeile darunter: Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr

**Bild:** `vinyl-grau` · `pos="45% 62%"` (Hochformat; im Querschnitt den Boden zeigen, die helle Türzarge rechts unten möglichst abschneiden) · `loading="eager" fetchpriority="high"`
- Alt: Leerer Raum mit grauem Vinylboden in Holzoptik, lange Dielen mit versetzten Stößen und sichtbaren Ästen, weiße Sockelleisten, unter dem Fenster ein Heizkörper
- Bildunterschrift: Vinyl in grauer Holzoptik mit weißen Sockelleisten

---

### Holzoptik oder Steinoptik

**H2:** Holzoptik oder Steinoptik (25 Zeichen)

**Untersatz:**
Vinyl gibt es als Diele mit dem Bild von Holz und als Platte mit dem Bild von Stein, für fast jeden Stil und jeden Raum.

**Text:**
Das Dekor ist gedruckt und liegt unter einer klaren Schutzschicht. Viele Böden haben zusätzlich eine geprägte Oberfläche, die der Maserung oder der Steinstruktur folgt. So sieht der Boden nicht nur nach Holz oder Stein aus, er fühlt sich auch nicht glatt an.

Zwei Tafeln nebeneinander (Handy: untereinander), jede mit Foto, H3, Text, kleiner Tabelle und Anfrage-Link.

**Tafel „Holzoptik“**

H3: Holzoptik

Dielen in Holzoptik gibt es von hell bis dunkel, ruhig oder rustikal mit Ästen, in verschiedenen Längen und Breiten und auch im Fischgrätmuster. Sie liegen wie Parkett im Verband, mit versetzten Stößen. So bringen sie die Wirkung von Holz auch dorthin, wo echtes Holz an seine Grenzen kommt: in die Küche, in den Flur mit Straßenschuhen und, mit dem passenden Produkt, ins Bad.

| | |
|---|---|
| Wirkung | warm, wohnlich |
| Format | Dielen in vielen Längen und Breiten, auch Fischgrät |
| Passt zu | Wohn- und Schlafräumen, Fluren, Küchen, Dachgeschossen |

Button (sekundär, Textlink-Stil): **Mit Holzoptik anfragen** → `{{root}}kontakt/?bodenart=Vinyl&optik=holz`

Bild: `dachgeschoss` · `pos="62% 78%"` (Boden und Fenster zeigen, das Kabel an der Decke oben abschneiden)
- Alt: Dachgeschossraum mit Schräge und zwei Fenstern zum Garten, Boden in warmer, mittelbrauner Holzoptik mit weißen Sockelleisten
- Bildunterschrift: Dachgeschoss, Boden in Holzoptik
  (Bestätigt der Kunde, dass es Vinyl ist: „Dachgeschoss, Vinyl in Holzoptik“. Ist es Laminat, wandert das Foto auf die Laminat-Seite, siehe Punkt 8.)

**Tafel „Steinoptik“**

H3: Steinoptik

Platten in Steinoptik erinnern an Schiefer, Beton oder Naturstein und werden wie Fliesen im Raster oder versetzt verlegt. Anders als Fliesen fühlen sie sich warm an, klingen leiser und kommen ohne Mörtelfugen aus, in denen sich Schmutz sammelt. In Bad, Küche und Eingang sind sie eine ruhige, pflegeleichte Wahl.

| | |
|---|---|
| Wirkung | ruhig, klar |
| Format | Platten in Fliesenformaten |
| Passt zu | Bädern, Küchen, Fluren, Eingängen |

Button (sekundär, Textlink-Stil): **Mit Steinoptik anfragen** → `{{root}}kontakt/?bodenart=Vinyl&optik=stein`

Bild: `bad-vinyl` · `pos="40% 78%"` (Duschgel, Shampoo und Handtuch am Wannenrand oben abschneiden; die Türschwelle mit dem Profil unten rechts im Bild lassen)
- Alt: Blick durch eine geöffnete Holztür in ein Bad mit grauem Vinylboden in Steinoptik, große Platten versetzt verlegt, an der Türschwelle ein Übergangsprofil zum Fliesenboden davor
- Bildunterschrift: Bad, Vinyl in Steinoptik, an der Tür ein Übergangsprofil

**Text unter den Tafeln:**
Welches Dekor zu Ihrem Licht, Ihren Möbeln und Türen passt, besprechen wir beim Termin vor Ort.

*Optionaler Satz, nur nach Freigabe (Punkt 8):* Muster bringen wir dazu mit.

---

### Was Vinyl kann und was nicht

**H2:** Was Vinyl kann und was nicht (28 Zeichen)

**Untersatz:**
Vinyl sieht aus wie Holz oder Stein, ist aber ein elastischer Boden mit eigenen Stärken und ein paar Grenzen.

**Text:**
Ein Vinylboden ist aus mehreren Schichten aufgebaut. Unten liegt ein Kern, der der Diele Halt gibt, darüber die bedruckte Dekorschicht und obenauf eine klare Nutzschicht, die vor Abrieb und Kratzern schützt. Wie strapazierfähig ein Boden ist, hängt vor allem von dieser Nutzschicht ab.

**Eigenschaften (`dl`, Begriff fett, Erklärung daneben; auf dem Desktop zweispaltig):**

- **Unempfindlich gegen Wasser von oben.** Die Oberfläche nimmt keine Feuchtigkeit auf. Verschüttetes wischen Sie einfach weg. Ob Vinyl auch ins Bad darf, hängt vom Aufbau ab, mehr dazu [weiter unten](#raeume).
- **Fußwarm und angenehm im Schritt.** Vinyl fühlt sich wärmer an als Fliese oder Stein und gibt beim Gehen ganz leicht nach.
- **Leise im Raum.** Weil das Material elastisch ist, klingen Schritte auf Vinyl gedämpfter als auf Laminat.
- **Pflegeleicht.** Fegen, saugen, nebelfeucht wischen. Ölen oder Versiegeln entfällt.
- **Kein Holz.** Vinyl lässt sich nicht abschleifen. Tiefe Kratzer und Druckstellen bleiben. Beschädigte Dielen lassen sich aber je nach Verlegeart einzeln austauschen.
- **Empfindlich gegen Hitze und Gummi.** Vinyl dehnt sich bei starker Wärme aus, etwa vor bodentiefen Fenstern in der Sonne. Gummifüße und Matten mit Gummirücken können Flecken hinterlassen.

*(Kein Bild. Die ehrliche Liste trägt den Abschnitt. Optional eine kleine Schnittzeichnung der drei Schichten neben dem Text, gleiche Bildsprache wie die Zeichnung bei „Klickvinyl oder Klebevinyl“.)*

---

### Für welche Räume Vinyl passt

**H2:** Für welche Räume Vinyl passt (28 Zeichen) · `id="raeume"`

**Untersatz:**
Für fast jeden Raum im Haus und mit dem passenden Produkt auch für Küche und Bad.

**Text (Liste, `dl` oder kurze Absätze mit fettem Raumnamen):**

- **Wohn- und Schlafräume.** Warm unter den Füßen und leise im Raum. In Holzoptik wirkt Vinyl wie eine Diele und nimmt es nicht übel, wenn ein Glas umkippt.
- **Küche.** Spritzwasser, Fett und Krümel wischen Sie einfach weg. Ein schwimmend verlegter Klickboden endet in der Regel am Sockel der Einbauküche und läuft nicht darunter. Soll der Boden unter der Küche durchgehen, ist verklebtes Vinyl meist die bessere Wahl.
- **Bad und Gäste-WC.** Gut möglich, wenn der Hersteller das Produkt für Feuchträume freigibt. Klickvinyl mit einem Träger aus Holzfaser gehört nicht ins Bad. An Wanne, Dusche und WC kommt es auf dichte Anschlüsse an, damit kein Wasser unter den Boden läuft. Im Duschbereich selbst ersetzt Vinyl keine Abdichtung.
- **Flur und Eingang.** Viel Betrieb, Sand und Nässe von draußen. Eine kräftige Nutzschicht und eine Fußmatte am Eingang halten den Boden lange schön.
- **Dachgeschoss und Etagenwohnung.** Vinyl baut flach auf, das hilft bei Türen und Übergängen. Wohnt jemand unter Ihnen, kommt es auf die passende Trittschalldämmung an, mehr dazu [weiter unten](#trittschall).
- **Wintergarten und große Fensterfronten.** Wo viel Sonne direkt auf den Boden fällt, wird Vinyl warm und dehnt sich aus. Hersteller raten dort meist zu verklebtem Vinyl oder schließen den Einsatz ganz aus. Das prüfen wir, bevor wir Ihnen ein Produkt empfehlen.
- **Büro und Ladenfläche.** Leise, pflegeleicht und belastbar, wenn Nutzschicht und Nutzungsklasse zum Betrieb passen. Große Flächen werden häufig verklebt, unter Bürostühle gehören weiche Rollen.

**Live-Ding:** Direkt unter der Liste sitzt „Vier Fragen zu Ihrem Raum“ (siehe Punkt 7). Es ist der Beweis dieses Abschnitts: Der Kunde sieht sofort, worauf es in seinem Raum ankommt.

*(Kein eigenes Foto. Das Bad-Foto steht direkt darüber in der Tafel „Steinoptik“.)*

---

### Klickvinyl oder Klebevinyl

**H2:** Klickvinyl oder Klebevinyl (26 Zeichen)

**Untersatz:**
Beide Systeme haben ihren Platz, und welches zu Ihrem Raum passt, entscheiden Untergrund, Fläche und Nutzung.

**Spalte „Klickvinyl“ (H3)**
Die Dielen werden über eine Klick-Verbindung ineinandergesteckt und liegen schwimmend, also ohne Kleber, auf dem Untergrund. Viele Produkte haben die Trittschalldämmung schon auf der Rückseite, bei anderen kommt eine dafür freigegebene Unterlage darunter. Klickvinyl ist zügig verlegt und lässt sich später wieder ausbauen. Weil der Boden sich als Ganzes bewegt, braucht er Abstand zu den Wänden und je nach Hersteller Übergangsprofile in Türen und auf großen Flächen. Achten Sie auf den Kern: Klickvinyl mit Holzfaserträger verträgt keine Nässe, Produkte mit wasserfestem Kern sind für Feuchträume gedacht, wenn der Hersteller sie dafür freigibt.

**Spalte „Klebevinyl“ (H3)**
Die dünnen Dielen oder Platten werden vollflächig auf den Untergrund geklebt. Der Boden liegt fest, klingt gedämpft und gibt die Wärme einer Fußbodenheizung direkt an den Raum weiter. Große Flächen und mehrere Räume lassen sich ohne Profile in einem Stück verlegen, und eine beschädigte Diele kann einzeln ersetzt werden. Dafür verlangt Klebevinyl einen sehr ebenen, glatten Untergrund, denn jede Fuge und jedes Korn darunter zeichnet sich an der Oberfläche ab. Der Estrich wird deshalb vorher in der Regel vollflächig gespachtelt.

**Schnittzeichnung (inline SVG, `role="img"`, zwischen den Spalten oder darüber):**
Zwei Schichtstapel nebeneinander, flache Flächen ohne Linienraster, Beschriftung in der Textschrift rechts neben jeder Schicht.
- Klickvinyl, von oben: Klickvinyl mit Kern · Trittschalldämmung, oft schon unter der Diele · Estrich
- Klebevinyl, von oben: Klebevinyl · Kleber · Spachtelmasse · Grundierung · Estrich
- `aria-label`: „Schichtaufbau im Vergleich: Klickvinyl liegt mit Trittschalldämmung schwimmend auf dem Estrich. Klebevinyl ist auf einen grundierten und gespachtelten Estrich geklebt.“
- Farben: Vinyl im Grau aus `vinyl-grau`, Estrich und Spachtelmasse in Steintönen, Graphit `#525252` für den Kern, Orange nur für die Spachtelschicht (die Arbeit, die man später nicht mehr sieht).

**Vergleichstabelle (echte `<table>` mit `<caption class="visually-hidden">Klickvinyl und Klebevinyl im Vergleich</caption>`; Linien sind bei Tabellen erlaubt):**

| | Klickvinyl | Klebevinyl |
|---|---|---|
| Verlegung | schwimmend, Dielen werden geklickt | vollflächig verklebt |
| Untergrund | eben, fest und trocken | sehr eben und glatt, meist vollflächig gespachtelt |
| Fußbodenheizung | möglich, wenn freigegeben; auch die Unterlage muss passen | möglich, wenn freigegeben; die Wärme kommt direkt an |
| Gehgeräusch | leise, etwas heller als verklebt | gedämpft |
| Große Flächen | je nach Hersteller Profile in Türen und auf großen Flächen | in einem Stück ohne Profile möglich |
| Viel Sonne, Wintergarten | eher ungeeignet | eher möglich, wenn freigegeben |
| Später ausbauen | einfach | aufwendig |

**Text unter der Tabelle:**
Beim Aufmaß sehen wir uns Untergrund, Fläche und Heizung an und empfehlen Ihnen das System, das zu Ihrem Raum passt. An Wänden, Türen und Zargen schließen wir mit Sockelleisten und Übergangsprofilen sauber ab.

---

### Trittschall und Fußbodenheizung

**H2:** Trittschall und Fußbodenheizung (31 Zeichen) · `id="trittschall"`

**Untersatz:**
Zwei Fragen klären wir vor jeder Vinylverlegung, weil sie über die richtige Unterlage und das richtige Produkt entscheiden.

**Spalte „Trittschall“ (H3)**
Trittschall ist das, was beim Gehen durch die Decke in den Raum darunter dringt. Was Sie im Raum selbst hören, heißt Gehschall, und dabei ist Vinyl angenehm leise. Gegen Trittschall hilft eine Dämmung. Bei Klickvinyl sitzt sie oft schon auf der Rückseite der Diele, sonst kommt eine Unterlage darunter, die der Hersteller für sein Produkt freigibt. Zu weiche Unterlagen belasten die Klick-Verbindung und gehören nicht unter Vinyl. In Etagenwohnungen kann es außerdem Vorgaben der Hausverwaltung oder der Eigentümergemeinschaft zum Trittschall geben. Fragen Sie im Zweifel vorher nach, wir richten die Auswahl danach.

**Spalte „Fußbodenheizung“ (H3)**
Vinyl eignet sich in der Regel gut für Fußbodenheizung, weil es dünn ist und die Wärme schnell an den Raum abgibt. Voraussetzung ist, dass das Produkt dafür freigegeben ist. Verklebtes Vinyl liegt direkt auf dem Estrich und gibt die Wärme besser weiter als schwimmend verlegtes, bei Klickvinyl muss auch die Unterlage für Fußbodenheizung geeignet sein. Die Oberflächentemperatur darf die Angabe des Herstellers nicht überschreiten, und der Heizestrich muss vor der Verlegung nach Protokoll aufgeheizt und trocken sein. Eine Fußbodenkühlung ist nicht mit jedem Produkt möglich.

**Hinweis-Zeile (unter den Spalten):**
Sagen Sie uns bei der Anfrage, ob eine Fußbodenheizung liegt. Dann berücksichtigen wir das von Anfang an.

*(Kein Bild. Die zwei Spalten tragen den Abschnitt. Auf dem Desktop nebeneinander, am Handy untereinander.)*

---

### Vinyl zeigt jede Unebenheit

**H2:** Vinyl zeigt jede Unebenheit (27 Zeichen)

**Untersatz:**
Vinyl ist dünn und elastisch, deshalb beginnt eine gute Vinylverlegung bei uns am Untergrund.

**Text:**
Bei einem dünnen, weichen Boden zeichnet sich ab, was darunter liegt: Fliesenfugen, Kanten, Dellen, manchmal sogar ein einzelnes Sandkorn. Bei Klickvinyl leiden außerdem die Verbindungen, wenn der Boden nicht eben aufliegt. Bevor wir Vinyl verlegen, prüfen wir deshalb Ebenheit, Festigkeit und Feuchte des Untergrunds. Was nicht passt, machen wir passend:

- Alte Beläge wie Teppich, PVC oder Laminat entfernen, samt Kleberresten
- Schleifen und fräsen, bis der Estrich tragfähig und sauber ist
- Grundieren, damit Spachtelmasse und Kleber sicher halten
- Spachteln und nivellieren, bis die Fläche eben ist, für Klebevinyl in der Regel vollflächig

Ob vorhandene Fliesen liegen bleiben können, klären wir beim Termin vor Ort.

**Link:** Mehr zur Untergrundvorbereitung → `{{root}}leistungen/untergrund/`

**Bild:** `untergrund` · `pos="50% 62%"`
- Alt: Vorbereiteter Estrich nach dem Schleifen und Spachteln, eben und bereit für den neuen Boden
- Bildunterschrift: Vorher: geschliffener und gespachtelter Estrich

---

### So bleibt Vinyl schön

**H2:** So bleibt Vinyl schön (21 Zeichen)

**Untersatz:**
Vinyl braucht wenig Pflege, aber die richtige.

**Liste (`ul`, fetter Anfang; auf dem Desktop zweispaltig):**

- **Trocken reinigen.** Staubsauger oder weicher Besen. Sand und Steinchen wirken unter Schuhsohlen wie Schleifpapier.
- **Nebelfeucht wischen.** Ein gut ausgewrungenes Tuch und ein milder Reiniger für Vinylböden genügen. Scheuermittel und scharfe Lösungsmittel greifen die Oberfläche an. Ob ein Dampfreiniger erlaubt ist, steht in der Pflegeanleitung des Herstellers.
- **Filz statt Gummi.** Filzgleiter unter Stuhl- und Tischbeine. Gummifüße, Gummirollen und Matten mit Gummi- oder Latexrücken können Vinyl dauerhaft verfärben.
- **Weiche Rollen unter Bürostühlen.** Oder eine Schutzmatte, die für Vinyl geeignet ist.
- **Sonne im Blick behalten.** Vor großen Fenstern mit viel direkter Sonne schützen Vorhänge oder Jalousien den Boden vor starker Erwärmung.
- **Möbel anheben, nicht schieben.** Schwere Möbel beim Umstellen tragen oder auf Gleitern bewegen, damit keine Kratzer und Druckstellen entstehen.

**Abschlusssatz:**
Bei der Übergabe erklären wir Ihnen, welche Pflege Ihr Boden braucht.

*(Kein Bild. Auf dem Desktop kann der Abschnitt neben „Trittschall und Fußbodenheizung“ als ruhige Textfläche stehen, wenn die Seite zu lang wird.)*

---

### Vom Aufmaß bis zur Übergabe

**H2:** Vom Aufmaß bis zur Übergabe (27 Zeichen)

**Untersatz:**
So läuft ein Vinylauftrag bei uns ab, und Sie wissen jederzeit, was als Nächstes kommt.

**Schritte (`ol`, Reihenfolge über die Position, keine „01“-Nummern):**

1. **Anfrage.** Rufen Sie an, schreiben Sie per WhatsApp oder nutzen Sie das Formular. Fotos vom Raum und die ungefähre Fläche in m² helfen uns bei der Vorbereitung. Sagen Sie uns auch, was jetzt auf dem Boden liegt und ob eine Fußbodenheizung vorhanden ist.
2. **Beratung und Aufmaß.** Wir kommen zu Ihnen, messen auf, prüfen den Untergrund und besprechen Optik, Format und ob Klick oder Klebe besser zu Ihrem Raum passt.
3. **Angebot.** Sie erhalten ein individuelles Angebot für Material, Untergrund und Verlegung, mit Sockelleisten und Übergangsprofilen.
4. **Untergrund und Verlegung.** Je nach Herstellerangabe liegt das Vinyl vorher einige Zeit im Raum, damit es sich an die Temperatur gewöhnt. Dann bereiten wir den Untergrund vor und verlegen, mit Sockelleisten, Profilen und Anschlüssen an Türen und Zargen.
5. **Übergabe.** Wir räumen auf, gehen den fertigen Boden mit Ihnen durch und erklären Ihnen die Pflege.

**CTA:** Angebot anfragen → `{{root}}kontakt/?bodenart=Vinyl`

---

### Fischgrät geht auch in Vinyl (nur nach Bestätigung, Punkt 8)

Dieser Abschnitt erscheint nur, wenn der Kunde bestätigt, dass die drei Fischgrät-Fotos Vinyl zeigen (Variante A). Sonst entfällt er (Variante B); der Satz „auch im Fischgrätmuster“ in der Tafel „Holzoptik“ bleibt als allgemeine Aussage stehen.

**H2:** Fischgrät geht auch in Vinyl (28 Zeichen)

**Untersatz:**
Das klassische Zickzack gibt es auch als Vinyl, zum Kleben oder zum Klicken.

**Text:**
Fischgrät in Vinyl verbindet das Bild eines Altbauparketts mit einer Oberfläche, die Wasser von oben verträgt. Das Muster verlangt dieselbe Sorgfalt wie bei Holz: Die Mittelachse muss im Raum stimmen, und an jeder Wand werden Stäbe passend angeschnitten. Weil Fischgrät meist verklebt wird, muss der Untergrund besonders eben sein.

**Galerie (3 Bilder, ungleich groß, Bildunterschrift = Raum und Material, ohne Ort, Jahr oder m²):**

| Bild | pos | Alt | Bildunterschrift |
|---|---|---|---|
| `fischgraet-raum` | `50% 70%` | Leerer Raum mit Vinylboden im Fischgrätmuster in warmem Holzton, weiße Sockelleisten | Fischgrätmuster in Vinyl, Wohnraum |
| `fischgraet-hell` | `50% 72%` | Raum mit Vinylboden im Fischgrätmuster im Tageslicht, weiße Wände und Sockelleisten | Fischgrät im Tageslicht |
| `fischgraet-weit` | `30% 55%` | Weiter Raum mit Vinylboden im Fischgrätmuster, im Hintergrund ein Durchgang | Fischgrät, offener Grundriss |

Hinweis `fischgraet-hell`: Oben rechts stehen Flaschen auf der Fensterbank. Ausschnitt so wählen, dass sie nicht zu sehen sind.
Hinweis `fischgraet-weit`: Unten rechts liegt ein dünnes Reststück auf dem Estrich. Ausschnitt so wählen, dass es nicht zu sehen ist, oder Bildunterschrift „Fischgrät, kurz vor der Fertigstellung“.

**Link:** Alle Projekte ansehen → `{{root}}projekte/` (falls die Projektseite einen Filter per Anker bekommt: `{{root}}projekte/#vinyl`)

Bei Variante A werden dieselben Fotos auf der Parkett-Seite ersetzt oder als „hier in Vinyl“ beschriftet (siehe `docs/copy/parkett.md`, Punkt 8.1).

---

### Häufige Fragen zu Vinyl

**H2:** Häufige Fragen zu Vinyl (23 Zeichen) · `id="faq"`

**Untersatz:**
Kurze, ehrliche Antworten, und alles Weitere klären wir gern am Telefon oder vor Ort.

Antworten siehe Punkt 4 (`.faq`, `details`/`summary`, die erste Frage offen).

---

### Was zum Vinylboden dazugehört

**H2:** Was zum Vinylboden dazugehört (29 Zeichen)

**Untersatz:**
Ein Boden ist erst fertig, wenn Kanten, Übergänge und die Treppe dazu passen.

Drei Verweise (als Liste mit Bild nur beim ersten, keine Reihe gleicher Karten):

- **Treppen** → `{{root}}leistungen/treppen/`
  Tritt- und Setzstufen passend zum neuen Boden, gerade oder gewendelt.
  Bild: `treppe-weiss` · `pos="50% 70%"` (den Hund oben auf dem Absatz möglichst abschneiden) · Alt: Gerade Treppe mit Trittstufen im warmen Holzton und weißen Setzstufen, oben und unten derselbe Boden · Bildunterschrift: Treppe mit Trittstufen im Holzton und weißen Setzstufen
- **Untergrund** → `{{root}}leistungen/untergrund/`
  Prüfen, alte Beläge entfernen, schleifen, grundieren, spachteln.
- **Sockelleisten und Übergänge** → `{{root}}leistungen/`
  Sockelleisten passend zum Boden oder in Weiß, Übergangsprofile zu Fliesen und anderen Böden, saubere Anschlüsse an Türen und Zargen.

**Zeile darunter (Fließtext mit Links):**
Doch lieber ein anderer Boden? [Parkett](leistungen/parkett/), wenn Sie echtes Holz unter den Füßen möchten, [Laminat](leistungen/laminat/) für Wohnräume mit viel Betrieb, [Teppich](leistungen/teppich/) für Schlafzimmer und Treppen.

---

### Abschluss (CTA-Band, Vinyl-Fassung)

**H2:** Planen Sie Ihren Vinylboden (27 Zeichen)

**Untersatz:**
Ein paar Fotos, die ungefähre Fläche und ein Wort zur Fußbodenheizung genügen für den Anfang.

**Text:**
Wir melden uns und vereinbaren einen Termin für Beratung und Aufmaß.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Vinyl`
- Sekundär: **0159 0171 7249** → `tel:+4915901717249`
- Textlink: **Fotos per WhatsApp schicken** → `https://wa.me/4915901717249`

**Zwei kleine Zeilen:**
Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr
Neuenhöhe 17, 42929 Wermelskirchen

Umsetzung: wie auf der Parkett-Seite. Das Partial `src/partials/cta-band.html` ohne Eyebrow und ohne `<em>`, Überschrift und Untersatz per Parameter oder als Vinyl-Fassung direkt in der Seite.

---

## 4. FAQ

Fünf Fragen (die SPEC verlangt 3–5, die Aufgabe 4–6). Der Text der Antworten ist wortgleich im JSON-LD (`faq-vinyl.json`) enthalten.

**Ist Vinyl wasserfest und fürs Bad geeignet?**
Die Oberfläche von Vinyl nimmt kein Wasser auf, verschüttetes Wasser schadet ihr nicht. Ob ein Vinylboden ins Bad darf, hängt aber vom Aufbau ab. Klebevinyl und Klickvinyl mit wasserfestem Kern kommen infrage, wenn der Hersteller sie für Feuchträume freigibt. Klickvinyl mit einem Träger aus Holzfaser verträgt keine Nässe und gehört nicht ins Bad. Wichtig sind außerdem dichte Anschlüsse an Wanne, Dusche und Wänden, damit kein Wasser unter den Boden läuft. Im Duschbereich selbst ersetzt Vinyl keine Abdichtung.

**Klickvinyl oder Klebevinyl: Was ist besser?**
Keins von beiden ist grundsätzlich besser. Klickvinyl ist zügig verlegt, braucht keinen Kleber und lässt sich wieder ausbauen. Klebevinyl liegt fest, klingt gedämpfter, kommt auf großen Flächen ohne Übergangsprofile aus und verträgt Fußbodenheizung und sonnige Räume in der Regel besser. Dafür braucht es einen sehr ebenen, meist vollflächig gespachtelten Untergrund. Welches System zu Ihrem Raum passt, entscheiden wir gemeinsam beim Aufmaß.

**Kann Vinyl auf eine Fußbodenheizung?**
In der Regel ja, wenn das Produkt dafür freigegeben ist. Vinyl ist dünn und gibt die Wärme schnell an den Raum ab, verklebtes Vinyl noch etwas besser als schwimmend verlegtes. Bei Klickvinyl muss auch die Unterlage für Fußbodenheizung geeignet sein. Die Oberflächentemperatur darf die Angabe des Herstellers nicht überschreiten, und der Heizestrich muss vorher nach Protokoll aufgeheizt und trocken sein. Das klären wir vor der Verlegung.

**Kann Vinyl auf alte Fliesen verlegt werden?**
Oft ja, wenn die Fliesen fest liegen, eben und unbeschädigt sind. Für Klebevinyl wird der Fliesenboden vorher in der Regel vollflächig gespachtelt, sonst zeichnen sich die Fugen nach einiger Zeit an der Oberfläche ab. Klickvinyl ist hier etwas nachsichtiger, doch auch dafür nennen die Hersteller Grenzen für Fugenbreite und Unebenheiten. Außerdem muss die neue Aufbauhöhe zu Türen und Übergängen passen. Das prüfen wir beim Aufmaß.

**Was kostet ein Vinylboden pro Quadratmeter?**
Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt vom Produkt ab, also von Aufbau, Nutzschicht und Format, davon, ob geklickt oder geklebt wird, und vor allem davon, wie viel am Untergrund zu tun ist. Klebevinyl braucht meist mehr Vorarbeit. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten.

*Reserve-Fragen (nur wenn eine sechste gewünscht ist, dann auch ins JSON-LD übernehmen):*

**Wie empfindlich ist ein Vinylboden?**
Im Alltag ist Vinyl strapazierfähig: Wasser von oben, Krümel und spielende Kinder machen ihm wenig aus. Wie viel er aushält, hängt von der Nutzschicht ab, der klaren Schutzschicht obenauf. Spitze Absätze, schwere Möbel ohne Gleiter und Sand unter den Schuhen können Kratzer und Druckstellen hinterlassen, und Gummifüße oder Matten mit Gummirücken können Flecken verursachen. Abschleifen lässt sich Vinyl nicht. Beschädigte Dielen können aber je nach Verlegeart einzeln ersetzt werden.

**Ist Vinyl dasselbe wie ein PVC-Boden?**
Die meisten Vinylböden bestehen wie der frühere PVC-Belag zu einem großen Teil aus PVC. Der Unterschied liegt im Aufbau: Statt einer dünnen Bahn von der Rolle sind es mehrschichtige Dielen und Platten mit einer bedruckten Dekorschicht und einer klaren Nutzschicht obenauf. Sie sehen aus wie Holz oder Stein, sind in der Regel strapazierfähiger und werden geklickt oder verklebt.

---

## 5. Interne Links

| Ziel | Linktext | Stelle |
|---|---|---|
| `{{root}}` | Start | Breadcrumb |
| `{{root}}leistungen/` | Leistungen | Breadcrumb, „Sockelleisten und Übergänge“ |
| `{{root}}leistungen/parkett/` | Parkett | „Was zum Vinylboden dazugehört“ |
| `{{root}}leistungen/laminat/` | Laminat | „Was zum Vinylboden dazugehört“ |
| `{{root}}leistungen/teppich/` | Teppich | „Was zum Vinylboden dazugehört“ |
| `{{root}}leistungen/treppen/` | Treppen | „Was zum Vinylboden dazugehört“ (mit Bild) |
| `{{root}}leistungen/untergrund/` | Mehr zur Untergrundvorbereitung / Untergrund | „Vinyl zeigt jede Unebenheit“, „Was zum Vinylboden dazugehört“ |
| `{{root}}projekte/` | Alle Projekte ansehen | Fischgrät-Galerie (Variante A); bei Variante B als Textlink unter der Tafel „Holzoptik“: „Weitere Böden in unseren Projekten“ |
| `{{root}}kontakt/?bodenart=Vinyl` | Angebot anfragen | Kopf, Ablauf, Abschluss |
| `{{root}}kontakt/?bodenart=Vinyl&optik=holz` / `…&optik=stein` | Mit Holzoptik anfragen / Mit Steinoptik anfragen | Tafeln „Holzoptik“ und „Steinoptik“ |
| `{{root}}kontakt/?bodenart=Vinyl&raum=…&optik=…&heizung=…&boden=…` | Mit diesen Angaben anfragen | Live-Ding „Vier Fragen zu Ihrem Raum“ |
| `#raeume` | weiter unten | „Was Vinyl kann und was nicht“ (Wasser) |
| `#trittschall` | weiter unten | Räume (Dachgeschoss) |
| `#faq` | – | Sprungziel, z. B. aus dem Seitenmenü |
| `tel:+4915901717249` | 0159 0171 7249 | Kopf, Abschluss |
| `https://wa.me/4915901717249` | Fotos per WhatsApp schicken | Abschluss |

Rückverweise auf diese Seite von: Startseite (Leistungsliste), `leistungen/`, `leistungen/parkett/` (Räume: Bad; „Was zum Parkett dazugehört“), `leistungen/laminat/` (Bad und Küche), `leistungen/untergrund/` („Klebevinyl braucht vollflächige Spachtelung“), `projekte/` (Bildunterschriften der Vinyl-Fotos).

---

## 6. JSON-LD

Drei Dateien in `src/jsonld/`. Der Betrieb selbst (`HomeAndConstructionBusiness`, `@id` `https://handwerker-blesius.de/#betrieb`) steht global im Layout und wird hier nur referenziert. Kein `aggregateRating`, kein `offers` mit Preis.

**`service-vinyl.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://handwerker-blesius.de/leistungen/vinyl/#leistung",
  "name": "Vinylboden verlegen",
  "serviceType": "Verlegung von Vinylböden",
  "description": "Beratung, Verkauf und Verlegung von Vinylböden als Klick- oder Klebevinyl in Holz- und Steinoptik, für Wohnräume, Küche und Bad, mit Untergrundvorbereitung, Sockelleisten und Übergangsprofilen.",
  "url": "https://handwerker-blesius.de/leistungen/vinyl/",
  "image": "https://handwerker-blesius.de/assets/img/vinyl-grau-1600.jpg",
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
    }
  ]
}
```

**`faq-vinyl.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://handwerker-blesius.de/leistungen/vinyl/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ist Vinyl wasserfest und fürs Bad geeignet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Oberfläche von Vinyl nimmt kein Wasser auf, verschüttetes Wasser schadet ihr nicht. Ob ein Vinylboden ins Bad darf, hängt aber vom Aufbau ab. Klebevinyl und Klickvinyl mit wasserfestem Kern kommen infrage, wenn der Hersteller sie für Feuchträume freigibt. Klickvinyl mit einem Träger aus Holzfaser verträgt keine Nässe und gehört nicht ins Bad. Wichtig sind außerdem dichte Anschlüsse an Wanne, Dusche und Wänden, damit kein Wasser unter den Boden läuft. Im Duschbereich selbst ersetzt Vinyl keine Abdichtung."
      }
    },
    {
      "@type": "Question",
      "name": "Klickvinyl oder Klebevinyl: Was ist besser?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keins von beiden ist grundsätzlich besser. Klickvinyl ist zügig verlegt, braucht keinen Kleber und lässt sich wieder ausbauen. Klebevinyl liegt fest, klingt gedämpfter, kommt auf großen Flächen ohne Übergangsprofile aus und verträgt Fußbodenheizung und sonnige Räume in der Regel besser. Dafür braucht es einen sehr ebenen, meist vollflächig gespachtelten Untergrund. Welches System zu Ihrem Raum passt, entscheiden wir gemeinsam beim Aufmaß."
      }
    },
    {
      "@type": "Question",
      "name": "Kann Vinyl auf eine Fußbodenheizung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In der Regel ja, wenn das Produkt dafür freigegeben ist. Vinyl ist dünn und gibt die Wärme schnell an den Raum ab, verklebtes Vinyl noch etwas besser als schwimmend verlegtes. Bei Klickvinyl muss auch die Unterlage für Fußbodenheizung geeignet sein. Die Oberflächentemperatur darf die Angabe des Herstellers nicht überschreiten, und der Heizestrich muss vorher nach Protokoll aufgeheizt und trocken sein. Das klären wir vor der Verlegung."
      }
    },
    {
      "@type": "Question",
      "name": "Kann Vinyl auf alte Fliesen verlegt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oft ja, wenn die Fliesen fest liegen, eben und unbeschädigt sind. Für Klebevinyl wird der Fliesenboden vorher in der Regel vollflächig gespachtelt, sonst zeichnen sich die Fugen nach einiger Zeit an der Oberfläche ab. Klickvinyl ist hier etwas nachsichtiger, doch auch dafür nennen die Hersteller Grenzen für Fugenbreite und Unebenheiten. Außerdem muss die neue Aufbauhöhe zu Türen und Übergängen passen. Das prüfen wir beim Aufmaß."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet ein Vinylboden pro Quadratmeter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt vom Produkt ab, also von Aufbau, Nutzschicht und Format, davon, ob geklickt oder geklebt wird, und vor allem davon, wie viel am Untergrund zu tun ist. Klebevinyl braucht meist mehr Vorarbeit. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten."
      }
    }
  ]
}
```

**`breadcrumb-vinyl.json`**

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
      "name": "Vinyl",
      "item": "https://handwerker-blesius.de/leistungen/vinyl/"
    }
  ]
}
```

---

## 7. Live-Ding: „Vier Fragen zu Ihrem Raum“

**Kundennutzen:** Wer Vinyl möchte, steht vor Fragen, die er allein schwer beantworten kann: Darf es ins Bad? Was ist mit der Fußbodenheizung? Muss der alte Boden raus? Vier Antworten per Fingertipp genügen, und der Kunde sieht sofort, worauf es in seinem Raum ankommt. Mit einem Knopf gehen die Angaben ins Anfrageformular. Der Kunde muss nichts formulieren, und Blesius spart beim ersten Telefonat die Rückfragen. Das Werkzeug empfiehlt kein Produkt und nennt keinen Preis. Es zeigt die Punkte, die beim Aufmaß ohnehin geprüft werden.

**Platz:** im Abschnitt „Für welche Räume Vinyl passt“, direkt unter der Raumliste. Kein eigener Abschnitt.

**H3:** Vier Fragen zu Ihrem Raum (25 Zeichen)

**Satz darunter:**
Tippen Sie an, was auf Ihren Raum zutrifft, und Sie sehen, worauf es bei Ihnen ankommt.

**Aufbau (fortschreitende Verbesserung, funktioniert ohne JavaScript):**
Ein echtes `<form method="get" action="{{root}}kontakt/">` mit verstecktem Feld `bodenart=Vinyl` und vier `<fieldset>` mit `<legend>` und echten Radio-Buttons, gestaltet als Segment-Schalter. Ohne JavaScript schickt der Knopf die Auswahl als Parameter an die Kontaktseite. Mit JavaScript (oder per CSS `:has()`) erscheinen die passenden Hinweise sofort.

| Frage (`legend`) | Name | Antworten (Beschriftung → Wert) |
|---|---|---|
| Welcher Raum? | `raum` | Wohn- oder Schlafraum → `wohnen` · Küche → `kueche` · Bad oder WC → `bad` · Flur → `flur` · Dachgeschoss → `dach` · Büro oder Laden → `gewerbe` |
| Welche Optik? | `optik` | Holz → `holz` · Stein → `stein` · Noch offen → `offen` |
| Liegt eine Fußbodenheizung? | `heizung` | Ja → `ja` · Nein → `nein` · Weiß nicht → `unklar` |
| Was liegt jetzt auf dem Boden? | `boden` | Estrich → `estrich` · Fliesen → `fliesen` · Teppich, PVC oder Laminat → `altbelag` · Holzdielen → `dielen` · Weiß nicht → `unklar` |

Keine Antwort ist vorausgewählt. Jede Frage darf offen bleiben.

**Ausgabe:** eine Fläche „Darauf kommt es bei Ihnen an“ (H4 oder fetter Satz, `aria-live="polite"`). Sie zeigt je beantworteter Frage einen Hinweis, in der Reihenfolge der Fragen. Vor der ersten Antwort steht dort: „Wählen Sie oben aus, die Hinweise erscheinen hier.“

| Antwort | Hinweis |
|---|---|
| Wohn- oder Schlafraum | Klick und Klebe sind beide möglich. Hier entscheiden vor allem Optik, Format und wie leise der Boden sein soll. |
| Küche | Ein schwimmend verlegter Klickboden endet in der Regel am Küchensockel. Soll der Boden unter der Küche durchgehen, ist verklebtes Vinyl meist die bessere Wahl. |
| Bad oder WC | Nur Vinyl, das der Hersteller für Feuchträume freigibt. Klickvinyl mit Holzfaserträger scheidet aus. An Wanne, Dusche und WC kommt es auf dichte Anschlüsse an. |
| Flur | Viel Betrieb und Schmutz von draußen: Eine kräftige Nutzschicht und eine Fußmatte am Eingang halten den Boden lange schön. |
| Dachgeschoss | Vinyl baut flach auf, das hilft bei Türen und Übergängen. Wohnt jemand unter Ihnen, kommt es auf die passende Trittschalldämmung an. Vor Fenstern mit viel Sonne ist verklebtes Vinyl oft die sicherere Wahl. |
| Büro oder Laden | Nutzschicht und Nutzungsklasse müssen zum Betrieb passen. Große Flächen werden häufig verklebt, unter Bürostühle gehören weiche Rollen. |
| Holz | Holzoptik gibt es von hell bis dunkel, ruhig oder mit Ästen, als lange Diele oder im Fischgrätmuster. |
| Stein | Steinoptik gibt es in Fliesenformaten, fußwärmer und leiser als echte Fliese. |
| Noch offen | Kein Problem. Beim Termin vor Ort sehen wir uns Licht, Möbel und Türen an und beraten Sie zur Optik. |
| Fußbodenheizung: Ja | Das Produkt muss für Fußbodenheizung freigegeben sein. Verklebtes Vinyl gibt die Wärme besser weiter, bei Klickvinyl muss auch die Unterlage passen. |
| Fußbodenheizung: Nein | (kein Hinweis) |
| Fußbodenheizung: Weiß nicht | Kein Problem, das klären wir beim Termin vor Ort, bevor ein Produkt ausgewählt wird. |
| Estrich | Wir prüfen Ebenheit, Festigkeit und Feuchte. Für Klebevinyl wird der Estrich in der Regel vollflächig gespachtelt. |
| Fliesen | Feste, ebene Fliesen können oft liegen bleiben. Für Klebevinyl werden sie vollflächig gespachtelt, damit sich die Fugen nicht abzeichnen. |
| Teppich, PVC oder Laminat | Der alte Belag kommt heraus, samt Kleberresten. Das übernehmen wir für Sie. |
| Holzdielen | Alte Dielen müssen fest liegen und dürfen nicht federn. Oft ist ein Ausgleich nötig, bevor Vinyl darauf kann. Das prüfen wir vor Ort. |
| Boden: Weiß nicht | Ein Foto vom jetzigen Boden genügt uns für den ersten Eindruck. |

**Knopf:** **Mit diesen Angaben anfragen** (Primärstil nur, wenn auf diesem Bildschirm kein anderer Primärknopf steht, sonst als kräftiger Textlink)

**Kleine Zeile unter dem Knopf:**
Ihre Auswahl landet nur im Anfrageformular. Es wird nichts gespeichert.

**Übergabe ans Formular:** Die Kontaktseite liest die Parameter (`site.js`). Bodenart „Vinyl“ wird ausgewählt, ins Nachrichtenfeld kommt zum Beispiel: „Interesse: Vinyl. Raum: Bad oder WC. Optik: Stein. Fußbodenheizung: ja. Jetziger Boden: Fliesen.“ Nur bekannte Werte aus der Tabelle oben werden übernommen (Whitelist), alles andere wird ignoriert. Der Kunde kann alles ändern. Keine Cookies, kein Tracking, keine Speicherung (siehe `docs/HOSTING.md`).

**Ohne JavaScript:** Die Fragen und der Knopf funktionieren als normales Formular. Gibt es weder JavaScript noch `:has()`, bleibt die Hinweisfläche ausgeblendet. Stattdessen steht unter der Überschrift: „Ihre Antworten übernehmen wir in die Anfrage. Die Einzelheiten klären wir beim Aufmaß.“

**Bewegung:** Hinweise blenden mit 8 px Hub und 80 ms Versatz ein, der aktive Schalter wechselt die Fläche ohne Sprung. Bei `prefers-reduced-motion`: sofortiger Wechsel.

**Barrierefreiheit:** echte Radio-Buttons (Pfeiltasten funktionieren nativ), sichtbarer Fokus, Segmente mindestens 44 px hoch, Hinweisfläche mit `aria-live="polite"`.

---

## 8. Vom Kunden zu bestätigen

1. **`dachgeschoss`: Vinyl oder Laminat?** Die Bildunterschrift lautet bisher neutral „Dachgeschoss, Boden in Holzoptik“. Ist es Vinyl, wird daraus „Dachgeschoss, Vinyl in Holzoptik“. Ist es Laminat, wandert das Foto auf die Laminat-Seite, und die Tafel „Holzoptik“ zeigt einen zweiten Ausschnitt von `vinyl-grau`; der Kopf nimmt dann `bad-vinyl`.
2. **Fischgrät-Fotos: Vinyl?** `fischgraet-raum`, `fischgraet-hell` und `fischgraet-weit` wirken wie Vinyl (gleichmäßige, sich wiederholende Maserung, dünnes Reststück auf `fischgraet-weit`). Bei Ja erscheint der Abschnitt „Fischgrät geht auch in Vinyl“ (Variante A), und die Parkett-Seite wird angepasst. Bei Nein entfällt er (Variante B).
3. **`vinyl-grau` und `bad-vinyl`: Klick oder Klebe?** Wenn bekannt, ergänzen wir die Bildunterschriften (z. B. „Klickvinyl in grauer Holzoptik“). Das macht die Seite konkreter.
4. **Übergangsprofil auf `bad-vinyl`:** Haben Sie das Profil an der Türschwelle gesetzt? Die Bildunterschrift erwähnt es bisher nur als sichtbares Detail.
5. **Einverständnis der Bauherren:** Dürfen die Fotos veröffentlicht werden? Auf `bad-vinyl` stehen persönliche Dinge am Wannenrand (werden weggeschnitten), auf `treppe-weiss` liegt ein Hund oben auf dem Absatz.
6. **Welche Vinylarten verkaufen und verlegen Sie?** Die Seite nennt Klickvinyl (mit Holzfaserträger und mit wasserfestem Kern), Klebevinyl, Holz- und Steinoptik und Fischgrät. Fehlt etwas, oder bieten Sie etwas davon nicht an?
7. **Bad: Anschlüsse an Wanne und Dusche.** Übernehmen Sie die dichten Randanschlüsse (zum Beispiel Silikon- oder Dichtband) selbst? Bisher steht nur allgemein „kommt es auf dichte Anschlüsse an“. Bei Ja: Satz im Abschnitt Räume ergänzen.
8. **Küche:** Verlegen Sie vor oder unter Einbauküchen, und arbeiten Sie dabei mit Küchenbauern zusammen? Bisher steht nur die allgemeine Regel.
9. **Treppen mit Vinyl:** Belegen Sie Treppen auch mit Vinyl? Bei Ja ergänzen wir bei „Was zum Vinylboden dazugehört“: „Auch Treppenstufen lassen sich mit Vinyl passend zum Boden belegen.“ Aus welchem Material sind die Trittstufen auf `treppe-weiss`?
10. **Muster zum Termin:** Bringen Sie Muster mit, oder gibt es eine Ausstellung? Bei Ja wird der optionale Satz unter den Optik-Tafeln freigeschaltet.
11. **Gewerbe:** Verlegen Sie Vinyl in Büros und Ladenflächen? Der Text nennt beides.
12. **Alte Beläge entfernen:** Gehört die Entsorgung dazu? Bisher steht nur „Der alte Belag kommt heraus, samt Kleberresten. Das übernehmen wir für Sie.“ (Live-Ding) und „entfernen“ (Untergrund).
13. **Pflege-Erklärung bei der Übergabe:** Dürfen wir „Bei der Übergabe erklären wir Ihnen, welche Pflege Ihr Boden braucht“ zusagen?
14. **Trittschall in Etagenwohnungen:** Passt der Hinweis auf mögliche Vorgaben von Hausverwaltung oder Eigentümergemeinschaft zu Ihrer Erfahrung, und haben Sie passende Unterlagen im Sortiment?
15. **Fachaussagen gegenlesen:** Alle Aussagen sind allgemein gehalten („in der Regel“, „wenn freigegeben“). Bitte prüfen, ob sie zu den Produkten passen, die Sie verkaufen, vor allem: Klickvinyl nicht unter die Einbauküche, verklebtes Vinyl bei viel Sonne, vollflächiges Spachteln für Klebevinyl, Dampfreiniger laut Herstellerangabe.
16. **`dach-sonne`** (Dachgeschoss im Ausbau, Sonne auf dem Boden) ist auf dieser Seite nicht verwendet. Zeigt es Vinyl, könnte es den Punkt „Vinyl dehnt sich in der Sonne aus“ bebildern.

**Für die Umsetzung (nicht Kunde):**
- Formular-Prefill in `static/assets/js/site.js` um `raum`, `optik`, `heizung` und `boden` erweitern (Whitelist der Werte aus Punkt 7, Beschriftungen wie in der Tabelle). `muster` von der Parkett-Seite bleibt.
- Startseite und Leistungsübersicht: Der Vinyl-Teaser in `docs/COPY-START.md` sagt „auch für Küche und Bad“ ohne Einschränkung. Vorschlag: den Teaser aus Punkt 1 übernehmen („mit dem passenden Produkt auch für Küche und Bad“).
- Im CTA-Band-Partial Eyebrow und `<em>` entfernen (House rules), wie auf der Parkett-Seite.
- Schnittzeichnungen (Klick/Klebe, optional drei Schichten) als Inline-SVG ohne Linienraster und ohne Nummern, Beschriftung in der Textschrift.
- Projekte-Filter: Anker oder Parameter für „Vinyl“ festlegen und den Link in der Galerie anpassen.
- Sprungziele `id="raeume"`, `id="trittschall"`, `id="faq"` setzen.
