import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';

const LETTERS = ['J', 'A', 'S', 'O', 'N', 'G', 'U', 'O'];
const JASON_COUNT = 5;
// Water surface sits 60% down the hero; letters fall through air then float here
const WATER_FRACTION = 0.60;

export default function PhysicsLetters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [resizeKey, setResizeKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    const waterY = H * WATER_FRACTION;

    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.75 } });
    const world = engine.world;
    const runner = Matter.Runner.create();

    // Only side walls — no floor, letters float at the water surface
    const leftWall = Matter.Bodies.rectangle(-25, H / 2, 50, H * 3, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(W + 25, H / 2, 50, H * 3, { isStatic: true });

    // Measure each letter's rendered size
    const sizes = letterRefs.current.map(el => {
      if (!el) return { w: 90, h: 110 };
      const r = el.getBoundingClientRect();
      return { w: Math.max(r.width, 20), h: Math.max(r.height, 20) };
    });

    // Spread letters across width in two groups
    const jasonTotalW = sizes.slice(0, JASON_COUNT).reduce((s, d) => s + d.w + 8, 0);
    const guoTotalW = sizes.slice(JASON_COUNT).reduce((s, d) => s + d.w + 8, 0);
    let jasonX = (W - jasonTotalW) / 2;
    let guoX = (W - guoTotalW) / 2;

    const letterBodies: Matter.Body[] = [];

    for (let i = 0; i < LETTERS.length; i++) {
      const { w, h } = sizes[i];
      const isGuo = i >= JASON_COUNT;
      const xOffset = isGuo ? guoX : jasonX;
      // Two-row formation: JASON row starts higher, GUO row lower so both
      // fall in together with JASON visibly above GUO
      const localIndex = isGuo ? i - JASON_COUNT : i;
      const startY = isGuo
        ? -(200 + localIndex * 20)   // GUO: closer to screen, falls first
        : -(420 + localIndex * 20);  // JASON: further above, always above GUO
      const jitter = (Math.random() - 0.5) * 20;

      const body = Matter.Bodies.rectangle(
        xOffset + w / 2 + jitter,
        startY,
        w * 0.85,
        h * 0.85,
        { restitution: 0.15, friction: 0.3, frictionAir: 0.01, label: `letter-${i}` }
      );
      letterBodies.push(body);

      if (isGuo) guoX += w + 8;
      else jasonX += w + 8;
    }

    // Buoyancy: applied every physics step via beforeUpdate
    // gravity force/mass = 0.75 * 0.001 = 0.00075; buoyancy coeff 0.0012 > gravity → letters float gently
    const buoyancyHandler = () => {
      for (let i = 0; i < letterBodies.length; i++) {
        const body = letterBodies[i];
        const { x, y } = body.position;
        const bodyHalfH = (sizes[i].h * 0.85) / 2;

        // Fraction of body below the water surface (0 = none, 1 = fully submerged)
        const submergedFraction = Math.min(
          1,
          Math.max(0, (y + bodyHalfH - waterY) / (bodyHalfH * 2))
        );

        if (submergedFraction > 0) {
          // Upward buoyancy — stronger than gravity so submerged letters float up
          Matter.Body.applyForce(body, { x, y }, {
            x: 0,
            y: -body.mass * 0.002 * submergedFraction,
          });
          // Water resistance damps velocity and spin
          Matter.Body.setVelocity(body, {
            x: body.velocity.x * 0.92,
            y: body.velocity.y * 0.92,
          });
          Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.88);
        }
      }
    };
    Matter.Events.on(engine, 'beforeUpdate', buoyancyHandler);

    // Mouse constraint for drag
    const mouse = Matter.Mouse.create(canvas);
    mouse.pixelRatio = window.devicePixelRatio;
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

    letterRefs.current.forEach(el => { if (el) el.style.opacity = '1'; });

    let rafId = 0;
    const tick = () => {
      letterBodies.forEach((body, i) => {
        const el = letterRefs.current[i];
        if (!el) return;
        const { x, y } = body.position;
        el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      });
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
      letterRefs.current.forEach(el => { if (el) el.style.opacity = '0'; });
    };
  }, [resizeKey]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Letter spans */}
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          ref={el => { letterRefs.current[i] = el; }}
          className="absolute top-0 left-0 select-none pointer-events-none font-black text-white leading-none"
          style={{
            fontSize: 'clamp(90px, 16vw, 200px)',
            WebkitTextStroke: '2px rgba(255,255,255,0.1)',
            willChange: 'transform',
            opacity: 0,
          }}
        >
          {letter}
        </span>
      ))}

      {/* Water — sits below the surface line, letters float here */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        style={{ top: `${WATER_FRACTION * 100}%` }}
      >
        {/* Scrolling wave line at the surface */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: 28 }}>
          <motion.div
            className="absolute top-0 left-0 flex"
            style={{ width: '200%', height: '100%' }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          >
            {[0, 1].map(n => (
              <svg
                key={n}
                style={{ width: '50%', height: '100%', flexShrink: 0 }}
                viewBox="0 0 1400 28"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,14 C117,2 233,26 350,14 C467,2 583,26 700,14 C817,2 933,26 1050,14 C1167,2 1283,26 1400,14"
                  fill="none"
                  stroke="rgba(96,165,250,0.55)"
                  strokeWidth="1.5"
                />
              </svg>
            ))}
          </motion.div>
        </div>
        {/* Subtle water body below the surface */}
        <div className="absolute left-0 right-0 bottom-0 bg-blue-500/[0.12]" style={{ top: 14 }} />
      </div>

      {/* Transparent canvas receives pointer events for Matter.js drag */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: 'grab', opacity: 0, zIndex: 20 }}
      />
    </div>
  );
}
