
import Canvas from "./controllers/Canvas";

import WebGL from "./helpers/WebGLHelper";

import Runnable from "./interfaces/Runnable";

import Level from "./level/Level";
import Player from "./level/Player";

import ScreenShader from "./ScreenShader";
import Texture from "./Texture";

import Camera from "./controllers/Camera";
import { Matrix4 } from "@math.gl/core";

class Game extends Canvas implements Runnable {
    private width : number;
    private height : number;

    private gl : WebGL;
    
    private shader : ScreenShader;
    private spriteSheet : Texture;

    private lastTime : number = new Date().getTime();
    private unprocessedFrames : number = 0.0;

    private level : Level;
    private player : Player;

    public constructor(width : number, height : number)
    {
        super();

        this.width = width;
        this.height = height;

        this.gl = this.getInstance("#game", this.width, this.height);

        this.shader = new ScreenShader(this.gl);;
        this.spriteSheet = new Texture(this.gl, '../../assets/png/spritesheet.png');

        this.level = new Level(this.gl, this.shader, this.spriteSheet);
        this.player = new Player();
    }

    public run() : void
    {
        if (this.gl === null) throw "WebGL is not supported!";
        
        this.gl.enable(WebGL.DEPTH_TEST);
        this.gl.depthFunc(WebGL.LESS);
        
        this.gl.enable(WebGL.BLEND);
        this.gl.blendFunc(WebGL.SRC_ALPHA, WebGL.ONE_MINUS_SRC_ALPHA);

        this.gl.colorMask(true, true, true, true);
        
        this.level.init();

        super.lockMousePointer(this.gl.canvas);
        
        window.requestAnimationFrame(() => this.tick());
    }

    private tick() : void
    {
        const now : number = new Date().getTime();
        
        this.unprocessedFrames += (now - this.lastTime) * 60 * 1000.0; // 60 fps. 

        if (this.unprocessedFrames > 10.0) this.unprocessedFrames = 10.0;
        while (this.unprocessedFrames > 1.0) {
            this.player.tick(this.gl);

            this.unprocessedFrames--;
        }

        this.render();

        window.requestAnimationFrame(() => this.tick());
    }

    private render() : void
    {
        this.gl.viewport(0, 0, this.width, this.height);
        this.gl.clearColor(0.2, 0.2, 0.2, 1.0);
        this.gl.clear(WebGL.DEPTH_BUFFER_BIT | WebGL.COLOR_BUFFER_BIT);

        const width = this.width;
        const height = this.height;

        const scale : number = 2.0 / this.gl.canvas.height;
        
        const cameraMatrix : Matrix4 = Camera.buildCameraMatrix(this.player.position);
        const screenMatrix : Matrix4 = Camera.buildScreenMatrix(scale);
        const viewMatrix : Matrix4 = Camera.buildViewMatrix(width, height);

        this.level.render(cameraMatrix, screenMatrix, viewMatrix);
    }
}

const game : Game = new Game(1000, 600);
game.run();