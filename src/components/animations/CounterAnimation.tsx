
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
}

export const CounterAnimation = ({ 
  from, 
  to, 
  duration = 1,
  className = ''
}: CounterAnimationProps) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { 
      duration,
      ease: [0.22, 1, 0.36, 1]
    });
    return controls.stop;
  }, [count, to, duration]);

  return (
    <motion.span 
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
};
