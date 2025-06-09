
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import * as echarts from 'echarts';
import { Search, Plus, Eye, Edit, Trash, Filter, Download, UserPlus, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import animation components
import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatedCard } from '@/components/animations/AnimatedCard';
import { ShimmerButton } from '@/components/animations/ShimmerButton';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { GlowingBadge } from '@/components/animations/GlowingBadge';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  
  // Dados de exemplo
  const examesData = [
    { id: 1, data: '08/06/2025', nome: 'LAIZA SOARES ARAUJO', exame: 'TX', incidencias: 2, numero: 17, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'FER' },
    { id: 2, data: '08/06/2025', nome: 'ANTONI RICHARD DOS SANTOS GONZALES', exame: 'TORNOZELO', incidencias: 2, numero: 18, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'FER' },
    { id: 3, data: '08/06/2025', nome: 'FABRICIO ESPIRITO SANTO DO PRADO', exame: 'CRANIO E MANDIBULA DIREITA', incidencias: 4, numero: 1, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'RO' },
    { id: 4, data: '08/06/2025', nome: 'KARLA SOARES CARDOZO', exame: 'TORAX', incidencias: 1, numero: 2, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'RO' },
    { id: 5, data: '08/06/2025', nome: 'ROGERIO DA CUNHA ALMADA', exame: 'TORAX PA E PERFIL', incidencias: 2, numero: 3, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'RO' },
    { id: 6, data: '08/06/2025', nome: 'ANELI MONTES DE OLIVEIRA', exame: 'JOELHO ESQUERDO', incidencias: 2, numero: 4, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'RO' },
    { id: 7, data: '08/06/2025', nome: 'NOEMIA INES MATTE LESTON', exame: 'MAO ESQUERDA', incidencias: 2, numero: 5, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'RO' },
    { id: 8, data: '08/06/2025', nome: 'ANGELICA GARCIA DA SILVA', exame: 'ANTEBRACO ESQUERDO', incidencias: 2, numero: 6, coluna: '', plano: 'PARTICULAR', tecnico: 'RO' },
    { id: 9, data: '08/06/2025', nome: 'MARIO ANDRE BUENO', exame: 'TÓRAX PA/P', incidencias: 2, numero: 7, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'BRUNA' },
    { id: 10, data: '08/06/2025', nome: 'NARA REGINA CONCEICAO NUNES FERNANDEZ', exame: 'TÓRAX PA/P', incidencias: 1, numero: 8, coluna: '', plano: 'PRONTO SOCORRO', tecnico: 'BRUNA' },
  ];

  // Inicializar gráfico quando o componente montar
  useEffect(() => {
    if (activeTab === 'admin') {
      const chartDom = document.getElementById('planoSaudeChart');
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: true,
          animationDuration: 1000,
          title: {
            text: 'Exames por Plano de Saúde',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Exames',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 8, name: 'PRONTO SOCORRO' },
                { value: 1, name: 'PARTICULAR' },
                { value: 3, name: 'SUS' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
        
        // Limpar o gráfico quando o componente desmontar
        return () => {
          myChart.dispose();
        };
      }
    }
  }, [activeTab]);

  const filteredExames = examesData.filter(exame => 
    exame.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exame.exame.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exame.plano.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exame.tecnico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"
    >
      {/* Cabeçalho */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <FadeIn direction="left" delay={0.2}>
            <div className="flex items-center">
              <div className="w-12 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-sm">📡</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Sistema de Gestão de Exames</h1>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.4}>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, João Pedro</span>
              <ShimmerButton variant="ghost" size="sm">
                Sair
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </motion.header>

      {/* Navegação principal */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white shadow-lg"
      >
        <div className="container mx-auto px-4">
          <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent h-12 border-none">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TabsTrigger 
                  value="dashboard" 
                  className="data-[state=active]:bg-blue-800/50 text-white h-full px-4 transition-all duration-300"
                >
                  📊 Dashboard
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TabsTrigger 
                  value="exames" 
                  className="data-[state=active]:bg-blue-800/50 text-white h-full px-4 transition-all duration-300"
                >
                  🏥 Exames
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TabsTrigger 
                  value="pacientes" 
                  className="data-[state=active]:bg-blue-800/50 text-white h-full px-4 transition-all duration-300"
                >
                  👥 Pacientes
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TabsTrigger 
                  value="admin" 
                  className="data-[state=active]:bg-blue-800/50 text-white h-full px-4 transition-all duration-300"
                >
                  ⚙️ Administração
                </TabsTrigger>
              </motion.div>
            </TabsList>
          </Tabs>
        </div>
      </motion.nav>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" value={activeTab}>
          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Painel de Controle</h2>
                <div className="flex space-x-2">
                  <span className="text-sm text-gray-500">Domingo, 8 de Junho de 2025</span>
                </div>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" staggerDelay={0.1}>
              <StaggerItem>
                <AnimatedCard className="border-l-4 border-l-blue-500" glowEffect>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-700">Total de Exames</CardTitle>
                    <CardDescription className="text-gray-500">Realizados hoje</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                        className="text-3xl text-blue-600 mr-4"
                      >
                        📋
                      </motion.div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">
                          <CounterAnimation from={0} to={15} duration={1.5} />
                        </p>
                        <p className="text-sm text-gray-500">de 390 este mês</p>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
              
              <StaggerItem>
                <AnimatedCard className="border-l-4 border-l-orange-500" glowEffect>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-700">Exames Pendentes</CardTitle>
                    <CardDescription className="text-gray-500">Aguardando realização</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="text-3xl text-orange-500 mr-4"
                      >
                        ⏳
                      </motion.div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">
                          <CounterAnimation from={0} to={3} duration={1.5} />
                        </p>
                        <p className="text-sm text-gray-500">Prioridade: 1 urgente</p>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
              
              <StaggerItem>
                <AnimatedCard className="border-l-4 border-l-green-500" glowEffect>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-700">Média Diária</CardTitle>
                    <CardDescription className="text-gray-500">Exames por dia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                        className="text-3xl text-green-600 mr-4"
                      >
                        📊
                      </motion.div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">
                          <CounterAnimation from={0} to={26} duration={1.5} />
                        </p>
                        <p className="text-sm text-gray-500">Aumento de 5% este mês</p>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            </StaggerContainer>

            <FadeIn delay={0.3}>
              <AnimatedCard className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-gray-800">Exames Recentes</CardTitle>
                    <ShimmerButton className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Exame
                    </ShimmerButton>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-md border border-gray-200"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-gray-700">Nome do Paciente</TableHead>
                          <TableHead className="font-semibold text-gray-700">Exames Realizados</TableHead>
                          <TableHead className="font-semibold text-center text-gray-700">Incidências</TableHead>
                          <TableHead className="font-semibold text-center text-gray-700">Número</TableHead>
                          <TableHead className="font-semibold text-gray-700">Plano de Saúde</TableHead>
                          <TableHead className="font-semibold text-gray-700">Técnico</TableHead>
                          <TableHead className="font-semibold text-right text-gray-700">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredExames.slice(0, 5).map((exame, index) => (
                          <motion.tr 
                            key={exame.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-gray-800">{exame.nome}</TableCell>
                            <TableCell className="text-gray-600">{exame.exame}</TableCell>
                            <TableCell className="text-center text-gray-600">{exame.incidencias}</TableCell>
                            <TableCell className="text-center text-gray-600">{exame.numero}</TableCell>
                            <TableCell>
                              <GlowingBadge 
                                variant={exame.plano === 'PARTICULAR' ? 'warning' : 'default'}
                              >
                                {exame.plano}
                              </GlowingBadge>
                            </TableCell>
                            <TableCell className="text-gray-600">{exame.tecnico}</TableCell>
                            <TableCell className="text-right">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="mt-4 flex justify-end"
                  >
                    <Button variant="link" className="text-blue-600 hover:text-blue-800">
                      Ver todos os exames
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </CardContent>
              </AnimatedCard>
            </FadeIn>
          </TabsContent>

          {/* Exames */}
          <TabsContent value="exames" className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestão de Exames</h2>
                <ShimmerButton className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Exame
                </ShimmerButton>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnimatedCard className="shadow-sm">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <motion.div 
                      className="relative w-full sm:w-96"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Input
                        placeholder="Buscar exames..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-300 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </motion.div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger className="w-full sm:w-[180px] border-gray-300">
                          <SelectValue placeholder="Filtrar por" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os exames</SelectItem>
                          <SelectItem value="hoje">Realizados hoje</SelectItem>
                          <SelectItem value="semana">Última semana</SelectItem>
                          <SelectItem value="mes">Este mês</SelectItem>
                        </SelectContent>
                      </Select>
                      <ShimmerButton variant="outline" className="border-gray-300">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                      </ShimmerButton>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-md border border-gray-200"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-gray-700">Nome do Paciente</TableHead>
                          <TableHead className="font-semibold text-gray-700">Exames Realizados</TableHead>
                          <TableHead className="font-semibold text-center text-gray-700">Incidências</TableHead>
                          <TableHead className="font-semibold text-center text-gray-700">Número</TableHead>
                          <TableHead className="font-semibold text-gray-700">Plano de Saúde</TableHead>
                          <TableHead className="font-semibold text-gray-700">Técnico</TableHead>
                          <TableHead className="font-semibold text-right text-gray-700">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredExames.map((exame, index) => (
                          <motion.tr 
                            key={exame.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-gray-800">{exame.nome}</TableCell>
                            <TableCell className="text-gray-600">{exame.exame}</TableCell>
                            <TableCell className="text-center text-gray-600">{exame.incidencias}</TableCell>
                            <TableCell className="text-center text-gray-600">{exame.numero}</TableCell>
                            <TableCell>
                              <GlowingBadge 
                                variant={exame.plano === 'PARTICULAR' ? 'warning' : 'default'}
                              >
                                {exame.plano}
                              </GlowingBadge>
                            </TableCell>
                            <TableCell className="text-gray-600">{exame.tecnico}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </AnimatedCard>
            </FadeIn>
          </TabsContent>

          {/* Pacientes */}
          <TabsContent value="pacientes" className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestão de Pacientes</h2>
                <ShimmerButton className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Novo Paciente
                </ShimmerButton>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnimatedCard className="shadow-sm">
                <CardHeader>
                  <motion.div 
                    className="relative w-full"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Input
                      placeholder="Buscar pacientes por nome, CPF ou plano de saúde..."
                      className="pl-10 border-gray-300 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.1}>
                    {examesData.slice(0, 6).map((paciente, index) => (
                      <StaggerItem key={index}>
                        <AnimatedCard 
                          className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                          hoverScale={1.03}
                          delay={index * 0.1}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base text-gray-800">{paciente.nome}</CardTitle>
                            <CardDescription className="text-gray-500">ID: {100000 + index}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Último exame:</span>
                                <span className="text-gray-700">{paciente.exame}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Plano:</span>
                                <GlowingBadge 
                                  variant={paciente.plano === 'PARTICULAR' ? 'warning' : 'default'}
                                >
                                  {paciente.plano}
                                </GlowingBadge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Total de exames:</span>
                                <span className="text-gray-700">{Math.floor(Math.random() * 10) + 1}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <motion.div whileHover={{ x: 5 }}>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                  Ver histórico
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </AnimatedCard>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </AnimatedCard>
            </FadeIn>
          </TabsContent>

          {/* Admin */}
          <TabsContent value="admin" className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Painel Administrativo</h2>
                <div className="flex gap-2">
                  <ShimmerButton variant="outline" className="border-gray-300">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Relatórios
                  </ShimmerButton>
                  <ShimmerButton className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Novo Usuário
                  </ShimmerButton>
                </div>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" staggerDelay={0.1}>
              <StaggerItem>
                <AnimatedCard className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Estatísticas Mensais</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      id="planoSaudeChart" 
                      className="w-full h-full"
                    />
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
              
              <StaggerItem>
                <AnimatedCard className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Desempenho por Técnico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-gray-700">Técnico</TableHead>
                          <TableHead className="font-semibold text-center text-gray-700">Exames</TableHead>
                          <TableHead className="font-semibold text-center text-gray-700">Média Diária</TableHead>
                          <TableHead className="font-semibold text-right text-gray-700">Eficiência</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { nome: 'JOÃO PEDRO', exames: 78, media: 9.8, eficiencia: '98%', variant: 'success' as const },
                          { nome: 'FER', exames: 65, media: 8.1, eficiencia: '95%', variant: 'success' as const },
                          { nome: 'BRUNA', exames: 52, media: 6.5, eficiencia: '87%', variant: 'warning' as const },
                          { nome: 'RO', exames: 45, media: 5.6, eficiencia: '82%', variant: 'warning' as const }
                        ].map((tecnico, index) => (
                          <motion.tr 
                            key={tecnico.nome}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-gray-800">{tecnico.nome}</TableCell>
                            <TableCell className="text-center text-gray-600">{tecnico.exames}</TableCell>
                            <TableCell className="text-center text-gray-600">{tecnico.media}</TableCell>
                            <TableCell className="text-right">
                              <GlowingBadge variant={tecnico.variant}>
                                {tecnico.eficiencia}
                              </GlowingBadge>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            </StaggerContainer>

            <FadeIn delay={0.3}>
              <AnimatedCard className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800">Gerenciamento de Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-md border border-gray-200"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-gray-700">Nome</TableHead>
                          <TableHead className="font-semibold text-gray-700">Email</TableHead>
                          <TableHead className="font-semibold text-gray-700">Função</TableHead>
                          <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="font-semibold text-gray-700">Último Acesso</TableHead>
                          <TableHead className="font-semibold text-right text-gray-700">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { nome: 'João Pedro', email: 'joao.pedro@clinica.com', funcao: 'Administrador', status: 'Ativo', acesso: '08/06/2025 14:11', variant: 'success' as const },
                          { nome: 'Fernanda Silva', email: 'fernanda.silva@clinica.com', funcao: 'Técnico', status: 'Ativo', acesso: '08/06/2025 13:45', variant: 'success' as const },
                          { nome: 'Bruna Oliveira', email: 'bruna.oliveira@clinica.com', funcao: 'Técnico', status: 'Ativo', acesso: '08/06/2025 10:22', variant: 'success' as const },
                          { nome: 'Roberto Almeida', email: 'roberto.almeida@clinica.com', funcao: 'Técnico', status: 'Inativo', acesso: '05/06/2025 16:30', variant: 'default' as const }
                        ].map((usuario, index) => (
                          <motion.tr 
                            key={usuario.nome}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-gray-800">{usuario.nome}</TableCell>
                            <TableCell className="text-gray-600">{usuario.email}</TableCell>
                            <TableCell className="text-gray-600">{usuario.funcao}</TableCell>
                            <TableCell>
                              <GlowingBadge variant={usuario.variant}>
                                {usuario.status}
                              </GlowingBadge>
                            </TableCell>
                            <TableCell className="text-gray-600">{usuario.acesso}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className={usuario.status === 'Ativo' ? 'text-red-500 hover:text-red-700' : 'text-green-600 hover:text-green-800'}>
                                    {usuario.status === 'Ativo' ? <Trash className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                                  </Button>
                                </motion.div>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                </CardContent>
              </AnimatedCard>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </main>

      {/* Rodapé */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gray-100/80 backdrop-blur-sm border-t border-gray-200 mt-8"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2025 Sistema de Gestão de Exames Radiológicos. Todos os direitos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                  Suporte
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                  Manual
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                  Privacidade
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}

export default Index;
