precision highp float;

attribute vec3 a_pos;

uniform mat4 u_objectTransform;
uniform mat4 u_cameraTransform;
uniform mat4 u_viewTransform;
uniform mat4 u_textureTransform;

varying vec2 v_texcoord;
varying float v_dist;

void main()
{
    v_texcoord = (u_textureTransform * vec4(a_pos, 1.0)).xy;

    vec4 pos = u_viewTransform * u_cameraTransform * u_objectTransform * vec4(a_pos, 1.0);
    v_dist = pos.z / 2.0;

    gl_Position = pos;
}