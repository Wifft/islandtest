precision highp float;

varying vec2 v_texcoord;
varying float v_dist;

uniform sampler2D u_tex;
uniform vec4 u_color;

void main()
{
    vec4 col = texture2D(u_tex, v_texcoord);

    if (col.a > 0.0) gl_FragColor = vec4(col.rgb, 1.0);
    else discard;
}