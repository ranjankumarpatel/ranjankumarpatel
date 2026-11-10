"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { skillGroups } from "@/content";

const AMBER = new THREE.Color("#f0b45e");
const TEAL = new THREE.Color("#3fb8d1");
const PALE = new THREE.Color("#b9e3ec");
const RADIUS = 3.1;
const SIGNALS = 14;

/** Other components call this to bring one skill group to the front of the map. */
export function focusSkillGroup(id: string | null) {
  window.dispatchEvent(new CustomEvent("skill-focus", { detail: id }));
}

// Small seeded generator so the map looks the same on every visit.
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = Math.trunc(a + 0x6d2b79f5);
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

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The 3D map behind the whole page. Every bright point is one skill from
 * content.ts and each cluster is one skill group. It sits fixed behind the
 * content, dims after the hero, and turns to face whichever skill group the
 * visitor is reading.
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
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
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

    const count = skillGroups.length;
    const centers: THREE.Vector3[] = [];
    const nodePos: number[] = [];
    const nodeBase: number[] = [];
    const nodeGroup: number[] = [];
    const dustPos: number[] = [];
    const dustCol: number[] = [];
    const linePos: number[] = [];
    const lineBase: number[] = [];
    const lineGroup: number[] = [];

    const inSphere = (radius: number) => {
      const v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
      return v.normalize().multiplyScalar(radius * (0.35 + 0.65 * rand()));
    };

    skillGroups.forEach((group, i) => {
      const angle = (i / count) * Math.PI * 2;
      const center = new THREE.Vector3(
        Math.cos(angle) * RADIUS,
        (i % 2 ? 1 : -1) * (0.7 + rand() * 0.5),
        Math.sin(angle) * RADIUS,
      );
      centers.push(center);
      const color = group.id === "ai" ? AMBER : TEAL;

      const nodes = group.items.map(() => center.clone().add(inSphere(1.15)));
      nodes.forEach((n) => {
        nodePos.push(n.x, n.y, n.z);
        nodeBase.push(color.r, color.g, color.b);
        nodeGroup.push(i);
      });

      // Join every skill to its two nearest neighbours in the same group.
      nodes.forEach((n, a) => {
        nodes
          .map((m, b) => ({ b, d: a === b ? Infinity : n.distanceTo(m) }))
          .sort((x, y) => x.d - y.d)
          .slice(0, 2)
          .forEach(({ b, d }) => {
            if (!Number.isFinite(d)) return;
            const m = nodes[b];
            linePos.push(n.x, n.y, n.z, m.x, m.y, m.z);
            lineBase.push(color.r, color.g, color.b, color.r, color.g, color.b);
            lineGroup.push(i, i);
          });
      });

      for (let k = 0; k < 45; k++) {
        const p = center.clone().add(inSphere(1.7));
        dustPos.push(p.x, p.y, p.z);
        dustCol.push(color.r, color.g, color.b);
      }
    });

    // Faint ring that ties the groups together.
    centers.forEach((c, i) => {
      const n = centers[(i + 1) % count];
      linePos.push(c.x, c.y, c.z, n.x, n.y, n.z);
      lineBase.push(PALE.r, PALE.g, PALE.b, PALE.r, PALE.g, PALE.b);
      lineGroup.push(-1, -1);
    });

    for (let k = 0; k < 260; k++) {
      const p = inSphere(6.5);
      dustPos.push(p.x, p.y, p.z);
      dustCol.push(PALE.r, PALE.g, PALE.b);
    }

    const sprite = dotTexture();
    const disposables: { dispose: () => void }[] = [sprite];
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
      field.add(new THREE.Points(geo, mat));
      disposables.push(geo, mat);
      return geo;
    };
    const nodeGeo = makePoints(nodePos, [...nodeBase], 0.24, 1);
    makePoints(dustPos, dustCol, 0.06, 0.55);

    // Signals that travel along the ring from one group to the next.
    const signalGeo = makePoints(
      new Array(SIGNALS * 3).fill(0),
      Array.from({ length: SIGNALS }, (_, k) => (k % 3 === 0 ? AMBER : PALE)).flatMap((c) => [c.r, c.g, c.b]),
      0.15,
      0.95,
    );
    const signalPos = signalGeo.getAttribute("position") as THREE.BufferAttribute;

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute([...lineBase], 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    field.add(new THREE.LineSegments(lineGeo, lineMat));
    disposables.push(lineGeo, lineMat);

    // Brightens the focused group and dims the others.
    const paint = (focus: number) => {
      const apply = (geo: THREE.BufferGeometry, base: number[], groups: number[]) => {
        const attr = geo.getAttribute("color") as THREE.BufferAttribute;
        groups.forEach((g, v) => {
          let f = 1;
          if (focus >= 0) f = g === focus ? 1.35 : g === -1 ? 0.6 : 0.28;
          attr.setXYZ(v, base[v * 3] * f, base[v * 3 + 1] * f, base[v * 3 + 2] * f);
        });
        attr.needsUpdate = true;
      };
      apply(nodeGeo, nodeBase, nodeGroup);
      apply(lineGeo, lineBase, lineGroup);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 1;
    let height = 1;
    let wide = true;
    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let rotY = -1.15; // Starts with the AI group facing the visitor.
    let focus = -1;
    let scrolled = 0; // 0 at the top of the page, 1 once the hero has scrolled away
    let last = 0;
    let raf = 0;
    const tmp = new THREE.Vector3();

    const draw = (time: number) => {
      const dt = Math.min(64, time - last);
      last = time;

      if (focus >= 0) {
        const target = (focus / count) * Math.PI * 2 - Math.PI / 2 + 0.35;
        const diff = Math.atan2(Math.sin(target - rotY), Math.cos(target - rotY));
        rotY += diff * 0.05;
      } else {
        rotY += dt * 0.00007;
      }
      tiltX += (pointerX - tiltX) * 0.04;
      tiltY += (pointerY - tiltY) * 0.04;
      field.rotation.y = rotY + tiltX * 0.35;
      field.rotation.x = 0.16 + tiltY * 0.18;

      for (let k = 0; k < SIGNALS; k++) {
        const edge = k % count;
        const t = (time * 0.00012 * (1 + (k % 4) * 0.35) + k * 0.37) % 1;
        tmp.lerpVectors(centers[edge], centers[(edge + 1) % count], t);
        signalPos.setXYZ(k, tmp.x, tmp.y, tmp.z);
      }
      signalPos.needsUpdate = true;

      field.updateMatrixWorld();
      renderer.render(scene, camera);

      const labelFade = 1 - clamp01(scrolled * 1.6);
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
        const clear = wide ? clamp01((x / width - 0.52) / 0.1) : 1;
        const near = clamp01((depth + 3.2) / 6.4);
        el.style.opacity = String((0.2 + 0.8 * near) * clear * labelFade);
      });
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      draw(time);
    };

    const onScroll = () => {
      scrolled = clamp01(window.scrollY / Math.max(1, window.innerHeight * 0.9));
      wrap.style.opacity = String(1 - 0.6 * scrolled);
      if (reduce) draw(last);
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
      if (reduce) draw(last);
    };

    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<string | null>).detail;
      focus = id ? skillGroups.findIndex((g) => g.id === id) : -1;
      paint(focus);
      if (reduce) draw(last);
    };

    const sizeWatcher = new ResizeObserver(resize);
    sizeWatcher.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("skill-focus", onFocus);
    resize();
    onScroll();

    if (!reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("skill-focus", onFocus);
      sizeWatcher.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {skillGroups.map((group, i) => (
        <span
          key={group.id}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className={`absolute left-0 top-0 hidden whitespace-nowrap font-display text-sm font-medium opacity-0 md:block ${
            group.id === "ai" ? "text-amber" : "text-ink"
          }`}
        >
          {group.name}
        </span>
      ))}
    </div>
  );
}
