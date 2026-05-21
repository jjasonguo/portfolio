import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const LETTERS = ['J', 'A', 'S', 'O', 'N', 'G', 'U', 'O'];
const JASON_COUNT = 5;
const WATER_FRACTION = 0.60;
const WAVE_MARGIN = 45; // px of canvas above waterY so upward splashes have room

// Spring simulation constants
const SPRING_K    = 0.028; // restoring force
const SPRING_DAMP = 0.92;  // velocity damping per step
const SPREAD      = 0.18;  // how much displacement leaks to neighbors per step

export default function PhysicsLetters() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null); // invisible — mouse events
  const waterCanvasRef = useRef<HTMLCanvasElement>(null); // visible — wave rendering
  const letterRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const [resizeKey, setResizeKey] = useState(0);

  useEffect(() => {
    const container   = containerRef.current;
    const canvas      = canvasRef.current;
    const waterCanvas = waterCanvasRef.current;
    if (!container || !canvas || !waterCanvas) return;

    const W       = container.clientWidth;
    const H       = container.clientHeight;
    const waterY  = H * WATER_FRACTION;
    const canvasTop = waterY - WAVE_MARGIN;
    const canvasH   = H - canvasTop;
    const dpr     = window.devicePixelRatio;

    // Physics canvas — full-size, transparent, captures pointer events
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;

    // Water canvas — covers from (waterY - WAVE_MARGIN) to bottom of hero
    waterCanvas.width  = W * dpr;
    waterCanvas.height = canvasH * dpr;
    waterCanvas.style.width  = `${W}px`;
    waterCanvas.style.height = `${canvasH}px`;
    waterCanvas.style.top    = `${canvasTop}px`;

    const ctx = waterCanvas.getContext('2d')!;

    // ── Spring simulation ─────────────────────────────────────────────────
    // One spring point every 3 px across the width
    const N = Math.ceil(W / 3);
    const springPos = new Float32Array(N); // displacement from rest (px)
    const springVel = new Float32Array(N);

    const stepSprings = () => {
      // Restore + damp
      for (let i = 0; i < N; i++) {
        springVel[i] = springVel[i] * SPRING_DAMP - SPRING_K * springPos[i];
        springPos[i] += springVel[i];
      }
      // Propagate displacement left→right then right→left
      for (let i = 1; i < N; i++) {
        springVel[i - 1] += SPREAD * (springPos[i] - springPos[i - 1]);
      }
      for (let i = N - 2; i >= 0; i--) {
        springVel[i + 1] += SPREAD * (springPos[i] - springPos[i + 1]);
      }
    };

    // Kick springs under a letter when it enters the water
    const splash = (bodyX: number, bodyW: number, impactVy: number) => {
      const mag      = -Math.min(Math.abs(impactVy) * 1.8, 38); // upward kick
      const pxPerSpr = W / N;
      const center   = Math.round(bodyX / pxPerSpr);
      const halfSpan = Math.ceil((bodyW * 0.5) / pxPerSpr);
      for (let i = Math.max(0, center - halfSpan); i < Math.min(N, center + halfSpan + 1); i++) {
        const falloff = 1 - Math.abs(i - center) / (halfSpan + 1);
        springVel[i] += mag * falloff;
      }
    };

    // ── Physics setup ─────────────────────────────────────────────────────
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.75 } });
    const world  = engine.world;
    const runner = Matter.Runner.create();

    const leftWall  = Matter.Bodies.rectangle(-25,    H / 2, 50, H * 3, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(W + 25, H / 2, 50, H * 3, { isStatic: true });

    const letters = letterRefs.current;
    const sizes = letters.map(el => {
      if (!el) return { w: 90, h: 110 };
      const r = el.getBoundingClientRect();
      return { w: Math.max(r.width, 20), h: Math.max(r.height, 20) };
    });

    const jasonTotalW = sizes.slice(0, JASON_COUNT).reduce((s, d) => s + d.w + 8, 0);
    const guoTotalW   = sizes.slice(JASON_COUNT).reduce((s, d) => s + d.w + 8, 0);
    let jasonX = (W - jasonTotalW) / 2;
    let guoX   = (W - guoTotalW)   / 2;

    const letterBodies: Matter.Body[] = [];

    for (let i = 0; i < LETTERS.length; i++) {
      const { w, h } = sizes[i];
      const isGuo      = i >= JASON_COUNT;
      const xOffset    = isGuo ? guoX : jasonX;
      const localIndex = isGuo ? i - JASON_COUNT : i;
      const startY     = isGuo ? -(200 + localIndex * 20) : -(420 + localIndex * 20);
      const jitter     = (Math.random() - 0.5) * 20;

      const body = Matter.Bodies.rectangle(
        xOffset + w / 2 + jitter, startY,
        w, h,
        { restitution: 0.15, friction: 0.3, frictionAir: 0.01, label: `letter-${i}` }
      );
      letterBodies.push(body);

      if (isGuo) guoX += w + 8;
      else       jasonX += w + 8;
    }

    const buoyancyHandler = () => {
      for (let i = 0; i < letterBodies.length; i++) {
        const body       = letterBodies[i];
        const { x, y }   = body.position;
        const bodyHalfH  = (sizes[i].h) / 2;
        const submerged  = Math.min(1, Math.max(0,
          (y + bodyHalfH - waterY) / (bodyHalfH * 2)
        ));
        if (submerged > 0) {
          Matter.Body.applyForce(body, { x, y }, { x: 0, y: -body.mass * 0.002 * submerged });
          Matter.Body.setVelocity(body, { x: body.velocity.x * 0.92, y: body.velocity.y * 0.92 });
          Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.88);
        }
      }
    };
    Matter.Events.on(engine, 'beforeUpdate', buoyancyHandler);

    const mouse = Matter.Mouse.create(canvas);
    mouse.pixelRatio = dpr;
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    const onGrab = () => { canvas.style.cursor = 'grabbing'; };
    const onDrop = () => { canvas.style.cursor = 'grab'; };
    Matter.Events.on(mouseConstraint, 'startdrag', onGrab);
    Matter.Events.on(mouseConstraint, 'enddrag', onDrop);

    Matter.Composite.add(world, [leftWall, rightWall, ...letterBodies, mouseConstraint]);
    Matter.Runner.run(runner, engine);
    letters.forEach(el => { if (el) el.style.opacity = '1'; });

    // ── Wave drawing ──────────────────────────────────────────────────────
    const sineWave = (x: number, t: number) =>
      Math.sin(x * 0.011 + t * 1.1) * 7 +  // swell
      Math.sin(x * 0.024 + t * 2.1) * 4 +  // ripple
      Math.sin(x * 0.051 + t * 3.7) * 2;   // chop

    const drawWater = (t: number) => {
      ctx.clearRect(0, 0, W * dpr, canvasH * dpr);
      ctx.save();
      ctx.scale(dpr, dpr);

      const pxPerSpr = W / N;
      const pts: [number, number][] = [];
      for (let x = 0; x <= W; x += 3) {
        const si  = Math.min(N - 1, Math.floor(x / pxPerSpr));
        const y   = WAVE_MARGIN + sineWave(x, t) + springPos[si];
        pts.push([x, y]);
      }

      // Water body fill (wave → bottom)
      ctx.beginPath();
      ctx.moveTo(0, pts[0][1]);
      for (const [px, py] of pts) ctx.lineTo(px, py);
      ctx.lineTo(W, canvasH);
      ctx.lineTo(0, canvasH);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, WAVE_MARGIN - 10, 0, canvasH);
      grad.addColorStop(0,    'rgba(96,  165, 250, 0.00)');
      grad.addColorStop(0.03, 'rgba(59,  130, 246, 0.22)');
      grad.addColorStop(0.35, 'rgba(37,   99, 235, 0.40)');
      grad.addColorStop(1,    'rgba(29,   78, 216, 0.62)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Crest line — gradient from transparent above to the body's top colour below
      // so the surface blends into the water rather than sitting on top of it
      const crestGrad = ctx.createLinearGradient(0, WAVE_MARGIN - 8, 0, WAVE_MARGIN + 16);
      crestGrad.addColorStop(0,   'rgba(96, 165, 250, 0.00)');
      crestGrad.addColorStop(0.5, 'rgba(96, 165, 250, 0.45)');
      crestGrad.addColorStop(1,   'rgba(59, 130, 246, 0.22)');
      ctx.beginPath();
      ctx.moveTo(0, pts[0][1]);
      for (const [px, py] of pts) ctx.lineTo(px, py);
      ctx.strokeStyle = crestGrad;
      ctx.lineWidth   = 2.5;
      ctx.lineJoin    = 'round';
      ctx.stroke();

      ctx.restore();
    };

    // ── Unified RAF loop ──────────────────────────────────────────────────
    // Track previous y-bottom of each body to detect water entry
    const prevBottoms = letterBodies.map((b, i) => b.position.y + (sizes[i].h) / 2);

    let rafId = 0;
    let t     = 0;
    const tick = () => {
      t += 0.016;
      stepSprings();

      for (let i = 0; i < letterBodies.length; i++) {
        const body       = letterBodies[i];
        const bodyHalfH  = (sizes[i].h) / 2;
        const currBottom = body.position.y + bodyHalfH;

        // Detect water entry (bottom edge crossing waterY going downward)
        if (prevBottoms[i] < waterY && currBottom >= waterY && body.velocity.y > 0) {
          splash(body.position.x, sizes[i].w, body.velocity.y);
        }
        prevBottoms[i] = currBottom;

        const el = letters[i];
        if (!el) continue;
        const { x, y } = body.position;
        el.style.transform =
          `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      }

      drawWater(t);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onWheel = (e: WheelEvent) => { window.scrollBy(0, e.deltaY * 3); };
    canvas.addEventListener('wheel', onWheel, { passive: true });

    let resizeTimeout: ReturnType<typeof setTimeout>;
    let firstObservation = true;
    const observer = new ResizeObserver(() => {
      if (firstObservation) { firstObservation = false; return; }
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => setResizeKey(k => k + 1), 200);
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, 'beforeUpdate', buoyancyHandler);
      Matter.Events.off(mouseConstraint, 'startdrag', onGrab);
      Matter.Events.off(mouseConstraint, 'enddrag', onDrop);
      Matter.Engine.clear(engine);
      Matter.World.clear(world, false);
      canvas.removeEventListener('wheel', onWheel);
      observer.disconnect();
      clearTimeout(resizeTimeout);
      letters.forEach(el => { if (el) el.style.opacity = '0'; });
    };
  }, [resizeKey]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Letters — behind water canvas so submerged portions look underwater */}
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          ref={el => { letterRefs.current[i] = el; }}
          className="absolute top-0 left-0 select-none pointer-events-none text-white leading-none"
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 'clamp(90px, 16vw, 200px)',
            WebkitTextStroke: '2px rgba(255,255,255,0.1)',
            willChange: 'transform',
            zIndex: 5,
            opacity: 0,
          }}
        >
          {letter}
        </span>
      ))}

      {/* Water canvas — drawn every frame, sits above letters */}
      <canvas
        ref={waterCanvasRef}
        className="absolute left-0 pointer-events-none"
        style={{ zIndex: 10 }}
      />

      {/* Physics canvas — invisible, on top, handles drag */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: 'grab', opacity: 0, zIndex: 20 }}
      />
    </div>
  );
}
