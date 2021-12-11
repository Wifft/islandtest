import BillboardSprite from "../level/BillboardSprite";
import ScreenShader from "../ScreenShader";
import Texture from "../Texture";
import WebGL from "../helpers/WebGLHelper";
import { Matrix4, Vector2, Vector3, Vector4 } from "@math.gl/core";

export default class Tree extends BillboardSprite
{
    public pos : Vector3;

    public w : number;
    public h : number;
    public uo : number;
    public vo : number;
    
    public color : Vector4;

    public colVec : Vector2;

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

        this.colVec = new Vector2(this.pos.x, this.pos.z);
    }

    public tick(cameraMatrix : Matrix4, screenMatrix : Matrix4, viewMatrix : Matrix4) : void
    {
        super.setTexture(this.texture);
        super.setCamera(viewMatrix, screenMatrix);
        super.render(this.pos.clone().transformAsPoint(cameraMatrix), this.w, this.h, this.uo, this.vo, this.color);
    }
}