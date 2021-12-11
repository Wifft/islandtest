import WebGL from "./helpers/WebGLHelper";

export default class Texture {
    public texture : WebGLTexture|null = null;

    public width : number = 0;
    public height : number = 0;
    
    public loaded : boolean = false;
    
    private gl : WebGL;
    private url : string|null;

    public constructor(gl : WebGL, url : string|null = null)
    {
        this.gl = gl;
        this.url = url;

        this.load();
    }

    public load() : void
    {
        this.texture = this.gl.createTexture();
        
        const img : HTMLImageElement = new Image();
        
        img.onload = _ => {
            this.gl.bindTexture(WebGL.TEXTURE_2D, this.texture);
            this.gl.texImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGBA, WebGL.RGBA, WebGL.UNSIGNED_BYTE, img);
            this.gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, WebGL.NEAREST); 
            this.gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MAG_FILTER, WebGL.NEAREST); 
        
            this.width = img.width;
            this.height = img.height;
            this.loaded = true;
        };

        img.src = this.url ? this.url : '';
    }
}