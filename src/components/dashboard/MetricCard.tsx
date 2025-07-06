
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CounterAnimation } from '@/components/animations/CounterAnimation';

interface MetricCardProps {
  title: string;
  value: number;
  description?: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export const MetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  gradient,
  delay = 0 
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`${gradient} border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  <CounterAnimation from={0} to={value} duration={1.5} />
                </span>
              </div>
              {description && (
                <p className="text-white/70 text-xs mt-1">{description}</p>
              )}
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
