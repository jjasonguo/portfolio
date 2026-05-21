import { motion } from 'framer-motion';
import torchImg from '../assets/torch.png';
import { TORCH_PX, FLAME_OFFSET_Y } from '../hooks/useTorch';

// re-export so callers can reference the pixel offset if needed
export { TORCH_PX, FLAME_OFFSET_Y };

interface Props {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  torchRef: React.RefObject<HTMLDivElement | null>;
}

export default function TorchOverlay({ overlayRef, torchRef }: Props) {
  return (
    <>
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.97)', zIndex: 9 }}
      />
      <div
        ref={torchRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ opacity: 0, zIndex: 10, width: TORCH_PX, height: TORCH_PX }}
      >
        <motion.div
          animate={{
            filter: [
              'drop-shadow(0 0 6px rgba(255,155,0,0.85)) drop-shadow(0 0 18px rgba(255,95,0,0.55)) drop-shadow(0 0 36px rgba(255,70,0,0.28))',
              'drop-shadow(0 0 11px rgba(255,185,0,1.0)) drop-shadow(0 0 28px rgba(255,130,0,0.80)) drop-shadow(0 0 54px rgba(255,80,0,0.50))',
              'drop-shadow(0 0 4px rgba(255,130,0,0.70)) drop-shadow(0 0 13px rgba(255,75,0,0.45)) drop-shadow(0 0 26px rgba(255,55,0,0.20))',
              'drop-shadow(0 0 8px rgba(255,165,0,0.92)) drop-shadow(0 0 22px rgba(255,105,0,0.65)) drop-shadow(0 0 44px rgba(255,75,0,0.38))',
              'drop-shadow(0 0 6px rgba(255,155,0,0.85)) drop-shadow(0 0 18px rgba(255,95,0,0.55)) drop-shadow(0 0 36px rgba(255,70,0,0.28))',
            ],
          }}
          transition={{ repeat: Infinity, duration: 0.55, ease: 'linear' }}
        >
          <img
            src={torchImg}
            alt=""
            width={TORCH_PX}
            height={TORCH_PX}
            style={{ imageRendering: 'pixelated', display: 'block' }}
          />
        </motion.div>
      </div>
    </>
  );
}
