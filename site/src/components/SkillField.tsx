"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { skillGroups } from "@/content";

const AMBER = new THREE.Color("#f0b45e");
const TEAL = new THREE.Color("#3fb8d1");
const PALE = new THREE.Color("#b9e3ec");

// Small seeded generator so the map looks the same on every visit.
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.85)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/**
 * The hero background. Every bright point is one skill from content.ts,
 * and each cluster is one skill group.
 */
export default function SkillField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
    } catch {
      return; // No WebGL. The page still reads fine without the map.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rand = seeded(15);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 50);
    camera.position.z = 9;
    const field = new THREE.Group();
    scene.add(field);

    const centers: THREE.Vector3[] = [];
    const nodePos: number[] = [];
    const nodeCol: number[] = [];
    const dustPos: number[] = [];
    const dustCol: number[] = [];
    const linePos: number[] = [];
    const lineCol: number[] = [];

    const inSphere = (radius: number) => {
      const v = new THREE.Vector3(
        rand() * 2 - 1,
        rand() * 2 - 1,
        rand() * 2 - 1,
      );
      return v.normalize().multiplyScalar(radius * (0.35 + 0.65 * rand()));
    };

    skillGroups.forEach((group, i) => {
      const angle = (i / skillGroups.length) * Math.PI * 2;
      const center = new THREE.Vector3(
        Math.cos(angle) * 3.1,
        (i % 2 ? 1 : -1) * (0.7 + rand() * 0.5),
        Math.sin(angle) * 3.1,
      );
      centers.push(center);
      const color = group.id === "ai" ? AMBER : TEAL;

      const nodes = group.items.map(() => center.clone().add(inSphere(1.15)));
      nodes.forEach((n) => {
        nodePos.push(n.x, n.y, n.z);
        nodeCol.push(color.r, color.g, color.b);
      });

      // Join every skill to its two nearest neighbours in the same group.
      nodes.forEach((n, a) => {
        nodes
          .map((m, b) => ({ b, d: a === b ? Infinity : n.distanceTo(m) }))
          .sort((x, y) => x.d - y.d)
          .slice(0, 2)
          .forEach(({ b, d }) => {
            if (!isFinite(d)) return;
            const m = nodes[b];
            linePos.push(n.x, n.y, n.z, m.x, m.y, m.z);
            lineCol.push(color.r, color.g, color.b, color.r, color.g, color.b);
          });
      });

      for (let k = 0; k < 55; k++) {
        const p = center.clone().add(inSphere(1.7));
        dustPos.push(p.x, p.y, p.z);
        dustCol.push(color.r, color.g, color.b);
      }
    });

    // Faint ring that ties the groups together.
    centers.forEach((c, i) => {
      const n = centers[(i + 1) % centers.length];
      linePos.push(c.x, c.y, c.z, n.x, n.y, n.z);
      lineCol.push(PALE.r, PALE.g, PALE.b, PALE.r, PALE.g, PALE.b);
    });

    for (let k = 0; k < 260; k++) {
      const p = inSphere(6.5);
      dustPos.push(p.x, p.y, p.z);
      dustCol.push(PALE.r, PALE.g, PALE.b);
    }

    const sprite = dotTexture();
    const makePoints = (pos: number[], col: number[], size: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size,
        map: sprite,
        vertexColors: true,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const pts = new THREE.Points(geo, mat);
      field.add(pts);
      return { geo, mat };
    };
    const nodeObj = makePoints(nodePos, nodeCol, 0.24, 1);
    const dustObj = makePoints(dustPos, dustCol, 0.06, 0.55);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineCol, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    field.add(new THREE.LineSegments(lineGeo, lineMat));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 1;
    let height = 1;
    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let onScreen = true;
    let wide = true;
    let raf = 0;
    const tmp = new THREE.Vector3();

    const draw = (time: number) => {
      tiltX += (pointerX - tiltX) * 0.04;
      tiltY += (pointerY - tiltY) * 0.04;
      // Starts with the AI group facing the visitor.
      field.rotation.y = -1.15 + time * 0.00007 + tiltX * 0.35;
      field.rotation.x = 0.16 + tiltY * 0.18;
      field.updateMatrixWorld();
      renderer.render(scene, camera);

      centers.forEach((c, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        tmp.copy(c).applyMatrix4(field.matrixWorld);
        const depth = (tmp.z - field.position.z) / field.scale.x; // about -3.1 (far) to 3.1 (near)
        tmp.project(camera);
        const x = ((tmp.x + 1) / 2) * width;
        const y = ((1 - tmp.y) / 2) * height;
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        // On wide screens the name sits on the left, so labels fade out before they reach it.
        const clear = wide ? Math.min(1, Math.max(0, (x / width - 0.52) / 0.1)) : 1;
        const near = Math.min(1, Math.max(0, (depth + 3.2) / 6.4));
        el.style.opacity = String((0.2 + 0.8 * near) * clear);
      });
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (onScreen) draw(time);
    };

    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      wide = camera.aspect > 1.25;
      field.position.set(wide ? 2.1 : 0, wide ? 0.2 : 1.6, 0);
      field.scale.setScalar(wide ? 0.88 : Math.min(0.62, camera.aspect * 0.85));
      if (reduce) draw(0);
    };

    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const sizeWatcher = new ResizeObserver(resize);
    sizeWatcher.observe(wrap);
    const viewWatcher = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    viewWatcher.observe(wrap);
    resize();

    if (!reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      sizeWatcher.disconnect();
      viewWatcher.disconnect();
      [nodeObj, dustObj].forEach(({ geo, mat }) => {
        geo.dispose();
        mat.dispose();
      });
      lineGeo.dispose();
      lineMat.dispose();
      sprite.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {skillGroups.map((group, i) => (
        <span
          key={group.id}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className={`pointer-events-none absolute left-0 top-0 hidden whitespace-nowrap font-display text-sm font-medium opacity-0 md:block ${
            group.id === "ai" ? "text-amber" : "text-ink"
          }`}
        >
          {group.name}
        </span>
      ))}
    </div>
  );
}
