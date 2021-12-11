
import { Vector2, Vector3 } from "@math.gl/core";
import WebGL from "../helpers/WebGLHelper"

import Level from "./Level";

export default class Player {
    public position : Vector3 = new Vector3(0.0, 8.0, 0.0);

    public speed : number = 0.5;
   
    private maxJumpHeight : number = 32.0;

    public tick(gl : WebGL) : void
    {
        this.mouseMove(gl);

        const posOffset : number = 14.0;
        const max : number = (Level.SIZE ** 2) - posOffset;
        if (this.position.z < -max) this.position.z = -max;
        if (this.position.z > max) this.position.z = max;
        if (this.position.x < -max) this.position.x = -max;
        if (this.position.x > max) this.position.x = max;
    }

    private mouseMove(gl : WebGL) : void
    {
        gl.canvas.onmousemove = (e : MouseEvent) => {
            if (document.pointerLockElement === gl.canvas) {
                const x : number = e.clientX;
                const y : number = e.clientY;

                this.position.x += x * this.speed;
            }
        };
    }
}
