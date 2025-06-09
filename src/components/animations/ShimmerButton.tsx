
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  onClick?: () => void;
}

export const ShimmerButton = ({ 
  children, 
  className = '',
  variant = 'default',
  size = 'default',
  onClick
}: ShimmerButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group"
    >
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:shadow-blue-500/25",
          variant === 'default' && "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{
            translateX: ['100%', '-100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'linear'
          }}
        />
      </Button>
    </motion.div>
  );
};
