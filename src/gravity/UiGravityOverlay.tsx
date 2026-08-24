import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Body, Composite } from 'matter-js';
import { Bounds, Container, MouseConstraint, useBody, useEngine } from 'react-matters';
import { CapturedBox, captureUiBoxes, restoreUiBoxes } from './collectBoxes';

function NudgeBodies() {
  const engine = useEngine();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return undefined;
    const timer = window.setTimeout(() => {
      done.current = true;
      for (const body of Composite.allBodies(engine.world)) {
        if (body.isStatic) continue;
        Body.setVelocity(body, {
          x: body.velocity.x + (Math.random() - 0.5) * 3.5,
          y: body.velocity.y + Math.random() * -2.5,
        });
        Body.setAngularVelocity(body, body.angularVelocity + (Math.random() - 0.5) * 0.08);
      }
    }, 60);
    return () => window.clearTimeout(timer);
  }, [engine]);

  return null;
}

function PhysicsClone({ item, kick }: { item: CapturedBox; kick: boolean }) {
  const engine = useEngine();
  const kicked = useRef(false);
  const { ref, style, dragControls } = useBody<HTMLDivElement>({
    type: 'rectangle',
    x: item.cx,
    y: item.cy,
    restitution: 0.18,
    friction: 0.55,
    frictionStatic: 1,
    frictionAir: 0.012,
    density: 0.002,
    slop: 0.04,
    draggable: true,
  });

  useLayoutEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (item.clone.parentElement !== host) {
      host.appendChild(item.clone);
    }
  });

  useEffect(() => {
    if (!kick || kicked.current) return;
    const timer = window.setTimeout(() => {
      const match = Composite.allBodies(engine.world).find((body) => {
        if (body.isStatic) return false;
        const width = body.bounds.max.x - body.bounds.min.x;
        const height = body.bounds.max.y - body.bounds.min.y;
        return Math.abs(width - item.w) < 4 && Math.abs(height - item.h) < 4;
      });
      if (!match) return;
      kicked.current = true;
      Body.setVelocity(match, {
        x: (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 8),
        y: -(16 + Math.random() * 10),
      });
      Body.setAngularVelocity(match, (Math.random() - 0.5) * 0.28);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [kick, engine, item.h, item.w]);

  return (
    <div
      ref={ref}
      {...dragControls()}
      style={{
        ...style,
        width: item.w,
        height: item.h,
        margin: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
        cursor: 'grab',
        pointerEvents: 'auto',
      }}
    />
  );
}

export const UiGravityOverlay: React.FC<{
  active: boolean;
  kickId?: string;
  onStop: () => void;
}> = ({ active, kickId, onStop }) => {
  const [items, setItems] = useState<CapturedBox[]>([]);
  const onStopRef = useRef(onStop);
  onStopRef.current = onStop;

  useEffect(() => {
    if (!active) return undefined;

    const captured = captureUiBoxes();
    setItems(captured);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onStopRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      restoreUiBoxes(captured);
      setItems([]);
    };
  }, [active]);

  if (!active || items.length === 0) return null;

  return createPortal(
    <>
      <Container
        id="gravity_layer"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 5000,
          overflow: 'hidden',
          pointerEvents: 'auto',
        }}
        initEngineOptions={{
          gravity: { x: 0, y: 1.45 },
          enableSleeping: true,
          positionIterations: 12,
          velocityIterations: 8,
        }}
      >
        <Bounds restitution={0.12} friction={0.9} />
        <MouseConstraint />
        <NudgeBodies />
        {items.map((item) => (
          <PhysicsClone key={item.key} item={item} kick={item.sourceId === kickId} />
        ))}
      </Container>
      <button
        id="gravity_restore_btn"
        type="button"
        onClick={onStop}
        className="font-mono text-[10px] tracking-widest px-2 py-1.5 border cursor-pointer"
        style={{
          position: 'fixed',
          right: 12,
          bottom: 12,
          zIndex: 6000,
          background: '#111111',
          color: 'var(--accent)',
          borderColor: 'var(--accent)',
        }}
      >
        ESC // RESTORE
      </button>
    </>,
    document.body
  );
};
