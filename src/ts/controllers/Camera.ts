import { Matrix4, Vector2, Vector3 } from "@math.gl/core";

import MathHelper from "../helpers/MathHelper";

export default class Camera
{
    public static buildCameraMatrix(pos : Vector3) : Matrix4
    {
        return new Matrix4().identity().translate(new Vector3(pos.x, 128.0, pos.z))
            .rotateX(-45.0)
            .rotateY(-45.0);
    }
    
    public static buildScreenMatrix(scale : number) : Matrix4
    {
        return new Matrix4().identity().scale(new Vector3(scale, -scale, scale));
    }
    
    public static buildViewMatrix(width: number, height: number) : Matrix4
    {
        const fov : number  = 140.0;
    
        return MathHelper.makePerspectiveMatrix(fov * Math.PI / 180, width/height, 0.01, 2.0)
            .rotateX(0.30);
    }
}
