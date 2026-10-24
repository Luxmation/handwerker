# Copy-Deck: Parkett

Seite `leistungen/parkett/` · Quelldatei-Vorschlag `src/pages/leistungen-parkett.html` · Stand 24.10.2026

Alle Texte sind veröffentlichungsreif. Zwischen Zahl und Einheit, in der Telefonnummer und vor „Uhr“ stehen geschützte Leerzeichen (U+00A0). Überschriften haben keinen Schlusspunkt, kein kursives oder farbiges Wort und keine Eyebrow darüber. Die Bildnamen stammen aus `src/images.json`.

---

## 1. Seitenkopf

```
<!--
title: Parkett verlegen in Wermelskirchen | Handwerker Blesius
description: Fertigparkett als Landhausdiele oder Fischgrät: Beratung, Verkauf und Verlegung inklusive Untergrund – im Bergischen Land und Köln. Jetzt Angebot anfragen.
path: leistungen/parkett/
nav: leistungen
css: leistungen
jsonld: service-parkett, faq-parkett, breadcrumb-parkett
-->
```

| Feld | Länge | Grenze |
|---|---|---|
| title | 55 Zeichen | ≤ 60 |
| description | 155 Zeichen | ≤ 155 |
| H1 „Parkett in Wermelskirchen“ | 25 Zeichen | ≤ 32 |

Open Graph: `og:title` = title, `og:description` = description, Bild `assets/img/og-image.jpg` (global) oder seitenbezogen `podest-led-1600.jpg`.

**Teaser für die Leistungsübersicht und die Startseite:**
Parkett: Echtholz als Landhausdiele oder im Fischgrätmuster. Wir beraten, verkaufen und verlegen es, vom Untergrund bis zur Sockelleiste.

---

## 2. Argument

Wer liest: Hausbesitzer, Wohnungseigentümer und Mieter im Bergischen Land und in Köln, die renovieren oder bauen und sich einen Holzboden wünschen. Dazu Gewerbekunden mit Büro- oder Ladenfläche. Sie wollen Holz, sind sich aber unsicher bei Format, Verlegeart, Oberfläche, Fußbodenheizung und Preis.

Was sie nach einem Bildschirm glauben sollen: Bei Blesius bekomme ich Parkett aus einer Hand, also Beratung, Verkauf und Verlegung, und die Böden auf den Fotos hat dieser Betrieb selbst verlegt.

Was sie als Nächstes tun: Angebot anfragen, mit Fotos und der ungefähren Fläche, oder anrufen.

| Abschnitt | Behauptung | Beweis |
|---|---|---|
| Kopf | Parkett in Wermelskirchen, beraten, verkauft und verlegt von einem Betrieb | großes Projektfoto (`podest-led`), Region, Telefon, Anfrage-Knopf |
| Echtes Holz, jede Diele anders | Parkett ist echtes Holz. Seine Eigenschaften sollte man kennen, auch die unbequemen. | Nahaufnahme `eiche-rustikal` mit Ästen und Rissen, ehrliche Liste der Eigenschaften |
| Landhausdiele oder Fischgrät | Das Format bestimmt, wie ein Raum wirkt | Musterwahl mit zwei echten Fotos (`flur-eiche`, `fischgraet-raum`) und den Unterschieden bei Verlegung und Verschnitt |
| Für welche Räume Parkett passt | Parkett passt fast überall, aber nicht in jeden Raum | Raumliste mit klarer Ausnahme (Bad, dort Vinyl), Fotos aus Küche und Wohnraum |
| Schwimmend oder verklebt | Die Verlegeart richtet sich nach Untergrund, Fläche und Heizung | Gegenüberstellung beider Verlegearten, Foto während der Verlegung (`kamin-verlegung`) |
| Geölt oder lackiert | Die Oberfläche entscheidet über Gefühl und Pflegeaufwand | Vergleichstabelle mit fünf Kriterien |
| So bleibt Parkett schön | Wenige Gewohnheiten genügen | sechs konkrete Pflegeregeln |
| Parkett braucht festen Grund | Ein guter Parkettboden beginnt beim Untergrund | Foto vom vorbereiteten Estrich (`untergrund`), Leistungen zum Untergrund laut Kundenangaben |
| Vom Aufmaß bis zur Übergabe | Der Weg zum fertigen Boden ist klar | fünf Schritte aus dem tatsächlichen Ablauf |
| Parkett aus unseren Projekten | Diese Böden hat das eigene Team verlegt | Galerie mit vier weiteren echten Fotos |
| Häufige Fragen zu Parkett | Offene Fragen werden ehrlich beantwortet | fünf Antworten ohne Preise und Garantien |
| Was zum Parkett dazugehört | Zum Boden gehören Treppe, Kanten und Übergänge | Links zu Treppen, Untergrund, Zubehör und anderen Böden |
| Abschluss | Der erste Schritt ist klein | Fotos und Fläche genügen; Telefon, WhatsApp, Formular |

---

## 3. Abschnitte

### Kopf (`.page-hero`)

**Breadcrumb:** Start › Leistungen › Parkett
(`{{root}}` › `{{root}}leistungen/` › aktuelle Seite, `aria-current="page"`)

**H1:** Parkett in Wermelskirchen

**Untersatz (`.lead`):**
Fertigparkett als Landhausdiele oder Fischgrät: Wir beraten, verkaufen und verlegen es, vom Untergrund bis zur Sockelleiste.

**Text:**
Für Wohnungen, Häuser und Büros in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln. Größere Projekte übernehmen wir deutschlandweit.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Parkett`
- Sekundär (Ghost-Button mit Telefon-Icon): **0159 0171 7249** → `tel:+4915901717249`
- Kleine Zeile darunter: Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr

**Bild:** `podest-led` · `pos="50% 72%"` (hängendes Kabel und Werkzeug oben rechts abschneiden) · `loading="eager" fetchpriority="high"`
- Alt: Wohnraum mit Eichen-Landhausdiele auf zwei Ebenen, verbunden durch breite Stufen mit Eichenkanten, unter einer Stufe ein LED-Lichtband
- Bildunterschrift: Wohnraum mit Podest, Eichen-Landhausdiele

---

### Echtes Holz, jede Diele anders

**H2:** Echtes Holz, jede Diele anders (30 Zeichen)

**Untersatz:**
Bei Parkett laufen Sie auf echtem Holz, mit Maserung, Ästen und Farbe aus dem Baum.

**Text:**
Fertigparkett ist mehrschichtig aufgebaut. Oben liegt die Nutzschicht aus Echtholz, darunter ein Träger, der die Diele formstabil hält. Die Oberfläche kommt fertig geölt oder lackiert aus dem Werk. Nach dem Verlegen muss deshalb nichts mehr geschliffen oder versiegelt werden.

**Eigenschaften (`dl`, Begriff fett, Erklärung daneben):**

- **Warm unter den Füßen.** Holz leitet Wärme schlechter als Fliese oder Stein und fühlt sich deshalb auch barfuß angenehm an.
- **Lange nutzbar.** Je nach Stärke der Nutzschicht lässt sich die Oberfläche später abschleifen und neu behandeln.
- **Jede Diele ein Einzelstück.** Keine gleicht der anderen. In rustikaler Sortierung zeigen sich Äste und Risse, in ruhiger Sortierung ein gleichmäßiges Holzbild.
- **Holz arbeitet.** Es nimmt Feuchtigkeit aus der Raumluft auf und gibt sie wieder ab. Im Winter können sich deshalb feine Fugen zeigen, die sich im Sommer wieder schließen.
- **Weicher als Laminat.** Stuhlbeine, Krallen und Absätze hinterlassen auf Holz eher Spuren. Mit Filzgleitern und einer Fußmatte am Eingang halten sie sich in Grenzen, und mit den Jahren entsteht eine Patina, die zum Holz gehört.

**Bild:** `eiche-rustikal` · `pos="50% 85%"` (nur den Boden zeigen, das private Wandbild oben links abschneiden)
- Alt: Wohnraum mit Eichenparkett in rustikaler Sortierung, lebhafte Maserung mit Ästen und dunklen Rissen
- Bildunterschrift: Eiche rustikal, Wohnraum

---

### Landhausdiele oder Fischgrät (mit Musterwahl)

**H2:** Landhausdiele oder Fischgrät (28 Zeichen)

**Untersatz:**
Das Format bestimmt, wie ein Raum wirkt: ruhig und weit oder lebendig und klassisch.

Hier sitzt das Live-Ding (siehe Punkt 7). Ohne JavaScript stehen beide Tafeln nebeneinander (Handy: untereinander), mit JavaScript schaltet die Musterwahl zwischen ihnen um.

**Bedienelement:** Gruppenname „Verlegemuster“ (für Screenreader, sichtbar als kleine Zeile oder nur `aria-label`) · Schalter **Landhausdiele** · **Fischgrät**

**Tafel „Landhausdiele“**

H3: Landhausdiele

Lange, breite Dielen, oft über die ganze Raumlänge. Es gibt wenige Fugen und viel sichtbares Holz, dadurch bleibt das Bild ruhig und der Raum wirkt größer. In langen Fluren und offenen Wohnräumen kommt die Diele besonders zur Geltung, vor allem wenn sie in Richtung des Lichteinfalls oder entlang der längsten Wand liegt.

| | |
|---|---|
| Wirkung | ruhig, großzügig |
| Verlegung | schwimmend oder verklebt |
| Verschnitt | gering |
| Passt zu | Wohnräumen, Fluren, offenen Grundrissen |

Button (sekundär, Textlink-Stil): **Mit Landhausdiele anfragen** → `{{root}}kontakt/?bodenart=Parkett&muster=Landhausdiele`

Bild: `flur-eiche` · `pos="50% 72%"`
- Alt: Langer Flur mit Eichen-Landhausdielen in Längsrichtung, rechts eine weiße Tür mit Glaseinsatz
- Bildunterschrift: Flur, Eichendiele in Längsrichtung verlegt

**Tafel „Fischgrät“**

H3: Fischgrät

Kurze Stäbe, im rechten Winkel zueinander verlegt, sodass ein durchgehendes Zickzack entsteht. Das Muster bringt Bewegung in den Raum und erinnert an Altbauwohnungen und Stadthäuser. Es verlangt genaue Planung: Die Mittelachse muss im Raum stimmen, und an jeder Wand werden Stäbe passend angeschnitten.

| | |
|---|---|
| Wirkung | lebendig, klassisch |
| Verlegung | meist verklebt, es gibt auch Klick-Systeme |
| Verschnitt | höher als bei Dielen |
| Passt zu | Wohn- und Esszimmern, Altbauten |

Button (sekundär, Textlink-Stil): **Mit Fischgrät anfragen** → `{{root}}kontakt/?bodenart=Parkett&muster=Fischgr%C3%A4t`

Bild: `fischgraet-raum` · `pos="50% 70%"`
- Alt: Leerer Raum mit Boden im Fischgrätmuster in warmem Holzton, weiße Sockelleisten
- Bildunterschrift: Fischgrätmuster, Wohnraum
  (Falls der Kunde bestätigt, dass es Vinyl ist: „Fischgrätmuster, hier in Vinyl“. Siehe Punkt 8.)

**Text unter den Tafeln:**
Neben dem Format entscheiden Holzart, Sortierung und Farbton. Auf unseren Fotos sehen Sie vor allem Eiche, von ruhig bis rustikal. Was zu Ihrem Raum, Ihrem Licht und Ihren Möbeln passt, besprechen wir beim Termin vor Ort.

*Optionaler Satz, nur nach Freigabe (Punkt 8):* Fertigparkett gibt es außerdem als Schiffsboden, bei dem mehrere schmale Stäbe auf einer Diele sitzen. Sprechen Sie uns an, wenn Sie dieses Bild suchen.

---

### Für welche Räume Parkett passt

**H2:** Für welche Räume Parkett passt (30 Zeichen)

**Untersatz:**
In fast jeden Wohnraum. Wo es dauerhaft nass wird, raten wir Ihnen zu einem anderen Boden.

**Text (Liste, `dl` oder kurze Absätze mit fettem Raumnamen):**

- **Wohn- und Esszimmer.** Hier kommt Holz am meisten zur Geltung. Landhausdielen lassen große Flächen ruhig wirken, Fischgrät gibt dem Raum einen eigenen Charakter.
- **Schlaf- und Kinderzimmer.** Warm unter den Füßen und leicht sauber zu halten. Im Kinderzimmer ist eine strapazierfähige Oberfläche sinnvoll, zum Beispiel lackiert.
- **Flur und Diele.** Viel begangen und oft lang. In Längsrichtung verlegte Dielen lassen schmale Flure ruhiger wirken, und eine Fußmatte am Eingang hält Sand vom Holz fern.
- **Küche.** Gut möglich, wenn Wasser nicht stehen bleibt. Verschüttetes wischen Sie gleich auf, und vor Spüle und Geschirrspüler lohnt sich ein aufmerksamer Blick.
- **Büro und Ladenfläche.** Parkett macht Arbeitsräume wärmer und leiser im Ton. Unter Bürostühlen schützen weiche Rollen oder eine Schutzmatte die Oberfläche. Bei viel Publikumsverkehr beraten wir Sie, ob Parkett oder ein robusterer Belag die bessere Wahl ist.
- **Bad.** In Bädern mit Dusche oder Wanne raten wir von Parkett ab, weil Holz dauerhafte Feuchtigkeit nicht gut verträgt. Dort ist [Vinyl](leistungen/vinyl/) die bessere Wahl, auch in Holzoptik.

**Hinweis-Zeile (unter der Liste):**
Sie haben eine Fußbodenheizung? Parkett ist möglich, wenn es dafür freigegeben ist. Mehr dazu in den [Fragen unten](#faq).

**Bild 1:** `kueche-eiche` · `pos="50% 60%"`
- Alt: Offene Küche mit Kochinsel auf Eichen-Landhausdiele, unter dem Sockel der Insel ein LED-Lichtband
- Bildunterschrift: Küche, Eichen-Landhausdiele bis an die Kochinsel

**Bild 2:** `wohnzimmer-eiche` · `pos="50% 75%"`
- Alt: Heller Wohnraum mit Eichen-Landhausdiele, zwei Fenster mit Heizkörpern darunter, Strahler an der Decke
- Bildunterschrift: Wohnraum, Eiche

---

### Schwimmend oder verklebt

**H2:** Schwimmend oder verklebt (24 Zeichen)

**Untersatz:**
Beides ist solides Handwerk. Welche Verlegeart zu Ihrem Raum passt, entscheiden Untergrund, Fläche und Heizung.

**Spalte „Schwimmend verlegt“ (H3)**
Die Dielen werden über eine Klick-Verbindung miteinander verbunden und liegen auf einer Trittschalldämmung, ohne mit dem Untergrund verklebt zu sein. Der Boden ist zügig verlegt und lässt sich später wieder ausbauen. Weil er sich als Ganzes bewegt, braucht er Abstand zu den Wänden und auf größeren Flächen Bewegungsfugen, etwa unter einem Übergangsprofil in der Tür. Beim Gehen klingt er etwas heller als ein verklebter Boden.

**Spalte „Vollflächig verklebt“ (H3)**
Jede Diele wird mit dem Untergrund verklebt. Der Boden liegt fest, klingt gedämpft und gibt die Wärme einer Fußbodenheizung besser an den Raum ab. Große, offene Flächen gelingen oft ohne Übergangsprofile, und Fischgrät wird in der Regel verklebt. Dafür muss der Untergrund eben, tragfähig und trocken sein, und ein späterer Ausbau ist aufwendiger.

**Text unter den Spalten:**
Beim Aufmaß prüfen wir, was Ihr Untergrund zulässt, und empfehlen Ihnen die Verlegeart, die zu Raum und Nutzung passt. An Wänden, Türen und Zargen schließen wir mit Sockelleisten und Übergangsprofilen sauber ab.

**Bild:** `kamin-verlegung` · `pos="50% 60%"`
- Alt: Eichendielen während der Verlegung in einem Wohnraum mit Kamin, im Vordergrund liegen noch einzelne Dielen lose
- Bildunterschrift: Während der Verlegung: Eichendielen rund um den Kamin

---

### Geölt oder lackiert

**H2:** Geölt oder lackiert (19 Zeichen)

**Untersatz:**
Die Oberfläche entscheidet, wie sich der Boden anfühlt und wie viel Pflege er im Alltag braucht.

**Vergleichstabelle (echte `<table>` mit `<caption class="visually-hidden">Geölte und lackierte Parkettoberflächen im Vergleich</caption>`; Linien sind bei Tabellen erlaubt):**

| | Geölt | Lackiert |
|---|---|---|
| Aussehen | matt und natürlich, die Poren des Holzes bleiben offen | von matt bis seidenglänzend, die Poren sind geschlossen |
| Gefühl | warm und holzig, leicht griffig | glatt und geschlossen |
| Im Alltag | etwas empfindlicher gegen Flecken, Verschüttetes schnell aufwischen | unempfindlicher gegen Flecken und Feuchtigkeit von oben |
| Kratzer | lassen sich oft stellenweise ausbessern und nachölen | sitzen in der Lackschicht und lassen sich meist nur flächig ausbessern |
| Pflege | Pflegemittel für geölte Böden, gelegentlich nachölen | Pflegemittel für lackierte Böden, sonst wenig Aufwand |

**Text unter der Tabelle:**
Als Faustregel: Wer das Holz spüren möchte und gern pflegt, wählt Öl. Wer es im Alltag einfach haben möchte, etwa mit Kindern oder Hund, ist mit Lack gut beraten. Moderne matte Lacke sehen dabei fast so natürlich aus wie Öl.

*(Kein Bild. Die Tabelle trägt den Abschnitt. Auf dem Desktop kann er neben „Schwimmend oder verklebt“ als zweite Entscheidung stehen.)*

---

### So bleibt Parkett schön

**H2:** So bleibt Parkett schön (23 Zeichen)

**Untersatz:**
Ein paar Gewohnheiten genügen, damit Ihr Boden über viele Jahre gut aussieht.

**Liste (`ul`, fetter Anfang):**

- **Trocken reinigen.** Staubsauger mit Parkettdüse oder ein weicher Besen. Sand wirkt unter Schuhsohlen wie Schleifpapier.
- **Nebelfeucht wischen.** Das Tuch gut auswringen. Es darf kein Wasser stehen bleiben, und Dampfreiniger gehören nicht auf Parkett.
- **Das passende Pflegemittel.** Für geölte und lackierte Böden gibt es jeweils eigene Mittel. Allzweckreiniger und Scheuermittel greifen die Oberfläche an.
- **Filzgleiter und Matten.** Filzgleiter unter Stuhl- und Tischbeine, eine Fußmatte an den Eingang, unter Bürostühle weiche Rollen oder eine Schutzmatte.
- **Gutes Raumklima.** Holz fühlt sich bei etwa 40 bis 60 % Luftfeuchte am wohlsten. In der Heizperiode hilft ein Luftbefeuchter gegen breite Fugen.
- **Nachölen, wenn geölt.** Ein geölter Boden wird je nach Beanspruchung gelegentlich nachgeölt. Wie oft, steht in der Pflegeanleitung des Herstellers.

**Abschlusssatz:**
Bei der Übergabe erklären wir Ihnen, welche Pflege Ihre Oberfläche braucht.

*(Kein Bild. Die Liste trägt den Abschnitt; auf dem Desktop zweispaltig.)*

---

### Parkett braucht festen Grund

**H2:** Parkett braucht festen Grund (28 Zeichen)

**Untersatz:**
Ein Holzboden ist nur so gut wie das, worauf er liegt. Deshalb beginnt jede Verlegung bei uns am Untergrund.

**Text:**
Unebenheiten drücken sich durch, lose Stellen knarzen, und ein zu feuchter Estrich lässt Holz aufquellen. Bevor wir Parkett verlegen, prüfen wir deshalb Ebenheit, Festigkeit und Feuchte des Untergrunds. Was nicht passt, machen wir passend:

- Alte Beläge wie Teppich, Vinyl oder Laminat entfernen, samt Kleberresten
- Schleifen und fräsen, bis der Estrich tragfähig und sauber ist
- Grundieren, damit Spachtelmasse und Kleber sicher halten
- Spachteln und nivellieren, bis die Fläche eben ist

Ob ein vorhandener Boden, zum Beispiel Fliesen, liegen bleiben kann, klären wir beim Termin vor Ort.

**Link:** Mehr zur Untergrundvorbereitung → `{{root}}leistungen/untergrund/`

**Bild:** `untergrund` · `pos="50% 62%"`
- Alt: Vorbereiteter Estrich nach dem Schleifen und Spachteln, bereit für den neuen Boden
- Bildunterschrift: Vorher: geschliffener und gespachtelter Estrich

---

### Vom Aufmaß bis zur Übergabe

**H2:** Vom Aufmaß bis zur Übergabe (27 Zeichen)

**Untersatz:**
So läuft ein Parkettauftrag bei uns ab. Sie wissen jederzeit, was als Nächstes kommt.

**Schritte (`ol`, Reihenfolge über die Position, keine „01“-Nummern):**

1. **Anfrage.** Rufen Sie an, schreiben Sie per WhatsApp oder nutzen Sie das Formular. Fotos vom Raum und die ungefähre Fläche in m² helfen uns bei der Vorbereitung. Sagen Sie uns auch, ob eine Fußbodenheizung liegt.
2. **Beratung und Aufmaß.** Wir kommen zu Ihnen, messen auf, prüfen den Untergrund und besprechen Format, Holz, Sortierung und Oberfläche.
3. **Angebot.** Sie erhalten ein individuelles Angebot für Material, Untergrund und Verlegung.
4. **Untergrund und Verlegung.** Je nach Herstellerangabe gewöhnt sich das Parkett vorher einige Zeit im Raum an Temperatur und Luftfeuchte. Dann bereiten wir den Untergrund vor und verlegen, mit Sockelleisten, Profilen und Anschlüssen.
5. **Übergabe.** Wir räumen auf, gehen den fertigen Boden mit Ihnen durch und erklären Ihnen die Pflege.

**CTA:** Angebot anfragen → `{{root}}kontakt/?bodenart=Parkett`

---

### Parkett aus unseren Projekten

**H2:** Parkett aus unseren Projekten (29 Zeichen)

**Untersatz:**
Alle Fotos auf dieser Seite zeigen Böden, die unser Team verlegt hat.

**Galerie (4 Bilder, ungleich groß, Bildunterschrift = Raum und Material, ohne Ort, Jahr oder m²):**

| Bild | pos | Alt | Bildunterschrift |
|---|---|---|---|
| `langer-raum` | `50% 75%` | Großer Raum mit langen Eichendielen bis zu einer schwarzen Sprossen-Glastür, darüber eine weiß gestrichene Holzdecke | Großer Wohnraum, Eiche rustikal |
| `fischgraet-hell` | `50% 70%` | Raum mit Boden im Fischgrätmuster im Tageslicht, weiße Wände und Sockelleisten | Fischgrätmuster im Tageslicht |
| `fischgraet-weit` | `30% 55%` | Weiter Raum mit Boden im Fischgrätmuster, im Hintergrund ein Durchgang | Fischgrätmuster, offener Grundriss |
| `wohnraum-tuer` | `50% 78%` | Wohnraum mit rustikalem Eichenparkett, im Hintergrund Fenster mit Holzrahmen | Wohnraum, Eiche rustikal |

Hinweis `fischgraet-weit`: Unten rechts liegt ein Reststück auf dem Estrich. Ausschnitt so wählen, dass es nicht zu sehen ist, oder Bildunterschrift „Fischgrätmuster, kurz vor der Fertigstellung“.
Wenn der Kunde bestätigt, dass die Fischgrät-Fotos Vinyl zeigen, werden sie hier ersetzt durch `wohnzimmer-eiche` oder `kueche-eiche` (im Ausschnitt) und auf die Vinyl-Seite verschoben.

**Link:** Alle Projekte ansehen → `{{root}}projekte/` (falls die Projektseite einen Filter per Anker bekommt: `{{root}}projekte/#parkett`)

---

### Häufige Fragen zu Parkett

**H2:** Häufige Fragen zu Parkett (25 Zeichen) · `id="faq"`

**Untersatz:**
Kurze, ehrliche Antworten. Alles Weitere besprechen wir gern am Telefon oder vor Ort.

Antworten siehe Punkt 4 (`.faq`, `details`/`summary`, die erste Frage offen).

---

### Was zum Parkett dazugehört

**H2:** Was zum Parkett dazugehört (26 Zeichen)

**Untersatz:**
Ein Boden ist erst fertig, wenn Treppe, Kanten und Übergänge dazu passen.

Drei Verweise (als Liste mit Bild nur beim ersten, keine Reihe gleicher Karten):

- **Treppen** → `{{root}}leistungen/treppen/`
  Trittstufen in Holz, passend zum neuen Boden, gerade oder gewendelt.
  Bild: `treppe-eiche` · `pos="55% 70%"` · Alt: Offene Treppe mit Trittstufen aus Eiche und schwarzem Metallgeländer · Bildunterschrift: Treppe, Trittstufen in Eiche
- **Untergrund** → `{{root}}leistungen/untergrund/`
  Prüfen, alte Beläge entfernen, schleifen, grundieren, spachteln.
- **Sockelleisten und Übergänge** → `{{root}}leistungen/`
  Sockelleisten in Holz oder Weiß, Übergangsprofile zu anderen Böden, saubere Anschlüsse an Türen und Zargen.

**Zeile darunter (Fließtext mit Links):**
Doch lieber ein anderer Boden? [Vinyl](leistungen/vinyl/) für Bad und Küche, [Laminat](leistungen/laminat/), wenn es vor allem robust und pflegeleicht sein soll, [Teppich](leistungen/teppich/) für Schlafzimmer und Treppen.

---

### Abschluss (CTA-Band, Parkett-Fassung)

**H2:** Planen Sie Ihr Parkett mit uns (30 Zeichen)

**Untersatz:**
Ein paar Fotos und die ungefähre Fläche genügen für den Anfang. Wir melden uns und vereinbaren einen Termin für Beratung und Aufmaß.

**CTA:**
- Primär: **Angebot anfragen** → `{{root}}kontakt/?bodenart=Parkett`
- Sekundär: **0159 0171 7249** → `tel:+4915901717249`
- Textlink: **Fotos per WhatsApp schicken** → `https://wa.me/4915901717249`

**Zwei kleine Zeilen:**
Mo–Fr 07:30–17:00 Uhr, Sa 08:00–14:00 Uhr
Neuenhöhe 17, 42929 Wermelskirchen

Umsetzung: Das vorhandene Partial `src/partials/cta-band.html` hat eine Eyebrow („Unverbindlich anfragen“) und ein kursives Wort (`<em>Boden.</em>`). Beides verstößt gegen die House rules. Eyebrow entfernen, `<em>` entfernen und Überschrift/Untersatz per Parameter oder als Parkett-Fassung direkt in die Seite setzen.

---

## 4. FAQ

Der Text der Antworten ist wortgleich im JSON-LD (`faq-parkett.json`) enthalten.

**Kann Parkett auf eine Fußbodenheizung?**
Ja, wenn das Parkett vom Hersteller für Fußbodenheizung freigegeben ist. Verklebtes Parkett gibt die Wärme in der Regel besser an den Raum ab als schwimmend verlegtes, dünnere Dielen besser als dicke. Eiche gilt als gut geeignet, Buche und Ahorn reagieren stärker auf Schwankungen von Temperatur und Luftfeuchte. Wichtig ist außerdem, dass der Heizestrich vorher nach Protokoll aufgeheizt wurde und trocken genug ist. Das klären wir vor der Verlegung.

**Wie oft lässt sich Fertigparkett abschleifen?**
Das hängt von der Nutzschicht ab, also der oberen Schicht aus Echtholz. Ist sie stark genug, kann der Boden je nach Aufbau ein- oder mehrmals abgeschliffen und neu geölt oder lackiert werden. Bei sehr dünnen Nutzschichten geht das nur eingeschränkt oder gar nicht. Die Stärke steht in den Produktangaben, und bei der Auswahl beraten wir Sie, welche zu Ihrer Nutzung passt.

**Eignet sich Parkett für Küche und Bad?**
In der Küche ja, wenn Wasser nicht stehen bleibt: Verschüttetes gleich aufwischen und vor Spüle und Geschirrspüler aufmerksam sein. Eine lackierte Oberfläche ist hier etwas unempfindlicher. In Bädern mit Dusche oder Wanne raten wir von Parkett ab. Dort ist Vinyl die robustere Wahl.

**Warum zeigen sich im Winter Fugen im Parkett?**
Holz nimmt Feuchtigkeit aus der Raumluft auf und gibt sie wieder ab. In der Heizperiode ist die Luft trocken, die Dielen ziehen sich etwas zusammen, und es entstehen feine Fugen. Steigt die Luftfeuchte im Frühjahr wieder, schließen sie sich. Das ist bei Holz normal. Eine Luftfeuchte von etwa 40 bis 60 % hält die Bewegung gering.

**Was kostet Parkett pro Quadratmeter?**
Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt von Holzart, Sortierung, Format und Oberfläche ab, von der Verlegeart und davon, wie viel am Untergrund zu tun ist. Fischgrät macht mehr Arbeit als Dielen. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten.

*Reserve-Frage (nur wenn eine sechste gewünscht ist):*
**Kann der alte Boden liegen bleiben?**
Manchmal. Ein fester, ebener Fliesenboden kann unter Umständen als Untergrund dienen, Teppich, weiches Vinyl oder alte Laminatböden kommen in der Regel heraus. Entscheidend ist, ob der Untergrund eben, tragfähig und trocken ist und ob die neue Aufbauhöhe zu Türen und Übergängen passt. Das prüfen wir beim Aufmaß.

---

## 5. Interne Links

| Ziel | Linktext | Stelle |
|---|---|---|
| `{{root}}` | Start | Breadcrumb |
| `{{root}}leistungen/` | Leistungen | Breadcrumb, „Sockelleisten und Übergänge“ |
| `{{root}}leistungen/vinyl/` | Vinyl | Räume (Bad), „Was zum Parkett dazugehört“ |
| `{{root}}leistungen/laminat/` | Laminat | „Was zum Parkett dazugehört“ |
| `{{root}}leistungen/teppich/` | Teppich | „Was zum Parkett dazugehört“ |
| `{{root}}leistungen/treppen/` | Treppen | „Was zum Parkett dazugehört“ (mit Bild) |
| `{{root}}leistungen/untergrund/` | Mehr zur Untergrundvorbereitung / Untergrund | „Parkett braucht festen Grund“, „Was zum Parkett dazugehört“ |
| `{{root}}projekte/` | Alle Projekte ansehen | Galerie |
| `{{root}}kontakt/?bodenart=Parkett` | Angebot anfragen | Kopf, Ablauf, Abschluss |
| `{{root}}kontakt/?bodenart=Parkett&muster=…` | Mit Landhausdiele anfragen / Mit Fischgrät anfragen | Musterwahl |
| `#faq` | Fragen unten | Räume (Fußbodenheizung) |
| `tel:+4915901717249` | 0159 0171 7249 | Kopf, Abschluss |
| `https://wa.me/4915901717249` | Fotos per WhatsApp schicken | Abschluss |

Rückverweise auf diese Seite von: Startseite (Leistungsliste), `leistungen/`, `leistungen/treppen/` („passend zum Parkett“), `leistungen/untergrund/`, `projekte/` (Bildunterschriften der Parkett-Fotos).

---

## 6. JSON-LD

Drei Dateien in `src/jsonld/`. Der Betrieb selbst (`HomeAndConstructionBusiness`, `@id` `https://handwerker-blesius.de/#betrieb`) steht global im Layout und wird hier nur referenziert. Kein `aggregateRating`, kein `offers` mit Preis.

**`service-parkett.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://handwerker-blesius.de/leistungen/parkett/#leistung",
  "name": "Parkett verlegen",
  "serviceType": "Parkettverlegung",
  "description": "Beratung, Verkauf und Verlegung von Fertigparkett als Landhausdiele oder Fischgrät, schwimmend oder verklebt, mit Untergrundvorbereitung, Sockelleisten und Übergangsprofilen.",
  "url": "https://handwerker-blesius.de/leistungen/parkett/",
  "image": "https://handwerker-blesius.de/assets/img/podest-led-1600.jpg",
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

**`faq-parkett.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://handwerker-blesius.de/leistungen/parkett/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kann Parkett auf eine Fußbodenheizung?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ja, wenn das Parkett vom Hersteller für Fußbodenheizung freigegeben ist. Verklebtes Parkett gibt die Wärme in der Regel besser an den Raum ab als schwimmend verlegtes, dünnere Dielen besser als dicke. Eiche gilt als gut geeignet, Buche und Ahorn reagieren stärker auf Schwankungen von Temperatur und Luftfeuchte. Wichtig ist außerdem, dass der Heizestrich vorher nach Protokoll aufgeheizt wurde und trocken genug ist. Das klären wir vor der Verlegung." }
    },
    {
      "@type": "Question",
      "name": "Wie oft lässt sich Fertigparkett abschleifen?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das hängt von der Nutzschicht ab, also der oberen Schicht aus Echtholz. Ist sie stark genug, kann der Boden je nach Aufbau ein- oder mehrmals abgeschliffen und neu geölt oder lackiert werden. Bei sehr dünnen Nutzschichten geht das nur eingeschränkt oder gar nicht. Die Stärke steht in den Produktangaben, und bei der Auswahl beraten wir Sie, welche zu Ihrer Nutzung passt." }
    },
    {
      "@type": "Question",
      "name": "Eignet sich Parkett für Küche und Bad?",
      "acceptedAnswer": { "@type": "Answer", "text": "In der Küche ja, wenn Wasser nicht stehen bleibt: Verschüttetes gleich aufwischen und vor Spüle und Geschirrspüler aufmerksam sein. Eine lackierte Oberfläche ist hier etwas unempfindlicher. In Bädern mit Dusche oder Wanne raten wir von Parkett ab. Dort ist Vinyl die robustere Wahl." }
    },
    {
      "@type": "Question",
      "name": "Warum zeigen sich im Winter Fugen im Parkett?",
      "acceptedAnswer": { "@type": "Answer", "text": "Holz nimmt Feuchtigkeit aus der Raumluft auf und gibt sie wieder ab. In der Heizperiode ist die Luft trocken, die Dielen ziehen sich etwas zusammen, und es entstehen feine Fugen. Steigt die Luftfeuchte im Frühjahr wieder, schließen sie sich. Das ist bei Holz normal. Eine Luftfeuchte von etwa 40 bis 60 % hält die Bewegung gering." }
    },
    {
      "@type": "Question",
      "name": "Was kostet Parkett pro Quadratmeter?",
      "acceptedAnswer": { "@type": "Answer", "text": "Das lässt sich ohne Blick auf Raum und Untergrund nicht seriös sagen. Der Preis hängt von Holzart, Sortierung, Format und Oberfläche ab, von der Verlegeart und davon, wie viel am Untergrund zu tun ist. Fischgrät macht mehr Arbeit als Dielen. Nach Beratung und Aufmaß erhalten Sie ein individuelles Angebot. Schicken Sie uns vorab Fotos und die ungefähre Fläche, dann können wir den Termin gut vorbereiten." }
    }
  ]
}
```

**`breadcrumb-parkett.json`**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://handwerker-blesius.de/" },
    { "@type": "ListItem", "position": 2, "name": "Leistungen", "item": "https://handwerker-blesius.de/leistungen/" },
    { "@type": "ListItem", "position": 3, "name": "Parkett", "item": "https://handwerker-blesius.de/leistungen/parkett/" }
  ]
}
```

---

## 7. Live-Ding: Musterwahl (Landhausdiele / Fischgrät)

**Kundennutzen:** Viele Kunden wissen, dass sie Holz möchten, können das Muster aber nicht benennen oder sich nicht vorstellen, wie es im eigenen Raum wirkt. Die Musterwahl zeigt beide Muster auf echten, von Blesius verlegten Böden. Daneben steht, was das Muster für Verlegung und Verschnitt bedeutet. Die Wahl wird ins Anfrageformular übernommen, sodass der Kunde nichts erklären oder abtippen muss. Eine Spielerei ist es nicht: Die Wahl spart eine Rückfrage beim ersten Telefonat.

**Platz:** im Abschnitt „Landhausdiele oder Fischgrät“, als Beweis der Behauptung. Kein eigener Abschnitt.

**Aufbau:**
- Zwei Schalter als Segment (`role="radiogroup"` mit `aria-label="Verlegemuster"`, je `role="radio"` + `aria-checked`, Pfeiltasten wechseln) oder Tabs (`role="tablist"`). Beschriftung: **Landhausdiele**, **Fischgrät**. Start: Landhausdiele.
- Darunter eine Bühne: echtes Foto (Landhausdiele `flur-eiche`, Fischgrät `fischgraet-raum`), daneben H3, Text und die kleine Tabelle (Wirkung, Verlegung, Verschnitt, Passt zu) aus Abschnitt 3.
- In der Bildecke eine kleine SVG-Draufsicht des Musters (Diele im Verband / Fischgrät-Zickzack), flache Flächen in den Holz-Mitteltönen aus dem Foto, Fugen in Graphit `#525252`, ohne Linienraster. `aria-hidden="true"`, weil das Foto und der Text die Information tragen.
- Unter der Bühne der Anfrage-Link der aktiven Tafel: **Mit Landhausdiele anfragen** bzw. **Mit Fischgrät anfragen**.
- Kleine Zeile: Beide Fotos zeigen Böden aus unseren Projekten.

**Bewegung:** Bildwechsel per `clip-path` von links nach rechts (Dielen-Richtung), 0,6 s, Text blendet mit 80 ms Versatz ein. Bei `prefers-reduced-motion`: sofortiger Wechsel.

**Übergabe ans Formular:** Der Link öffnet `kontakt/?bodenart=Parkett&muster=Landhausdiele`. `site.js` liest die Parameter auf der Kontaktseite: Bodenart „Parkett“ wird ausgewählt, ins Nachrichtenfeld kommt „Interesse: Parkett, Muster Landhausdiele.“ (bzw. „Muster Fischgrät“). Der Kunde kann alles ändern. Nichts wird gespeichert oder gezählt (keine Cookies, kein Tracking, siehe `docs/HOSTING.md`).

**Ohne JavaScript:** Beide Tafeln stehen vollständig nebeneinander bzw. untereinander, die Schalter sind ausgeblendet, die Anfrage-Links funktionieren trotzdem (Parameter werden dann einfach ignoriert).

**Erweiterung, nur mit echtem Foto:** eine dritte Option „Schiffsboden“, sobald der Kunde ein Foto davon liefert. Kein Stock- oder KI-Bild.

---

## 8. Vom Kunden zu bestätigen

1. **Fischgrät-Fotos: Parkett oder Vinyl?** `fischgraet-raum`, `fischgraet-hell` und `fischgraet-weit` wirken wie Vinyl (gleichmäßige, sich wiederholende Maserung, dünnes Reststück auf `fischgraet-weit`). Ist es Vinyl, werden die Bilder auf dieser Seite als „Fischgrätmuster, hier in Vinyl“ beschriftet oder durch ein echtes Fischgrät-Parkett-Foto ersetzt. Gibt es keins, zeigt die Musterwahl nur die Landhausdiele und den Fischgrät-Text ohne Foto.
2. **Alle Eichen-Fotos von Ihrem Team verlegt?** Gilt für `podest-led`, `eiche-rustikal`, `wohnraum-tuer`, `kueche-eiche`, `flur-eiche`, `langer-raum`, `wohnzimmer-eiche`, `kamin-verlegung` und `treppe-eiche`. Stimmt jeweils „Eiche“, und bei `eiche-rustikal`, `wohnraum-tuer` und `langer-raum` die rustikale Sortierung?
3. **Podest und LED:** Haben Sie Podest, Stufen und LED-Band gebaut oder nur den Boden verlegt? Die Bildunterschriften beschreiben bisher nur, was zu sehen ist.
4. **Einverständnis der Bauherren:** Dürfen die Fotos ihrer Wohnungen veröffentlicht werden? Auf `eiche-rustikal` hängt ein Wandbild mit Namen und Datum (wird weggeschnitten). Auf `langer-raum` spiegelt sich eine Person in der Glastür.
5. **Nur Fertigparkett?** Verlegen Sie auch Massiv- oder Stabparkett? Bisher steht auf der Seite nur Fertigparkett.
6. **Schiffsboden** auf der Seite erwähnen? (optionaler Satz in Abschnitt 3)
7. **Andere Holzarten als Eiche** im Verkauf? Bisher steht nur „vor allem Eiche“ auf den Fotos.
8. **Muster zum Termin:** Bringen Sie Muster mit, oder gibt es eine Ausstellung? Bisher steht nur „besprechen wir beim Termin vor Ort“. Bei Ja: Satz ergänzen.
9. **Pflege-Erklärung bei der Übergabe:** Dürfen wir „Bei der Übergabe erklären wir Ihnen, welche Pflege Ihre Oberfläche braucht“ zusagen?
10. **Bestandsparkett abschleifen, ölen oder versiegeln:** Bieten Sie das an? Bisher wird es nicht versprochen, die FAQ antwortet nur allgemein.
11. **Türen kürzen und Zargen anpassen:** Gehört das zum Leistungsumfang, wenn der neue Boden höher wird? Bisher steht nur „Anschlüsse an Türen und Zargen“.
12. **Gewerbe:** Verlegen Sie Parkett auch in Büros und Ladenflächen? Der Text nennt beides.
13. **Rechtlicher Hinweis zur Bezeichnung:** Parkettleger ist seit 2020 wieder zulassungspflichtiges Handwerk (Anlage A der Handwerksordnung), Bodenleger nicht. Die Seite nennt den Betrieb deshalb nirgends „Parkettleger“, sondern spricht von „Parkett verlegen“. Bitte mit der Handwerkskammer zu Köln klären, ob Ihre Eintragung die Verlegung von Fertigparkett abdeckt (vor allem verklebt und Fischgrät) und ob „Parkettverlegung“ im `serviceType` stehen darf.
14. **Pflege-Richtwert:** etwa 40 bis 60 % Luftfeuchte ist ein allgemeiner Richtwert. Passt er zu den Produkten, die Sie verkaufen, oder nennen die Hersteller andere Werte?

**Für die Umsetzung (nicht Kunde):**
- Der Formular-Prefill über `?bodenart=…&muster=…` muss in `static/assets/js/site.js` ergänzt werden.
- Im CTA-Band-Partial Eyebrow und `<em>` entfernen (House rules).
- Projekte-Filter: Anker oder Parameter für „Parkett“ festlegen und den Link in der Galerie anpassen.
