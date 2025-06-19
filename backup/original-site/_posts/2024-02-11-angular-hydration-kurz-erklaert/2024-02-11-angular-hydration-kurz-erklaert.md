---
title: "Angular kurz erklärt: Hydration"
description: "Einführung in Angulars Full App Non-Destructive Hydration: Server- & Client-Side-Rendering, Web Core Vitals & warum es ein Meilenstein ist."
author: "Lulëzim Ukaj"
published_at: 2024-02-12 11:27:00.000000Z
header_source:
header_image: header.jpg
categories: "angular hydration server-side-rendering"
---

## Full App Non-Destructive Hydration kurz erklärt

In unserem zweiten Artikel aus der Kurz-erklärt-Serie Artikel führen wir euch schrittweise in das große Thema Hydration in Angular ein und erklären kurz die Schlüsselbegriffe und die Mechanismen des Rendering. Dazu starten wir mit dem Begriff der Hydration. Als nächstes werden wir uns ansehen, was Server-Side-Rendering und Client-Side-Rendering sind und worin sich die Prozesse genau unterscheiden. Danach werfen wir einen kurzen Blick auf die Web Core Vitals. Abschließend befassen wir uns wieder umfassend mit dem Thema Hydration in Angular.

### Was ist Hydration?

Zunächst muss die Frage gestellt werden: Was ist Hydration? Und in welchem Zusammenhang steht der Begriff mit den Begriffen wie Server-Side Rendering (SSR) und Client-Side Rendering (CSR)?
Hydration beschreibt einen Prozess, bei dem eine auf dem Server gerenderte Webseite im Browser des Benutzers "zum Leben erweckt" wird. Dabei geht es darum, dass das statische HTML-Template durch deinen JavaScript-Code interaktiv wird.

Angular selbst definiert den Begriff in seiner Dokumentation wie folgt:

> “Hydration is the process that restores the server-side rendered application on the client. This includes things like reusing the > server rendered DOM structures, persisting the application state, transferring application data that was retrieved already by the > server, and other processes.”
> ([Angular Documentation](https://angular.dev/guide/hydration#what-is-hydration))

<p class="left">
<img
style="max-width: 80%"
src="/shared/assets/img/placeholder-image.svg" alt="Logo Angular Hydration" alt=""
class="lazy img-fluid img-rounded" data-src="hydration.jpg" data-srcset="hydration.jpg"
/>
</p>

Single-Page Applications (SPAs) bieten eine bessere Laufzeit-Performance als klassische Webanwendungen. Ist deine Webanwendung einmal geladen, werden alle Inhalte dynamisch aktualisiert, ohne dass die Website jedes Mal komplett neu gecatcht und gerendert werden muss. Das sorgt für eine flüssige und app-ähnliche User Experience. Allerdings muss der Browser dafür beim initialen Laden der Seite zusätzlich zum HTML große Mengen an JavaScript-Code laden. Dieser Prozess wird der "Initial Load" genannt und definiert den Zeitraum, bis eine Webseite nach deinem HTTP-Request für die User vollständig sichtbar und interaktiv ist.

Während diese verlängerte Ladezeit für Webanwendungen wie z.B. Google Maps oder für soziale Medien wie Instagram oder Twitter kaum ins Gewicht fallen, ist sie in anderen Bereichen kritisch. Insbesondere im E-Commerce-Bereich gilt es, die User Experience so einfach und möglichst ohne Ladezeiten zu gestalten, um die sogenannte “Bounce Rate” (auch Absprungrate genannt) zu minimieren. Deswegen ist es in diesem Zusammenhang gängige Praxis geworden, SPAs serverseitig zu rendern. Der Server generiert eine vollständige HTML-Datei vorab, die sofort vom Browser gerendert werden kann. Damit sehen Nutzer fast sofort zumindest eine statische Version der Seite. Sobald die JavaScript-Bundles geladen sind, können User die Seite auch interaktiv nutzen.

Bis zur Einführung der “Full App Non-destructive Hydration” war dieser Prozess in Angular jedoch "destruktiv". Das hat bedeutet, dass die bereits auf Serverseite vorab-gerenderten DOM-Strukturen wieder zerstört und für jeden Neustart auf Clientseite wieder neu gerendert wurden. In einfacher Sprache: Es wurde doppelt gerendert. Die Folge war ein berühmt-berüchtigtes Flickern bei jedem Initial Load vieler Webseiten.

Aber warum tritt dieses Flackern auf? Was bedeutet es, wenn DOM-Strukturen serverseitig oder clientseitig gerendert werden?
Wie funktioniert Server-Side Rendering und worin unterscheidet es sich vom Client-Side Rendering? Was versteht man unter Full App Non-Destructive Hydration?  Und nach welchen Messparametern wird hier überhaupt gemessen?

Damit ihr die vielen bevorstehenden Updates im Hause Angular zum Thema Hydration und zukünftige Artikel hier auf dem Portal besser einordnen könnt, wollen wir euch die Prozesse hinter den Begriffen in diesem Artikel kurz erklären.

### Was ist Server-Side Rendering und was ist Client-Side Rendering?

Um es kurz und in zwei Sätzen zu sagen. Beim Server-Side Rendering (SSR) ist es die Aufgabe des Servers, deine Webanwendung zu rendern. Beim Client-Side Rendering findet das Rendering in deinem Browser, also auf Client-Seite, statt. Aber um das Ganze besser zu verstehen, werden wir uns die Prozesse des SSR und CSR genauer ansehen.

#### Server-Side Rendering (SSR)

<p class="left">
<img
style="max-width:100%"
src="/shared/assets/img/placeholder-image.svg" alt=""
class="lazy img-fluid img-rounded" data-src="ssr.jpg" data-srcset="ssr.jpg"
/>
</p>

Beim Server-Side Rendering wird der Inhalt einer Webseite vorab auf dem Server gerendert und als vollständige HTML-Datei an den Browser des Benutzers geliefert. Dadurch wird die Webseite sofort sichtbar, sobald sie vom Browser geladen ist. Vorausgesetzt natürlich, es besteht eine anständige Internetverbindung.

##### Die Funktionsweise von SSR im Detail:

1. **Anfrage des Nutzers:** Der Prozess beginnt, wenn ein Nutzer eine URL in seinen Browser eingibt oder auf einen Link klickt. Der Browser sendet diese HTTP-Anfrage an den Server.
2. **Server-Side Rendering:** Der Server empfängt die Anfrage und generiert ein vollständiges HTML-Dokument der angeforderten Seite. Dieses Dokument enthält bereits alle Inhalte und Strukturen, sodass der Browser es ohne zusätzliche Verarbeitungsschritte darstellen kann.
3. **Browser:** Der Server sendet anschließend die HTML-Datei an den Browser des Nutzers. Der Browser rendert die HTML-Datei. Zu diesem Zeitpunkt ist die Seite jedoch noch nicht interaktiv, da die Event-Handler noch nicht geladen oder ausgeführt wurden.
4. **Hydration:** Nachdem das HTML und die erforderlichen CSS-Styles gerendert wurden, lädt der Browser die JavaScript-Dateien. Dieser Schritt wird oft als "Hydration" bezeichnet.
5. **Dynamisches Rendering:** Die Webanwendung ist nun vollständig geladen und interaktiv. Ist die Anwendung erst einmal geladen, sind weitere Seitenwechsel und Inhaltsaktualisierungen meist sehr schnell, da nur die notwendigen Daten nachgeladen werden müssen, ohne die ganze Seite vom Server neu laden zu müssen.

##### Vorteile und Nachteile von SSR

Der entscheidende Vorteil des Server-Side Renderings liegt in einem deutlich verbesserten Initial Load der Webanwendung. Verkürzte Wartezeiten steigern die User Experience erheblich und verbessern das SEO-Ranking auf Google. Zudem ist die Anwendung auch auf langsamen Geräten oder bei schlechter Internetverbindung nutzbar, da der Server die Hauptlast des Renderings trägt.
Die Medaille hat natürlich auch eine andere Seite. Das führt zu einer erhöhten Belastung des Servers, was insbesondere bei Webseiten mit hohem Traffic Auswirkungen auf Skalierbarkeit und Kosten haben kann.  Außerdem macht das SSR die Architektur deiner Webanwendungen komplexer, da einige Szenarien für das Rendering und die Zustandsverwaltung auf dem Server durchdacht werden müssen. Diese Komplexität ist mit mehr Entwicklungszeit und somit höheren Kosten verbunden. Auch die Wartung wird damit komplexer.
Zusammenfassend kann gesagt werden, SSR ist besonders nützlich für content-orientierte Webanwendungen wie E-Commerce-Seiten, bei denen SEO-Rankings und schnelle Ladezeiten entscheidend sind.

#### Client-Side Rendering (CSR) erklärt

<p class="left">
<img
style="max-width:100%"
src="/shared/assets/img/placeholder-image.svg" alt=""
class="lazy img-fluid img-rounded" data-src="csr.jpg" data-srcset="csr.jpg"
/>
</p>

Beim Client-Side Rendering (CSR) übernimmt der Browser des Nutzers die Hauptarbeit des Renderings der Webseite. Anders als beim Server-Side Rendering (SSR), bei dem der Server dem Browser eine vollständige HTML-Datei liefert, sendet der Server hier ein minimales HTML-Dokument zusammen mit JavaScript-Dateien, die die Webseite dynamisch generieren und darstellen. Sobald der Browser diese Dateien lädt, wird das JavaScript ausgeführt, um die Webseite dynamisch zu generieren und darzustellen.

##### Prozess des Client-Side Renderings im Detail:

1. **Anfrage des Nutzers:** Der Prozess startet, sobald der Nutzer eine Webseite anfordert, indem er eine URL eingibt oder auf einen Link klickt.
2. **Server sendet minimale HTML-Datei:** Der Server reagiert mit einem einfachen HTML-Dokument und Links zu CSS- und JavaScript-Dateien.
3. **Download der JavaScript-Dateien:** Der Browser lädt die JavaScript-Dateien, die als "Bauplan" für das Abrufen der Daten und das Generieren der HTML-Struktur dienen.
4. **Client-Side Rendering:** Die Webseite wird im Browser dynamisch generiert, anstatt den gesamten Inhalt vom Server zu beziehen.
5. **Interaktivität:** Nach dem Aufbau der Seite durch JavaScript wird sie interaktiv. Nutzer können interagieren und Daten werden bei Bedarf nachgeladen.

##### Vorteile und Nachteile von CSR

Der große Vorteil beim Client-Side Rendering (CSR) ist die reduzierte Serverbelastung, da der Großteil des Renderings direkt im Browser des Users stattfindet. Das schont Serverressourcen insbesondere bei hohen Datenaufkommen, senkt damit Kosten und erleichtert die Skalierbarkeit in Projekten. Insbesondere für datenstarke Projekte ist das ein wichtiger Punkt. Auf der anderen Seite dauert der Inital Load beim CSR deutlich länger. User müssen länger warten, bis sie die erste vollständige Seite sehen, da der Browser zusätzliche Skripte laden und ausführen muss. Das verschlechtert eure Web Core Vitals und damit euer SEO-Ranking.
Zusammenfassend eignet sich CSR besonders für Anwendungen, die eine hohe Interaktivität und dynamische Inhaltsaktualisierungen ohne ständiges Neuladen der Webseite erfordern. Als bestes Beispiel kann hier zum Beispiel Google Maps genannt werden.
Letztendlich hängt die Wahl zwischen SSR und CSR von den spezifischen Anforderungen eures Projekts und den Prioritäten in Bezug auf Performance, SEO und Nutzererfahrung ab. Allgemein gesprochen, sobald SEO Performance wichtig ist, sollte eure Wahl auf SSR fallen.

CSR eignet sich besonders für Anwendungen mit hoher Interaktivität und dynamischen Inhalten ohne ständiges Neuladen, wie z.B. Google Maps. Die Wahl zwischen SSR und CSR sollte basierend auf den spezifischen Anforderungen des Projekts und den Prioritäten hinsichtlich Performance, SEO und Nutzererfahrung getroffen werden. Generell gilt: Ist SEO-Performance entscheidend, ist SSR die bevorzugte Wahl.

Aber nach welchen Metriken wird eigentlich gemessen? Wann ist eine Webseite schnell?

### Web Core Vitals

<p class="left">
<img
style="max-width:80%"
src="/shared/assets/img/placeholder-image.svg" alt="Infografik Auflistung derWeb Core Vitals: Contentful Paint (LCP), dem First Input Delay (FID) und dem Cumulative Layout Shift (CLS)"
class="lazy img-fluid img-rounded" data-src="vitals.jpg" data-srcset="vitals.jpg"
/>
</p>

Um die User Experience auf Webseiten zu messen und zu verbessern, haben sich die Core Web Vitals von Google etabliert. Sie umfassen drei Hauptaspekte: die Ladezeit, die Interaktivität und die visuelle Stabilität von Webseiten.
Die Core Web Vitals sind ein wichtiger Faktor für das SEO-Ranking deiner Webseite. Schnelle Ladezeiten und reibungslose Interaktivität führen zu einer besseren User Experience, minimieren die Absprungrate (engl. “Bounce Rate”) und erhöhen die durchschnittliche Verweildauer (engl. "Average Time on Site"). Das hat maßgeblich Einfluss auf das Ranking in den Google-Suchergebnissen.

Der Fokus der Web Core Vitals (und damit haben diese auch den größten Einfluss auf dein SEO-Ranking) liegt dabei auf dem Largest Contentful Paint (LCP), dem First Input Delay (FID) und dem Cumulative Layout Shift (CLS). Sie messen, wie schnell Inhalte für den Nutzer sichtbar und interaktiv werden.

<p class="left">
<img
style="max-width:80%"
src="/shared/assets/img/placeholder-image.svg" alt="Infografik Darstellung des Largest Contentful Paint am Beispiel der Webansicht für Instagram"
class="lazy img-fluid img-rounded" data-src="largestcontentfulpaint.jpg" data-srcset="largestcontentfulpaint.jpg"
/>
</p>

Der LCP ist quasi der erste Eindruck deiner Seite. Gemessen wird, wie lange es dauert, bis das größte Element auf deiner Webseite gerendert ist und für den User sichtbar wird. Meist handelt es sich dabei um ein Bild oder eine Grafik. Für eine gute Bewertung sollte der LCP innerhalb von 2,5 Sekunden nach dem ersten Laden der Seite erfolgen. Der CLS bewertet die visuelle Stabilität während des Ladeprozesses. Verschieben sich Elemente auf dem Bildschirm während des Renderings? Wir alle haben die Erfahrung gemacht, dass Bedienelemente während der Ladezeit im Layout sich plötzlich verschieben. Der FID misst die Zeit, die eine Seite benötigt, um auf den ersten Klick eines Links oder Buttons zu reagieren. Für eine gute Bewertung sollte die Seite eine FID von 100 Millisekunden oder weniger aufweisen.

<p class="left">
<img
style="max-width:80%"
src="/shared/assets/img/placeholder-image.svg" alt="Infografik CLS: Button verschiebt sich nach unten durch verzögerte Einblendung von Inhalten in Webansicht"
class="lazy img-fluid img-rounded" data-src="cumulativeshift.jpg" data-srcset="cumulativeshift.jpg"
/>
</p>

Für mehr Informationen, Tutorials zur Optimierung von Performance und SEO-Ranking sowie Tools zur Messung besucht  am besten die [Web Core Vitals Webseite](https://web.dev/explore/learn-core-web-vitals?hl=de).

Aber jetzt wieder zurück zu Angular und zur Full App Non-Destructive Hydration.

### Wie Full App Non-Destructive Hydration funktioniert?

Angular unterstützt serverseitiges Rendering (SSR) bereits seit einiger Zeit durch seine Libary Angular Universal. Dieser Prozess war jedoch bis zum Update auf Angular 16 destruktiv. Um zu verstehen, was das bedeutet, wollen wir uns den Prozess näher ansehen:

<p class="left">
<img
style="max-width:80%"
src="/shared/assets/img/placeholder-image.svg" alt="Prozesses der destruktiven Hydration als Gif"
class="lazy img-fluid img-rounded" data-src="gif-destructive-hydration.gif" data-srcset="gif-destructive-hydration.gif"
/>
</p>

**Prozess der destruktiven Hydration in Angular Universal bis Version 16:**

1. **Anfrage des Browsers:** Der Browser sendet eine HTTP-Anfrage an den Webserver.
2. **Server-Side-Rendering:** Der Server empfängt die Anfrage und generiert ein vollständiges HTML-Dokument der angeforderten Seite.
3. **Browser:** Der Browser rendert die initiale Version des Seiten-Markups. Zu diesem Zeitpunkt ist die Seite noch statisch, da JavaScript noch nicht geladen wurde.
4. **Download der JavaScript-Datei:** Die JavaScript-Files werden im Browser heruntergeladen.
5. **Angular-Client-App:** Die Angular-Client-App wird initialisiert, lädt das Bundle und startet.
6. **Repainting des DOM-Markups:** Angular rendert die gesamte Seite nochmals neu, was zur Zerstörung des vorgeladenen HTML führt und den destruktiven Hydrationsprozess kennzeichnet.

Wie wir sehen können, zerstört Angular die bereits (im dritten Schritt) gerenderten HTML-Strukturen und lädt in einem letzten Schritt das gesamte Markup neu. Im Grunde wurde die Seite dadurch doppelt gerendert. Das ist ein besonders ineffizienter Prozess für umfangreiche Anwendungen. Das ist auch der Grund für das Flickern. Über die Zeit gab es viele Ansätze, dieses Flickern zu minimieren. Dennoch war dieses in Tools wie Lighthouse und WebPageTest weiterhin sichtbar.

### Angular 16 und die Full App Non-Destructive Hydration

Die Full App Non-Destructive Hydration hat genau da angesetzt, indem das bereits serverseitig gerenderte DOM-Markup wiederverwendet wird. “Non-destructive” meint nichts anderes, als dass das serverseitig gerenderte DOM-Markup nicht zerstört und wieder neu gerendert wird; stattdessen durchläuft Angular die DOM-Struktur, hängt Event-Listener an und bindet Daten, um das Rendering zu vervollständigen.

<p class="left">
<img
style="max-width:80%"
src="/shared/assets/img/placeholder-image.svg" alt="Prozesses der non-dedstructive Hydration als Gif"
class="lazy img-fluid img-rounded" data-src="gif-full-hydration.gif" data-srcset="gif-full-hydration.gif"
/>
</p>

Die Vorteile von Full App Non-Destructive Hydration sind ein deutlicher Performance-Boost um 40% bis 50% für den Largest Contentful Paint (LCP).
[Siehe Tweet](https://twitter.com/naveedahmed/status/1645983995820376065?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1645983995820376065%7Ctwgr%5Ee4f6b5fdc7af3261fc76397d4952b9779e02f6de%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext2Fhtmlkey%3Da19fcc184b9711e1b4764040d3dc5c07schema%3Dtwitterurl%3Dhttps3A%2F%2Ftwitter.com%2Fnaveedahmed%2Fstatus%2F1645983995820376065image%3Dhttps3A%2F%2Fi.embed.ly%2F1%2Fimage3Furl3Dhttps253A252F252Fabs.twimg.com252Ferrors252Flogo46x38.png26key3Da19fcc184b9711e1b4764040d3dc5c07     )

Das ist ein immenser Boost vor allem für Projekte mit komplexen Benutzeroberflächen oder dynamischen Inhalten. Ein verbesserter LCP führt wiederum zu einem besseren SEO-Ranking.

### Was sind die nächsten Schritte für die Hydration und Server-Side Rendering in Angular?

Die Full App Non-Destructive Hydration war nur der erste Schritt einer grundsätzlichen Richtungsänderung für das Rendering in Angular. Bisher ist das clientseitige Rendering der Default für alle Projekte in Angular. Das soll sich schrittweise ändern. Wie bereits in der Roadmap angekündigt, plant das Angular Team, zukünftig standardmäßig auf ein hybrides Rendering (Server-Side Rendering und Static Site Generation) zu setzen.

Gleichzeitig hat sich die partielle Hydration in der Webentwicklung etabliert. Hierbei werden Komponenten, die nicht essentiell für die Seite sind oder sich nicht im Viewport befinden, verzögert geladen. Wichtige Begriffe in diesem Zusammenhang sind Lazy Loading und Deferrable Views.

<p class="left">
<img
style="max-width:80%"
src="/shared/assets/img/placeholder-image.svg" alt="Prozesses der partiellen Hydration als Gif"
class="lazy img-fluid img-rounded" data-src="gif-partial-hydration.gif" data-srcset="gif-partial-hydration.gif"
/>
</p>

In einem nächsten Update in Angular sollen alle Inhalte innerhalb der festgelegten Defer-Blöcke serverseitig gerendert und nur auf Client-Seite nach Bedarf hydratisiert werden. In diesem Szenario lädt der Browser die JavaScript-Bundles für die eingestellten Deferred Views nicht, bis ein Trigger-Ereignis auftritt. Erst dann lädt Angular das zugehörige JavaScript herunter und hydratisiert diesen Teil der Ansicht. Wenn eine Komponente nicht benötigt wird, wird sie gar nicht erst hydratisiert. Das macht auch Sinn. Wenn man einen Flug suchen oder buchen will, ist es für die User Experience wichtiger, dass alle interaktiven Elemente in diesem Zusammenhang möglichst schnell geladen sind. In eher seltenen Fällen priorisieren Nutzerinnen die Marketing- oder Bonusangebote wie Restauranttipps. Und wenn diese Angebote gar nicht erst wahrgenommen werden, warum sollten sie überhaupt hydratisiert werden?

### Conclusion

In diesem Artikel haben wir euch die Begriffe Hydration, Server-Side Rendering (SSR) und Client-Side Rendering (CSR) kurz erklärt. Das ist wichtig, um zu verstehen, warum die Einführung der Full App Non-Destructive Hydration für Angular ein Meilenstein war. Wir haben uns außerdem die Bedeutung der Core Web Vitals angesehen. Insbesondere für angehende Webentwickler ist es wichtig, ein allgemeines Verständnis für die technischen Prozesse aufzubauen. Je fester das Fundament ist, desto höher lässt sich bauen. Und im Falle der Angular Hydration erwarten uns die nächsten Monate viele Neuigkeiten. Umso wichtiger ist es, dass wir das Thema umfassend beleuchten. Deswegen werden wir eine Reihe an Artikel zu den Themenkomplexen Performance und Server-Side-Rendering in Angular veröffentlichen.

Im nächsten Artikel widmen wir uns der praktischen Implementierung der Full App Non-destructive Hydration, Lazy Loading und Deferred Views in Angular. Dazu wird uns wieder Webdave via Twitch einige detaillierte Codebeispiele geben, die euch helfen, die Materie noch besser zu verstehen. Wir freuen uns!

### Werde Teil unserer Community

Immer bessere und feinere Steuerungsmöglichkeiten, bedeuten aber auch höhere Anforderungen an euch. Umso wichtiger ist es, eine Community zu haben und Best Practices auszutauschen. Wie immer laden wir euch deshalb ein, Teil unserer Angular Community auf Discord zu werden. Seit 2013 bieten wir euch hier Tutorials, Artikel und Schulungen rund um das Angular Framework. Gestartet durch unsere Begeisterung für die modernen Möglichkeiten der Webentwicklung hat sich mittlerweile eine ganze Community dazu entwickelt. Mit mittlerweile 18 Meetups, die insgesamt über 10.000 Angular-Entwicklerinnen:innen als Plattform für regelmäßigen Austausch dienen, sind wir damit in Europa die Region mit den meisten Angular-Entwicklerinnen. Werde Teil unserer Community!
