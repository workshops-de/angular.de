---
title: "Einführung in den NgRx Signal Store"
description: In diesem Artikel stellen wir dir den neuen, leichtgewichtigen NgRx Signal Store vor und zeigen dir wie du ihn in deinem Projekt verwenden kannst.
author: "Stefan Huber"
published_at: 2024-02-28 11:27:00.000000Z
header_source:
header_image: header.jpg
categories: "angular signals ngRx"
---

## Einleitung

Kurz nach dem Erscheinen von Angular 17 hat NgRx eine neue, leichtgewichtige Lösung für das State-Management präsentiert, den Ngrx Signal Store. Dieser baut vollständig auf die seit Angular 16 verfügbaren Signals auf. In diesem Artikel wollen wir euch diesen neuen Store vorstellen, uns die Vorteile gegenüber dem bereits etablierten ngrx/store ansehen und ein kleines Code-Beispiel auf Basis des Signal Stores erstellen.


## Grundlagen: Signal und State Management

Ein **Signal** ist ein Wrapper um einen Wert, der interessierte Verbraucher benachrichtigen kann, wenn sich dieser Wert ändert. Signale können jeden Wert enthalten, von einfachen Grundelementen bis hin zu komplexen Datenstrukturen. Zum Thema Signals kannst du folgenden Artikel auf angular.de nachlesen: \
[Angular kurz erklärt: Signals](https://angular.de/artikel/angular-kurz-erklaert-signals/)

Beim **State Mangement** geht es darum, den Status der gesamten Applikation für alle Komponenten zentral zu verwalten und bereitzustellen. Die Vorteile von zentralem State Management werden in diesem Artikel gut beschrieben:  \
[Hosteurope: Zentrales State Management für Angular](https://www.hosteurope.de/blog/zentrales-state-management-fuer-angular/)

## Vorteile des Signal Store

Ngrx stellt mit ngrx/store bereits eine Lösung für das State Management zur Verfügung, warum also jetzt der neue Signal Store? Er bietet einige Vorteile, wie z.B.:

* **Einfachheit** \
  Im Gegensatz zu ngrx/store mit Actions, Reducern, Selektoren und Effekten ist der Aufbau eines Signal Stores relativ einfach und überschaubar
* **Kleinere Bibliotheksgröße** \
  Die @ngrx/signals-Bibliothek ist mit einer Größe im Bereich von 500 Byte bis 2 Kilobyte im endgültigen Paket erheblich kleiner als die ngrx/store-Bibliothek
* **Wiederverwendbarkeit und Skalierbarkeit** \
  Durch den Aufbau von wiederverwendbaren Funktionen können wir Code-Duplikation eliminieren und sie nahtlos in mehrere Stores integrieren.
* **Funktionsbasiert** \
  Der Trend bei Angular geht immer mehr Richtung funktionale Programmierung
* **Rxjs optional verwendbar** \
  Rxjs kann weiterhin verwendet werden, für Programmier-Anfänger sind Signals aber wahrscheinlich einfacher zu verstehen als z.B. Observables mit ihrer Vielzahl an Optionen


## Wie funktioniert der Signal Store?

**Hinweis:** Das gesamte Beispiel kann auf [Stackblitz](https://stackblitz.com/~/github.com/riget/todo-list-ngrx-signal-store) angesehen und getestet werden.


### Installation und Erstellung eines Stores

Zuerst müssen wir das neue Signal-Paket installieren:


```shell
npm install @ngrx/signals
```



### Funktionen zum Aufbau eines Stores

Der Signal Store wird grundlegend über folgende 4 Funktionen definiert:



* withState(): definiert den Aufbau des States
* withComputed(): stellt Selektoren für den State zur Verfügung (Bsp.: alle Todos welche noch offen sind)
* withMethods(): hier kann man Methoden definieren, welche der Store zur Verfügung stellen soll
* withHooks(): hier kann man auf die Lebenszyklen onInit und onDestroy reagieren


### Erstellung eines Stores

Für unser Beispiel wollen wir einen einfachen Todo-Store erstellen. Als API verwenden wir [Dummyjson](https://dummyjson.com/).

Um einen Store zu erstellen, rufen wir die signalStore-Methode auf:


```ts
export const TodoStore = signalStore(
    {providedIn: 'root'},
    withState({
        todos: [] as TodoItem[]
    })
);
```


Wir haben hier einen neuen Signal Store erstellt und diesen mit “{providedIn: ‘root’}” global verfügbar gemacht. Weiter haben wir den State definiert, in diesem Fall eine Liste von Todo-Items.

Wichtig zu betonen ist, alle in withState angegebenen Properties sind automatisch bereits Signale mit all deren zusätzlichen Funktionalitäten!


### Funktionen dem Store hinzufügen

Mit dem withMethods-Feature können wir nun eigene Funktionen hinzufügen. Diese Funktion erwartet eine Factory-Funktion als Eingabeargument welche ein Methodenwörterbuch zurückgeben muss. Auf den Store selbst, einschließlich zuvor definierter Zustände, berechneter Signale und Methoden, kann über die Factory-Eingabe zugegriffen werden:


```ts
// ...
withMethods((store) => {
        const todoService = inject(TodoService);

        return {
                async loadAllTodos() {
                    const todoResult = await todoService.getItems();
                    patchState(store, {todos: todoResult.todos});
                },

                async addTodo(todoText: string) {
                    const newTodo = await todoService.addItem(todoText);
                    patchState(store, {
                            todos: [...store.todos(), newTodo]
                    });
                }
        }
    }
),
// ...
```

Auf den TodoService, welcher alle Funktionen zum Zugriff auf die Todo-API bündelt, greifen wir über Injection zu (inject(TodoService)). Mit patchState werden die geladenen Todo-Datensätze in den Store übernommen.


### Berechnete Signale definieren

Mit dem withComputed-Feature können wir berechnete Signale dem Store hinzufügen. Diese Faktory-Funktion bekommt wieder den Store als Argument, wir verwenden in diesem Beispiel aber nur das Todos-Array (oder besser gesagt das Signal welches dieses Array liefert).

Diese Methode ist vergleichbar mit den Selectors im klassischen ngrx/store und ermöglicht es uns, Daten aus dem Store zu lesen und zu komponieren:


```ts
   withComputed(({todos}) => ({
            countTodos: computed(() => todos().length)
        }),
   )
```

### Auf Lebenszyklen reagieren

Wir können zusätzlich auch auf die Erstellung und Zerstörung des Stores mit dem withHooks-Feature reagieren. Wollen wir z.B. alle Todos sofort bei Erstellung des Stores laden, wäre das folgendermaßen möglich:


```ts
   withHooks({
        onInit({loadAllTodos}) {
            loadAllTodos();
        },
        onDestroy() {
            console.log('on destroy');
        },
   })
```


Zusammengefasst sieht unser Signal Store nun folgendermaßen aus:


```ts
export const TodoStore = signalStore(
    {providedIn: 'root'},
    withState({
        todos: [] as TodoItem[]
    }),

    withComputed(({todos} ) => ({
            countTodos: computed(() => todos().length)
        }),
    ),

    withMethods((store) => {
            const todoService = inject(TodoService)

            return {
                async loadAllTodos() {
                    const todoResult = await todoService.getItems();
                    patchState(store, {todos: todoResult.todos});
                },

                async addTodo(todoText: string) {
                    const newTodo = await todoService.addItem(todoText);
                    patchState(store, {
                            todos: [...store.todos(), newTodo]
                    });
                }
            }
        }
    ),

    withHooks({
        onInit({loadAllTodos}) {
            loadAllTodos();
        },
        onDestroy() {
            console.log('on destroy');
        },
    })
);
```



### Auf den Store zugreifen und in Komponente verwenden

Nachdem wir unseren Store definiert haben können wir ihn nun in unseren Komponenten verwenden. Da wir unseren Store in dem Beispiel als {providedIn: ‘root’} gekennzeichnet haben, kann er automatisch mit der inject-Methode in unseren Komponenten verfügbar gemacht werden:


```ts
public readonly store = inject(TodoStore);

// ...
this.store.addTodo(this.form.value.todoText ?? '');
// ...
```

In den Templates können wir nun auf alle Signale bzw. die berechneten Signale des Stores zugreifen und diese verwenden:


```ts
@for (todoItem of store.todos(); track todoItem.id) {
    <div>
        {{todoItem.todo}}
    </div>
}
<div>Gesamt: {{store.countTodos()}}</div>
```


Da es sich wie bereits beschrieben bei allen Properties des Store automatisch um Signale handelt, greifen wir über eine Methode auf die Elemente zu, d.h. wir müssen store.todos**()** verwenden (statt store.todos).


## Benutzerdefinierte Store-Features

Was den Signal Store besonders flexibel macht ist die Möglichkeit, eigene Store-Features zu erstellen. Der Vorteil, den man dadurch bekommt: Diese Features können auch in anderen Stores wiederverwendet werden und man kann bestimmte Funktionalitäten kapseln.

Ein benutzerdefiniertes Feature wird erstellt, indem man die signalStoreFeature-Funktion aufruft. Diese akzeptiert eine Sequenz von denselben Basis-Funktionen oder auch anderer benutzerdefinierten Funktionen wie ein Signal Store selbst.


### Das benutzerdefinierte Store-Feature erstellen

Wir wollen in unserem Beispiel ein Feature erstellen, welches uns einen Ladezustand angibt. D.h. solange die Daten geladen werden, soll der Zustand true sein, wenn die Daten fertig geladen sind, wieder false.

Als erstes erstellen wir das Feature in der Datei loading.feature.ts:


```ts
export function withLoading() {
    return signalStoreFeature(
        withState({loading: false}),

        withMethods((store) => {
            return {
                setLoading () {
                    patchState(store, {loading: true});
                },
                setCompleted () {
                    patchState(store, {loading: false});
                }
            }
        })
    )
}
```


Wie wir hier sehen, kann das Feature eigene State-Variablen definieren, welche dem übergeordneten Store, in welchem wir das Feature verwenden, hinzugefügt werden.


### Das benutzerdefinierte Store-Feature verwenden

Wir können nun in unserem Store das loading-Feature folgendermaßen verwenden:


```ts
export const TodoStore = signalStore(
    // …
    withLoading(),

    withMethods((store) => {
            const todoService = inject(TodoService)

            return {
                async loadAllTodos() {
                    store.setLoading();

                    const todoResult = await todoService.getItems();
                    patchState(store, {todos: todoResult.todos});

                    store.setCompleted();
                },
                // ...
            }
    }),
    // …
);
```

Mit withLoading() haben wir unser Feature dem Store hinzugefügt. In den danach folgenden Methoden wurde der Store bereits um die Funktionen unseres Features, nämlich setLoading() und setCompleted() erweitert, sodass wir diese in den Methoden verwenden können.

**Hinweis:** Man muss hier auf die richtige Reihenfolge der Funktionen achten: würden wir withLoading() erst nach withMethods() hinzufügen, könnten wir das Feature nicht verwenden, da der Store noch nicht um dessen Eigenschaften erweitert wurde!

## Entities verwalten mit withEntities
Ngrx bietet zur Verwaltung von Entitäten eine eigene Erweiterung, welche die immer wiederkehrenden Aufgaben, wie z.B. hinzufügen, aktualisieren oder löschen von Elementen aus Sammlungen vereinfacht.
Um die Erweiterung zu verwenden, definieren wir in unserem Store mit der withEntities-Methode, welchen Typ von Entity wir verwalten wollen:

```ts
export const TodoStore = signalStore(
    {providedIn: 'root'},
    withEntities<TodoItem>()
);
```
Wie man sieht ist keine withState-Methode mehr notwendig, die withEntities-Methode liefert uns gleich folgende Eigenschaften:

- ```ids: Signal<EntityId[]>```: die Ids aller Elemente
- ```entities```: Signal<TodoItem[]>: ein Array aller Elemente
- ```entityMap```: Signal<EntityMap<TodoItem>>: eine Map der Elemente, wobei der Schlüssel die Id ist

Zu beachten ist, dass das Entity ein Feld 'id' haben muss, welche das Element eindeutig identifizieren kann und vom Typ EntityId (string oder number) ist.

Weiters erhalten wir folgende Methoden, welche wir in patchState verwenden können:

- ```addEntity, addEntities```: fügt ein oder mehrere neue Elemente hinzu
- ```setEntity, setEntities```: tauscht ein oder mehrere Elemente aus
- ```setAllEntities```: löscht die Liste komplett und setzt sie auf die übergebenen Elemente
- ```updateEntity, updateEntities```: ändert einzelne Eigenschaften für ein oder mehrere Elemente
- ```updateAllEntities```: ändert einzelne Eigenschaften für alle Elemente
- ```removeEntity, removeEntities```: löscht ein- oder mehrere Elemente aus der Liste

Unser Todo-Beispiel würde dann mit den neuen Methoden folgendermaßen aussehen:

```ts
export const TodoStore = signalStore(
    {providedIn: 'root'},

    withEntities<TodoItem>(),

    withMethods((store) => {
            const todoService = inject(TodoService)

            return {
                async loadAllTodos() {
                    const todoResult = await todoService.getItems();
                    patchState(store, setEntities(todoResult.todos));
                },

                async addTodo(todoText: string) {
                    const newTodo = await todoService.addItem(todoText);
                    patchState(store, addEntity(newTodo));
                },

                async updateTodo(id: string, todoText: string) {
                    await todoService.updateItem(id, todoText);
                    patchState(store, updateEntity({id, changes: {todo: todoText}}));
                }
            }
        }
    ),

    // ...
);
```


## Fazit
Der NgRx Signal Store bietet eine leichtgewichtige, aber leistungsfähige Lösung für das Zustandsmanagement in Angular-Anwendungen. Durch seine Unterstützung für Signale ermöglicht er eine effiziente Verwaltung und Bereitstellung von Zustandsinformationen, wodurch die Entwicklung komplexer Anwendungen erleichtert wird. Die Verwendung des NgRx Signal Store kann dazu beitragen, die Codebasis zu strukturieren, die Wartbarkeit zu verbessern und die Entwicklungszeit zu verkürzen, indem er eine klare Trennung von Zustandslogik und Benutzerinteraktion ermöglicht. Und nicht zuletzt aufgrund der Erweiterungsmöglichkeiten bietet der NgRx Signal Store viel Flexibilität mit gleichzeitig weniger Boilerplate-Code.
