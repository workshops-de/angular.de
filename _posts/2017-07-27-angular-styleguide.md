---
title: "Angular Styling für Fortgeschrittene"
description: "Styling in Angular bietet euch viele Möglichkeiten. Encapsulation-Modes, Shadow-DOM und der Zugriff auf Host-Elemente sind nur einige Punkte."
author: "Gerard Sans"
slug: "angular-styling"
published_at: 2017-07-24 08:22:01.000000Z
categories: "angular styling advanced"
header_image: "/artikel/header_images/angular-styling.png"
---

In diesem Leitfaden wollen wir die verschiedenen Optionen abdecken, 
die bei der Gestaltung von Angular-Komponenten und Direktiven zur Verfügung stehen. 


Wir werden folgendes behandeln:

- Angular Verkapselung Modi: emuliert, nativ, deaktiviert
- Browser-Support, Shadow DOM vs Light DOM.
- @Component Styling Metadaten: Inline, Template Inline, Externe Entwürfe.
- Verwendung von `ngClass` und `ngStyle` Direktiven
- Shadow Dom Selektoren: `:host`, `:host()`, `:host-context()`, :host /deep/selector, :host>>>selector
- Verwendung von `@Component.host` und `@HostBinding`
- Verwendung von `ElementRef` und nativeElement APIs (Web).
- Verwendung von Renderer und setElementClass/setElementStyle APIs (Web, Server, WebWorker).
- CSS-Styles-Spezifität und Ausführungsreihenfolge


Du kannst den finalen Code mit diesem [Plunker](https://plnkr.co/edit/WUjoC897CXuybWvL9qt1?p=preview) erkunden.


## Einführung

Angular Anwendungen zu entwerfen ging noch nie flexibler.
*Angular-Component-Architecture* bietet ein neues Entwurfsmodell, das *Component Styles* durch die Verwendung von [Shadow DOM](https://www.w3.org/TR/shadow-dom/) (emuliert oder nativ) einer Technologie aus der [Web Components](https://www.w3.org/standards/techs/components#w3c_all) Spezifikation isoliert. 
Entwürfe werden für jede Komponente skizziert, so dass sie andere Bereiche der Benutzeroberfläche nicht beeinflussen können.

Für diesen Beitrag werden wir eine Komponente verwenden, um Song-Tracks zu veröffentlichen, die einige verschiedene Styling-Optionen haben. 
aDiese Komponente wird das Cover, den Titel und den Künstler für einen Song rendern.


```javascript

@Component({
selector: 'song-track',   // <song-track></song-track>
})
export class SongTrack { }


```


![Beispiel Komponente für diesen Artikel](/artikel/angular-styleguide/angular-styleguide-example-component.gif)


## Angular Encapsulation

Lass uns schnell alle verfügbaren Encapsulation-Modi erkunden, bevor wir die verschiedenen Styling-Ansätze weiter erforschen.

### Emuliert (Standard)

Bei der Verwendung dieses Modus wird Angular jede Komponente mit zwei eindeutigen Attributen identifizieren: `_nghost-*` und `_ngcontent-*`. 
Alle Komponenten-Styles werden dem Kopf hinzugefügt, indem diese Attribute verwendet werden, um die Styles wie im folgenden Beispiel zu isolieren.

```html

<head>
 <style>
 .container[_ngcontent-ikt-1] { ... } 
</style>
</head>
<body>
  <my-app>
    <song-track _nghost-ikt-1>
      <div _ngcontent-ikt-1 class="container"></div>
    </song-track>
  </my-app>
</body>


```

Beachte die Atrribute, die dem `root` und `content unserer Komponente fett hinzugefügt wurden. 
Du kannst diesen Modus aktivieren, indem du folgenden Code unten verwendest


```javascript

@Component({
selector: 'song-track',
 encapsulation: ViewEncapsulation.Emulated
})


```

*„Emulierte Verkapselung hat die beste Unterstützung für alle aktuellen Browser.“*

### Native Encapsulation (Shadow DOM)

Bei diesem Encapsulation-Mode nutzen wir den `Native Shadow DOM` für eine bestimmte Komponente. 
Je nach Browser ist dies [v1 der Spezifikation](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom) (Chrome).

```javascript
@Component({
selector: 'song-track',
encapsulation: ViewEncapsulation.Native
})

```

Diese Komponente wird als Resultat folgendes rendern.

```html
<body>
 <my-app>
    <song-track>    
      ▾ #shadow-root (open)    
        <style>.container { ... }</style>   
        <div class="container"></div>
    </song-track>
  </my-app>
</body>

```

Beachte, wie die Styles jetzt unter `#shadow-root` eingekapselt sind.
Die spezifischen Styling-Optionen werden wir später behandeln.

*„Native Verkapselung wird in einigen Browsern noch nicht unterstützt. Überprüfe hier die [funktionierenden Browser](http://caniuse.com/#feat=shadowdomv1).“*

### Deaktivierung der Verkapselung
Wir können auch die Verkapselung für eine bestimmte Komponente komplett deaktivieren.

```javascript

@Component({
  selector: 'song-track',
  encapsulation: ViewEncapsulation.None
})

```

Durch die Verwendung dieses Modus wird Angular alle definierten Styles dem Kopf hinzufügen, so dass Styles über Komponenten mit dieser Verkapselung geteilt werden können.


## Native Shadow DOM Browser-Support

`Native Shadow DOM` wird zu diesem Zeitpunkt noch nicht unterstützt. 
Siehe unten emulierten und nativen Browsersupport-Vergleiche, nebeneinander. 

<div class="row">
    <div class="col-lg-6 col-sm-12">
        <img class="img-fluid" alt="Browser Support for Emulated Shadow DOM im Überblick" src="/artikel/angular-styleguide/browser-support-shadow-dom.png"/>
    </div>
    <div class="col-lg-6 col-sm-12">
        <img class="img-fluid" alt="Browser Support for Native Shadow DOM im Überblick" src="/artikel/angular-styleguide/browser-support-native-shadow-dom.png"/>
    </div>
</div>


*„Welche Browser das Feature aktuell unterstützen kannst du bei [canIuse.com](http://caniuse.com/#feat=shadowdomv1) nachschauen.“

„ProTip: Schaue, ob dein Browser native Encapsulation unterstützt, bevor du sie aktivierst. :)“

## Shadow DOM vs Light DOM

Beim Entwerfen unserer Komponenten kann es helfen, zwischen `ShadowDOM` und `Light DOM` zu unterscheiden.

Shadow DOM: Alle lokalen DOM-Elemente, die eine Komponente erstellt oder verwaltet. Dazu gehören auch alle untergeordneten Komponenten.

```html
<song-track title="No Lie" artist="Sean Paul..."></song-track>
```


```javascript
@Component({
  selector: 'song-track',
  template: `        
     <track-title>{{track}}</track-title>
     <track-artist>{{artist}}</track-artist>`
})
export class SongTrack { }

```

Light DOM: Alle Childen DOM-Elemente einer Komponente. Auch als projizierter Inhalt (ng-content).

```html
<song-track>
  <track-title>No Lie</track-title>
  <track-artist>Sean Paul, Dua Lipa</track-artist>
</song-track>
```

```javascript
@Component({
  selector: 'song-track',
  template: `<ng-content></ng-content>`
})
export class SongTrack { }

```

## @Component Styling über Metadaten

Wollen wir spezifische Styles zu unser Angular Komponente hinzufügen, nutzen wir hierfür den `@Component()` Decorator und die Property `style`.

*„Angular wird die Styles exakt in der angegebenen Reihenfolge anfügen.“*


### Verwendung von Inline-Styles 

Hier fügen wir unsere Styles direkt in der TypeScipt-Datei welche unsere Komponente definiert hinzu. 
Da `styles` ein Array ist, können wir hier beliebig viele Strings anfügen.

```javascript

@Component({
  selector: 'song-track',
  styles: [`.container { color: white; }`]
})
export class SongTrack { }

```

### Verwendung von Inline-Style-Templates

Natürlich ermöglicht es Angular auch direkt mit Inline-Styles zu arbeiten.

```javascript

@Component({
 template: `
   <style>
   .container { color: deepskyblue; }
   </style>   
   <div class="container">...</div>
 `
})
export class SongTrack { }

```

# Verwendung einer externen Style-Datei

Der sauberste Weg ist es, unsere Styles der Komponente in eine extra Datei auszulagern.
Weiterer Vorteil an diesem Vorgehen: Wir können mit Prepozessoren wie SCSS oder LESS arbeiten.

song-track.component.css
```css
.container { ... }
```

song-track.component.ts
```javascript
@Component({
  styleUrls: ['./song-track.component.css'],
})
export class SongTrack { }

```

Als Teil der CSS-Sezifikation können wir auch `@import` verwenden, um Styles aus anderen Stylesheets zu importieren.
Diese müssen im Stylesheet irgendwelchen Styile-Regeln vorangehen.
Siehe [@import](https://developer.mozilla.org/en/docs/Web/CSS/@import). 
Importe werden in den Header nach dem Stylesheet eingefügt. 


```css

@import 'common.css';
.container { ... }

```

## Verwendung von NgClass- und ngStyle-Direktiven

Wir können `ngClass` und `ngStyle` Direktiven verwenden, um unsere Komponente dynamisch zu gestalten.
Lass uns einige Verwendungen anschauen

```html

<song-track ngClass="selected" class="disabled"></song-track>
<song-track [ngClass]="'selected'"></song-track>   
<song-track [ngClass]="['selected']"></song-track> 
<song-track [ngClass]="{'selected': true}"></song-track>

```

Beachte, dass `ngClass` mit vorhandenen Klassenattributen kombiniert werden kann ohne Bindungen zu verwenden.
Um mehrere Klassen zu erreichen, können wir die erweiterte Syntax mit einigen interessanten Variationen nutzen.


```html

<song-track ngClass="selected disabled">             
<song-track [ngClass]="'selected disabled'">      
<song-track [ngClass]="['selected', 'disabled']">   
<song-track [ngClass]="{'selected': true, 'disabled': true}">
<song-track [ngClass]="{'selected disabled': true}">

```

Für `ngStyle` können wir das gleiche machen, aber da wir Paare von Eigenschaften und Werten brauchen, gibt es weniger Optionen.

```html

<song-track [ngStyle]="{'color': 'white'}" style="margin: 5px;"><song-track [ngStyle]="{'font-size.px': '12'}">
<song-track [ngStyle]="{'font-size': '12px'}">
<song-track [ngStyle]="{'color': 'white', 'font-size': '12px'}">

```

Beachte die erweitere Einheiten-Syntax, die mit vorhandenen CSS-Messeinheiten übereinstimmt.
Um mehrere Styles anzuwenden, kannst du weitere Eigenschaften hinzufügen.

## Verwendung von Shadow DOM Selektoren

Bei der Verwendung von emulierter oder nativer Verkapselung haben wir Zugriff auf einige interessante CSS-Selektoren, die nur für `Shadow DOM` verfügbar sind.

### Entwerfen unserer Container (aka Host)

Falls wir auf unseren Container (eventuell mit Verbindung mit anderen Selektoren) zugreifen müssen, können wir den `:host` Pseudo-Klassen-Selektor benutzen.

```css

:host { color: black; }          /* <song-track> */
:host(.selected) { color: red; } /* <song-track class="selected"> */

```
Das erste Beispiel stimmt mit dem Song-Track-Element überein und fügt die Farbe zu den Styles hinzu. Das zweite Beispiel stimmt mit Song-Track-Elementen mit der ausgewählten Klasse überein.

### Entwerfen je nach Vorgängern

Wir können auch auf unserer Vorgänger(ancestors) zugreifen, die zur Wurzel des Dokuments gehen.

```css

:host-context(.theme) { color: red; }   
:host-context(#player1) { color: red; }

```

Das obige Beispiel ändert die `color` nur, wenn die `theme` Klasse auf eine der *ancestors* unserer Komponente angewendet wurde.
Das zweite Beispiel stimmt mit einem *ancestor* mit id:“player1“ überein.

###Entwerfen vom Host und Nachfolgern (Grenzübergänge)

Diese Option überschreibt alle Verkapselungseinstellungen einschließlich host children.
 Dieser Selektor arbeitet für `Shadow` und `Light DOM`.

*„Wir können Shadow DOM Grenzen mit / deep / überschreiben“*

```css

:host  /deep/ .selected { color: red; }
:host   >>>   .selected { color: red; }

```

*„Hinweis: benutze in Angular-CLI /deep/ anstelle von >>>.“*

## Verwendung @Component.host

Durch die Verwendung dieser Eigenschaft können wir mit `DOM properties`, `DOM attributes und events binden. 

```javascript

@Component({
 host: {
  'value': 'default',                    //'DOM-prop': 'value'  
  '[value]': "'default'",                //'[DOM-prop]': 'expr'   
  
  'class': 'selected',                   //'DOM-attr': 'value'
  '[class]': "'selected'",               //'[DOM-attr]': 'expr'
 
  '(change)': 'onChange($event)',        // (event) : ...   
  '(window:resize)': 'onResize($event)', // (target:event) : ...
 } 
})

```

Lass uns einige Beispiele mit `class` und *style* Dom Attributen sehen.

```javascript

@Component({
  host: {
    //setting multiple values
    'class': 'selected disabled',
    'style': 'color: purple; margin: 5px;',
    
    //setting single values (using binding)
    '[class.selected]': 'true',    
    '[class.selected]': '!!selected', //add class if selected = true
    '[style.color]': '"purple"'   //expression must be a string
  } 
})
export class SongTrack { }

```

Beachte die Verwendung von eckigen klammern, um eine Bindung zu erstellen. 
Darum  wird ‘true’ zu `boolean true`. 
Für die CSS-Eigenschaftsfarbe müssen wir einen String übergeben. 

### Bindung unsicherer Expressions

Um Missbrauch zu vermeiden, könnten einige Styling-Ausdrücke von Angular als unsicher markiert werden.

```javascript

@Component({
  host: {
    '[style]': '_hostStyle' //unsafe
  } 
})
export class SongTrack { }

```

Wenn du vor diesem speziellen Problem stehst, kannst du die *expression* als sicher markieren, indem du den `bypassSecurityTrustStyle` API auf dem `Sanitizer` verwendest. 
Dadurch werden viele Missbrauchs- oder Sicherheitsverletzungen vermieden.

```javascript

export class SongTrack {
  constructor(private sanitizer: Sanitizer){
    this._hostStyle = this.sanitizer
      .bypassSecurityTrustStyle('color: black;');
  }
}

```

## Benutzung @HostBinding

Wir können auch den `@hostBinding` Dekorateur verwenden, um unsere Styles einzustellen. 
Siehe einige Beispiele unten.

```javascript

export class SongTrack {   
  //<host class="selected"></host>   
  @HostBinding('class.selected') selected = true;
  //<host style="color: red;"></host>     
  @HostBinding('style.color') color = 'red';
}

```

*@HostBinding Decorators werden in `@Component.host` Metadaten übersetzt.*

## Benutzung von ElementRef und nativeElement APIs (Browser)

Manchmal wollen wir auf das zugrunde liegende DOM-Element zugreifen, um seine Styles zu verändern.
Um dies tun zu können, müssen wir `ElementRef` einfügen, und auf die `nativeElement`-Eigenschaft zugreifen.
Damit erhälst du Zugriff auf die DOM APIs.

```typescript

export class SongTrack {
  constructor(private element: ElementRef){
    let elem = this.element.nativeElement;
    elem.style.color = "blue";
    elem.style.cssText = "color: blue; ..."; // multiple styles
    elem.setAttribute("style", "color: blue;"); 
  }
}

```

*Beachte, dass diese Option mit der Browser-Plattform funktioniert, aber nicht mit dem Desktop oder Handy.*

## Benutzung von Renderer und setElementClass/setElementStyle APIs (Web, Server, WebWorker)

Eine sichere Alternative zu ElementRef, um unser Styling einzusetzen, ist, den *Renderer* zusammen mit `setElementClass` und `setElementStyle` zu benutzen. 
Ihre Implementierung wird die zugrunde liegende Plattform abstrahieren, welche die Kompatibilitätsbegrenzung von ElementRef überwindet.

```typescript

export class SongTrack {
  constructor(
     private element: ElementRef,
     private renderer: Renderer
  ){
    let elem = this.element.nativeElement;
    renderer.setElementStyle(elem, "color", "blue");
    renderer.setElementClass(elem, "selected", true);
  }
}


```

## CSS Styles Spezifizierung und Ausführungsreihenfolge

Jegliches Styling folgt den Spezifitäts- und Bestellregeln. 

Je spezifischer ein Style ist, desto höher ist die Priorität
Mit der gleichen Spezifität überschreibt die letzte Style-Regel alle vorherigen
Dies ist die Reihenfolge der Anwendung von Styles und ihrer Priorität von unten nach oben.

- Component implementation
    - Styles defined at `@Component.styles` (following array order)
    - Template Inline Styles
    - External styles @Component.styleUrls` (following array order)

- Container
    - Inline style. Eg: `<... style="">`
    - `ngClass` and `ngStyle`



Wenn wir also `ngStyle` verwenden, wird dies alle Inline-Styles überschreiben, die auf dem Element (und den vorherigen) definiert sind. 

*Styles werden statisch und dynamisch als Teil der Angular-Rendering-Ausführung und des Komponenten-Lebenszyklus angewendet.*

Beachte, dass je nach Reihenfolge der Ausführung ein Style vom anderen überschrieben wird. 
Zum Beispiel wird `@Component.host` zuerst angewendet und dann `@Hostbinding`.
 
 
Ich hoffe euch hat der Artikel geholfen, wenn ihr Anmerkungen oder Verbesserungen habt schreibt ein Kommentar oder stellt ein Pull-Request!
