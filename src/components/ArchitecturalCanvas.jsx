import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Compass } from 'lucide-react';

/**
 * ArchitecturalCanvas
 * Mobile-Audited WebGL 3D Architectural Monolith for M.K.M.S. Builders
 * - Zero touch-scroll interference (smooth native mobile scrolling).
 * - Capped DPI for mobile GPU battery efficiency and thermal safety.
 * - Reduced motion support.
 */
export default function ArchitecturalCanvas({ scrollProgress = 0, heroPinProgress = 0, activePhase = 0 }) {
  const mountRef = useRef(null);
  const [canOrbit, setCanOrbit] = useState(false);
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sceneStateRef = useRef({
    targetRotationY: 0,
    targetRotationX: 0.1,
    cameraY: 0,
    cameraZ: 14,
    cameraX: 0,
    scale: 1,
    explodeOffset: 0,
  });

  const towerGroupRef = useRef(null);
  const goldFrameMatRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.038);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    // Strict mobile DPR clamp for silky smooth 60fps on phones
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x1a202c, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe2b170, 3.8);
    keyLight.position.set(12, 22, 16);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7090b8, 2.0);
    rimLight.position.set(-15, -10, -10);
    scene.add(rimLight);

    const interiorGlow = new THREE.PointLight(0xe2b170, 3.0, 30);
    interiorGlow.position.set(0, 0, 0);
    scene.add(interiorGlow);

    // ARCHITECTURAL TOWER GROUP
    const towerGroup = new THREE.Group();
    scene.add(towerGroup);
    towerGroupRef.current = towerGroup;

    // MATERIALS
    const darkObsidianMat = new THREE.MeshStandardMaterial({
      color: 0x12141c,
      roughness: 0.25,
      metalness: 0.88,
    });

    const warmGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x080c14,
      metalness: 0.15,
      roughness: 0.08,
      transmission: 0.8,
      thickness: 1.5,
      transparent: true,
      opacity: 0.85,
    });

    const goldFrameMat = new THREE.LineBasicMaterial({
      color: 0xe2b170,
      transparent: true,
      opacity: 0.6,
      linewidth: 1,
    });
    goldFrameMatRef.current = goldFrameMat;

    const coreGoldMat = new THREE.MeshStandardMaterial({
      color: 0x241d13,
      emissive: 0xd49b4c,
      emissiveIntensity: 0.5,
      roughness: 0.28,
      metalness: 0.92,
    });

    // FLOORS (SLABS & GLASS CORES)
    const floorMeshes = [];
    const totalFloors = isMobile ? 12 : 18; // Reduced geometry on mobile for optimal GPU performance
    const floorHeight = isMobile ? 0.7 : 0.55;

    for (let i = 0; i < totalFloors; i++) {
      const floorSubGroup = new THREE.Group();
      const progress = i / totalFloors;
      
      const taper = 1 - Math.sin(progress * Math.PI) * 0.28;
      const twist = (i * 0.045);
      const floorWidth = (3.2 * taper);
      const floorDepth = (2.6 * taper);

      // Floor Slab
      const slabGeo = new THREE.BoxGeometry(floorWidth, 0.08, floorDepth);
      const slabMesh = new THREE.Mesh(slabGeo, darkObsidianMat);
      floorSubGroup.add(slabMesh);

      // Edge wireframe accent
      const slabEdges = new THREE.EdgesGeometry(slabGeo);
      const edgeLine = new THREE.LineSegments(slabEdges, goldFrameMat);
      floorSubGroup.add(edgeLine);

      // Glass Curtain Wall volume
      const glassGeo = new THREE.BoxGeometry(floorWidth * 0.92, floorHeight * 0.88, floorDepth * 0.92);
      const glassMesh = new THREE.Mesh(glassGeo, warmGlassMat);
      glassMesh.position.y = floorHeight * 0.45;
      floorSubGroup.add(glassMesh);

      // Internal Column Core
      const coreGeo = new THREE.BoxGeometry(floorWidth * 0.35, floorHeight, floorDepth * 0.35);
      const coreMesh = new THREE.Mesh(coreGeo, coreGoldMat);
      coreMesh.position.y = floorHeight * 0.5;
      floorSubGroup.add(coreMesh);

      floorSubGroup.position.y = (i - totalFloors / 2) * floorHeight;
      floorSubGroup.rotation.y = twist;

      floorSubGroup.userData = {
        baseY: floorSubGroup.position.y,
        index: i,
      };

      towerGroup.add(floorSubGroup);
      floorMeshes.push(floorSubGroup);
    }

    // BASE PODIUM
    const plinthGeo = new THREE.CylinderGeometry(5.2, 6.2, 0.8, 8);
    const plinthMesh = new THREE.Mesh(plinthGeo, darkObsidianMat);
    plinthMesh.position.y = (-totalFloors / 2) * floorHeight - 0.4;
    towerGroup.add(plinthMesh);

    const plinthEdges = new THREE.EdgesGeometry(plinthGeo);
    const plinthLine = new THREE.LineSegments(plinthEdges, goldFrameMat);
    plinthMesh.add(plinthLine);

    // DUST PARTICLES (Optimized count for mobile)
    const particleCount = isMobile ? 80 : 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 22;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe2b170,
      size: isMobile ? 0.16 : 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // GROUND GRID
    const gridHelper = new THREE.GridHelper(30, 24, 0xe2b170, 0x1f2430);
    gridHelper.position.y = (-totalFloors / 2) * floorHeight - 0.8;
    scene.add(gridHelper);

    // MOUSE PARALLAX (Only active when permitted to prevent touch-scroll hijack)
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let dragDeltaX = 0;
    let dragDeltaY = 0;

    const handlePointerMove = (e) => {
      // Ignore touch moves if orbit mode is not toggled on mobile
      if (e.pointerType === 'touch' && !canOrbit) return;

      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = normX * 0.3;
      mouseY = normY * 0.15;

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        dragDeltaX += deltaX * 0.005;
        dragDeltaY += deltaY * 0.0025;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      }
    };

    const handlePointerDown = (e) => {
      if (e.pointerType === 'touch' && !canOrbit) return;
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // RESIZE
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // RENDER LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isReducedMotion) {
        particleSystem.rotation.y = elapsedTime * 0.015;
      }

      const s = sceneStateRef.current;
      towerGroup.rotation.y += (s.targetRotationY + mouseX + dragDeltaX - towerGroup.rotation.y) * 0.06;
      towerGroup.rotation.x += (s.targetRotationX + mouseY + dragDeltaY - towerGroup.rotation.x) * 0.06;
      
      camera.position.x += (s.cameraX - camera.position.x) * 0.06;
      camera.position.y += (s.cameraY - camera.position.y) * 0.06;
      camera.position.z += (s.cameraZ - camera.position.z) * 0.06;
      camera.lookAt(s.cameraX * 0.2, s.cameraY * 0.3, 0);

      const currentScale = towerGroup.scale.x;
      const nextScale = currentScale + (s.scale - currentScale) * 0.06;
      towerGroup.scale.set(nextScale, nextScale, nextScale);

      floorMeshes.forEach((floor) => {
        const idx = floor.userData.index;
        const offset = (idx - totalFloors / 2) * s.explodeOffset;
        floor.position.y = floor.userData.baseY + offset;
      });

      if (!isReducedMotion) {
        interiorGlow.intensity = 2.5 + Math.sin(elapsedTime * 2.0) * 0.6;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [canOrbit, isReducedMotion]);

  // SCROLL PROGRESS INTERPOLATION
  useEffect(() => {
    const s = sceneStateRef.current;
    const isMobile = window.innerWidth < 768;

    if (heroPinProgress < 1.0 && scrollProgress < 0.22) {
      const hp = heroPinProgress;
      s.targetRotationY = hp * 1.5;
      s.targetRotationX = 0.08 + hp * 0.15;
      // On mobile, keep model centered to prevent pushing off small viewport
      s.cameraX = isMobile ? (hp * 0.4) : (hp * 1.8);
      s.cameraY = -0.3 + hp * 1.5;
      s.cameraZ = isMobile ? 15.5 : (13.5 - hp * 2.0);
      s.scale = 1.0 + hp * 0.22;
      s.explodeOffset = hp * 0.02;

      if (goldFrameMatRef.current) {
        goldFrameMatRef.current.opacity = 0.55 + hp * 0.35;
      }
    } else {
      const sp = Math.max(0, (scrollProgress - 0.2) / 0.8);
      s.scale = isMobile ? 1.0 : 1.15;

      if (sp < 0.33) {
        const p = sp / 0.33;
        s.targetRotationY = 1.5 + p * 1.6;
        s.targetRotationX = 0.24 + p * 0.18;
        s.cameraX = isMobile ? 0 : (1.8 - p * 2.0);
        s.cameraY = 1.2 - p * 3.2;
        s.cameraZ = isMobile ? 15.0 : (11.5 - p * 1.0);
        s.explodeOffset = 0.02 + p * 0.05;
      } else if (sp < 0.66) {
        const p = (sp - 0.33) / 0.33;
        s.targetRotationY = 3.1 + p * 1.5;
        s.targetRotationX = 0.42 - p * 0.28;
        s.cameraX = 0;
        s.cameraY = -2.0 + p * 2.2;
        s.cameraZ = isMobile ? 15.2 : (10.5 + p * 2.2);
        s.explodeOffset = 0.07 - p * 0.03;
      } else {
        const p = (sp - 0.66) / 0.34;
        s.targetRotationY = 4.6 + p * 2.2;
        s.targetRotationX = 0.14;
        s.cameraX = 0;
        s.cameraY = 0;
        s.cameraZ = isMobile ? 15.5 : 12.8;
        s.explodeOffset = activePhase > 0 ? (activePhase * 0.1) : (p * 0.12);
      }
    }
  }, [heroPinProgress, scrollProgress, activePhase]);

  return (
    <div 
      className="canvas-wrapper" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        pointerEvents: canOrbit ? 'auto' : 'none' // Zero scroll interference on mobile!
      }}
    >
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          cursor: canOrbit ? 'grab' : 'default' 
        }} 
      />

      {/* Orbit Toggle Badge on Mobile & Desktop */}
      <div 
        style={{
          position: 'absolute',
          bottom: '18px',
          right: '18px',
          zIndex: 10,
          pointerEvents: 'auto'
        }}
      >
        <button
          onClick={() => setCanOrbit(!canOrbit)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: canOrbit ? 'rgba(226, 177, 112, 0.2)' : 'rgba(7, 8, 11, 0.75)',
            backdropFilter: 'blur(10px)',
            border: canOrbit ? '1px solid #e2b170' : '1px solid var(--border-hairline)',
            borderRadius: '2px',
            fontSize: '0.68rem',
            color: canOrbit ? '#ffffff' : 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            touchAction: 'manipulation'
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: canOrbit ? '#00e676' : '#e2b170', display: 'inline-block' }} />
          <span>{canOrbit ? '3D ORBIT: ACTIVE' : 'TOUCH TO ORBIT 3D'}</span>
        </button>
      </div>
    </div>
  );
}
