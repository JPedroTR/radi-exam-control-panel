import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import * as echarts from 'echarts';
import { User, Stethoscope, FileText, Clock } from 'lucide-react';

// Import our components
import { MetricCard } from '@/components/dashboard/MetricCard';
import { TechnicianCard } from '@/components/dashboard/TechnicianCard';
import { ChartContainer } from '@/components/dashboard/ChartContainer';
import { TimeSelector } from '@/components/dashboard/TimeSelector';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

const Index: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  
  // Updated metrics for radiology context
  const metrics = [
    { title: 'Exames Realizados', value: 342, description: 'Total este mês', icon: Stethoscope, gradient: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { title: 'Laudos Pendentes', value: 28, description: 'Aguardando radiologista', icon: FileText, gradient: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { title: 'Pacientes Atendidos', value: 267, description: 'Únicos este mês', icon: User, gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
    { title: 'Tempo Médio Laudo', value: 24, description: 'Horas', icon: Clock, gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-600' }
  ];

  // Updated to radiology technicians
  const technicians = [
    { name: 'Ana Costa Silva', shift: 'Manhã (6h-14h)', examsToday: 12, isActive: true },
    { name: 'Carlos Mendes', shift: 'Tarde (14h-22h)', examsToday: 9, isActive: true },
    { name: 'Fernanda Santos', shift: 'Manhã (6h-14h)', examsToday: 8, isActive: false },
    { name: 'Bruno Silva Lima', shift: 'Noite (22h-6h)', examsToday: 5, isActive: true },
    { name: 'Juliana Rocha', shift: 'Tarde (14h-22h)', examsToday: 7, isActive: false },
    { name: 'Ricardo Oliveira', shift: 'Manhã (6h-14h)', examsToday: 10, isActive: true }
  ];

  // Updated exam data with radiology context
  const examesData = [
    { id: 1, data: '08/07/2025', nome: 'MARIA SANTOS SILVA', exame: 'TÓRAX PA/P', status: 'Laudado', tecnico: 'Ana Costa', solicitante: 'Dr. João Silva', tipo: 'Particular' },
    { id: 2, data: '08/07/2025', nome: 'JOSÉ OLIVEIRA LIMA', exame: 'CRÂNIO AP/P', status: 'Em Execução', tecnico: 'Carlos Mendes', solicitante: 'Dra. Maria Costa', tipo: 'Convênio' },
    { id: 3, data: '08/07/2025', nome: 'ANA PAULA COSTA', exame: 'JOELHO DIREITO', status: 'Agendado', tecnico: 'Fernanda Santos', solicitante: 'Dr. Pedro Alves', tipo: 'SUS' },
    { id: 4, data: '08/07/2025', nome: 'PEDRO SANTOS ALVES', exame: 'COLUNA LOMBAR', status: 'Aguardando Laudo', tecnico: 'Bruno Silva', solicitante: 'Dra. Ana Rocha', tipo: 'Particular' },
    { id: 5, data: '08/07/2025', nome: 'CARLA SOARES LIMA', exame: 'PUNHO ESQUERDO', status: 'Laudado', tecnico: 'Ana Costa', solicitante: 'Dr. Carlos Lima', tipo: 'Convênio' }
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
      'Laudado': 'bg-green-500',
      'Em Execução': 'bg-blue-500',
      'Agendado': 'bg-yellow-500',
      'Aguardando Laudo': 'bg-orange-500'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />

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
              <ChartContainer title="Exames Realizados por Mês" delay={0.2}>
                <div id="attendanceChart" className="w-full h-64" />
              </ChartContainer>

              <ChartContainer title="Distribuição por Tipo de Pagamento" delay={0.3}>
                <div id="revenueChart" className="w-full h-64" />
              </ChartContainer>

              <ChartContainer title="Produtividade por Técnico" delay={0.4} className="lg:col-span-2">
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
                      <TableHead className="text-white/80">Técnico</TableHead>
                      <TableHead className="text-white/80">Médico Solicitante</TableHead>
                      <TableHead className="text-white/80">Status</TableHead>
                      <TableHead className="text-white/80">Tipo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examesData.map((exame) => (
                      <TableRow key={exame.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white font-medium">{exame.nome}</TableCell>
                        <TableCell className="text-white/80">{exame.exame}</TableCell>
                        <TableCell className="text-white/80">{exame.tecnico}</TableCell>
                        <TableCell className="text-white/80">{exame.solicitante}</TableCell>
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

          {/* Sidebar - Technicians Panel */}
          <div className="lg:col-span-1 space-y-6">
            <FadeIn delay={0.6}>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-semibold text-lg">Técnicos em Radiologia</h3>
                  <TimeSelector 
                    selectedYear={selectedYear} 
                    onYearChange={setSelectedYear} 
                  />
                </div>

                <div className="space-y-3">
                  {technicians.map((technician, index) => (
                    <TechnicianCard
                      key={technician.name}
                      name={technician.name}
                      shift={technician.shift}
                      examsToday={technician.examsToday}
                      isActive={technician.isActive}
                      delay={0.7 + index * 0.1}
                    />
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <h4 className="text-white/80 font-medium mb-3">Resumo do Dia</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Exames Realizados:</span>
                      <span className="text-white font-medium">51</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Laudos Pendentes:</span>
                      <span className="text-yellow-400 font-medium">28</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Exames Urgentes:</span>
                      <span className="text-red-400 font-medium">3</span>
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
