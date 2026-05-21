import { useRef, useCallback } from 'react';

export const TORCH_PX = 72;
export const FLAME_OFFSET_Y = Math.round(TORCH_PX * 0.2);
export const TORCH_RADIUS = 220;
export const GLOW_RADIUS = 380;

export function useTorch(enabled: boolean) {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enabled) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (overlayRef.current) {
      overlayRef.current.style.background =
        `radial-gradient(circle at ${x}px ${y}px, transparent ${TORCH_RADIUS}px, rgba(0,0,0,0.78) ${GLOW_RADIUS}px, rgba(0,0,0,0.97) ${GLOW_RADIUS + 80}px)`;
    }
    if (torchRef.current) {
      torchRef.current.style.transform = `translate(${x - TORCH_PX / 2}px, ${y - FLAME_OFFSET_Y}px)`;
      torchRef.current.style.opacity = '1';
    }
  }, [enabled]);

  const handleMouseLeave = useCallback(() => {
    if (!enabled) return;
    if (overlayRef.current) overlayRef.current.style.background = 'rgba(0,0,0,0.97)';
    if (torchRef.current) torchRef.current.style.opacity = '0';
  }, [enabled]);

  return { sectionRef, overlayRef, torchRef, handleMouseMove, handleMouseLeave };
}
