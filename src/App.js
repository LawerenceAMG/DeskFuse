import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import wood from "./Wood092_1K-JPG_Color.jpg";
import marble from "./Concrete034_1K-JPG_Color.jpg";

function Classroom({ position, size }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      {/* Using meshBasicMaterial and rendering only the front side */}
      <meshBasicMaterial color="lightblue" side={THREE.FrontSide} />
    </mesh>
  );
}

function Hallway({ position, size }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshBasicMaterial color="gray" />
    </mesh>
  );
}

function FirstFloor({ position, size }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color="darkgray" side={THREE.FrontSide} />
    </mesh>
  );
}

function Foundation({ position, size }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color="gray" />
    </mesh>
  );
}

function Staircase({ position, reverse, rotation }) {
  const stepHeight = 0.2;
  const steps = Array.from({ length: 5 }, (_, i) => (
    <mesh
      key={i}
      position={[
        position[0], // Keep X position for both stairs
        position[1] + i * stepHeight, // Ascend vertically (Y axis)
        reverse ? position[2] + i * 0.5 : position[2] - i * 0.5, // Adjust Z direction for reverse or normal direction
      ]}
      rotation={rotation}
    >
      <boxGeometry args={[0.5, stepHeight, 0.5]} />
      <meshBasicMaterial color="brown" />
    </mesh>
  ));

  return <>{steps}</>;
}

function Building() {
  return (
    <>
      {/* Foundation - First Floor */}
      <FirstFloor position={[0.5, 0, 0]} size={[3, 0.01, 12]} />
      <FirstFloor position={[-1.55, 0, 0]} size={[3, 0.01, 6.01]} />
      <FirstFloor position={[0, -0.5, 5]} size={[2, 1, 2]} />
      {/* Back wall/ smaller back wall */}
      <FirstFloor position={[0, 2, -6]} size={[6, 5, 0.01]} />
      <FirstFloor position={[-3.5, 0, 2.4]} size={[1, 2, 0.01]} />
      <FirstFloor position={[-3, 0, -2.1]} size={[0.01, 2, 9]} />
      {/* Flat Hallway in the middle */}
      <Hallway position={[0, 0.006, 0]} size={[1, 10]} />
      {/* Left side classrooms - more rectangular in shape */}
      <Classroom position={[-2, 0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[-2, 0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[-2, 0.5, 1.5]} size={[2, 1, 3]} />
      {/* Right side classrooms - more rectangular in shape */}
      <Classroom position={[2, 0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[2, 0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, 0.5, 4]} size={[2, 1, 3]} />
      {/* Staircase reverted to the original orientation */}
      <Staircase position={[0.7, 0.09, 5]} reverse={false} />
    </>
  );
}

function Basement() {
  return (
    <>
      {/* Foundation for Basement */}
      <Foundation position={[0, -1, 0]} size={[6, 0.01, 12]} />
      <Foundation position={[-1, -1, 4.2]} size={[6, 0.01, 3.7]} />
      {/* Basement classrooms */}
      <Classroom position={[-2, -0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[-2, -0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, -0.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[2, -0.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, -0.5, 4]} size={[2, 1, 3]} />
      {/* Basement staircase along the Z-axis but ascending in the opposite direction */}
      <Staircase position={[-1.2, -0.9, 4]} reverse={true} />
    </>
  );
}

function SecondFloor() {
  return (
    <>
      {/* Foundation for Second Floor */}
      <Foundation position={[0, 1, 2.25]} size={[3, 0.1, 1]} />
      <Foundation position={[0, 1, -6]} size={[3, 0.1, 1]} />
      <Foundation position={[0.7, 1, -3]} size={[1, 0.1, 10]} />
      {/* Classrooms on the second floor */}
      <Classroom position={[-2, 1.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[-2, 1.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[-2, 1.5, 1.5]} size={[2, 1, 3]} />
      <Classroom position={[2, 1.5, -4]} size={[2, 1, 4]} />
      <Classroom position={[2, 1.5, 0]} size={[2, 1, 5]} />
      <Classroom position={[2, 1.5, 4]} size={[2, 1, 3]} />
    </>
  );
}

function App() {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [10, 5, 15], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* First Floor */}
      <Building />

      {/* Basement */}
      <Basement />

      {/* Second Floor */}
      <SecondFloor />

      <OrbitControls />
    </Canvas>
  );
}

export default App;
