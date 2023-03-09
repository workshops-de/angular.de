---
title: Angular 15 Features
description: Angular 15 ist da und es wurden wieder viele neue Features hinzugefügt.
author: "David Müllerchen"
published_at: 2022-11-16 15:00:00
header_source: https://unsplash.com/photos/cxoR55-bels
header_image: header.jpg
categories: "angular update"
---

## Angular 15 ist da

Angular 15 ist da und es wurden wieder viele neue Features hinzugefügt.

Wie an der Version schon zu sehen, gibt es auch Breaking changes.
Diesmal seit langem mal wieder eines welches manuelles eingreifen erfordert.

Aber der Reihe nach.

### NPM update

Angular unterstützt jetzt Node.js in den folgenden Versionen 14.20.x, 16.13.x und 18.10.x.
Alle früheren Versionen werden nicht mehr unterstützt. Grund hierfür ist u.a. EOL.

### ESBuild

In der CLI wurder der build prozess optimiert. Der prozess wurde von Webpack und ESBuild auf ESBuild verkleinert. Dadurch konnte die build Zeit um 57% veringert werden.

### TypeScript 4.8

Angular 15 setzt auf Typescript 4.8. was einige Änderungen und neue Features mitbringt. Damit kommt der BreakingChange der manuellen eingriff erfordert.
Alle Ändrungen findet ihr [hier](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html)

### inject Function

Interessant ist dabei aber eine Änderung die mit Version 3.7 schon kam.
Es geht hier um die art wie Klassen attribute definiert werden.
Typesscript ist beim initialen implementieren von einer inoffiziellen lösung ausgegangen. Warum interessiert uns das?
Weil diese implementierung vom dependency Framework innerhalb von Angular genutzt wird. Es gint zwar ein Flag um die Alte implementierung beizubehalten, diese wird auch bei Angular 15 per default gesetzt, aber damit entfernt man sich vom ES2022 standard.
Genaueres dazu findet ihr in der Offizielen [releasenote](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier) dazu.

Wie sieht jetzt aber die korrekte imolementierung von DI in Angular 15 aus?
Das ganze wird durch eine schon aus Angular 14 bekannte funktion gelöst. `inject`

Dependency Injection bisher sah so aus:

```ts
@Component({
  selector: "my-app",
  template: `{{ service.data$ | async }}`,
})
export class AppComponent {
  constructor(public service: myService) {}
}
```

Ab Angular 15 ist dieser Weg ein möglich (und meiner Meinung nach auch schöner)

```ts
@Component({
  selector: "my-app",
  template: `{{ data$ | async }}`,
})
export class AppComponent {
  data$ = inject(MyService).data$;
}
```

### Standalone Components

Ein weniger aufregendes Feature (weil schon etwas länger bekannt) sind Standalone Components.
Diese sind nun Stable in Angular 15.
Damit werden `@NgModule` optional. Noch ist es nicht möglich ein Projekt komplett ohne `@NgModule` zu generieren, der entsprechende generator wird vorraussuchtlich mit 15.x nachgeliefert.

Nachfolgend ein kurzes Beispiel.

Wir sehen, dass die NgModule Logik in die Component verschoben wurde.
Standalone Components werden daher nicht declariert sondern importiert wie man am Beispiel sieht.

```ts
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, MyOtherComponent, TopNavComponent],
  providers: [],
  template: `
    <top-nav></top-nav>
    <other-component></other-component>
  `,
})
export class AppComponent {}
```

Der Boostrap prozess ist auch leicht angepasst.

```ts
import { bootstrapApplication } from "@angular/platform-browser";
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

Aber Components sind nicht das einzige was Standalone möglich ist.

### Standalone Router

Das bringt uns direkt zum Router. Dieser kann jetzt auch ohne die Verwendung von NgModule verwendet werden.
Dafür wird der Router beim bootstraping als Provider übergeben. Auch die schon vertrauten Optionen die sonst der `forRoot` übergeben wurde sind weiter verfügbar.

```ts
export const lazyRoutes: Routes = [{ path: "", component: PrivateComponent }];
```

```ts
const aboutRoutes: Routes = [
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "private",
    loadChildren: () =>
      import("./feature/private").then((routes) => routes.lazyRoutes),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      aboutRoutes,
      withDebugTracing(),
      withPreloading(PreloadAllModules)
    ),
  ],
}).catch((err) => console.error(err));
```

#### Functional routeGuards

DIe Guards sind ab sofort als Funktionen zu verfügbar, Klassen bassierte Guards werden vorraussichtlich in v16 deprecated. Diese Änderung kam als request aus der community. Damit soll der Einstieg in Angular leichter gelingen

Sah bisher ein Guard so aus:

```ts
@Injectable({ providedIn: "root" })
export class MyGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }
}

const aboutRoutes: Routes = [
  {
    path: "about",
    component: AboutComponent,
    canActivate: [MyGuard],
  },
];
```

So können wir nun Guard Funktionalität in Funktionen verpacken. Auch haben wir hier die möglichtkeit die inject funktion zu nutzen.

```ts
export const myGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return true;
};

const aboutRoutes: Routes = [
  {
    path: "about",
    component: AboutComponent,
    canActivate: [myGuard],
  },
];
```

### Standalone HttpClient

Der HttpClient war schon immer ein Injectable. Wir können auch hier jetzt ohne `@NgModule` auskommen, evtl. Interceptoren werden über eine Factory mathode übergeben.

```ts
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([]))],
}).catch((err) => console.error(err));
```

Ich habe mich sehr über diese Entwicklung gefreut.
Und wer schon lange genug dabei ist wird evtl auch ein [dejavu](https://github.com/web-dave/ng2lala/blob/17b4b55fb2b5fdb9b2977e5f47e0bc6f0dc0cd45/src/main.ts) haben.

### Directive Composition Api

Manchmal gibt es den Wunsch, dass man eine Component definiert die aber von mehreren Klassen erbt.
Sowas ist in Typescript nicht vorgesehen.
Mit der Directive Composition API können wir mehrere Directives zu einer Directive zusammen führen und behalten zugriff auf die puplic API der einzelnen Directives.
Hier ein Beispiel:

```ts
@Component({
  selector: "mat-menu",
  hostDirectives: [
    CdkTooltip,
    {
      directive: CdkMenu,
      inputs: ["cdkMenuDisabled: disabled"],
      outputs: ["cdkMenuClosed: closed"],
    },
  ],
})
class MatMenu {}
```

Ich habe mir die Feature in meinem Livestream angesehen und ausprobiert.
Es fühlt sich alles sehr gut an. Das Video ist auf meinem Youtube Channel verfügbar. https://www.youtube.com/@webdave_de

Wenn du magst, sei gerne bei meinem Stream dabei, Ich beschäftige mich mit Webtechnologien und streame immer Dienstags 20:00 auf Twitch. https://webdave.tv
