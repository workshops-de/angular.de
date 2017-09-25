---
title: "Continuous Deployment mit Docker in 5 Schritten"
description: "Tutorial zu Continuous Deployment mit Docker und CircleCI für deine Angular Anwendung. Hier lernst du Schritt für Schritt wie du dein Deployment automatisierst."
author: "Martin Wiesmüller"
slug: "angular-deployment-docker"
published_at: 2017-03-19 00:00:01.000000Z
categories: "angular angular2 angular4 docker deployment"
header_image: "/artikel/header_images/angular-deployment-docker.jpg"
---

Welcher Web-Entwickler kennt nicht die guten alten Zeiten, in welchen Webserver sehr aufwendig aufgesetzt werden mussten. Jeder aus dieser Zeit kann bestätigen, dass dies alles andere als einfach war.

Inzwischen gibt es aber Möglichkeiten, hierbei wesentlich flexibler zu agieren. Daher wollen wir uns in diesem Artikel das Zusammenspiel von Docker, Node, Unit-Testing mit einer Angular App ansehen. Ziel soll es sein, dass ein Deployment vollständig automatisiert ab dem Punkt des Code Check-In stattfindet. Allerdings nur dann, wenn alle Tests erfolgreich durchgeführt wurden. Folglich - wir wollen eine Deployment-Pipe aufsetzen.

In diesem Artikel spreche ich von einer Angular Applikation. Allerdings ist es letztlich egal, was ich deployen möchte. Wichtig ist das komplette Zusammenspiel der verschiedenen Prozesse kennen zu lernen und zu verstehen. Das bedeutet, dass ihr diesen Artikel auch für andere Systeme anwenden könnt. Egal ob man eine Angular App oder ein Express Backend deployen möchtet, der Ablauf bleibt der gleiche.

Bevor wir jedoch in das Gesamtkonstrukt eintauchen, müssen wir uns die einzelnen Bausteine ansehen:

## 1. Einführung in Docker

Mit Docker wurde eine Engine geschaffen, welche es ermöglicht eine Anwendung zusammen mit allen notwendigen Umgebungen in einen Container einzusperren und zu starten. Dieser Container ist eine Art leichtgewichtige virtuelle Maschine, die alles mitbringt, um die Applikation laufen zu lassen. Dies hat den Vorteil, dass das Problem "Is running on my machine" nahezu völlig ausgeschlossen wird.

![Docker](medium_docker.jpg?v=63657051997)

Als Grundlage für den Dockercontainer muss immer ein Image definiert werden. In diesem Image befindet sich das komplette Betriebssystem, auf welchem anschließend unsere Applikation läuft. Auch hier ist der Aufbau dieses Schemas sehr flexibel und kann frei definiert werden. Die Apple-Jünger unter euch müssen [Docker-Machine auf ihrem System installieren](https://docs.docker.com/machine/install-machine/).

Bei den Linux Anwendern reicht die Engine selbst. Hierzu gibt es eine ausführliche [Installationsanleitung für Docker unter Linix](https://docs.docker.com/engine/installation/).

Auch für Windows-User besteht die Möglichkeit Docker zu installieren. Ich selbst habe dies getestet, war allerdings sowohl mit der Art der Implementierung als auch der Bedienung sehr unzufrieden.

Nach der Installation auf einem System eurer Wahl steht euch die Docker-CLI zur Verfügung. Anhand dessen könnt ihr im Anschluss mit `docker --version` testen, ob die Engine verfügbar ist.

### Was ist ein Dockerfile?

Wie bereits genannt, kann der Aufbau unseres Dockercontainers sehr flexibel gestaltet werden. Die Gestaltung eines solchen Containers wird im Dockerfile vorgenommen. Dieses File, welches von der Engine in der Root des Projekts auffindbar sein muss, wird beim Build-Prozess ausgelesen und danach Zeile für Zeile abgearbeitet. Hier ein Dockerfile, mit welchem eine Angular App ausgeliefert werden kann:

```dockerfile
FROM node:7.2.0-wheezy
MAINTAINER MWIESMUELLER <martin@fa-wiesmueller.de>

COPY . /usr/share/site
WORKDIR /usr/share/site

RUN apt-get update && apt-get install -y nginx

COPY nginx.conf /etc/nginx

RUN npm install -g gulp webpack rimraf
RUN npm install

RUN echo "npm run build" >> /usr/share/site/startup.sh
RUN echo "/etc/init.d/nginx start" >> /usr/share/site/startup.sh

RUN ["chmod", "777", "/usr/share/site/startup.sh"]

CMD ./startup.sh

EXPOSE 80
```

Hier mal eine Erklärung der Tags, welche ich in diesem Dockerfile anwende:

- `FROM`: Mit diesem Tag definiert ihr das Basis-Image für euer Projekt. Dies kann auf [Dockerhub](https://hub.docker.com) sowohl in public als auch in private Repos gehostet werden. Mehr zu diesem Thema findet ihr weiter unten. In meinem Beispiel installiere ich ein Image, welches gleich Node mit Version 7.2 mit sich bringt.

- `MAINTAINER`: Hiermit definiert Ihr den Urheber des Images. Hier kann Name und / oder E-Mailadresse angegeben werden.

- `COPY`: Mit diesem Befehl könnt Ihr Daten während des Build Prozesses von euerem lokalen System in den Dockercontainer kopieren. In diesem Beispiel kopiere ich das komplette Projekt in den Container. Dies hat den Vorteil, dass man dadurch den kompletten Build der Applikation innerhalb des Containers laufen lassen kann. Etwas weiter unten kopiere ich noch die Konfigurationsdatei von nginx in den jeweiligen Pfad, an welchem [nginx](https://www.nginx.com/) diese Datei erwartet.

- `WORKDIR`: Hiermit gebt Ihr den Pfad des Arbeitsverzeichnisses innerhalb des Containers an. Folglich werden alle künftigen Befehle innerhalb dieses Pfades stattfindenden.

- `RUN`: Mit diesem Aufruf könnt Ihr Befehle innerhalb des Build Prozesses im Containers ausführen. In meinem Beispiel führe ich ein Update des Betriebssystems durch und installiere anschließend zusätzlich nginx als Webservice zum ausliefern meiner Angular Applikation. Als nächstes installiere ich alle notwendigen Dependencies über [npm](https://www.npmjs.com/). Anschließend lege ich ein Shell Skript an, in welchem ich als erstes den Build-Prozess meiner Angular App durchführe und letztlich den Webservice starte.

- `CMD`: Dieser Tag führt einen Befehl beim Starten des Containers aus. In meinem Fall führe ich das zuvor mit `RUN` angelegte Skript aus.

- `ÈXPOSE`: Mit diesem Tag definiert Ihr, welcher Port von außen erreichbar sein soll.

Wenn man sich dieses File nun genauer ansieht, stellt man sehr schnell fest, dass man in diesem `Dockerfile` seinen kompletten Build Prozess definiert. Und genau das ist unser Ziel. Ähnlich als würde man im Supermarkt seine Produkte in den Einkaufswagen legen, die man benötigt, um anschließend nach seinem Rezept kochen zu können.

Ihr kennt bestimmt das File ```.gitignore``` zum Ignorieren von Dateien beim Check-In auf Github. Die gleiche Funktion steht uns auch mit dem File ```.dockerignore``` zur Verfügung. Hier könnt ihr Files / Folders Ignorieren, z.b. gibt es keinen Grund die Testfiles aus dem Repo in Dockerhub mit hoch zu laden.*

<hr>
<div class="workshop-hint">
  <div class="h3">Keine Lust zu Lesen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Nicht jeder lernt am besten aus Büchern und Artikeln. Lernen darf interaktiv sein und auch Spaß machen. Wir bieten euch auch
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/docker-kubernetes?utm_source=angularjs.de&utm_campaign=article&utm_medium=link&utm_content=text-top">Docker Schulungen</a>        an, falls du tiefer in die Thematik einsteigen willst.
      </p>
      <p class="">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/docker-kubernetes?utm_source=angularjs.de&utm_campaign=article&utm_medium=button&utm_content=text-top">
          <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png?v=63657140418" alt="Teilnehmer in der Veranstaltung Docker &amp; Kubernetes Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>

### Was ist Dockerhub?

Mit Dockerhub hat Docker ein Ökosystem geschaffen, in welchem Images gespeichert werden können. Nachdem man sich einen Account auf Dockerhub angelegt hat, besteht entweder die Möglichkeit fertige Images über ```docker push``` im lokalen CLI hochzuladen, oder dies automatisiert per Webhook über Github / Bitbucket durchlaufen zu lassen.

Die manuelle Variante kann sehr umständlich sein, da man den Container erst lokal bauen muss, um anschließend den Upload durchführen zu können. Und genau dies sollte automatisiert werden.

Also wählen wir folglich die Variante per Webhook bei Check-In. Nachdem wir uns im Dockerhub angemeldet haben, besteht die Möglichkeit einen ```Àutomated Build``` anzulegen, mit welchem das Repo von Github mit Dockerhub verknüpft werden kann. Nachdem dies erfolgt ist, wird automatisch Dockerhub beim Check-In informiert, dass neue Daten vorliegen. Dockerhub lädt sich automatisiert das Repo herunter, und führt den im Dockerfile definierten Build Prozess durch. Dieser Build steht anschließend unter meinem Account zu Verfügung und kann heruntergeladen werden.

Dockerhub bietet die Möglichkeit sowohl public, als auch kostenpflichtige private Repos anzulegen. Die public Repos sind für alle frei zugänglich, die private Repos hingegen können nur nach Autorisierung erreicht werden.

Schaut euch die [Dokumentation von Docker](https://docs.docker.com) an.
In diesem Artikel konnte ich das Thema "Docker" leider nur kurz anschneiden. 
Denn mit dieser Engine ist noch weit aus mehr möglich.
Der Build-Prozess auf Dockerhub kann je nach Tageszeit mehrere Minuten dauern. 
Daher empfehle ich, vor allem bei Änderungen am Build Prozess selbst, den Container mit ```docker build``` vorab lokal zu bauen. Somit lässt sich überprüfen, ob der Prozess fehlerfrei durchläuft. Sollten Fehler im Build Prozess auftreten, ist es immer sehr ärgerlich wenn auf Dockerhub sinnlos gewartet hat.*

## 2. Circle CI als Continuous Integration Umgebung

[Circle CI](https://circleci.com) ist ein mächtiges Tool, welches uns ermöglicht alle Tests automatisiert in der Cloud durchzuführen. Anschließend hat man die Möglichkeit, je nach Ergebnis der Tests, weitere Aktionen (z.B. Deploy) anzustoßen.

Um Circle CI verwenden zu können, muss man sich genauso wie bei Docker einen Account anlegen, und kann anschließend seine Github Repos verlinken. Nach dieser Verlinkung wird Circle CI ebenfalls nach Check-In von Github informiert. Anschließend beginnt Circle CI das Repo zu prüfen.

Ihr könnt hierfür natürlich auch andere CI Umgebungen nutzen die mit diesem Stack funktionieren.

### Das Konfigurationsfile für Circle CI

Um Circle CI konfigurieren zu können, muss in der Root des Projektes die ```circle.yml``` zu Verfügung stehen.

Hier mal ein Beispiel aus einer Angular App:

```yaml
machine:
  timezone: Europe/Berlin
  node:
    version: 7.5.0

dependencies:
  pre:
    - npm install

general:
  artifacts:
    - "coverage"

test:
  override:
    - npm run test

deployment:
  dev:
    branch: master
    commands:
      - ./scripts/deploy_dev.sh
```

-   ```machine```: Hier wird die Timezone sowie das Basisimage mit Node v7.5 definiert.

-   ```dependencies```:  In diesem Tag werden alle npm packages welche anschlie0end zur Durchführung der Tests notwendig sind installiert.

-   ```general```: Hier definieren wir einen Pfad für den Speicherort der Testergebnisse. Diese können anschließend unter Circle CI ausgewertet werden und stehen auch Online zu Verfügung.

- ```test```: Hier geben wir den Befehl an, welcher zur Durchführung der Unit-Tests ausgeführt werden soll.

- ```deployment```: Sind alle Tests erfolgreich durchgelaufen, können hier Skripte ausgeführt werden, welche einen Redeploy auslösen und die Version erneuern.

### Nightly Builds mit Circle CI

Mit Circle CI besteht auch die Möglichkeit sogenannte Nightly-Builds durchzuführen. Dies ist vor allem dann sinnvoll, wenn man sehr aufwendige E2E Tests beispielsweise über [SauceLabs](https://saucelabs.com/) durchführen möchte.

Um dies zu realisieren, muss die API von Circle CI z.B. per Scheduler angetriggert werden. Dies wird mit Hilfe eines POSTS durchgeführt. Innerhalb dieses Requests kann man Informationen mitliefern, die Circle CI erkennen lässt, dass es sich um einen Nightly Build handelt.

Mehr hierzu findet Ihr unter der Doc vom [Circle CI](https://circleci.com/docs/nightly-builds/)

## 3. Sauce Labs für eure E2E Tests

[SauceLabs](https://saucelabs.com/) ist ein Clouddienst, welcher es ermöglicht cross-browser-testing innerhalb der Cloud durchzuführen. Als Framework in Zusammenhang mit Angular empfiehlt sich hier [Protractor](http://www.protractortest.org/#/) im Zusammenspiel mit [Jasmine](https://jasmine.github.io/). Der Vorteil ist, dass man hier sämtliche Betriebssysteme und Browser auf Abruf erhält und dort seine Tests laufen lassen kann.

Falls euch dieses Thema tiefer interessieren sollte, empfehle ich euch meinen Artikel [Angular E2E Tests mit Protractor und Sauce Labs](/artikel/angular-e2e-protractor-test-saucelabs/). Hier beschreibe ich Schritt für Schritt die Anwendung von SauceLabs.

## 4. Dockercloud als Continuous Delivery Umgebung

Mit [Dockercloud](https://cloud.docker.com) (ehemals Tutum) hat Docker eine Umgebung geschaffen, in welcher sich diese Dockercontainer mit ihren Applikationen sehr einfach von Dockerhub herunterladen, starten und veröffentlichen lassen. Als Basis lassen sich Machinedroplets von Digital Ocean, AWS o.ä. als Node in Dockercloud verlinken.

### Arbeiten mit unterschiedlichen Stacks

Ein Stack ist die Zusammenführung von verschiedenen Systemen (Containern), welches die gesamte Architektur abbilden kann. Aber dennoch ist die Definiton eines Stacks flexibel. Es besteht ebenso die Möglichkeit, verschiedene Aufgaben in Stacks zusammenzufassen. (Datenbanken, Proxyserver etc.)

Ich persönlich halte es für sinnvoll, die Entwicklungsbereiche einer Applikation in verschiedene Stacks aufzuteilen.
Dies sollte in meinen Augen (je nachdem welche Branches existieren) mindestens drei sein:

*   Development
Der Developmentstack ist, wie der Name schon sagt, der Stack, welcher als erstes nach einem Check-In aktulisiert wird. Hier ist immer der aktuelle Entwicklungsstand präsent.
*   Staging
In diesem Stack wird immer die Zielversion, welche kurz vor einem Deployment zu Production steht veröffentlicht.
*   Production
Hier wird, wie der Name es schon sagt, die produktive Version der App veröffentlicht.

## 5. Konfiguration der einzelnen Komponenten für euer automatisiertes Deployment

Nachdem wir nun die einzelnen Baustene kennen lernen durften, müssen wir uns damit befassen diese zusammen zu bauen.

Wie ist denn eigentlich der grobe Ablauf hierfür?

Zunächst checkt der Entwickler neuen Code ein. Anschließend durchläuft dieser alle Tests, um dann nach deren Bestehen die App automatisch zu deployen.

Aber wie bekommen wir das hin? Das Schlüsselwort hierfür lautet ```Webhooks```, welche alle Bausteine der Pipe letztlich verbinden sollen. Eine sehr einfache Beschreibung eines Webhooks ist auf [Wikipedia](https://de.wikipedia.org/wiki/WebHooks) zu finden.

>  WebHooks ermöglichen es, einer Server-Software mitzuteilen, dass ein bestimmtes Ereignis eingetreten ist und eine Reaktion > auf das Ereignis auszulösen.

Wie bereits beschrieben, kann man mit Hilfe von Webhooks einem anderem System etwas mitteilen. Zum Beispiel wird ```Dockerhub``` mitgeteilt, dass Code eingecheckt wurde. Github bzw. das System in welchem euer Code verwaltet wird muss diese Information senden.

### Übersicht der Continuous Deployment Pipeline

Nun kennt Ihr alle Bausteine, aus welchem das Gesamtkonstrukt gebaut werden soll. Ich habe euch eine Schemazeichnung erstellt, in welcher euch der Gesamtprozess bildlich dargestellt werden soll:

![Schema der Angular Docker Continuous Deployment Pipe](medium_schema.jpg?v=63657052773)

Wie ihr erkennen könnt, gibt es zwei Auslöser, welche die Automatismen anwerfen können. Zum einem Check-In von Code, zum anderen per Scheduler (Nightly Build).

### Ablauf bei einem Code Check-In via WebHook

- Der Entwickler checkt auf Github neuen Code ein. Github informiert in diesen Moment Circle CI per Webhook.
- Circle CI führt alle Unit-Tests durch. Sind diese erfolgreich durchgelaufen, wird Dockerhub per Webhook informiert.
- Dockerhub holt sich anschließend das Repo aus Github, und erstellt nach Vorgaben des Dockerfiles den Container. Dieser wird folglich auf Dockerhub bereit gestellt. Ist dies abgeschlossen, wird wieder per Webhook Dockercloud für den laufenden Container im Development Stack zum Redeploy angetriggert.
- Dockercloud lädt sich aus Dockerhub den fertigen neuen Container und deployed diesen automatisch

=> Ziel erreicht: Die Codeänderung ist sofort im Developmentstack verfügbar, sofern die Tests dies zugelassen haben.

Ihr könnt direkt beim Check-In abfangen, dass nur dann eingecheckt werden kann, wenn alle Test erfolgreich waren. Hierfür gibt es das NPM Modul [pre-commit](https://www.npmjs.com/package/pre-commit). Dieses Modul lässt erst dann den Commit zu, wenn die in der ```package.json```definierten pre-commits ohne Fehler durchlaufen sind.

### Ablauf beim zeitgesteuerten Build via Scheduler

- Der Scheduler setzt an Circle CI einen Webhook ab, und informiert diesen darüber das es sich um einen Nightly Build handelt.
- Circle CI führt die Unit-Tests sowie die durch den Nightly-Build angegebenen Frontend-Tests durch.
- Sind alle Tests erfolgreich abgeschlossen, wird Dockercloud wieder von Circle CI informiert. Diesmal allerdings, wird der Container im Staging Stack auf den neuesten Stand gebracht.

## Fazit

Mit einer solchen Pipe kann man sehr viel automatisieren, und sich die tägliche Arbeit erleichtern. 
Allerdings haben wir es in einer solchen Pipe mit sehr vielen unterschiedlichen Systemen und Oberflächen zu tun.
In diesem Artikel konnte ich nur grob erklären, was es mit den einzelnen Bausteinen auf sich hat.
Daher - falls ich euer Interesse geweckt habe, kann ich euch nur empfehlen, sich mit den einzelnen Bausteinen intensiv auseinander zu setzen.

<hr>
<div class="workshop-hint text-center">
  <div class="h3">Hat dir das Tutorial geholfen?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p> Wir bieten auch <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/docker-kubernetes?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-buttom">Docker Schulungen</a> an um dich möglichst effektiv in das Thema zu begleiten. Im Kurs kannst Du die Fragen stellen, die Du nur schlecht
        googlen kannst, z.B. “Beste Weg, um meine Container zu strukturieren”. Wir können sie Dir beantworten. </p>

      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/docker-kubernetes?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-buttom">
          <button class="btn btn-danger">Jetzt weiter lernen</button>
        </a>
      </p>

    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="medium_Screen-Shot-2017-03-19-at-11.52.54.png?v=63657140418" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>
