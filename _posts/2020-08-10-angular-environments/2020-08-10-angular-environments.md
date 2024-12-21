---
title: "Angular Environments einrichten & testen"
description: "So können Angular Environments konfiguriert, typ-sicher für mehrere Builds genutzt und mit einem Mock getestet werden - produktionsreif und mit Beispielen"
author: "Nils Mehlhorn"
published_at: 2020-08-10 13:00:00
header_image: banner.png
categories: "angular environments"
---

Die meisten professionellen Angular Anwendungen durchlaufen im Entwicklungszyklus mehrere Ausführungs-Umgebungen. Während die Unterschiede zwischen diesen Umgebungen für eine reibungslose Auslieferung möglichst gering gehalten werden sollten, muss sich deine Webapp wahrscheinlich auf einer Entwicklungsmaschine ein bisschen anders verhalten als im produktiven Betrieb.

Angular bietet hierfür bereits eine Lösung namens [Environments](https://v17.angular.io/guide/build#configuring-application-environments) an. Die funktionieren wie folgt: man legt eine beliebige Anzahl an Environment-Dateien in einem Ordner, bspw. `src/environments`, an:
```
src
└── environments
    ├── environment.prod.ts
    ├── environment.stage.ts
    └── environment.ts
```

Alle Environments außer der Standardumgebung (meist die Entwicklungsumgebung) erhalten ein entsprechendes Suffix - bspw. 'prod' für die Produktivumgebung.

In jedem dieser Files wird ein Objekt namens `environment` exportiert, welche alle die gleichen Properties jeweils mit umgebungsspezifischen Werten bereitstellen. Das könnten zum Beispiel der Name der Umgebung oder ein boolsches Flag sein, das angibt ob, wir uns in einer Produktivumgebung befinden.

```typescript
// environment.ts
export const environment = {
  production: false,
  name: 'dev',
  apiPath: '/api'
}
```

```typescript
// environment.stage.ts
export const environment = {
  production: false,
  name: 'stage',
  apiPath: '/stage/api'
}
```

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  name: 'prod',
  apiPath: '/prod/api'
}
```

Manchmal unterscheidet sich auch der Pfad unter dem der Backend-Server erreichbar ist (hier `apiPath` genannt). Für Eigenschaften die an vielen Stellen gebraucht werden, deren Wert aber in jeder Umgebung gleich ist, kann übrigens besser ein einziger File names `constants.ts` angelegt werden. Das spart unnötigen Mehrfachaufwand.

 Um nun in der Anwendung immer das richtige Environment für verschiedene Builds zu verwenden, legen wir jeweils eine Build-Konfiguration in der `angular.json` an. In jeder Konfiguration richten wir ein [File Replacement](https://v17.angular.io/guide/build#configure-target-specific-file-replacements) ein, welches `environment.ts` immer durch eine spezifische Alternative wie `environment.prod.ts` austauscht:

```json
"architect": {
  ...
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {...},
    "configurations": {
      "production": {
        "fileReplacements": [{
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }],
        ...
      }
      "stage": {
        "fileReplacements": [{
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.stage.ts"
        }],
        ...
      }
    }
  }
  ...
}
```

Beim Build aktivieren wir eine der Konfigurationen indem wir dessen Namen an die Angular CLI mitgeben:
```commandline
ng build --configuration <config>
```

__Tipp__: Wenn man `ng build --prod` verwendet, nimmt Angular die Konfiguration names 'production'.

Das ist eigentlich schon alles: Dateien werden ersetzt um ganz normale JavaScript-Objekte bereitzustellen - nicht viel Angular-Magie im Spiel. Jetzt muss man innerhalb der Anwendung nur aus `environment.ts` importieren und bekommt zur Laufzeit immer die umgebungsspezifischen Werte:

```typescript
import { environment } from '../environments/environment';

// ng build             --> 'dev'
// ng build -c stage    --> 'stage'
// ng build --prod      --> 'prod'
console.log(environment.name)
```

Aber wir kriegen das noch besser hin. Beim aktuellen Aufbau sind mir in der Praxis nämlich noch zwei Probleme aufgefallen:
1. Wenn man neue Felder zu `environment.ts` hinzufügt, kommt es schnell vor, dass man vergisst, die entsprechenden Gegenstücke in den anderen Environment-Dateien anzulegen
2. Man kann nur schwierig umgebungspezifische Tests durchführen

Das können wir mit ein paar leichten Anpassungen in unserem Setup ändern.

## Environments typisieren

Wenn man mit Angular unterwegs ist, benutzt man TypeScript - warum also nicht von der statischen Typisierung der Sprache profitieren? Indem wir einen Typ für unser Environment definieren, sagt uns der Compiler bescheid, wenn in irgendeiner Umgebung Werte fehlen. Hierzu legen wir ein Interface in einer Datei names `ienvironment.ts` an. Das Ganze muss in eine andere Datei, da wir sonst Probleme mit den File Replacements bekommen - ansonsten rate ich davon ab, Prefix wie `i` für Interfaces zu verwenden.

```typescript
export interface Environment {
  production: boolean
  name: string
  apiPath: string
}
```

Wenn wir nun ein Environment-Objekt definieren, deklarieren wir auch direkt dessen Typ mit dem gerade angelegten Interface:

```typescript
import {Environment} from './ienvironment'

export const environment: Environment = {
  production: false,
  name: 'dev',
  apiPath: '/api'
}
```

Wenn wir das für alle Environments machen, profitieren wir ganz leicht vom Typ-System und bekommen keine Überraschungen mehr beim Deploy eines neuen, umgebungspezifischen Features.

## Testen mit Environments

Manchmal möchte man gerne umgebungspezifische Tests durchführen. Vielleicht um einen Error-Handler zu testen, welcher während der Entwicklung nur zur Konsole loggen, in Produktion aber die [Fehler zu einem Server weiterleiten soll](https://nils-mehlhorn.de/posts/angular-error-tracking-with-sentry). Da Environments meist einfach importiert sind, ist es etwas schwieriger diese für Tests zu mocken (sprich, durch ein Testdouble zu ersetzen). Das können wir ändern!

Die Architektur von Angular-Anwendungen basiert auf dem Prinzip der [Dependency Injection](https://v17.angular.io/guide/dependency-injection) (DI). Das heißt, dass eine Klasse (bspw. eine Komponente oder ein Service) zum Zeitpunkt der Instanziierung mit allem versorgt wird, was diese benötigt. Angular löst also alle Abhängigkeiten zu anderen Instanzen auf und *injiziert* sie in den Konstruktor der Klasse. Das erlaubt es uns die Abhängigkeiten leicht durch Testdouble auszutauschen.

Wenn wir unser Environment nun auch über Dependency Injection bereitstellen, sind wir also auch in der Lage, umgebungsspezifische Testfälle durchzuführen. Hierzu erstellen wir noch eine weitere Datei `environment.provider.ts`, in welcher wir ein [InjectionToken](https://v17.angular.io/api/core/InjectionToken) definieren. Normalerweise benutzt Angular den Klassennamen um Abhängkeiten aufzulösen, aber weil unser Environment nur ein TypeScript Interface ist (welches zur Laufzeit nicht mehr existiert), müssen wir stattdessen ein solches Token als Ersatz bereitstellen. Zusätzlich, weil ein Interface auch keinen Konstrukt hat, den Angular aufrufen könnte, legen wir noch eine Factory-Methode an, die eine Environment-Instanz zurückgibt. Letztendlich sieht der Code in `environment.provider.ts` dann so aus:

```typescript
import {InjectionToken} from '@angular/core'
import {Environment} from './ienvironment'
import {environment} from './environment'

export const ENV = new InjectionToken<Environment>('env')

export function getEnv(): Environment {
  return environment;
}
```

Anschließend fügen wir Token und Factory-Methode als Provider über einen Eintrag in `providers` zu unserem Angular-Modul hinzu:
```typescript
import {ENV, getEnv} from '../environments/environment.provider'

@NgModule({
  ...
  providers: [
    {provide: ENV, useFactory: getEnv}
  ]
})
export class AppModule { }
```

Anstatt nun direkt aus `environment.ts` zu importieren, injiizieren wir das Environment in jede Klasse, welche umgebungsspezifische Informationen benötigt. Hierzu verwendet man den [Inject](https://v17.angular.io/api/core/Inject) Decorator mit unserem Token wie folgt:

```typescript
import { Injectable, Inject } from '@angular/core';
import { Environment } from '../environments/ienvironment'
import { ENV } from '../environments/environment.provider'

@Injectable()
export class UserService {

  constructor(@Inject(ENV) private env: Environment) {
  }

  save(user: User): Observable<User> {
      if (this.env.production) {
        ...
      } else {
        ...
      }
  }

}
```

Um dann einen Mock für das Environment während eines Tests zu nutzen, können wir entweder direkt den [Klassen-Konstruktor verwenden](https://v17.angular.io/guide/testing-services) oder einen alternativen [Provider über Angular's TestBed bereitstellen](https://v17.angular.io/guide/testing-components-basics):

```typescript
import { ENV } from '../environments/environment.provider'

describe('UserService', () => {
  describe('when in production', () => {
      beforeEach(() => {
        const env = {production: true, ...}
        // ohne TestBed
        const service = new UserService(env)
        // mit TestBed
        TestBed.configureTestingModule({
          providers: [
            {provide: ENV, useValue: env}
          ]
        });
      });
  });
});
```

Wenn man sichergehen will, dass niemand aus Versehen doch direkt aus `environment.ts` importiert, kann man sogar eine [entsprechende TSLint-Regel anlegen](https://stackoverflow.com/questions/51742983/how-blacklist-imports-in-a-specific-file-with-tslint).

### Fazit

Mit wenig Aufwand sind wir in der Lage, Angular Environments sicherer und komfortabler zu gestalten. Wenn wir Werkzeuge wie Typisierung und Dependency Injection bereits haben, ergibt es Sinn, diese auch konsequent für eine bessere Entwicklungserfahrung zu nutzen. Gerade in größeren Anwendungen mit mehreren Umgebungen können wir von ordentlich definierten Interfaces, guter Testabdeckung und testgetriebener Entwicklung profitieren.
