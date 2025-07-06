
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, LogOut, Stethoscope, Users, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Stethoscope },
    { path: '/exames', label: 'Exames', icon: FileText },
    { path: '/pacientes', label: 'Pacientes', icon: Users },
    { path: '/administracao', label: 'Administração', icon: Shield }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">SISTEMA DE RADIOLOGIA</h1>
            <p className="text-white/70 text-sm">Gestão de Exames e Laudos Médicos</p>
          </div>
          
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive(item.path) ? "secondary" : "ghost"} 
                  size="sm" 
                  className={`text-white hover:bg-white/10 ${
                    isActive(item.path) ? 'bg-white/20' : ''
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm">tecnico.radiologia@clinica.com</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Bell className="h-4 w-4 mr-2" />
              <Badge variant="destructive" className="ml-1">5</Badge>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
