import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const LETTERS = ['J', 'A', 'S', 'O', 'N', 'G', 'U', 'O'];
const JASON_COUNT = 5;

export default function PhysicsLetters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Incrementing this key tears down and rebuilds the physics engine (used on resize)
  const [resizeKey, setResizeKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 2.5 } });
    const world = engine.world;
    const runner = Matter.Runner.create();

    // Static boundaries
    const floorThickness = 60;
    // Floor sits 60px inside the container bottom so two-row stacks stay fully in view
    const floor = Matter.Bodies.rectangle(
      W / 2, H - 60 + floorThickness / 2,
      W * 3, floorThickness,
      { isStatic: true, friction: 0.5 }
    );
    const leftWall = Matter.Bodies.rectangle(-25, H / 2, 50, H * 3, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(W + 25, H / 2, 50, H * 3, { isStatic: true });

    // Measure each letter's rendered size (letters are in the DOM with opacity: 0)
    const sizes = letterRefs.current.map(el => {
      if (!el) return { w: 90, h: 110 };
      const r = el.getBoundingClientRect();
      return { w: Math.max(r.width, 20), h: Math.max(r.height, 20) };
    });

    // Compute start x positions: JASON centered in left half, GUO in right half
    const jasonTotalW = sizes.slice(0, JASON_COUNT).reduce((s, d) => s + d.w + 8, 0);
    const guoTotalW = sizes.slice(JASON_COUNT).reduce((s, d) => s + d.w + 8, 0);
    let jasonX = (W - jasonTotalW) / 2;
    let guoX = (W - guoTotalW) / 2;

    const letterBodies: Matter.Body[] = [];

    for (let i = 0; i < LETTERS.length; i++) {
      const { w, h } = sizes[i];
      const isGuo = i >= JASON_COUNT;
      const xOffset = isGuo ? guoX : jasonX;
      const startY = -(i * 80 + 200);
      const jitter = (Math.random() - 0.5) * 20;

      const body = Matter.Bodies.rectangle(
        xOffset + w / 2 + jitter,
        startY,
        w * 0.85,
        h * 0.85,
        { restitution: 0.25, friction: 0.5, frictionAir: 0.01, label: `letter-${i}` }
      );
      letterBodies.push(body);

      if (isGuo) guoX += w + 8;
      else jasonX += w + 8;
    }

    // Mouse constraint attached to the transparent canvas overlay
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

    Matter.Composite.add(world, [floor, leftWall, rightWall, ...letterBodies, mouseConstraint]);
    Matter.Runner.run(runner, engine);

    // Reveal letters now that physics is running
    letterRefs.current.forEach(el => { if (el) el.style.opacity = '1'; });

    // RAF loop: sync physics body positions to DOM elements
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

    // Forward wheel events so the page scrolls even when the canvas overlay is on top
    // Raw deltaY lacks the browser's native scroll acceleration, so compensate
    const onWheel = (e: WheelEvent) => { window.scrollBy(0, e.deltaY * 3); };
    canvas.addEventListener('wheel', onWheel, { passive: true });

    // Resize: skip the initial notification that ResizeObserver always fires on attach
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

      {/* Transparent canvas receives pointer events for Matter.js drag */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: 'grab', opacity: 0 }}
      />
    </div>
  );
}
