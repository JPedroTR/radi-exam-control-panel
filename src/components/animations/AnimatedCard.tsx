
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
  glowEffect?: boolean;
}

export const AnimatedCard = ({ 
  children, 
  className = '',
  delay = 0,
  hoverScale = 1.02,
  glowEffect = false
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        scale: hoverScale,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("group cursor-pointer", className)}
    >
      <Card className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:shadow-blue-500/10",
        "border-transparent bg-gradient-to-br from-white via-white to-blue-50/30",
        glowEffect && "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-500/0 before:via-blue-500/5 before:to-purple-500/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}>
        <div className="relative z-10">
          {children}
        </div>
        {glowEffect && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </Card>
    </motion.div>
  );
};
