import { Matrix4, Vector3, Vector4 } from "@math.gl/core";


export default interface Renderable {
    uuid : string;
    
    render(pos : Vector3, w : number, h : number, uo : number, vo : number, color : Vector4) : void;

    tick(cameraMatrix : Matrix4, screenMatrix : Matrix4, viewMatrix : Matrix4) : void
}