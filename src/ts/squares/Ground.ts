
import WebGL from "../helpers/WebGLHelper";

import ScreenShader from "../ScreenShader";
import Sprite from "../level/Sprite";
import Texture from "../Texture";
import { Matrix4, Vector3, Vector4 } from "@math.gl/core";

export default class Ground extends Sprite {
    public pos : Vector3;
    public w : number;
    public h : number;
    public uo : number;
    public vo : number;
    public color : Vector4;

    public constructor(gl : WebGL, shader : ScreenShader, texture : Texture, pos : Vector3, w : number, h : number, uo : number, vo : number, color : Vector4)
    {
        super(gl, shader);

        this.gl = gl;
        this.texture = texture;

        this.pos = pos; 
        this.w = w;
        this.h = h;
        this.uo = uo;
        this.vo = vo;
        this.color = color;
    }

    public tick(cameraMatrix : Matrix4, screenMatrix : Matrix4, viewMatrix : Matrix4) : void {
        const floorCameraMatrix : Matrix4 = new Matrix4()
            .identity()
            .rotateX(Math.PI / 2.0);

        super.setTexture(this.texture);
        super.setCamera(viewMatrix, screenMatrix.multiplyRight(cameraMatrix).multiplyRight(floorCameraMatrix));
        super.render(this.pos, this.w, this.h, this.uo, this.vo, this.color);
    }
}