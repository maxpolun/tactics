attribute vec4 a_position;
attribute vec3 a_color;

uniform mat4 u_view_matrix;

varying vec3 v_color;

void main(void) {
  v_color = a_color;
  gl_Position = u_view_matrix * a_position;
}
