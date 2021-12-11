import WebGL from "../helpers/WebGLHelper";

export default abstract class Canvas
{
    protected getInstance(domId : string, width: number, height: number) : WebGL
    {
        const canvas : HTMLCanvasElement = document.querySelector(domId) as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;

        const context : WebGL = canvas.getContext('webgl2') as WebGL;

        return context;
    }

    protected lockMousePointer(canvas : HTMLCanvasElement) : void
    {
        document.onclick = (e : MouseEvent) => canvas.requestPointerLock();
    }
}