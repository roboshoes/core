export interface Point2D {
    x: number;
    y: number;
}

export function bezierTo( context: CanvasRenderingContext2D, points: Point2D[] ): void {

    let a: Point2D, b: Point2D;
    let x: number, y: number;
    let i = 1;

    for ( let length = points.length - 2; i < length; i++ ) {

        a = points[ i ];
        b = points[ i + 1 ];

        x = ( a.x + b.x ) * 0.5;
        y = ( a.y + b.y ) * 0.5;

        context.quadraticCurveTo( a.x, a.y, x, y );
    }

    a = points[ i ];
    b = points[ i + 1 ];

    context.quadraticCurveTo( a.x, a.y, b.x, b.y );
};
