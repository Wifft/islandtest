export default class WebGL extends WebGL2RenderingContext {
    public static createVertexBuffer(gl : WebGL, vertexArray : Float32Array, posLocation : number) : void
    {
        const vertexBuffer : WebGLBuffer|null = gl.createBuffer();
        
        gl.bindBuffer(WebGL.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(WebGL.ARRAY_BUFFER, vertexArray, WebGL.DYNAMIC_DRAW);
        gl.vertexAttribPointer(posLocation, 3, WebGL.FLOAT, false, 0, 0);
    }
    
    public static createIndexBuffer(gl : WebGL, indexArray : Int16Array) : void
    {
        const indexBuffer : WebGLBuffer|null  = gl.createBuffer();
        gl.bindBuffer(WebGL.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(WebGL.ELEMENT_ARRAY_BUFFER, indexArray, WebGL.DYNAMIC_DRAW);
        gl.bindBuffer(WebGL.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }
 
    public static initShaderProgram(gl : WebGL, shaderProgram : any, posLocation : number) {
        gl.useProgram(shaderProgram);
        gl.enableVertexAttribArray(posLocation);
    }
}