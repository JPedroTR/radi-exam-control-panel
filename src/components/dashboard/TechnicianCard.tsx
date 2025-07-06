
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface TechnicianCardProps {
  name: string;
  shift: string;
  examsToday: number;
  isActive: boolean;
  delay?: number;
}

export const TechnicianCard = ({ 
  name, 
  shift, 
  examsToday, 
  isActive, 
  delay = 0 
}: TechnicianCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className={`${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'} text-white border-0`}
            >
              {isActive ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
          
          <div>
            <h4 className="text-white font-medium text-sm mb-1">{name}</h4>
            <p className="text-white/60 text-xs mb-2">{shift}</p>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-xs">Exames hoje:</span>
              <span className="text-white font-semibold text-sm">{examsToday}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
