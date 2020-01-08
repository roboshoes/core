# Router

> A tiny DOM-unrelated router. Based on rxjs. Ships with Typescript types.

### Installation

Add to the project via

```sh
npm install --save-dev @roboshoes/router
```

### Setup

To set it up make sure to call `initRouter()` at some point during bootstrapping your project.
During this same proecss make sure to add all forwarding rules early in the project, to make sure
the initial call includes all forwarding rules.

```ts
import { initRouter } from "@roboshoes/router";


setForward( "/", "/home" );
setForward( "/description", "/about" );

initRouter();
```

### Usage

The most common way to use it is setting up a regex based router callback that turns on and off
based on whether the active route applies.

```ts
import { observeRoute } from "@roboshoes/router";

observeRoute( /\/home/, ( isOn: boolean ) => {

    document.querySelector( ".home" ).style.display = isOn ? "block" : "none";

} );
```

Alternativly one can simply listen to all route changes. A listener can be accessed via `onRouteChange()`
which returns a observable with the previous and new route as tuple.

To set routes use `setRoute` instead of a directly setting the url in the browser history.

```ts
import { setRoute } from "@roboshoes/router";

setRoute( "/home" );
```

### Methods

- `onRouteChange(): Observable<[string, string]>`
- `observeRoute(value: RegExp): Observable<boolean>`
- `onRoute(value: string): Observable<string>`
- `setRoute(value: string): void`
- `getRoute(): string`
- `setForward(from: string, to: string): void`
- `initRouter(): void`