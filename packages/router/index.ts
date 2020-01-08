import { Observable, BehaviorSubject } from "rxjs";
import { filter, startWith, pairwise, map } from "rxjs/operators";

const route = new BehaviorSubject<string>( "" );
const forwards = new Map<string, string>();

function onPopState(): void {
    route.next( window.location.pathname );
}

/**
 * Returns a observable with a pair of strings representing the previous and the new route triggered,
 * on subscription and on every subsequent route change.
 */
export function onRouteChange(): Observable<[string, string]> {
    return route.pipe(
        startWith( "/" ),
        pairwise()
    );
}

/**
 * Returns an observable for a given route. The Observable returns `true` of `false` depending if the
 * given route matches. Routes are given in Regex format.
 *
 * @param value the route to be observed.
 */
export function observeRoute( value: RegExp ): Observable<boolean> {
    return onRouteChange().pipe(
        filter( ( [ previous, current ] ) =>  !!( value.test( current ) || value.test( previous ) ) ),
        map( ( [ _, current ] ) => value.test( current ) ),
    );
}

/**
 * Returns an observable for a given route as a string. This is a specialized form of `observeRoute`.
 * For a given route the active route is compared and if it matches triggers an event with the current
 * active route.
 * The given route is matches as a start only.
 *
 * Example:
 *   `onRoute( "/home" )` will also match routes such as "/home/about" and "/home/foo/bar/12".
 */
export function onRoute( value: string ): Observable<string> {
    return route.pipe( filter( ( url: string ) => url.startsWith( value ) ) );
}

/**
 * Set a new route. This will resolve forwards if any are specified.
 */
export function setRoute( value: string ): void {
    if ( forwards.has( value ) ) {
        setRoute( forwards.get( value )! );
        return;
    }

    window.history.pushState( null, "", value );
    onPopState();
}

/**
 * Get the currently active route.
 */
export function getRoute(): string {
    return window.location.pathname;
}

/**
 * Defines a forwarding rule. This has to be exact matches.
 *
 * Example:
 *   `setForward( "/", "/home" )`. When calling `setRoute( "/" )` will set the route to `"/home"`.
 */
export function setForward( from: string, to: string ): void {
    forwards.set( from, to );
}

/**
 * This initiates the router. This is necessary to adopt the initial state given by the browser
 * url and listen to all browser changes.
 */
export function initRouter(): void {
    const initialValue = window.location.pathname;

    if ( forwards.has( initialValue ) ) {
        setRoute( forwards.get( initialValue )! );
        return;
    }

    window.addEventListener( "popstate", onPopState );

    onPopState();
}
