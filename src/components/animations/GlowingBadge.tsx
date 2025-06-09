
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowingBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  pulse?: boolean;
  className?: string;
}

export const GlowingBadge = ({ 
  children, 
  variant = 'default',
  pulse = false,
  className = ''
}: GlowingBadgeProps) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800 shadow-blue-500/25',
    success: 'bg-green-100 text-green-800 shadow-green-500/25',
    warning: 'bg-amber-100 text-amber-800 shadow-amber-500/25',
    error: 'bg-red-100 text-red-800 shadow-red-500/25'
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ scale: 1.05 }}
    >
      <Badge 
        className={cn(
          "relative transition-all duration-300 hover:shadow-lg",
          variants[variant],
          pulse && "animate-pulse",
          className
        )}
      >
        {children}
        <motion.div
          className="absolute inset-0 rounded-full bg-current opacity-0"
          animate={pulse ? { opacity: [0, 0.1, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </Badge>
    </motion.div>
  );
};
