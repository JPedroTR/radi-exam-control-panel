
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
          animation: false,
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
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-10 bg-blue-600 rounded flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">📡</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Sistema de Gestão de Exames</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Olá, João Pedro</span>
            <Button variant="ghost" size="sm">
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Navegação principal */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent h-12 border-none">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-blue-700 text-white h-full px-4"
              >
                📊 Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="exames" 
                className="data-[state=active]:bg-blue-700 text-white h-full px-4"
              >
                🏥 Exames
              </TabsTrigger>
              <TabsTrigger 
                value="pacientes" 
                className="data-[state=active]:bg-blue-700 text-white h-full px-4"
              >
                👥 Pacientes
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="data-[state=active]:bg-blue-700 text-white h-full px-4"
              >
                ⚙️ Administração
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" value={activeTab}>
          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Painel de Controle</h2>
              <div className="flex space-x-2">
                <span className="text-sm text-gray-500">Domingo, 8 de Junho de 2025</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-700">Total de Exames</CardTitle>
                  <CardDescription className="text-gray-500">Realizados hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl text-blue-600 mr-4">📋</div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">15</p>
                      <p className="text-sm text-gray-500">de 390 este mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-700">Exames Pendentes</CardTitle>
                  <CardDescription className="text-gray-500">Aguardando realização</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl text-orange-500 mr-4">⏳</div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">3</p>
                      <p className="text-sm text-gray-500">Prioridade: 1 urgente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-700">Média Diária</CardTitle>
                  <CardDescription className="text-gray-500">Exames por dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl text-green-600 mr-4">📊</div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">26</p>
                      <p className="text-sm text-gray-500">Aumento de 5% este mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-gray-800">Exames Recentes</CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Exame
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-200">
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
                      {filteredExames.slice(0, 5).map((exame) => (
                        <TableRow key={exame.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-800">{exame.nome}</TableCell>
                          <TableCell className="text-gray-600">{exame.exame}</TableCell>
                          <TableCell className="text-center text-gray-600">{exame.incidencias}</TableCell>
                          <TableCell className="text-center text-gray-600">{exame.numero}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={exame.plano === 'PARTICULAR' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-blue-100 text-blue-800 border-blue-300'}
                            >
                              {exame.plano}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">{exame.tecnico}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800">
                    Ver todos os exames
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exames */}
          <TabsContent value="exames" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gestão de Exames</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Exame
              </Button>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-96">
                    <Input
                      placeholder="Buscar exames..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
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
                    <Button variant="outline" className="border-gray-300">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-200">
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
                      {filteredExames.map((exame) => (
                        <TableRow key={exame.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-800">{exame.nome}</TableCell>
                          <TableCell className="text-gray-600">{exame.exame}</TableCell>
                          <TableCell className="text-center text-gray-600">{exame.incidencias}</TableCell>
                          <TableCell className="text-center text-gray-600">{exame.numero}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={exame.plano === 'PARTICULAR' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-blue-100 text-blue-800 border-blue-300'}
                            >
                              {exame.plano}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">{exame.tecnico}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
            </Card>
          </TabsContent>

          {/* Pacientes */}
          <TabsContent value="pacientes" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gestão de Pacientes</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Novo Paciente
              </Button>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <div className="relative w-full">
                  <Input
                    placeholder="Buscar pacientes por nome, CPF ou plano de saúde..."
                    className="pl-10 border-gray-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {examesData.slice(0, 6).map((paciente, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
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
                            <Badge 
                              variant="outline" 
                              className={paciente.plano === 'PARTICULAR' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-blue-100 text-blue-800 border-blue-300'}
                            >
                              {paciente.plano}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total de exames:</span>
                            <span className="text-gray-700">{Math.floor(Math.random() * 10) + 1}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            Ver histórico
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
            </Card>
          </TabsContent>

          {/* Admin */}
          <TabsContent value="admin" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Painel Administrativo</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-300">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatórios
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800">Estatísticas Mensais</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div id="planoSaudeChart" className="w-full h-full"></div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
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
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">JOÃO PEDRO</TableCell>
                        <TableCell className="text-center text-gray-600">78</TableCell>
                        <TableCell className="text-center text-gray-600">9.8</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-green-100 text-green-800">98%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">FER</TableCell>
                        <TableCell className="text-center text-gray-600">65</TableCell>
                        <TableCell className="text-center text-gray-600">8.1</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-green-100 text-green-800">95%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">BRUNA</TableCell>
                        <TableCell className="text-center text-gray-600">52</TableCell>
                        <TableCell className="text-center text-gray-600">6.5</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-amber-100 text-amber-800">87%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">RO</TableCell>
                        <TableCell className="text-center text-gray-600">45</TableCell>
                        <TableCell className="text-center text-gray-600">5.6</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-amber-100 text-amber-800">82%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-200">
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
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">João Pedro</TableCell>
                        <TableCell className="text-gray-600">joao.pedro@clinica.com</TableCell>
                        <TableCell className="text-gray-600">Administrador</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">08/06/2025 14:11</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">Fernanda Silva</TableCell>
                        <TableCell className="text-gray-600">fernanda.silva@clinica.com</TableCell>
                        <TableCell className="text-gray-600">Técnico</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">08/06/2025 13:45</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">Bruna Oliveira</TableCell>
                        <TableCell className="text-gray-600">bruna.oliveira@clinica.com</TableCell>
                        <TableCell className="text-gray-600">Técnico</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">08/06/2025 10:22</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">Roberto Almeida</TableCell>
                        <TableCell className="text-gray-600">roberto.almeida@clinica.com</TableCell>
                        <TableCell className="text-gray-600">Técnico</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">Inativo</Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">05/06/2025 16:30</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">© 2025 Sistema de Gestão de Exames Radiológicos. Todos os direitos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                Suporte
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                Manual
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                Privacidade
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
