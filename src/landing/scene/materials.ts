import * as THREE from 'three'

export function applyMaterialQuality(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.castShadow = false
    child.receiveShadow = false
    child.frustumCulled = true
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    for (const material of materials) {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.envMapIntensity = 0.22
        material.metalness = Math.min(material.metalness, 0.06)
        if (material.roughness < 0.38) material.roughness = 0.42
        material.needsUpdate = true
      }
    }
  })
}
