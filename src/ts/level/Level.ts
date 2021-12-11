import Matrix4 from '@math.gl/core/dist/esm/classes/matrix4';
import Vector3 from '@math.gl/core/dist/esm/classes/vector3';
import Vector4 from '@math.gl/core/dist/esm/classes/vector4';

import MathHelper from '../helpers/MathHelper';
import WebGL from "../helpers/WebGLHelper";

import Renderable from '../interfaces/Renderable';

import Ground from "../squares/Ground";

import Tree from '../entities/Tree';

import ScreenShader from "../ScreenShader";
import Texture from "../Texture";

export default class Level {
    public static SIZE : number = 32.0;

    private renderables : Array<Renderable> = new Array<Renderable>();

    private gl : WebGL;

    private shader : ScreenShader;
    private texture : Texture;

    private whiteColor : Vector4 = new Vector4(0.2, 0.2, 0.2, 1.0);

    public constructor(gl : WebGL, shader : ScreenShader, texture : Texture)
    {
        this.gl = gl;

        this.shader = shader;
        this.texture = texture;
    }

    public init() : void
    {
        this.buildGround();
        this.putTrees();
    }

    public render(cameraMatrix : Matrix4, screenMatrix : Matrix4, viewMatrix : Matrix4) : void
    {
        this.getAllRenderables().forEach((r : Renderable) : void => r.tick(cameraMatrix.clone(), screenMatrix.clone(), viewMatrix.clone()));
    }

    private buildGround() : void
    {
        for (let x : number = -Level.SIZE; x <= Level.SIZE; x++) {
            for (let y : number = -Level.SIZE; y<= Level.SIZE; y++) {
                this.addRenderable(new Ground(this.gl, this.shader, this.texture, new Vector3(x * 32.0, y * 32.0, 0.0), 32, 32, 0, 0, this.whiteColor));
            }
        }
    }

    private putTrees() : void
    {
        for (let i : number = 0; i < 1000; i++) {
            const offset : number = Level.SIZE ** 2;
            const xPos : number = MathHelper.randomRange(-offset, offset);
            const zPos : number = MathHelper.randomRange(-offset, offset);;

            const pos : Vector3 = new Vector3(xPos, 0.0, zPos);

            const tree : Tree = new Tree(this.gl, this.shader, this.texture, pos, 32, 32, 32, 0, this.whiteColor);
            this.addRenderable(tree);;
        }
    }

    private addRenderable(renderable : Renderable) : Renderable
    {
        this.renderables.push(renderable);
        
        return renderable; 
    }

    private getAllRenderables() : Array<Renderable>
    {
        return this.renderables;
    }

    private getRenderableByUuid(uuid : string) : Renderable
    {
        return this.renderables.find((r : Renderable) : boolean => r.uuid === uuid) as Renderable;
    }
}