
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ChartContainer = ({ 
  title, 
  children, 
  delay = 0,
  className = ""
}: ChartContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};
