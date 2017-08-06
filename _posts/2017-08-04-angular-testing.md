---
title: "Angular – Testen Guide"
description: "Wie teste ich meine Angular Anwendung? Wir zeigen euch in neun leicht zu befolgende Beispielen wie ihr mit Helpern wie TestBed, fixtures, async und fakeAsync/tick umgeht."
author: "Gerard Sans"
slug: "angular-testing"
published_at: 2017-08-04 15:25:01.000000Z
categories: "angular testing advanced"
header_image: "/artikel/header_images/angular-testing.png"
---
# Angular – Testen Guide (v4+)

In diesem Artikel wollen wir die **gängigsten Unit-Tests für Angular Anwendungen**, wie zum Beispiel Komponenten, Services, Http und Pipes abdecken.
Wir werden aber auch weniger bekannte Bereiche, wie Directives, Routes und Testen von Observables behandeln.
Als Referenz und Basis für deine eigenen Tests stellen wir euch kleine Beispiele vor.
Weiterhin haben wir eine **Testing-Checkliste**, um bei der Erstellung deiner eigenen Tests ein einfachen Leitfaden zu bieten.

Testen wurde von ReleaseCandidate(RC) bis zur ersten Final ziemlich stark verbessert.
Durch den Umstieg auf NgModule haben sich weiterhin viele Sachen im Bereich testen vereinfacht.
Das CoreTeam von Angular hat hart gearbeitet, um Boilerplate-Code zu reduzieren und neben Jasmine auch andere Test-Frameworks wie Mocha zu unterstützen.

In diesem Artikel werden wir folgendes abdecken:

- **Einführung in Jasmin**: suites, specs, exprectations, und matchers(),...

- **Testen in Angular**: setup, dependency injection, und testing checklist

- **Testing-Utilities**: TestBed, inject, fixtures, async, fakeAsync/tick, und jasmine.done().

- **Testbeispiele**: Components, Services, Http+MockBackend, Directives, Pipes, Routes, Observables, und EventEmitter.

Alle 26 **Test-Specs** zum selber ausprobieren und ändern findest du in diesem [Plunker](https://plnkr.co/edit/jm6T17qPbzM8abmRMckw?p=preview).

*„Wir haben in diesem Beispielen [Jasmin](https://jasmine.github.io/) verwendet, es ist aber problemlos Möglich auch andere Test-Frameworks wie [Mocha](https://mochajs.org/) zu verwenden.*

## Einführung in Jasmin

Jasmine ist ein Open-Source-Test-Framwork von [Pivotal Labs](https://pivotal.io/labs).
Die verwendete DSL(domain specific language) verfolgt die Grundsätze des behaviour-driven-developments, somit ist es sehr leicht hiermit natürlich-sprachliche Tests zu definieren.

### Generelle Konzepte der Jasmine-DSL

Suites – ***describe(String, function)*** - Eine Suite definiert ein logischen Abschnitt von Spezifikationen. Sie wird mit einem Titel und einer Funktion aufgerufen, welche Spezifikationen oder auch weitere Suits enthalten kann.

Specs – ***it(string,funktion)*** Eine Spec wird mit `it` eingeleitet. Auch hier definieren wir ein Titel über den ersten Parameter. Der zweite Parameter erwartet eine Funktion welche dann die tatsächlichen technischen Erwartungen(Expectations) enthält.

Expectations ***expect(actual).toBe(expected)*** – Eine Expectation(Erwartung) ist die technische Implementierung deines Tests, die letztendlich einfach nach *true* oder *false* auswertet.

Matchers – sind vordefinierte Helfer für gemeinsame Expectations. z.B.: ***toBe(expected), toEqual(expected).*** [Hier](https://github.com/JamieMason/Jasmine-Matchers) findest du die komplette Liste.

*“Beachte, dass ***toEqual()*** einen tiefen Objekt-Match macht, hier wird also der Inhalt von zwei Objekten verglichen. Die Funktion **.toBe()** prüft auf Referenzgleichheit. Also: Ist `actual` und `expected` das gleiche Objekt*

### Setup und Teardown

Machmal haben wir eine Summe von Tests, welche gleichen oder ähnliche Vorbedingungen haben z.B. ein bestimmten Zustand unser Directive oder eines Services.

Jasmine bietet euch vier Handler an, um unseren Setup- und Teardown-Code für Tests zu definieren:
- ***beforeEach, afterEach*** einmal pro Spec (`it`)
- ***beforeAll, afterAll*** einmal pro Test-Suite (`describe`)

### Testen Einrichtung

Für die Einrichtung von Jasmine gibt es verschiedene Optionen.
In echten Entwicklungs-Umgebungen solltet ihr eure Test-Run-Konfiguration über Test-Runner wie [Karma](https://karma-runner.github.io/1.0/index.html) managen.
In unseren Beispiel nutzen wir dies nicht, da wir uns auf die eigentlich Angular-Tests konzentieren wollen und nicht auf Tools wie Karma und Co.
Darum laufen unsere Tests hier über eine `SpecRunner.html`.
Schauen wir uns diese Datei also einmal an.

*„Dieses Setup ist nur als Referenz anzusehen und wird nur mit Plunker funktionieren“*

```typescript
<!-- Jasmine dependencies -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine-html.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/boot.js"></script>

<!-- Angular dependencies -->
<script src="https://unpkg.com/zone.js/dist/zone.js"></script>
<script src="https://unpkg.com/zone.js/dist/long-stack-trace-zone.js"></script>
<script src="https://unpkg.com/reflect-metadata@0.1.3/Reflect.js"></script>
<script src="https://unpkg.com/systemjs@0.19.31/dist/system.js"></script>

<!-- Angular testing dependencies -->
<script src="https://unpkg.com/zone.js/dist/proxy.js?main=browser"></script>
<script src="https://unpkg.com/zone.js/dist/sync-test.js?main=browser"></script>
<script src="https://unpkg.com/zone.js/dist/jasmine-patch.js?main=browser"></script>
<script src="https://unpkg.com/zone.js@0.6.25/dist/async-test.js"></script>
<script src="https://unpkg.com/zone.js/dist/fake-async-test.js?main=browser"></script>

<script src="config.js"></script>
<script>
  //load all dependencies at the same time
  Promise.all([
    //required to test on browser
    System.import('src/setup.spec'),
    //specs
    System.import('src/languagesService.spec'),
    ...
  ]).then(function(modules) {
    //manually trigger Jasmine test-runner
    window.onload();
  }).catch(console.error.bind(console));
</script>

```
Informationen zu unserem Plunker-Test-Setup:

- Laden von Jasmine-Abhängigkeiten gefolgt von Angular-Abhängigkeiten.
- Wir verwenden ein **System.js** und **TypeScript** Setup.
- Wir laden über `System.import` unsere Tests
- Mit *Promise.all()* lösen wir den Jasmine-Test-Runner manuell aus, indem  wir **onload** aufrufen.

Dies sollte uns aber an dieser Stelle nicht weiter interessieren und nur als kurze Erklärung dienen.

## Testen in Angular

### Testen mit Dependency Injection (DI)

**TestBed** hilft uns ähnlich wie @NgModule die Abhängigkeiten für unsere Tests einzurichten.
Wir rufen `TestBed.configureTestingModule` mit unserer Konfiguration auf.
Diese Informationen werden dann verwendet, um alle Abhängigkeiten für unseren Test aufzulöse.

Unten sehen wir ein Beispiel:

```javascript
@NgModule({
  declarations: [ ComponentToTest ]
  providers: [ MyService ]
})
class AppModule { }
TestBed.configureTestingModule({
  declarations: [ ComponentToTest ],
  providers: [ MyService ]
});
//get instance from TestBed (root injector)
let service = TestBed.get(MyService);

```

**inject** erlaubt es uns Abhängigkeiten auf der TestBed Ebene zu bekommen.


```javascript
it('should return ...', inject([MyService], service => {
  service.foo();
}));

```

**Component injector** ermöglicht es uns eine Abhängigkeit auf der Komponentenebene zu erhalten.


```javascript
@Component({
  providers: [ MyService ]
})
class ComponentToTest { }
let fixture = TestBed.createComponent(ComponentToTest);
let service = fixture.debugElement.injector.get(MyService);

```

Für Abhängigkeiten, die auf der Komponenten-Ebene definiert sind, müssen wir den Component injector wie oben gezeigt benutzen.

Lass uns mal sehen, wie wir **TestBed** mit der *LanguagesService* Komponente verwenden würden:


```javascript
describe('Service: LanguagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ LanguagesService ]
  }));

  it('should return available languages', inject([LanguagesService], service => {
    expect(service.get()).toContain('en');
  }));
})

```

Zuerst laden wir die für unsere Tests benötigten Abhängigkeiten mit **TestBed.configureTestingModule**. Dann benutzen wir *[inject](https://angular.io/api/testing/inject-function)* auf auf unsere Spezifikation, um automatisch jede Abhängigkeit zu instanziieren.

Wir können jetzt die Injektion umgestalten, damit wir das nicht für jede Spezifikation wiederholen brauchen.


```javascript
describe('Service: LanguagesService', () => {
  let service;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ LanguagesService ]
  }));

  beforeEach(inject([LanguagesService], s => {
    service = s;
  }));

  it('should return available languages', () => {
    expect(service.get()).toContain('en');
  });
});

```

Lass uns mal zwei Beispiele für die Instanziierung einer Komponente anschauen. Das erste Beispiel ist synchron und erstellt eine Vorrichtung mit einer Instanz von **MyTestComponent**.


```javascript
// synchronous
  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestComponent);
  });

```

Das zweite Beispiel ist asynchron, da es mit externen Vorlagen und css XHR-Anrufe erfordert.


```javascript
// asynchronous
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTestComponent ],
    }).compileComponents(); // compile external templates and css
  }));

```
Wir können *[async](https://angular.io/api/core/testing/index/async-function)* verwenden, wenn Abhängigkeiten eine asynchrone Handhabung beinhalten. Dies wird intern eine Zone erstellen und jede asynchrone Verarbeitung „behandeln“.

*„Abhängig von deinem Build-Setup können deine Vorlagen und CSS alle innenliegend (inlined) sein, so dass sie den synchronen Ansatz sicher verwenden können.“*

### Testen Checkliste

- **Welche Art von Test?** [Isolated](https://angular.io/guide/testing#!#isolated-unit-tests), [shallow](https://angular.io/guide/testing#!#shallow-component-test) oder [integration Test](https://vsavkin.com/three-ways-to-test-angular-2-components-dcea8e90bd8d).

- **Kann ich Mocks, Stubs oder Spies benutzen?** Abhängigkeiten sollten durch eigene Tests abgedeckt werden. Mit ihnen kannst du deine Tests boosten, ohne an Wirksamkeit zu verlieren.

- **Sync oder Async?** Macht dein Test asynchrone Aufrufe?  Benutzt XHR, Promises, Obervables, etc. Benutzt die Komponente TemplateUrl oder styleURls oder inline? Stelle sicher, dass du die entsprechenden APIs verwendest.

## Testen Beispiele

### Eine Komponente testen

Nehmen wir eine einfache Komponente, die eine Begrüßungsnachricht mit einer*[@Input()](https://angular.io/api/core/Input-var)* - Eigenschaft rendert.

```javascript
// Usage:    <greeter name="Joe"></greeter>
// Renders:  <h1>Hello Joe!</h1>
@Component({
  selector: 'greeter',
  template: `<h1>Hello {{name}}!</h1>`
})
export class Greeter {
  @Input() name;
}

```

Um diese Komponente zu testen, verwenden wir eine gemeinsames Setup mit *TestBed*.

*„Benutze TestBed, um die entsprechenden Abhängigkeiten zu laden, damit sie während deiner Tests verfügbar sind.“*

Es ist eine gängige Praxis *beforeEach* zu verwenden, um unsere Tests umzusetzen. Wenn wir das tun, dann vermeiden wir, dass wir für jeden Tests einen Code wiederholen müssen. Dies vereinfacht auch unsere Spezifikation.


```javascript
describe('Component: Greeter', () => {
  let fixture, greeter, element, de;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ Greeter ]
    });

    fixture = TestBed.createComponent(Greeter);
    greeter = fixture.componentInstance;  // to access properties and methods
    element = fixture.nativeElement;      // to access DOM element
    de = fixture.debugElement;            // test helper
  });

  //specs
  it('should render `Hello World!`', async(() => {
    greeter.name = 'World';
    //trigger change detection
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.querySelector('h1').innerText).toBe('Hello World!');
      expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Hello World!');
    });
  }));
})

```

Wir haben *TestBed.create.Component* verwendet, um eine Instanz unserer *Greeter*-Komponente zu erstellen. Die Komponenteninstanz wird innerhalb einer [fixture](https://github.com/angular/angular/blob/a7e9bc97f6a19a2b47b962bd021cb91346a44baa/modules/angular2/src/testing/test_component_builder.ts#L31) zugänglich sein. Das ist die Haupt-API:


```javascript
abstract class ComponentFixture {
  debugElement;       // test helper
  componentInstance;  // to access properties and methods
  nativeElement;      // to access DOM element
  detectChanges();    // trigger component change detection
}

```
Wir haben die *name*-Eigenschaft benutzt, um einen Wert einzurichten, die Änderungserkennung mit **detectChanges** einzurichten und das erwartet Ergebnis zu überprüfen, wenn alle asynchronen Anrufe mit **whenStable** beendet wurden. Um auf den gerenderten Text zuzugreifen, verwendeten wir zwei verschiedene APIs, welche durch einen CSS-Selektor (Zeilen 22-23) gefiltert wurden.

*„Weitere Abfragen für debugElement sind: Query(By.all())query(by.directive(MyDirective))“*

### Einen Service testen

*LanguageService* hat nur eine Methode, welche ein Array von verfügbaren Sprachen für die Anwendung zurückgibt.

```javascript
//a simple service
export class LanguagesService {
  get() {
    return ['en', 'es', 'fr'];
  }
}

```

Ähnlich wie bei unserem vorherigen Beispiel instanziieren wir den Service vor. Wie wir schon gesagt haben, ist das eine gute Praxis, auch wenn wir nur eine Spezifikation haben. Bei dieser Gelegenheit prüfen wir jede einzelne Sprache und die Gesamtzahl.


```javascript
describe('Service: LanguagesService', () => {
  let service;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ LanguagesService ]
  }));

  beforeEach(inject([LanguagesService], s => {
    service = s;
  }));

  it('should return available languages', () => {
    let languages = service.get();
    expect(languages).toContain('en');
    expect(languages).toContain('es');
    expect(languages).toContain('fr');
    expect(languages.length).toEqual(3);
  });
});

```
### Testen mit Http

Wir wollen normalerweise keine HTTP-Anrufe während unserer Tests machen, aber wir werden es jetzt als Referenz trotzdem zeigen. Wir haben unseren Erstdienst *LanguageService* für *LanguageServiceHttp*.

```javascript
export class LanguagesServiceHttp {
  constructor(private http:Http) { }

  get(){
    return this.http.get('api/languages.json')
      .map(response => response.json());
  }
}

```

In diesem Fall verwendet es *http.get(), um eine JSON-Datei zu lesen. Danach haben wir *[Observable.map](https://github.com/ReactiveX/RxJS/blob/master/src/operator/map.ts)* verwendet, um die Antwort in das Endergebins mit *json()* umzuwandeln.

Unser Test sieht dem vorherigen ziemlich ähnlich. Der Hauptunterschied besteht in der Verwendung eines asynchronen Tests, wie wir es mit der Komponente aufgrund des Abonnements gemacht haben.


```javascript
describe('Service: LanguagesServiceHttp', () => {
  let service;

  //setup
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpModule ],
    providers: [ LanguagesServiceHttp ]
  }));

  beforeEach(inject([LanguagesServiceHttp], s => {
    service = s;
  }));

  //specs
  it('should return available languages', async(() => {
    service.get().subscribe(x => {
      expect(x).toContain('en');
      expect(x).toContain('es');
      expect(x).toContain('fr');
      expect(x.length).toEqual(3);
    });
  }));
})

```
*„Beachte, dass fakeAsync nicht verwendet werden kann, wenn es XHR-Anrufe gibt. Wegen dem [Design](https://github.com/angular/angular/issues/8280).“*

*Http.get()* gibt ein Observavble zurück, welches wir abonnieren können. Wir werden Observables später noch ausführlicher abdecken.

## Testen mit MockBackend

Ein Ansatz, der sinnvoller erscheint, ist das Ersetzen von HTTP-Anrufen durch einen MockBackend. Um dies zu tun, können wir die Bereitstellung (Zeile 10) verwenden. Dies wid uns ermöglichen, unsere Antworten zu mocken und damit zu vermeiden, das echte Backend zu „hitten“ und damit unsere Testergebnisse zu steigern.

```javascript
describe('MockBackend: LanguagesServiceHttp', () => {
  let mockbackend, service;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        LanguagesServiceHttp,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  });

  beforeEach(inject([LanguagesServiceHttp, XHRBackend], (_service, _mockbackend) => {
    service = _service;
    mockbackend = _mockbackend;
  }));

  //specs
  it('should return mocked response (sync)', () => {
    let response = ["ru", "es"];
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      }));
    });
    service.get().subscribe(languages => {
      expect(languages).toContain('ru');
      expect(languages).toContain('es');
      expect(languages.length).toBe(2);
    });
  });
})

```
Auf unserem Test bauen wir unsere gemockte Antwort (Zeilen 23-25), also wenn wir endlich den Anruf zu unserem Service machen, bekommt man die erwarteten Ergebnisse.

*„Beachte: Wir müssen async nicht benutzen, weil MockBackend sich synchron verhält. Danke an [Pascal Precht](https://medium.com/@pascalprecht), der das erwähnt hat.“*

### Eine Directive testen

Directives in Angular sind eine spezifische Art von Komponente mit in der Regel keiner begleitenden Ansicht. Wir verwenden eine [AttributDirective](https://angular.io/guide/attribute-directives), *logClicks*, die protokoliieren, wie viele Klicks wir auf dem ***host element*** machen, damit du deine Idee erfassen kannst.

```javascript
// Example: <div log-clicks></div>
@Directive({
  selector: "[log-clicks]"
})
export class logClicks {
  counter = 0;
  @Output() changes = new EventEmitter();

  @HostListener('click', ['$event.target'])
  clicked(target) {
    console.log(`Click on [${target}]: ${++this.counter}`);
    //we use emit as next is marked as deprecated
    this.changes.emit(this.counter);
  }
}

```

Um diese Directive zu testen, haben wir beschlossen, eine Container-Komponente zu erstellen. Wir werden sie aufstellen, damit sie als unser Host wirken kann, welcher die von unserer Directive emittierten Ereignisse wiedergibt.


```javascript
@Component({
  selector: 'container',
  template: `<div log-clicks (changes)="changed($event)"></div>`,
  directives: [logClicks]
})
export class Container {
  @Output() changes = new EventEmitter();

  changed(value){
    this.changes.emit(value);
  }
}

describe('Directive: logClicks', () => {
  let fixture;
  let container;
  let element;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ Container, logClicks ]
    });

    fixture = TestBed.createComponent(Container);
    container = fixture.componentInstance; // to access properties and methods
    element = fixture.nativeElement;       // to access DOM element
  });

  //specs
  it('should increment counter', fakeAsync(() => {
    let div = element.querySelector('div');
    //set up subscriber
    container.changes.subscribe(x => {
      expect(x).toBe(1);
    });
    //trigger click on container
    div.click();
    //execute all pending asynchronous calls
    tick();
  }));
})

```

Wir haben *beforeEach* verwendet, um die Logik für die Erstellung der Komponente aus den Tests zu trennen. Dieser Teil kann nun für alle Spezifikationen verwendet werden.

Um den **click** auf den Container auszulösen, haben wir die DOM API (empfohlen) verwendet. Wir könnten auch *fixture.debugElement.triggerEventHandler(‘click’)* verwenden.

In diesem Test haben wir **fakeAsync** und **tick** verwendet. Mit **fakeAsync** wird jegliche asynchrone Verarbeitung pausiert, bis wir **tick** aufrufen. Dies gibt uns eine größere Kontrolle und vermeidet es außerdem auf verschachtelte Blöcke von Versprechen oder Beobachtungen zurückzugreifen.

*„Mit fakeAsync/tick bekommen wir eine bessere Kontrolle über den asynchronen Code, obwohl er nicht mit XHR verwendet werden kann.“*


### Ein Pipe testen

Pipes sind Funktionen, die Eingabedaten in ein vom Benutzer lesbares Format umwandeln können. Wir schreiben eine benutzerdefinierte Pipe *capitalise* mit dem Standard *[String.toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)*. Das ist der Einfachheit halber, da Angular eine eigene [UpperCasePipe](https://angular.io/api/common/UpperCasePipe-class)-Implementierung hat.

```javascript
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new Error('Requires a String as input');
    }
    return value.toUpperCase();
  }
}

```

Pipes sind nur einfache Klassen, die injiziert werden können, damit wir unsere Spezifikationen sehr einfach mit *inject* einrichten können.


```javascript
describe('Pipe: CapitalisePipe', () => {
  let pipe;

  //setup
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ CapitalisePipe ]
  }));

  beforeEach(inject([CapitalisePipe], p => {
    pipe = p;
  }));

  //specs
  it('should work with empty string', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should capitalise', () => {
    expect(pipe.transform('wow')).toEqual('WOW');
  });

  it('should throw with invalid values', () => {
    //must use arrow function for expect to capture exception
    expect(()=>pipe.transform(undefined)).toThrow();
    expect(()=>pipe.transform()).toThrow();
    expect(()=>pipe.transform()).toThrowError('Requires a String as input');
  });
})

```
Um unsere Pipes zu testen, haben wir die üblichen Fälle überprüft: Sie sollten mit leeren Strings arbeiten, sie sollten kapitalisieren und schließlich sollten sie „werfen“ wenn sie nicht mit einem String benutzt werden.

*„Beachte: Wir benutzen eine Pfeilfunktion, um Ausnahmen in expect zu erfassen. “*

### Routes testen

Routen werden manchmal ausgelassen, aber werden für gewöhnlich als eine gute Praxis für doppelte Buchführung gesehen. In unserem Beispiel verwenden wir eine einfache Routenkonfiguration mit nur wenigen Routes und einer anderen Route, die nach Hause führt.

```javascript
@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`
})
class TestComponent { }

@Component({
  selector: 'home',
  template: `<h1>Home</h1>`
})
export class Home { }

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    BrowserModule, RouterModule.forRoot(routes),
  ],
  declarations: [TestComponent, Home],
  bootstrap: [TestComponent],
  exports: [TestComponent]
})
export class AppModule {}

```

Die erste Route-Definition fängt die ursprüngliche Route ein, wenn keine zur Umleitung nach Hause geliefert wurde (Zeile 14). Die zweite instanziiert die Home-Komponente (Zeile 15); die letzte fängt alle übrigen Routes ein und leitet sie auch nach Hause (Zeile 16) um. Unsere Tests werden diese Routes nutzen, um unsere Erwartungen zu prüfen.


```javascript
describe('Router tests', () => {
  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppModule
      ]
    });
  });

  //specs
  it('can navigate to home (async)', async(() => {
    let fixture = TestBed.createComponent(TestComponent);
    TestBed.get(Router)
      .navigate(['/home'])
        .then(() => {
          expect(location.pathname.endsWith('/home')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to home (fakeAsync/tick)', fakeAsync(() => {
    let fixture = TestBed.createComponent(TestComponent);
    TestBed.get(Router).navigate(['/home']);
    fixture.detectChanges();
    //execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/home')).toBe(true);
  }));

  it('can navigate to home (done)', done => {
    let fixture = TestBed.createComponent(TestComponent);
    TestBed.get(Router)
      .navigate(['/home'])
        .then(() => {
          expect(location.pathname.endsWith('/home')).toBe(true);
          done();
        }).catch(e => console.log(e));
  });
});

```
Wir haben **RouterTestingModule.withRoutes(routes)** importiert, um die Routerinstanz mit den Routes für unsere Tests zu initialisieren (Zeile 6). Im obigen Code haben wir getestet, dass wir mit **async, asyncFake/tick** und **done** nach Hause navigieren können.

*„FakeAsync/tick sind ideal für komplexe asynchrone Test ohne XHR“*



## Observables testen

Observables sind optimal, um asynchrone Aufgaben zu meistern. Sie werden an wenigen Stellen in Angular, wie *Http*, Form controls, validations oder hinter *EventEmitter* verwendet. Wir werden das *Observable* unten verwenden, um zu zeigen, wie wir ihr Verhalten testen können.


```javascript
describe('Observable: basic observable', () => {
  var basic$;

  //setup
  beforeEach(() => {
    basic$ = new Observable(observer => {
      //pushing values
      observer.next(1);
      observer.next(2);
      observer.next(3);
      //complete stream
      observer.complete();
    });
  })

  //specs
  it('should create the expected sequence (async)', async(() => {
    let expected = [1,2,3],
      index = 0;
    basic$
      .subscribe({
        next: x => expect(x).toEqual(expected[index++]),
        error: e => console.log(e)
      });
  }));
});

```

Wir haben eine *Observable* geschaffen, welche 1,2,3 aussendet und abschließt. Um zu testen, richten wir die nächsten ein, error und complete die Rückrufe auf Abonnieren. Während der nächste Rückrufe einige Male aufgerufen wird, müssen wir unsere Erwartungen dynamisch setzen.

### EventEmitters testen

**EventEmitters** werden in Angular verwendet, um Ereignisse zwischen Komponenten zu kommunizieren. Wir haben eine Gegenkomponente namens **Counter**, die es uns erlaubt, einen Anfangswert von Null zu erhöhen oder vermindern. Jedes Mal, wenn wir das tun, wird der neue Wert mit einem *EventEmitter* als *changes* offengelegt.

```javascript
@Component({
  selector: 'counter',
  template: `
    <div>
      <h1>{{counter}}</h1>
      <button (click)="change(1)">+1</button>
      <button (click)="change(-1)">-1</button>
    </div>`
})
export class Counter {
  @Output() changes = new EventEmitter();

  constructor(){
    this.counter = 0;
  }

  change(increment) {
    this.counter += increment;
    //we use emit as next is marked as deprecated
    this.changes.emit(this.counter);
  }
}

```
Dieses Setup wird dem von Observables sehr ähnlich sein.

```javascript
describe('EventEmitter: Counter', () => {
  let counter;

  //setup
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ Counter ]
  }));

  beforeEach(inject([Counter], c => {
    counter = c;
  }))

  //specs
  it('should increment +1 (async)', async(() => {
    counter.changes.subscribe(x => {
      expect(x).toBe(1);
    });
    counter.change(1);
  }));

  it('should decrement -1 (async)', async(() => {
    counter.changes.subscribe(x => {
      expect(x).toBe(-1);
    });
    counter.change(-1);
  }));
})

```
In diesem Fall überprüfen wir, dass wir mit dem Abonnement auf dem *EventEmitter* **increment** oder **decrement** benutzen, da es ein Observable aussetzt. Wir lösen die verschiedenen Werte aus, indem wir die Änderungsmethode anrufen und unsere Erwartungen im nächsten Rückruf überprüfen.

Alle Tests, die in diesem Beitrag enthalten waren, und noch mehr findest auf [Plunker](https://plnkr.co/edit/jm6T17qPbzM8abmRMckw?p=preview).

Das ist alles! Danke fürs Lesen! Hast du fragen? Wenn ja dann benachrichtige mich auf [@gerardsans](https://medium.com/google-developer-experts/angular-2-testing-guide-a485b6cb1ef0).

### Willst du mehr?

Wenn du weitere Beispiele benötigst, wende dich bitte an mich bei *gerard_dot_sans_at_gmail_dot_com* oder schau mal bei [Angular Unit Tests](https://github.com/angular/angular/tree/e748adda2e7a1f6e302628d0d76b5c3d1e3fc196/modules/angular2/test) in GitHub vorbei!



