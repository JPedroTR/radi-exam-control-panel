
import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, BarChart3, Shield, Database, FileText, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Administration: React.FC = () => {
  const adminSections = [
    {
      title: 'Gestão de Usuários',
      description: 'Gerenciar técnicos, médicos e administradores',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      stats: '15 usuários ativos'
    },
    {
      title: 'Configurações do Sistema',
      description: 'Tipos de exames, equipamentos e protocolos',
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      stats: '8 modalidades configuradas'
    },
    {
      title: 'Relatórios e Analytics',
      description: 'Estatísticas, produtividade e faturamento',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      stats: 'Última atualização: hoje'
    },
    {
      title: 'Controle de Acesso',
      description: 'Permissões e níveis de segurança',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      stats: '3 níveis de acesso'
    },
    {
      title: 'Backup e Manutenção',
      description: 'Backup automático e manutenção do sistema',
      icon: Database,
      color: 'from-cyan-500 to-cyan-600',
      stats: 'Último backup: ontem'
    },
    {
      title: 'Gestão de Convênios',
      description: 'Configurar convênios e valores',
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      stats: '12 convênios ativos'
    }
  ];

  const systemStats = [
    { label: 'Técnicos Ativos', value: '8', color: 'bg-blue-500' },
    { label: 'Médicos Radiologistas', value: '4', color: 'bg-purple-500' },
    { label: 'Administradores', value: '3', color: 'bg-green-500' },
    { label: 'Exames Hoje', value: '47', color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { action: 'Novo técnico cadastrado', user: 'Admin', time: '2h atrás', type: 'user' },
    { action: 'Backup realizado com sucesso', user: 'Sistema', time: '4h atrás', type: 'system' },
    { action: 'Relatório mensal gerado', user: 'Ana Costa', time: '1d atrás', type: 'report' },
    { action: 'Configuração de equipamento atualizada', user: 'Carlos Mendes', time: '2d atrás', type: 'config' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="container mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Administração do Sistema</h1>
          <p className="text-white/70">Configurações gerais e controle administrativo</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`${stat.color} border-0 text-white`}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}>
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{section.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{section.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {section.stats}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'system' ? 'bg-green-500' :
                        activity.type === 'report' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`} />
                      <div>
                        <p className="text-white text-sm">{activity.action}</p>
                        <p className="text-white/60 text-xs">por {activity.user}</p>
                      </div>
                    </div>
                    <span className="text-white/60 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Administration;
