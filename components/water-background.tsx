"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function WaterBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x041a2b) // Dark blue background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
    camera.position.set(0, 30, 0)
    camera.lookAt(0, 0, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)

    // Load textures
    const textureLoader = new THREE.TextureLoader()
    const waterNormalMap = textureLoader.load("/water-normal.jpg")
    waterNormalMap.wrapS = waterNormalMap.wrapT = THREE.RepeatWrapping

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a2a3f, 0.4)
    scene.add(ambientLight)

    // Main light
    const mainLight = new THREE.DirectionalLight(0xc4d7e6, 0.7)
    mainLight.position.set(100, 100, -100)
    scene.add(mainLight)

    // Underwater lights
    const poolLights = [
      { color: 0x4de6d9, intensity: 2.5, position: [-30, -5, 0], distance: 60 },
      { color: 0x1a7fba, intensity: 2.5, position: [30, -5, 0], distance: 60 },
      { color: 0x4de6d9, intensity: 2, position: [0, -5, -30], distance: 50 },
      { color: 0x1a7fba, intensity: 2, position: [0, -5, 30], distance: 50 },
    ]

    poolLights.forEach((light) => {
      const poolLight = new THREE.PointLight(light.color, light.intensity, light.distance)
      poolLight.position.set(...light.position)
      scene.add(poolLight)
    })

    // Create water surface with custom shader
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000, 100, 100)

    // Custom water shader material
    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        normalMap: { value: waterNormalMap },
        distortionScale: { value: 3.7 },
        waterColor: { value: new THREE.Color(0x0a9dc4) }, // Pool blue
        deepWaterColor: { value: new THREE.Color(0x086e8a) }, // Deeper pool blue
        tealColor: { value: new THREE.Color(0x4de6d9) },
        blueColor: { value: new THREE.Color(0x1a7fba) },
        mousePosition: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        uniform float time;
        uniform float distortionScale;
        uniform vec2 mousePosition;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Calculate distance from mouse position in normalized coordinates
          vec2 mouseDistanceNorm = mousePosition - vec2(position.x / 5000.0 + 0.5, position.z / 5000.0 + 0.5);
          float mouseDistance = length(mouseDistanceNorm);
          
          // Base wave pattern - more subtle for a pool surface
          float noise1 = snoise(vUv * 2.0 + time * 0.1) * 0.3;
          float noise2 = snoise(vUv * 4.0 - time * 0.05) * 0.15;
          float noise3 = snoise(vUv * 8.0 + time * 0.15) * 0.075;
          
          // Combined noise
          float noiseValue = noise1 + noise2 + noise3;
          
          // Add mouse interaction ripple - more subtle for a pool
          float ripple = 0.0;
          if (mouseDistance < 0.1) {
            ripple = (0.1 - mouseDistance) * 5.0 * sin(mouseDistance * 100.0 - time * 5.0);
          }
          
          // Apply height displacement - reduced for pool water
          float displacement = noiseValue * distortionScale * 0.3 + ripple;
          vec3 newPosition = position;
          newPosition.y += displacement;
          
          // Calculate normal for lighting
          vec3 bitangent = vec3(0.0, 0.0, 1.0);
          vec3 tangent = vec3(1.0, 0.0, 0.0);
          
          float eps = 0.01;
          float noisePlusX = snoise((vUv + vec2(eps, 0.0)) * 2.0 + time * 0.1) * 0.3 +
                            snoise((vUv + vec2(eps, 0.0)) * 4.0 - time * 0.05) * 0.15 +
                            snoise((vUv + vec2(eps, 0.0)) * 8.0 + time * 0.15) * 0.075;
                            
          float noisePlusZ = snoise((vUv + vec2(0.0, eps)) * 2.0 + time * 0.1) * 0.3 +
                            snoise((vUv + vec2(0.0, eps)) * 4.0 - time * 0.05) * 0.15 +
                            snoise((vUv + vec2(0.0, eps)) * 8.0 + time * 0.15) * 0.075;
          
          tangent.y = (noisePlusX - noiseValue) / eps * distortionScale * 0.3;
          bitangent.y = (noisePlusZ - noiseValue) / eps * distortionScale * 0.3;
          
          vNormal = normalize(cross(bitangent, tangent));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 waterColor;
        uniform vec3 deepWaterColor;
        uniform vec3 tealColor;
        uniform vec3 blueColor;
        uniform vec2 resolution;
        uniform sampler2D normalMap;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        // Fresnel effect
        float fresnel(vec3 eye, vec3 normal, float power) {
          return pow(1.0 - max(0.0, dot(eye, normal)), power);
        }
        
        void main() {
          // Normalized view direction
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          
          // Calculate fresnel effect - stronger for pool water
          float fresnelFactor = fresnel(viewDirection, vNormal, 4.0);
          
          // Sample normal map for additional detail
          vec3 normalDetail = texture2D(normalMap, vUv * 5.0 + time * 0.03).rgb * 2.0 - 1.0;
          
          // Time-based color mixing for underwater lights
          float mixFactor = sin(time * 0.2) * 0.5 + 0.5;
          vec3 mixedColor = mix(tealColor, blueColor, mixFactor);
          
          // Calculate depth effect - stronger gradient for pool
          float depth = smoothstep(0.0, 1.0, length(vPosition.xz) / 5000.0);
          
          // Mix water colors based on depth
          vec3 baseColor = mix(waterColor, deepWaterColor, depth);
          
          // Apply fresnel to mix between water color and highlight color
          vec3 finalColor = mix(baseColor, mixedColor, fresnelFactor * 0.5);
          
          // Add caustics effect
          float caustics = sin(vUv.x * 20.0 + time) * sin(vUv.y * 20.0 + time * 0.7) * 0.1;
          finalColor += vec3(caustics);
          
          // Add subtle shimmer
          float shimmer = sin(vUv.x * 100.0 + time * 3.0) * sin(vUv.y * 100.0 + time * 2.0) * 0.02;
          finalColor += shimmer;
          
          // Add subtle vignette
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          float vignette = smoothstep(0.0, 0.7, length(uv - 0.5));
          finalColor *= 1.0 - vignette * 0.2;
          
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true,
    })

    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.rotation.x = -Math.PI / 2
    water.position.y = 0
    scene.add(water)

    // Add underwater particles (bubbles)
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 300
    const positionArray = new Float32Array(particleCount * 3)
    const sizeArray = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Position - keep within pool bounds
      positionArray[i * 3] = (Math.random() - 0.5) * 200
      positionArray[i * 3 + 1] = Math.random() * -20 - 1 // Below water
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 200

      // Size - smaller for bubbles
      sizeArray[i] = Math.random() * 0.5 + 0.2
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1))

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: new THREE.TextureLoader().load("/bubble.png") },
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        
        void main() {
          vec3 pos = position;
          
          // Gentle floating motion - bubbles rise
          pos.y += time * 0.2 + sin(time * 0.2 + position.x * 0.05 + position.z * 0.05) * 0.5;
          pos.x += sin(time * 0.1 + position.y * 0.05) * 0.2;
          pos.z += cos(time * 0.1 + position.y * 0.05) * 0.2;
          
          // Reset bubbles that reach the surface
          if (pos.y > 0.0) {
            pos.y = -20.0;
            pos.x = position.x;
            pos.z = position.z;
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(1.0, 1.0, 1.0, 0.7) * texColor;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Handle mouse movement for interactive ripples
    const mouse = new THREE.Vector2()

    function onMouseMove(event) {
      // Convert mouse position to normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Update shader uniform
      waterMaterial.uniforms.mousePosition.value.set((mouse.x + 1) / 2, (mouse.y + 1) / 2)
    }

    window.addEventListener("mousemove", onMouseMove, false)

    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      waterMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const clock = new THREE.Clock()

    function animate() {
      requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      // Update water shader time
      waterMaterial.uniforms.time.value = time

      // Update particles
      if (particlesMaterial.uniforms) {
        particlesMaterial.uniforms.time.value = time
      }

      // Slowly rotate camera for ambient movement - more subtle for pool view
      camera.position.x = Math.sin(time * 0.05) * 30
      camera.position.z = Math.cos(time * 0.05) * 30
      camera.position.y = 30 + Math.sin(time * 0.1) * 5
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)
      window.removeEventListener("mousemove", onMouseMove)

      // Dispose resources
      renderer.dispose()
      waterGeometry.dispose()
      waterMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()

      // Remove canvas
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-[-1]" />
}
