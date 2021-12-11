
import { Vector2, Vector3, Vector4 } from "@math.gl/core";
import WebGL from "../helpers/WebGLHelper";

import ScreenShader from "../ScreenShader";
import Sprite from "./Sprite";

export default abstract class BillboardSprite extends Sprite {
    public radius : number = 8.0;

    public abstract colVec : Vector2;

    public constructor(gl : WebGL, shader : ScreenShader)
    {
        super(gl, shader);
    }

    public render(pos : Vector3, w : number, h : number, uo : number, vo : number, color : Vector4) : void
    {
        if (!this.texture.loaded) return;

        const texWidth : number = this.texture.width;
        const texHeight : number = this.texture.height;

        this.objectMatrix.identity();
        this.objectMatrix.translate(new Vector3([pos.x - w / 2.0, pos.y - h * 1.0, pos.z]));
        this.objectMatrix.scale(new Vector3(w, h, 0.0));
        this.gl.uniformMatrix4fv(this.objectTransformLocation, false, this.objectMatrix.elements);

        this.textureMatrix.identity();
        this.textureMatrix.scale(new Vector3(1.0 / texWidth, 1.0 / texHeight, 0.0));
        this.textureMatrix.translate(new Vector3(uo + 0.05, vo + 0.05, 0.0));
        this.textureMatrix.scale(new Vector3(w - 0.1, w - 0.1, 0.0));
        this.gl.uniformMatrix4fv(this.textureTransformLocation, false, this.textureMatrix.elements);

        this.gl.uniform4fv(this.colorLocation, color.elements);

        this.gl.drawElements(WebGL.TRIANGLES, 6, WebGL.UNSIGNED_SHORT, 0);
    }
}