# Shader Pass

> Utility class to run a shader-pass using Three.

### Install

```sh
npm install --save-dev @roboshoes/shader-pass three
```

This class helps you run a shader-pass using ThreeJS provided a framgment shader. The implementation
uses Three subclasses and therefore requieres `three` as a peer dependency.

On a very top level: A shaderpass can be used to calculate millions of variables simultaniously by
treating a bitmap as a matrix of varaibles. The pass therefore is implemented as a shader programm
functioning on every pixel of the bitmap. The input is given through various uniform types and the
output is a texture itself.


### Example

```ts
import { ShaderPass } from "@roboshoes/shader-pass";

// renderer: THREE Render instance

const shader = "...";
const size = 1024;

const positionPass = new ShaderPass( {
    renderer: renderer,
    shader,
    name: "positionTexture",
    size,
    startValue: generateRandomPosition( size ),
    uniforms: {
        ...otherUniforms,
        velocityTexture: createTexture( size, size, 0 ),
        delta: 0.016,
    },
} );
```
