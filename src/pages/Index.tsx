
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as echarts from 'echarts';
import { User, Stethoscope, Pill, UserCheck, Search, Settings, Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

// Import our new components
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DoctorCard } from '@/components/dashboard/DoctorCard';
import { ChartContainer } from '@/components/dashboard/ChartContainer';
import { TimeSelector } from '@/components/dashboard/TimeSelector';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

const Index: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  
  // Medical dashboard data
  const metrics = [
    { title: 'Atendimentos', value: 818, description: 'Total este mês', icon: User, gradient: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { title: 'Total Consultas', value: 488, description: 'Realizadas', icon: Stethoscope, gradient: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { title: 'Total Exames', value: 231, description: 'Concluídos', icon: Pill, gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
    { title: 'Total Retorno', value: 99, description: 'Agendados', icon: UserCheck, gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-600' }
  ];

  const doctors = [
    { name: 'Dr. João Pedro', specialty: 'Radiologia', consultations: 45, isActive: true },
    { name: 'Dra. Fernanda Silva', specialty: 'Clínica Geral', consultations: 38, isActive: true },
    { name: 'Dr. Roberto Almeida', specialty: 'Ortopedia', consultations: 32, isActive: false },
    { name: 'Dra. Bruna Oliveira', specialty: 'Cardiologia', consultations: 28, isActive: true },
    { name: 'Dr. Carlos Santos', specialty: 'Neurologia', consultations: 25, isActive: false },
    { name: 'Dra. Maria Costa', specialty: 'Pediatria', consultations: 22, isActive: true }
  ];

  const examesData = [
    { id: 1, data: '08/06/2025', nome: 'LAIZA SOARES ARAUJO', exame: 'TÓRAX PA/P', status: 'Concluído', medico: 'Dr. João Pedro', tipo: 'Particular' },
    { id: 2, data: '08/06/2025', nome: 'ANTONI RICHARD DOS SANTOS', exame: 'TORNOZELO', status: 'Em andamento', medico: 'Dra. Fernanda Silva', tipo: 'Convênio' },
    { id: 3, data: '08/06/2025', nome: 'FABRICIO ESPIRITO SANTO', exame: 'CRÂNIO', status: 'Agendado', medico: 'Dr. Roberto Almeida', tipo: 'SUS' },
    { id: 4, data: '08/06/2025', nome: 'KARLA SOARES CARDOZO', exame: 'TÓRAX', status: 'Concluído', medico: 'Dra. Bruna Oliveira', tipo: 'Particular' },
    { id: 5, data: '08/06/2025', nome: 'ROGERIO DA CUNHA ALMADA', exame: 'JOELHO ESQ', status: 'Concluído', medico: 'Dr. João Pedro', tipo: 'Convênio' }
  ];

  // Initialize charts
  useEffect(() => {
    // Line chart for attendances over time
    const lineChartDom = document.getElementById('attendanceChart');
    if (lineChartDom) {
      const lineChart = echarts.init(lineChartDom);
      const lineOption = {
        animation: true,
        animationDuration: 1000,
        grid: { top: 20, right: 20, bottom: 40, left: 40 },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          axisLabel: { color: '#ffffff80' },
          axisLine: { lineStyle: { color: '#ffffff30' } }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#ffffff80' },
          axisLine: { lineStyle: { color: '#ffffff30' } },
          splitLine: { lineStyle: { color: '#ffffff20' } }
        },
        series: [{
          data: [65, 85, 95, 125, 145, 180],
          type: 'line',
          smooth: true,
          lineStyle: { color: '#4FC3F7', width: 3 },
          itemStyle: { color: '#4FC3F7' },
          areaStyle: { color: 'rgba(79, 195, 247, 0.1)' }
        }]
      };
      lineChart.setOption(lineOption);
    }

    // Donut chart for revenue by type
    const donutChartDom = document.getElementById('revenueChart');
    if (donutChartDom) {
      const donutChart = echarts.init(donutChartDom);
      const donutOption = {
        animation: true,
        animationDuration: 1000,
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          data: [
            { value: 45, name: 'Particular', itemStyle: { color: '#4FC3F7' } },
            { value: 35, name: 'Convênio', itemStyle: { color: '#1976D2' } },
            { value: 20, name: 'SUS', itemStyle: { color: '#0D47A1' } }
          ],
          label: { color: '#ffffff80', fontSize: 12 },
          labelLine: { lineStyle: { color: '#ffffff30' } }
        }]
      };
      donutChart.setOption(donutOption);
    }

    // Bar chart for appointments by doctor
    const barChartDom = document.getElementById('doctorChart');
    if (barChartDom) {
      const barChart = echarts.init(barChartDom);
      const barOption = {
        animation: true,
        animationDuration: 1000,
        grid: { top: 20, right: 20, bottom: 40, left: 100 },
        xAxis: {
          type: 'value',
          axisLabel: { color: '#ffffff80' },
          axisLine: { lineStyle: { color: '#ffffff30' } },
          splitLine: { lineStyle: { color: '#ffffff20' } }
        },
        yAxis: {
          type: 'category',
          data: ['João P.', 'Fernanda', 'Roberto', 'Bruna', 'Carlos'],
          axisLabel: { color: '#ffffff80' },
          axisLine: { lineStyle: { color: '#ffffff30' } }
        },
        series: [{
          type: 'bar',
          data: [45, 38, 32, 28, 25],
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#4FC3F7' },
              { offset: 1, color: '#1976D2' }
            ])
          },
          barWidth: 20
        }]
      };
      barChart.setOption(barOption);
    }

    return () => {
      // Cleanup charts on unmount
      const charts = [lineChartDom, donutChartDom, barChartDom];
      charts.forEach(chartDom => {
        if (chartDom) {
          const chart = echarts.getInstanceByDom(chartDom);
          if (chart) chart.dispose();
        }
      });
    };
  }, []);

  const getStatusBadge = (status: string) => {
    const variants = {
      'Concluído': 'bg-green-500',
      'Em andamento': 'bg-yellow-500',
      'Agendado': 'bg-blue-500'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">DASHBOARD - ATENDIMENTO MÉDICO</h1>
              <p className="text-white/70 text-sm">Sistema de Gestão Hospitalar</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/80 text-sm">joao.pedro@clinica.com</span>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Bell className="h-4 w-4 mr-2" />
                3
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

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Metrics Cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <StaggerItem key={metric.title}>
                  <MetricCard
                    title={metric.title}
                    value={metric.value}
                    description={metric.description}
                    icon={metric.icon}
                    gradient={metric.gradient}
                    delay={index * 0.1}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer title="Atendimentos ao Longo do Tempo" delay={0.2}>
                <div id="attendanceChart" className="w-full h-64" />
              </ChartContainer>

              <ChartContainer title="Receita por Tipo" delay={0.3}>
                <div id="revenueChart" className="w-full h-64" />
              </ChartContainer>

              <ChartContainer title="Atendimentos por Médico" delay={0.4} className="lg:col-span-2">
                <div id="doctorChart" className="w-full h-80" />
              </ChartContainer>
            </div>

            {/* Recent Exams Table */}
            <ChartContainer title="Exames Recentes" delay={0.5}>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/80">Paciente</TableHead>
                      <TableHead className="text-white/80">Exame</TableHead>
                      <TableHead className="text-white/80">Médico</TableHead>
                      <TableHead className="text-white/80">Status</TableHead>
                      <TableHead className="text-white/80">Tipo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examesData.map((exame) => (
                      <TableRow key={exame.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white font-medium">{exame.nome}</TableCell>
                        <TableCell className="text-white/80">{exame.exame}</TableCell>
                        <TableCell className="text-white/80">{exame.medico}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusBadge(exame.status)} text-white border-0`}>
                            {exame.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white/80">{exame.tipo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ChartContainer>
          </div>

          {/* Sidebar - Doctors Panel */}
          <div className="lg:col-span-1 space-y-6">
            <FadeIn delay={0.6}>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-semibold text-lg">Equipe Médica</h3>
                  <TimeSelector 
                    selectedYear={selectedYear} 
                    onYearChange={setSelectedYear} 
                  />
                </div>

                <div className="space-y-3">
                  {doctors.map((doctor, index) => (
                    <DoctorCard
                      key={doctor.name}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      consultations={doctor.consultations}
                      isActive={doctor.isActive}
                      delay={0.7 + index * 0.1}
                    />
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <h4 className="text-white/80 font-medium mb-3">Resumo do Dia</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Consultas Hoje:</span>
                      <span className="text-white font-medium">28</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Exames Pendentes:</span>
                      <span className="text-yellow-400 font-medium">5</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Emergências:</span>
                      <span className="text-red-400 font-medium">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
