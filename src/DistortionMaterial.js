import React, { useMemo } from "react";
import { MeshPhysicalMaterial } from "three";
import { useFrame } from "react-three-fiber";
import { distort, voronoi, perlin } from "./distort";
import * as THREE from "three";

class DistortMaterialImpl extends MeshPhysicalMaterial {
  _time;
  _distort;
  _radius;
  _resolution;
  _mouse;

  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = { value: 0 };
    this._distort = { value: 0.4 };
    this._radius = { value: 1 };
    this._resolution = { value: new THREE.Vector2() };
    this._mouse = { value: new THREE.Vector2() };
  }

  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.radius = this._radius;
    shader.uniforms.distort = this._distort;
    shader.uniforms.mouse = this._mouse;

    shader.vertexShader = `
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${distort}
      ${voronoi}
      ${perlin}
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
        vec4 myWorldPosition = modelMatrix * vec4(position, 1.0);

        float updateTime = time / 50.0;
        float noise2 = easeInOutCirc(snoise(vec3(myWorldPosition.xyz / 40.0 + updateTime * 2.0)));
        vec3 transformed;
        if (noise2 > 0.2) {
          float noise = 2.0 * (perlin(position + updateTime * (1.0 + 10.0 * noise2)));
          transformed = position * (noise2 * noise * pow(distort, 2.0) + radius);
        } else {
          transformed = vec3(position);
        }
        `
    );

    shader.fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 mouse;
      ${distort}
      ${shader.fragmentShader}
    `;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
      #include <dithering_fragment>

      float mouseFactor = 0.8 + 0.2 * sin(3.14 * mouse.x) * cos(3.14 * mouse.y);
      float noise = snoise(vec3(gl_FragCoord.xyz / (2000.0 * mouseFactor )+ time * 0.1));
      if (noise > 0.5) {
        float gray = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
        gl_FragColor = vec4(gray,gray,gray, gl_FragColor.a);
      } else {
        gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a);
      }
      `
    );
  }

  get time() {
    return this._time.value;
  }

  set time(v) {
    this._time.value = v;
  }

  get distort() {
    return this._distort.value;
  }

  set distort(v) {
    this._distort.value = v;
  }

  get radius() {
    return this._radius.value;
  }

  set radius(v) {
    this._radius.value = v;
  }

  get resolution() {
    return this._resolution.value;
  }

  set resolution(v) {
    this._resolution.value = v;
  }

  get mouse() {
    return this._mouse.value;
  }

  set mouse(v) {
    this._mouse.value = v;
  }
}

export const MeshDistortMaterial = React.forwardRef(
  ({ speed = 1, ...props }, ref) => {
    const material = useMemo(() => new DistortMaterialImpl(), []);
    
    useFrame(
      (state) => {
        if (material) {
          material.mouse.x = state.mouse.x / 2
          material.mouse.y = state.mouse.y / 2
          material.time = state.clock.getElapsedTime() * speed
        }
      }
    );

    return (
      <primitive
        dispose={null}
        object={material}
        ref={ref}
        attach="material"
        {...props}
      />
    );
  }
);
