"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, useGLTF, ContactShadows, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// 预加载模型
useGLTF.preload("/models/apple_ii_computer.glb")

function ComputerModel() {
  const { scene } = useGLTF("/models/apple_ii_computer.glb")
  const modelRef = useRef<THREE.Group>(null)

  // 克隆场景避免修改缓存的原始模型
  const model = scene.clone()

  // 调整模型比例以更好地适应场景
  model.scale.set(1.5, 1.5, 1.5)

  // 应用材质增强视觉效果
  useEffect(() => {
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        // 为网格应用更好的材质属性
        const childMesh = child as THREE.Mesh
        childMesh.material = new THREE.MeshStandardMaterial({
          color: (childMesh.material as THREE.MeshStandardMaterial).color,
          metalness: 0.6,
          roughness: 0.2,
        })
      }
    })
  }, [model])

  // 添加平滑的旋转动画
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return <primitive ref={modelRef} object={model} position={[0, -0.5, 0]} />
}

function ResponsiveCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useFrame(({ size }) => {
    if (cameraRef.current) {
      // 根据屏幕尺寸调整相机位置
      const aspect = size.width / size.height

      if (aspect < 1) {
        // 移动设备（竖屏）
        cameraRef.current.position.z = 8
        cameraRef.current.fov = 60
      } else if (aspect < 1.5) {
        // 平板
        cameraRef.current.position.z = 7
        cameraRef.current.fov = 55
      } else {
        // 桌面
        cameraRef.current.position.z = 5
        cameraRef.current.fov = 50
      }

      cameraRef.current.updateProjectionMatrix()
    }
  })

  return <perspectiveCamera ref={cameraRef} position={[0, 0, 5]} fov={50} />
}

export default function ModelComponent() {
  // 使用useState和useEffect确保只在客户端渲染
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 如果组件还没有挂载，返回null
  if (!mounted) return null

  return (
    <div className="h-full w-full relative">
      <Canvas className="w-full h-full rounded-full">
        <Suspense fallback={null}>
          <ResponsiveCamera />

          {/* 灯光设置 */}
          <ambientLight intensity={0.3} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1.5}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <pointLight position={[10, -10, -10]} intensity={0.5} color="#ff9f00" />

          {/* 计算机模型 */}
          <group position={[0, 0, 0]}>
            <ComputerModel />
          </group>

          {/* 阴影和环境 */}
          <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={2} far={4} resolution={256} />
          <Environment preset="studio" />
          
          {/* 禁用轨道控制器的缩放和平移 */}
          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}