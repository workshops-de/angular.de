---
title: "Einführung Angular Redux - Konzepte und Begrifflichkeiten"
description: "Redux ist eine Implementierung des Flux Patterns. Es ist dafür da, die Verwaltung von euerm ApplicationState in eine klare und wartbare Struktur zu bringen."
author: "Gerard Sans"
slug: "angular-redux-einfuehrung"
published_at: 2017-07-24 08:22:01.000000Z
categories: "angular redux tutorial"
header_image: "/artikel/header_images/angular-redux-header.png"
---

## Warum brauch ich Redux?

State Verwaltung in komplexen Anwendungen kann schnell zu einem Problem werden.
Autonome und wiederverwendbare Komponenten, auch "Dumb Components" genannt, kommunizieren über `@Input` und `@Output`.
Dies ist auch vollkommen richtig so, allerdings hat jede Anwendung auch Komponenten die unsere Orchestrierung unserer eigentlich Fachlogik übernehmen, auch "Smart Components" genannt.
Um den Zustand der kompletten Anwendung wartbar und nach einer klaren Struktur aufzubauen, bieten sich Pattern wie das Flux-Pattern an.
Redux ist die bekannteste und beliebste Implementierung von diesem Pattern.

## Was ist Redux?

Version 3 von [Redux](https://github.com/rackt/redux) gibt es seit weniger als einem Jahr, aber es hat sich bereits als sehr erfolgreich erwiesen.
Inspiriert von [Flux](https://facebook.github.io/flux/) und [Elm](http://elm-lang.org/) wird es verwendet, um den Anwendungsstatus zu händeln und es effektiv an die Benutzeroberfläche zu binden.
Redux ermöglicht außerdem mit wenig Aufwand Features wie *hot reloading* oder *time travel*.
Redux wird oft zusammen mit React verwendet, ist aber nicht an ein bestimmtes Framework gebunden.

Redux baut auf Flux-Pattern auf. Für dieses Tutorial braucht ihr aber keine Erfahrung.
Wir werden alle Grundlagen hiermit behandeln.
In diesem Artikel werden wir ein **Todo-Listen-Beispiel** aus React verwenden, welches aus dem neusten Redux-Videokurs von [Dan Abramov](https://medium.com/@dan_abramov) stammt.


## Warum nutzen wir nicht ngRX, die Standard-Implementierung in Angular für Redux?

Dieses Beispiel soll so simple wie möglich gehalten werden.
Falls ihr mit Redux in euer Angular Anwendung arbeiten wollt, empfehle ich euch `ngRx`.
Allerdings zielt dieser Artikel auf die Kommunikation der Konzepte, wofür sich diese simple Version von Redux mehr eignet.
ngRx enthält noch Erweiterungen wie `Observbables`, welche die Beispiele an dieser Stelle unnötig komplex machen würden.


<hr>
<div class="workshop-hint">
  <div class="h3">Lieber gemeinsam ausprobieren und diskutieren?</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Du möchtest Angular und Redux in deinem Projekt einsetzen, bist dir aber unsicher ob und wie du das am besten schaffst? Wir behandeln das Thema Redux mit ngRX intensiv in unserer
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-advanced?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-top">Angular
                    Advanced Schulung</a> und entwickeln mit dir gemeinsam Beispiele, die du direkt in deinem Projekt einsetzen kannst.
      </p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-advanced?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-top">
          <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="/assets/img/workshops/teilnehmer-workshop.png" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>

## Einführung in Redux
Redux folgt drei Grundprinzipien:

* Ein unveränderlicher State Tree
* Unidirektionaler Datenfluss
* Änderungen am State werden nur mit reinen Funktionen(pure functions) vorgenommen (Reducers)

Durch diese Grundsätze können wir ein vorhersagbares und reproduzierbares Anwendungsverhalten erreichen.
Das nächste Diagramm zeigt eine Übersicht der verschiedenen Komponenten von Redux, welche wir nun Schritt für Schritt erklären werden.

<div class="text-center">
    <img src="/artikel/angular-redux-einfuehrung/redux-overview.png" alt="Redux Overview" />
</div>

### Actions
Dies sind tatsächliche Aktionen oder auch Ereignisse in unserer Anwendung, welche potentiell den State bearbeiten.
Sie können vom Benutzer oder der Serverseite erzeugt werden.
Sie sind die einzige Informationsquelle für den *Store*.
Änderungen am Store werden ausschließlich über Actions angestoßen.
Actions sind einfache JavaScript-Objekte, die eine Änderung beschreiben und eine *type* Eigenschaft eindeutige Identifizierung verwenden.

Hier ein Beispiel für eine sehr simple Action:

```javascript
{
  type: 'TOGGLE_TODO',
  id: 0
}
```

Um diese Action-Objekte zu erzeugen werden auch meist *Action Creators* genutzt.
Diese sind Komponenten, welche Helfer-Methoden enthalten, um spezifische Aktionen erstellen.
Diese Action-Creator helfen uns dabei die Objekte einfacher zusammen zu bauen und schützen uns vor Struktur- und Tipp-Fehler.

Die fertige Action beschreibt das, was in unserer Anwendung passiert ist und gibt diese Information weiter an die *Reducers*.

### Reducers
*Reducers* geben an, wie sich der Zustand in Reaktion auf eine *Action* ändert.
Alle *Reducers* müssen **[reine Funktionen](https://en.wikipedia.org/wiki/Pure_function)** sein, das bedeutet:

* Sie produzieren die gleiche Ausgabe bei gleicher Eingabe
* Sie produzieren keine *side effects* (z.B.: mutierter Zustand, Anrufe zum Backend)

Reducers erschaffen bei Änderungen immer ein neues State-Objekt, um Nebenwirkungen zu vermeiden.
Eine erweiterte Option ist, eine Bibliothek wie [immutable.js](https://facebook.github.io/immutable-js/) zu verwenden.
Somit können Komponenten, die auf diesen State zugreifen, anhand der Object-Referenz entscheiden, ob sie neu rendern oder nicht.
Denn nur wenn der State durch ein neues Object dargestellt wird, hat sich der State verändert.

```javascript
function rootReducer(state = initialState, action){
  switch (action.type) {
    case TodoActions.ADD_TODO:
        //TODO: Implement
        break;
    default:
      // mandatory for sanity (Eg: initialisation)
      return state;
  }
};
```

Es ist gängige Praxis, die ***initialState*** als Standartparameter (Zeile 1) zu definieren und jede Aktion mit einer [switch](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch)-Anweisung zu behandeln.

### ApplicationStore
Redux verwendet einen einzelnen Store, der den *Application-State* als ein einfaches JavaScript-Objekt enthält.

Der ***Application-Store*** ist zentral für Redux und bietet eine API, um

* Aktionen zu triggern ***[appStore.dispatch](https://github.com/rackt/redux/blob/ec0b1a36e958584b7a11a5977734f04d05955c22/docs/api/Store.md#dispatch) (action)***
* Listener für Änderungen zu registrieren: ***[appStore.subscribe](https://github.com/rackt/redux/blob/ec0b1a36e958584b7a11a5977734f04d05955c22/docs/api/Store.md#subscribe) (callback)***
* Den aktuellen State zu lesen: ***[appStore.getState](https://github.com/rackt/redux/blob/ec0b1a36e958584b7a11a5977734f04d05955c22/docs/api/Store.md#getState) ()***

## To-Do-Listen Beispiel

Wir werden eine **Todo Listen** Anwendung erkunden, um zu erfahren, wie wir Redux mit Angular integrieren können. Dies ist eine grundlegende Implementierung, wo wir neue Todos hinzufügen können, sie als abgeschlossen markieren und filtern.

<div class="text-center">
    <img src="/artikel/angular-redux-einfuehrung/redux-todo-example.gif" alt="Redux Todo Example" />
</div>

## Anwendungs-Design
In Angular beginnen wir mit der Gestaltung unserer Anwendungen mit einem ***component tree*** und gehen von einer ***root*** Komponente aus. Unten siehst du eine schematische Pseudo-HTML mit allen UI Komponenten: add-todo, todo-list (Child Komponenten: todo), Filter (Chile Componenten_ filter-link).

```html
<root>
  <add-todo>
    <input><button>Add todo</button></add-todo>
  <todo-list><ul>
      <todo id="0" completed="false"><li>buy milk</li></todo>
    </ul></todo-list>
  <filters>
    Show: <filter-link><a>All</a><filter-link> ... </filters>
</root>

```
## Initialisierung von Redux

Initial müssen wir Redux in unserer Anwendung anmelden und starten.
Dies machen wir, indem wir ein Store erstellen und diesen als Service anmelden.


```javascript
// src/main.ts
import {createStore} from 'redux';
import {rootReducer} from './rootReducer';
import {TodoActions} from './todoActions';
import {APP_DECLARATIONS} from './app.declarations';

const appStore = createStore(rootReducer);

@NgModule({
  declarations: [
    App,
    ...APP_DECLARATIONS
  ],
  providers: [
    { provide: 'AppStore', useValue: appStore },
    TodoActions
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

```

Angular Anwendungen werden im ***Application Module*** gebootstrapped.
Das ***Application Module*** deklariert alle benötigten Components, Directives und Pipes.
Dazu gehören die RootComponent ***App*** und alle Übrigen, die in ***APP_DECLARATIONS*** gruppiert sind.
Globale Abhängigkeiten sind in den ***Providers*** definiert, so dass sie unseren *Redux-Komponenten* zur Verfügung stehen.
*Siehe **appStore*** und ***TodoActions*** (Zeilen 15-16).


**TodoActions** (Klasse) fungiert als *ActionCreator* mit einer publiken Methode für jede Aktion.
Wir haben Abhängigkeiten importiert (Zeilen 2-5) und realisieren dann ***appStore*** (Zeile 7) mit ***[createStore](https://github.com/rackt/redux/blob/ec0b1a36e958584b7a11a5977734f04d05955c22/docs/api/createStore.md)*** und übergeben den ***rootReducer*** (Funktion).
Schlussendlich haben wir die normale Angular ***bootstrap***  Methode mit unserem Modul ***AppModule(Zeile 21) verwendet.


*Du kannst bei [Angular Modulen](https://angular.io/guide/ngmodule) (angular.io) mehr darüber lesen, wie **ngModules** funktionieren*


Wir melden unseren Store in diesem simplen Beispiel über ein String Token an.
Beachte, dass wir bei der Verwendung eines String-Tokens @Inject(‘AppStore’) innerhalb unserer Komponenten benutzen müssen.
Wir werden das in den folgenden Code-Beispielen genauer ansehen.

## Anwendungs State


Der *Application Store **(appStore)*** hält den Anwendungsstatus.
Dieser ist: das Todos array und der aktuelle Filter.


Wir definieren de Ausgangszustand wie folgt:


```javascript
//src/rootReducer.ts
const initialState = {
 todos: [],
 currentFilter: 'SHOW_ALL'
}

```

Im nächsten Abschnitt werden wir die Struktur für ein todo-Item definieren. Diese Kernstruktur bleibt während der Laufzeit der Anwendung unverändert.

### Ein neues Todo hinzufügen

Lass uns eine vereinfachte Version der ***AddTodo*** Komponente anschauen, die es uns ermöglicht, ein neues Todo hinzuzufügen und auf die Benutzereingaben zu achten.

```javascript
//src/addTodo.ts
@Component({
 selector: 'add-todo', //matches <add-todo></add-todo>
 template: `
  <div>
   <input #todo>
   <button (click)=”addTodo(todo)”>Add todo</button>
  </div>`
})
export class AddTodo {
 constructor(
   @Inject('AppStore') private appStore: AppStore,
   private todoActions: TodoActions
 ){}

 private addTodo(input) {
   this.appStore.dispatch(this.todoActions.addTodo(input.value));
   input.value = ‘’;
 }
}

```

Im Template (Zeilen 4-8) verwenden wir eine [lokale Template-Variable](https://angular.io/guide/template-syntax#!#local-vars) #***todo*** (inline HTML Element, Zeile 6) und übergeben deren Referenz auf das Button-Klickereignis (Zeile 7). Auf dem Konstruktor haben wir ***appStore*** und ***todoActions*** in die Komponente (Zeilen 11-17) als private Eigenschaften injiziert. Wenn der Benutzer eine Beschreibung eingibt und auf ***‘Add Todo’*** klickt, wird eine Aktion (Zeile 20) wie die unten abgegeben und den Eingabeinhalt löschen.

```javascript
{
  type: ‘ADD_TODO’,
  id: 0,
  text: ‘buy milk’,
  completed: false
}

```

Um das manuelle Erstellen von Aktionsobjekten in unseren Komponenten zu vermeiden, haben wir die ***TodoActions*** Klasse als einen *ActionCreator* erstellt.

```javascript
//src/todoActions.ts
export const ADD_TODO = 'ADD_TODO'; //convenience token
...

export class TodoActions {
 constructor() {
   this.nextToDoId = 0; //convenience accumulator
 }

 addTodo(text){
   return {
     type: ADD_TODO,
     id: this.nextToDoId++,
     text: text,
     completed: false
   };
 };
}

```


Wir setzen das *ADD_TODO* Token als Aktionskennzeichen (Zeile 2) ein. Beachte, wie wir das Ktionsobjekt erweitert haben, um die Informationen zu enthalten, wie wir benötigen, um Todos zu identifizieren und sie als abgeschlossen oder nicht abgeschlossen zu markieren (Zeilen 12-15). Nach dem Absenden der Aktion wird der ***rootReducer*** von dem Store angerufen, der den *currentState (initialState* wenn undefiniert) und die User-Aktion übergibt.

```javascript
//src/rootReducer.ts
case TodoActions.ADD_TODO:
  return {
   todos: state.todos.concat({
     id: action.id,
     text: action.text,
     completed: action.completed
   }),
   currentFilter: state.currentFilter
  };

```

Um den neuen Zustand zu schaffen, verwenden wir ***concat*** (um einen neuen Array zu erstellen) und behalten die aktuellen Filter.
Diese zeigen zunächst alle Todos an.

### Ein Todo umschalten

Jedes Todo kann der Benutzer als abgeschlossen markieren, indem er auf die Stelle über der Beschreibung klickt.
Im Folgenden siehst du eine vereinfachte Markierung für ein aktives Todo:


```javascript
<todo-list><ul>
  <todo id="0" completed="false"><li>buy milk</li></todo>
</ul></todo-list>

```

Ähnlich wie beim Hinzufügen von einem Todo, wird jedes Klickereigniss die Todo *ID* (Input Attribut, Zeile 6) weitergeben und die entsprechende Aktion (Zeile 17) abschicken.

```javascript
//src/todo.ts
@Component({
  selector: 'todo',
  inputs: ['completed', 'id'], //attributes
  template: `
   <li (click)=”onTodoClick(id)” ...>
     <ng-content></ng-content>
   </li>`
})
export class Todo {
 constructor(
   @Inject(‘AppStore’) private appStore: AppStore,
   private todoActions: TodoActions
 ){ }

 private onTodoClick(id){
   this.appStore.dispatch(this.todoActions.toggleTodo(id));
 }
}

```

*TypeScript-Tipp: Bei privaten oder öffentlichen Modifikatoren in den Konstruktorargumenten handelt es sich um eine Verknüpfung zum Deklarieren privater oder öffentlicher Objekte (Zeilen 12-13). Siehe private / öffentliche Modifikatoren.

Das Umschalten des ersten Beispiels würde zu folgender Aktion führen:

```javascript
{
  type: 'TOGGLE_TODO',
  id: 0
}

```
Wie zuvor wird der Versand der Aktion den reducer ausführen und einen neuen Zustand schaffen.

```javascript
//src/rootReducer.ts
case TodoActions.TOGGLE_TODO:
 return {
   todos: toggleTodo(state.todos, action),
   currentFilter: state.currentFilter
 };
...
function toggleTodo(todos, action){
  //map returns new array
  return todos.map(todo => {
    //skip other items
    if (todo.id !== action.id)
      return todo;
    //toggle
    return {
      id: todo.id,
      text: todo.text,
      completed: !todo.completed
    };
  });
}

```

Die Helper-Funktion ***toggleTodo kreiert ein neues Array, welches das Todo-Matching der ***action.id*** abschaltet und den Rest beibehält.

### Todos filtern
Die ***Filter***-Komponente ermöglicht es dem Benutzer zu filtern: alle, nur aktive oder nur abgeschlossene Todos. Wir verwenden ***FilterLink***-Komponenten, um jeden Filter, der eine Kennung über den Attribut***filter*** übergibt, zu verkapseln.

```javascript
//src/filters.ts
<filters>Show:
  <filter-link filter="SHOW_ALL"><a>All</a><filter-link>
  <filter-link filter="SHOW_ACTIVE"><a>Active</a><filter-link>
  <filter-link filter="SHOW_COMPLETED"><a>Completed</a><filter-link>
</filters>

```
Innerhalb von FilterLink passiert jedes Klickereignis den Filter (Eingabeattribut, Zeile 6) und sendet die entsprechende Filteraktion ab.

```javascript

//src/filterLink.ts
@Component({
 selector: 'filter-link',
 inputs: ['filter'], //attribute
 template:
 `<a href=”#” (click)=”applyFilter(filter);”>` +
   `<ng-content></ng-content>` +
 `</a>`
})
export class FilterLink {

 private applyFilter(filter) {
   this.appStore.dispatch(
     this.todoActions.setCurrentFilter(filter)
   );
 }
}
```
Filtern mit ***Completed*** wird folgende Aktion generieren

```javascript
{
  type: 'SET_CURRENT_FILTER',
  filter: 'SHOW_COMPLETED'
};

```

Wie vorher wird der Versand der Aktion den Reducer ausführen und einen neuen Zustand schaffen.
In diesem Fall behalten wir die gleichen Todos und ändern den aktuellen Filter mit ausgelieferten Filter (Zeile 5).

```javascript
//src/rootReducer.ts
case TodoActions.SET_CURRENT_FILTER:
 return {
   todos: state.todos.map(todo => todo), //map creates a new array
   currentFilter: action.filter
 };

```

### Die Todo-Liste anzeigen
Wir verwenden eine untergeordnete Komponente  ***todo***, um ein einzelnes Todo zu verkapseln, das einige Eigenschaften als Attribute (id, abgeschlossen) und die Beschreibung (Text) als Inhalt übergibt. Dieses Muster ist als ***[Container Component](https://medium.com/@learnreact/container-components-c0e67432e005)*** bekannt.

```javascript
//src/todoList.ts
<ul>
 <todo *ngFor=”let todo of todos”
   [completed]=”todo.completed”
   [id]=”todo.id”
 >{{todo.text}}</todo>
</ul>

```

Wir verwenden ***[ngFor](https://angular.io/api/common/NgFor-directive)***, um über den ***todos*** Array (Zeile 3) zu iterieren. Für jedes Todo geben wir die Information mit einer *[local template variable](https://angular.io/guide/template-syntax#!#local-vars)* ***Todo***.

Im Folgenden siehst du einen Auszug aus der ***TodoList*** Komponente.

```javascript
//src/todoList.ts
export class TodoList implements OnDestroy {
  constructor(
    @Inject('AppStore') private appStore: AppStore
  ){
    //subscribe listener to state changes
    this.unsubscribe = this.appStore.subscribe(function listener(){
      let state = this.appStore.getState();
      this.todos = state.todos;
    });
  }

  private ngOnDestroy(){
    //remove listener
    this.unsubscribe();
  }
}

```


* Beachte, wie wir alle Komponenten-Eigenschaften und Hilfsprogramme als privat gehalten haben. Wir wollen nicht, dass andere Komponenten auf sie zugreifen.*


## Redux Lebenszyklus Review
Lass uns überprüfen, wie sich eine Redux-Anwendung in verschiedenen Stadien verhält.

- **Application bootstrap**: Wir initialisieren den ***appStore***, der den ***rootReducer*** übergibt. Dadurch wird die interne Inbetriebnahme von ***appStore*** ausgelöst. Normalerweise führt das zu ***intitialState***
- **Komponentenerstellung**: Wir injizieren ***appStore*** und ***TodoActions*** auf dem Konstruktor je nach Bedarf. Die Komponenten, die Daten anzeigen, subscriben zum ***appStore***  und lesen ihn durch Aufruf von [appStore.getState](https://github.com/rackt/redux/blob/ec0b1a36e958584b7a11a5977734f04d05955c22/docs/api/Store.md#getState)().Komponenten, die den Zustand mutieren, bereiten den Versandcode für die entsprechende Aktion vor, die alle erforderlichen Daten übergibt.
- **Komponenten-Zerstörung**: Komponenten, die Daten anzeigen,***unsubscribe*** zum ***appStore***, um Ressourcen zu bereinigen.
- **Benutzerinteraktionen**: Jede Benutzerinteraktion löst eine abschließende Versandaktion aus. Dies führt den ***RootReducer*** aus, der einen neuen Zustand erzeugt. Der AppStore benachrichtigt dann alle abonnierten Benutzer, die entsprechend aktualisiert werden.
- **Bei vom Server initiierten Aktionen**: Manche Anwendungen können Aktionen in Reaktion auf serverseitig initiierte Ereignisse versenden. Zum Beispiel: WebSockets. Diese Aktionen nach dem ordnungsgemäßen Setup folgen dem gleichen Fluss wie Benutzerinteraktionen.


<hr>
<div class="workshop-hint">
  <div class="h3">Puh - das muss ich mir genauer ansehen!</div>
  <div class="row mb-2">
    <div class="col-xs-12 col-md-6">
      <p>
        Gute Idee - vielleicht ist ja unsere <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-advanced?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=link&utm_content=text-top">Angular
                                       Advanced Schulung</a> für dich das Richtige. Hier erstellen wir gemeinsam eine Beispiel-Anwendung mit ngRX und können individuell auf deine Anforderungen im Projekt eingehen.
      </p>
      <p class="text-center">
        <a target="_blank" href="https://workshops.de/seminare-schulungen-kurse/angular-advanced?utm_source=angularjs.de&utm_campaign=tutorial&utm_medium=button&utm_content=text-top">
          <button class="btn btn-danger">Mehr Informationen zur Schulung</button>
        </a>
      </p>
    </div>
    <div class="col-xs-12 col-md-6">
      <img class="img-fluid img-rounded" src="/assets/img/workshops/teilnehmer-workshop.png" alt="Teilnehmer in der Veranstaltung Angular &amp; Typescript Intensiv Workshop/Schulung">
    </div>
  </div>
</div>
<hr>



Dies ist eine Übersetzung und Überarbeitung von Gerard's großartigem Artikel [Angular — Introduction to Redux](https://medium.com/google-developer-experts/angular-2-introduction-to-redux-1cf18af27e6e)

Benutze diese Links für die finalen Lösungen: [Demo](https://embed.plnkr.co/6UJUYh7nbyU3TMS2Xd6l/) - [Source](https://plnkr.co/edit/6UJUYh7nbyU3TMS2Xd6l?p=preview)
