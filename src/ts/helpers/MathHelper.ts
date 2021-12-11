import { Matrix4 } from "@math.gl/core";
import { Array16 } from "@math.gl/core/dist/esm/classes/matrix4";

export default class MathHelper {
    public static range(min : number, max : number) : Array<number>
    {
        const range : number[] = [];
        for (let i : number = min; i <= max; i++) range.push(i); 

        return range;
    }
    
    public static isInRange(number : number, range : Array<number>) : boolean
    {
        return number >= range[0] && number <= range[1]; 
    }

    public static randomRange(min : number, max : number) : number
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            c => {
                const r = Math.random() * 16 | 0, v = c == 'x' 
                    ? r 
                    : (r & 0x3 | 0x8);
                return v.toString(16);
            }
        );
    }

    public static makePerspectiveMatrix(
        fieldOfViewYInRadians : number,
        aspect : number,
        zNear : number,
        zFar : number,
        distance : Array16 = new Array(16)
    ) : Matrix4 {
        const fov = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
        const rangeInv = 1.0 / (zNear - zFar);
    
        distance[0]  = fov / aspect;
        distance[1]  = 0;
        distance[2]  = 0;
        distance[3]  = 0;
    
        distance[4]  = 0;
        distance[5]  = fov;
        distance[6]  = 0;
        distance[7]  = 0;
    
        distance[8]  = 0;
        distance[9]  = 0;
        distance[10] = (zNear + zFar) * rangeInv;
        distance[11] = -1;
    
        distance[12] = 0;
        distance[13] = 0;
        distance[14] = zNear * zFar * rangeInv * 2;
        distance[15] = 0;
    
        return new Matrix4(distance);
    }
}