# bezierTo

> Draws bezier curves with arbitrary anchor points.

Utility function that allows to draw bezier curves with arbitrary anchor points using consecutive
quadratic curves.

This utility does not plot. It simply draws the lines using the canvas context. Calls to `.stroke()` or
`.fill()` are necessary.

### Example

```ts
import { bezierTo } from "@roboshoes/bezier";

context.moveTo( 10, 10 );

bezierTo( context, [
    { x: 30, y: 30 },
    { x: 100, y: 200 },
    { x: 23, y: 56 },
    { x: 1344, y: 57 },
] );

context.stroke();
```
