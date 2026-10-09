"use client";

import { Component, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, RoundedBox } from "@react-three/drei";
import GadgetSceneFallback from "@/components/home/GadgetSceneFallback";

interface SceneErrorBoundaryProps {
  children: ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <GadgetSceneFallback /> : this.props.children;
  }
}

function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");

    if (!context) {
      return false;
    }

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function SmartphoneModel() {
  return (
    <group>
      <RoundedBox
        args={[0.98, 1.94, 0.13]}
        radius={0.14}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#a8b6c8"
          metalness={0.88}
          roughness={0.2}
          clearcoat={0.8}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.91, 1.87, 0.1]}
        radius={0.12}
        smoothness={6}
        position={[0, 0, 0.014]}
      >
        <meshStandardMaterial color="#080d17" metalness={0.55} roughness={0.24} />
      </RoundedBox>

      <RoundedBox
        args={[0.84, 1.76, 0.025]}
        radius={0.105}
        smoothness={6}
        position={[0, 0, 0.071]}
      >
        <meshPhysicalMaterial
          color="#081523"
          metalness={0.16}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive="#03182b"
          emissiveIntensity={0.8}
        />
      </RoundedBox>

      <group position={[0, 0, 0.086]}>
        <RoundedBox
          args={[0.23, 0.055, 0.018]}
          radius={0.027}
          smoothness={4}
          position={[0, 0.79, 0]}
        >
          <meshStandardMaterial color="#02050a" metalness={0.1} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0.065, 0.79, 0.011]}>
          <sphereGeometry args={[0.012, 16, 16]} />
          <meshBasicMaterial color="#1a566e" />
        </mesh>

        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.012, 16, 16]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
        <RoundedBox
          args={[0.2, 0.018, 0.012]}
          radius={0.009}
          smoothness={3}
          position={[-0.13, 0.55, 0]}
        >
          <meshBasicMaterial color="#d9f7ff" />
        </RoundedBox>
        <RoundedBox
          args={[0.12, 0.018, 0.012]}
          radius={0.009}
          smoothness={3}
          position={[0.24, 0.55, 0]}
        >
          <meshBasicMaterial color="#00d9f5" />
        </RoundedBox>

        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[0.24, 0.012, 12, 64]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00a9d6"
            emissiveIntensity={1.6}
            metalness={0.55}
            roughness={0.22}
          />
        </mesh>
        <mesh position={[0, 0.2, 0.005]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial
            color="#16395a"
            emissive="#075a86"
            emissiveIntensity={1.5}
            metalness={0.35}
            roughness={0.24}
          />
        </mesh>
        <mesh position={[-0.055, 0.25, 0.17]}>
          <sphereGeometry args={[0.055, 24, 24]} />
          <meshBasicMaterial color="#c3fbff" />
        </mesh>
        <mesh position={[0.16, 0.34, 0.12]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        <mesh position={[-0.2, 0.08, 0.13]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshBasicMaterial color="#00f2fe" />
        </mesh>

        <RoundedBox
          args={[0.5, 0.16, 0.012]}
          radius={0.035}
          smoothness={4}
          position={[0, -0.22, 0]}
        >
          <meshStandardMaterial
            color="#0d2840"
            emissive="#06223b"
            emissiveIntensity={0.6}
          />
        </RoundedBox>
        <RoundedBox
          args={[0.28, 0.018, 0.014]}
          radius={0.009}
          smoothness={3}
          position={[-0.08, -0.2, 0.01]}
        >
          <meshBasicMaterial color="#b5f7ff" />
        </RoundedBox>
        <RoundedBox
          args={[0.14, 0.014, 0.014]}
          radius={0.007}
          smoothness={3}
          position={[-0.15, -0.24, 0.01]}
        >
          <meshBasicMaterial color="#8ea8bd" />
        </RoundedBox>

        <RoundedBox
          args={[0.48, 0.018, 0.012]}
          radius={0.009}
          smoothness={3}
          position={[-0.05, -0.48, 0]}
        >
          <meshBasicMaterial color="#436174" />
        </RoundedBox>
        <RoundedBox
          args={[0.31, 0.018, 0.014]}
          radius={0.009}
          smoothness={3}
          position={[-0.135, -0.54, 0.01]}
        >
          <meshBasicMaterial color="#d8f8ff" />
        </RoundedBox>
        <RoundedBox
          args={[0.2, 0.018, 0.014]}
          radius={0.009}
          smoothness={3}
          position={[-0.08, -0.6, 0.01]}
        >
          <meshBasicMaterial color="#00d9f5" />
        </RoundedBox>

        <RoundedBox
          args={[0.55, 0.1, 0.014]}
          radius={0.025}
          smoothness={4}
          position={[0, -0.76, 0]}
        >
          <meshStandardMaterial
            color="#143350"
            emissive="#082b45"
            emissiveIntensity={0.6}
          />
        </RoundedBox>
        <mesh position={[-0.21, -0.76, 0.012]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
        <RoundedBox
          args={[0.25, 0.015, 0.014]}
          radius={0.007}
          smoothness={3}
          position={[0.08, -0.76, 0.012]}
        >
          <meshBasicMaterial color="#bdd4e5" />
        </RoundedBox>
      </group>

      <RoundedBox
        args={[0.035, 0.23, 0.045]}
        radius={0.012}
        smoothness={4}
        position={[-0.498, 0.35, 0]}
      >
        <meshStandardMaterial color="#73869b" metalness={0.8} roughness={0.22} />
      </RoundedBox>
      <RoundedBox
        args={[0.035, 0.32, 0.045]}
        radius={0.012}
        smoothness={4}
        position={[0.498, 0.23, 0]}
      >
        <meshStandardMaterial color="#73869b" metalness={0.8} roughness={0.22} />
      </RoundedBox>
      <RoundedBox
        args={[0.035, 0.16, 0.045]}
        radius={0.012}
        smoothness={4}
        position={[0.498, -0.12, 0]}
      >
        <meshStandardMaterial color="#73869b" metalness={0.8} roughness={0.22} />
      </RoundedBox>
    </group>
  );
}

function SceneContents({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} color="#e3f7ff" />
      <pointLight position={[-3, 1, 2]} intensity={18} color="#00d9f5" />
      <pointLight position={[3, -1, -2]} intensity={15} color="#7928ca" />

      <mesh position={[0, 0, -0.7]} rotation={[0.78, 0.3, -0.34]}>
        <torusGeometry args={[1.5, 0.006, 8, 120]} />
        <meshBasicMaterial color="#00d9f5" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.72]} rotation={[0.78, 0.3, -0.34]}>
        <torusGeometry args={[1.68, 0.004, 8, 120]} />
        <meshBasicMaterial color="#7928ca" transparent opacity={0.28} />
      </mesh>

      <Float
        speed={reducedMotion ? 0 : 1.1}
        rotationIntensity={reducedMotion ? 0 : 0.12}
        floatIntensity={reducedMotion ? 0 : 0.18}
      >
        <group rotation={[-0.08, -0.2, 0.04]}>
          <SmartphoneModel />
        </group>
      </Float>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.45}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.68}
      />
    </>
  );
}

export default function GadgetScene() {
  const [webGLAvailable, setWebGLAvailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    setWebGLAvailable(hasWebGLSupport());

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    setPreferencesLoaded(true);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  if (!preferencesLoaded) {
    return <GadgetSceneFallback />;
  }

  if (!webGLAvailable) {
    return <GadgetSceneFallback />;
  }

  return (
    <SceneErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 4.35], fov: 34 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        aria-label="Interactive 3D smartphone preview. Drag to rotate."
      >
        <SceneContents reducedMotion={reducedMotion} />
      </Canvas>
    </SceneErrorBoundary>
  );
}
