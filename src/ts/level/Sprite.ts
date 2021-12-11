import { Matrix4, Vector3, Vector4 } from '@math.gl/core';
import MathHelper from '../helpers/MathHelper';
import WebGL from "../helpers/WebGLHelper";

import Renderable from "../interfaces/Renderable";

import ScreenShader from "../ScreenShader";
import Texture from '../Texture';

export default abstract class Sprite implements Renderable {
    public uuid : string = MathHelper.newGuid();

    protected gl : WebGL;
    protected shader : ScreenShader;

    protected texture : Texture;

    protected posLocation : number;
    
    protected objectTransformLocation : WebGLUniformLocation;
    protected cameraTransformLocation : WebGLUniformLocation;
    protected viewTransformLocation : WebGLUniformLocation;
    protected textureTransformLocation : WebGLUniformLocation;

    protected colorLocation : WebGLUniformLocation;

    protected objectMatrix : Matrix4 = new Matrix4();
    protected textureMatrix : Matrix4 = new Matrix4();

    
    public constructor(gl : WebGL, shader : ScreenShader)
    {
        this.gl = gl;
        this.shader = shader;

        this.posLocation = this.gl.getAttribLocation(this.shader.program, "a_pos");

        this.objectTransformLocation = gl.getUniformLocation(this.shader.program, 'u_objectTransform') as WebGLUniformLocation;
        this.cameraTransformLocation =  gl.getUniformLocation(this.shader.program, 'u_cameraTransform') as WebGLUniformLocation;
        this.viewTransformLocation =  gl.getUniformLocation(this.shader.program, 'u_viewTransform') as WebGLUniformLocation;
        this.textureTransformLocation = gl.getUniformLocation(this.shader.program, 'u_textureTransform') as WebGLUniformLocation;
        this.colorLocation = this.gl.getUniformLocation(this.shader.program, 'u_color') as WebGLUniformLocation;
        
        this.texture = new Texture(gl);

        WebGL.createVertexBuffer(gl, this.vertexArray, this.posLocation);
        WebGL.createIndexBuffer(gl, this.indexArray);

        WebGL.initShaderProgram(gl, shader.program, this.posLocation);
    }

    public setTexture(texture : Texture) : void
    {
        this.texture = texture;
        this.gl.bindTexture(WebGL.TEXTURE_2D , texture.texture);
    }

    public setCamera(viewMatrix : Matrix4, cameraMatrix : Matrix4) : void
    {
        this.gl.uniformMatrix4fv(this.viewTransformLocation, false, viewMatrix.elements);
        this.gl.uniformMatrix4fv(this.cameraTransformLocation, false, cameraMatrix.elements);
    }
    
    public render(pos : Vector3, w : number, h : number, uo : number, vo : number, color : Vector4) : void
    {
        if (!this.texture.loaded) return;

        const texWidth : number = this.texture.width;
        const texHeight : number = this.texture.height;

        this.objectMatrix.identity();
        this.objectMatrix.translate(pos);
        this.objectMatrix.scale(new Vector3(w * 1.0, h * 1.0, 0.0));
        this.gl.uniformMatrix4fv(this.objectTransformLocation, false, this.objectMatrix.elements);

        this.textureMatrix.identity();
        this.textureMatrix.scale(new Vector3(1.0 / texWidth, 1.0 / texHeight, 0.0));
        this.textureMatrix.translate(new Vector3(uo * 1.0, vo * 1.0, 0.0));
        this.textureMatrix.scale(new Vector3(w * 1.0, h * 1.0, 0.0));
        this.gl.uniformMatrix4fv(this.textureTransformLocation, false, this.textureMatrix.elements);

        this.gl.uniform4fv(this.colorLocation, color.elements);

        this.gl.drawElements(WebGL.TRIANGLES, 6, WebGL.UNSIGNED_SHORT, 0);
    }

    public abstract tick(cameraMatrix : Matrix4, screenMatrix : Matrix4, viewMatrix : Matrix4) : void;

    protected get vertexArray() : Float32Array
    {
        const vertexArray : Float32Array = new Float32Array(4 * 3);
        vertexArray.set([0.0, 0.0, 0.0], 0 * 3);
        vertexArray.set([0.0, 1.0, 0.0], 1 * 3);
        vertexArray.set([1.0, 1.0, 0.0], 2 * 3);
        vertexArray.set([1.0, 0.0, 0.0], 3 * 3);

        return vertexArray;
    }

    protected get indexArray() : Int16Array
    {
        const indexArray : Int16Array = new Int16Array(6 * 1);
        indexArray.set([0, 1, 2, 0, 2, 3], 0);

        return indexArray;
    }
}