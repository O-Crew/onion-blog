import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function RotatingCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame(()=>{
    if(meshRef.current) {
      meshRef.current!.rotation.x += 0.01;
      meshRef.current!.rotation.y -= 0.01;
    }
  })

  return (
    <mesh ref={meshRef} scale={1}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}