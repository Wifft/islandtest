import WebGL from "./helpers/WebGLHelper";

export default class ScreenShader {
    public program : WebGLProgram;

    private gl : WebGL;
    
    private vertexShader : WebGLShader;   
    private fragmentShader : WebGLShader;

    public constructor (gl : WebGL)
    {
        this.gl = gl;

        this.vertexShader = this.gl.createShader(WebGL.VERTEX_SHADER) as WebGLShader;
        this.fragmentShader = this.gl.createShader(WebGL.FRAGMENT_SHADER) as WebGLShader;

        this.program = this.gl.createProgram() as WebGLProgram;

        this.compile();
    }

    private compile() : void
    {
        this.gl.shaderSource(this.vertexShader, this.getShaderCode('../src/glsl/ScreenShader.vert'));
        this.gl.compileShader(this.vertexShader);
        if (!this.gl.getShaderParameter(this.vertexShader, WebGL.COMPILE_STATUS)) {
            throw this.gl.getShaderInfoLog(this.vertexShader);
        }
        
        this.gl.shaderSource(this.fragmentShader, this.getShaderCode('../src/glsl/ScreenShader.frag'));
        this.gl.compileShader(this.fragmentShader);
        if (!this.gl.getShaderParameter(this.fragmentShader, WebGL.COMPILE_STATUS)) {
            throw this.gl.getShaderInfoLog(this.fragmentShader);
        }

        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, WebGL.LINK_STATUS)) {
            throw this.gl.getProgramInfoLog(this.program);
        }
    }

    private getShaderCode(url : string) : string
    {
        const request : XMLHttpRequest = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);

        return request.status === 200 ? request.responseText : '';
    }
}