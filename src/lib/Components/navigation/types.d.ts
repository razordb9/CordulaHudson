
export type Route={
    path?:string;
    name?:string;
    target?:string;
    group?:RouteGroup | undefined;
    routes?:Array<Route> | undefined;
    visible?:boolean;
}
export type Routes=Array<Route>;

export type RouteGroup={
    name?:string;
    visible?:boolean;
    routes:Array<Route>;
}