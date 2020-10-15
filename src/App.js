import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Text, Torus, useTextureLoader } from "@react-three/drei";
import * as THREE from "three";

import { MeshDistortMaterial } from "./DistortionMaterial";
import Environment from "./Environment";
import "./styles.css";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import useSlerp from "./useSlerp";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function Scene() {
  const ref = useSlerp();
  const { size, viewport } = useThree();

  const [ao, normal, height, roughness] = useTextureLoader([
    "/ao.jpg",
    "/normal.jpg",
    "/height.png",
    "/roughness.jpg",
  ]);

  useEffect(() => {
    ao.wrapT = ao.wrapS = THREE.RepeatWrapping;
    ao.repeat = new THREE.Vector2(4, 4);
    normal.wrapT = normal.wrapS = THREE.RepeatWrapping;
    normal.repeat = new THREE.Vector2(4, 4);
    height.wrapT = height.wrapS = THREE.RepeatWrapping;
    height.repeat = new THREE.Vector2(4, 4);
    roughness.wrapT = roughness.wrapS = THREE.RepeatWrapping;
    roughness.repeat = new THREE.Vector2(4, 4);
  }, [ao, normal, height, roughness]);

  return (
    <>
      <spotLight intensity={2} position={[0, 30, 40]} />
      <spotLight intensity={2} position={[-50, 30, 40]} />
      <Torus
        ref={ref}
        args={[5, 1.5, isMobile ? 258 : 516, isMobile ? 258 : 516]}
      >
        <MeshDistortMaterial
          color="#a19266"
          metalness={1}
          roughness={0.3}
          radius={1}
          distort={0.2} // Strength, 0 disables the effect (default=1)
          speed={3} // Speed (default=1)
          resolution={[size.width, size.height]}
          aoMap={ao}
          normalMap={normal}
          normalScale={[2, 2]}
          displacementMap={height}
          roughnessMap={roughness}
        />
      </Torus>
      <Environment />
    </>
  );
}

function App() {
  return (
    <>
      <Canvas
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{ position: [0, 0, 20], near: 0.1, far: 100, fov: 50 }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          alpha: false,
        }}
      >
        <color attach="background" args={["#505050"]} />
        <group position={[0, 0, isMobile ? -16 : 0]} >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <Text
            position={[0, 0.7, 10]}
            fontSize={1.2}
            letterSpacing={0.3}
            textAlign="center"
            font="https://fonts.gstatic.com/s/cormorantgaramond/v9/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtM.woff"
          >
            POIMANDRES
          </Text>
          <Text
            position={[0, -0.6, 10]}
            fontSize={isMobile ? 0.8 : 0.6}
            letterSpacing={0}
            textAlign="center"
            font="https://fonts.gstatic.com/s/liujianmaocao/v5/845DNN84HJrccNonurqXILGpvCOoTe3fLw.woff"
          >
            a collection of creative libs
          </Text>
          <Text
            position={[0, -1.4, 10]}
            fontSize={isMobile ? 0.8 : 0.6}
            letterSpacing={0}
            textAlign="center"
            font="https://fonts.gstatic.com/s/liujianmaocao/v5/845DNN84HJrccNonurqXILGpvCOoTe3fLw.woff"
          >
            to rule them all
          </Text>
        </group>
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.55} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
          <BrightnessContrast brightness={0.07} contrast={0.15} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
