
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
    <div className="min-h-screen bg-background">
      {/* Cabeçalho */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">R</span>
            </div>
            <h1 className="ml-4 text-xl font-semibold text-foreground">Sistema de Gestão de Exames</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Olá, João Pedro</span>
            <Button variant="ghost" size="sm">
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Navegação principal */}
      <nav className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent h-12 border-none">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-primary/80 text-primary-foreground h-full px-4"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="exames" 
                className="data-[state=active]:bg-primary/80 text-primary-foreground h-full px-4"
              >
                Exames
              </TabsTrigger>
              <TabsTrigger 
                value="pacientes" 
                className="data-[state=active]:bg-primary/80 text-primary-foreground h-full px-4"
              >
                Pacientes
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="data-[state=active]:bg-primary/80 text-primary-foreground h-full px-4"
              >
                Administração
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
              <h2 className="text-2xl font-bold text-foreground">Painel de Controle</h2>
              <div className="flex space-x-2">
                <span className="text-sm text-muted-foreground">Domingo, 8 de Junho de 2025</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total de Exames</CardTitle>
                  <CardDescription>Realizados hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl text-primary mr-4">📋</div>
                    <div>
                      <p className="text-3xl font-bold">15</p>
                      <p className="text-sm text-muted-foreground">de 390 este mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Exames Pendentes</CardTitle>
                  <CardDescription>Aguardando realização</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl text-amber-500 mr-4">⏳</div>
                    <div>
                      <p className="text-3xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Prioridade: 1 urgente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Média Diária</CardTitle>
                  <CardDescription>Exames por dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl text-green-500 mr-4">📊</div>
                    <div>
                      <p className="text-3xl font-bold">26</p>
                      <p className="text-sm text-muted-foreground">Aumento de 5% este mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Exames Recentes</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Exame
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted">
                        <TableHead className="font-semibold">Nome do Paciente</TableHead>
                        <TableHead className="font-semibold">Exames Realizados</TableHead>
                        <TableHead className="font-semibold text-center">Incidências</TableHead>
                        <TableHead className="font-semibold text-center">Número</TableHead>
                        <TableHead className="font-semibold">Plano de Saúde</TableHead>
                        <TableHead className="font-semibold">Técnico</TableHead>
                        <TableHead className="font-semibold text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExames.slice(0, 5).map((exame) => (
                        <TableRow key={exame.id}>
                          <TableCell className="font-medium">{exame.nome}</TableCell>
                          <TableCell>{exame.exame}</TableCell>
                          <TableCell className="text-center">{exame.incidencias}</TableCell>
                          <TableCell className="text-center">{exame.numero}</TableCell>
                          <TableCell>
                            <Badge variant={exame.plano === 'PARTICULAR' ? 'outline' : 'default'}>
                              {exame.plano}
                            </Badge>
                          </TableCell>
                          <TableCell>{exame.tecnico}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="link">
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
              <h2 className="text-2xl font-bold text-foreground">Gestão de Exames</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Exame
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-96">
                    <Input
                      placeholder="Buscar exames..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filtrar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os exames</SelectItem>
                        <SelectItem value="hoje">Realizados hoje</SelectItem>
                        <SelectItem value="semana">Última semana</SelectItem>
                        <SelectItem value="mes">Este mês</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted">
                        <TableHead className="font-semibold">Nome do Paciente</TableHead>
                        <TableHead className="font-semibold">Exames Realizados</TableHead>
                        <TableHead className="font-semibold text-center">Incidências</TableHead>
                        <TableHead className="font-semibold text-center">Número</TableHead>
                        <TableHead className="font-semibold">Plano de Saúde</TableHead>
                        <TableHead className="font-semibold">Técnico</TableHead>
                        <TableHead className="font-semibold text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExames.map((exame) => (
                        <TableRow key={exame.id}>
                          <TableCell className="font-medium">{exame.nome}</TableCell>
                          <TableCell>{exame.exame}</TableCell>
                          <TableCell className="text-center">{exame.incidencias}</TableCell>
                          <TableCell className="text-center">{exame.numero}</TableCell>
                          <TableCell>
                            <Badge variant={exame.plano === 'PARTICULAR' ? 'outline' : 'default'}>
                              {exame.plano}
                            </Badge>
                          </TableCell>
                          <TableCell>{exame.tecnico}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
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
              <h2 className="text-2xl font-bold text-foreground">Gestão de Pacientes</h2>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Novo Paciente
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="relative w-full">
                  <Input
                    placeholder="Buscar pacientes por nome, CPF ou plano de saúde..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {examesData.slice(0, 6).map((paciente, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{paciente.nome}</CardTitle>
                        <CardDescription>ID: {100000 + index}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Último exame:</span>
                            <span>{paciente.exame}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Plano:</span>
                            <Badge variant="outline">
                              {paciente.plano}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total de exames:</span>
                            <span>{Math.floor(Math.random() * 10) + 1}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="ghost" size="sm">
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
              <h2 className="text-2xl font-bold text-foreground">Painel Administrativo</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatórios
                </Button>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas Mensais</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div id="planoSaudeChart" className="w-full h-full"></div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho por Técnico</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted">
                        <TableHead className="font-semibold">Técnico</TableHead>
                        <TableHead className="font-semibold text-center">Exames</TableHead>
                        <TableHead className="font-semibold text-center">Média Diária</TableHead>
                        <TableHead className="font-semibold text-right">Eficiência</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">JOÃO PEDRO</TableCell>
                        <TableCell className="text-center">78</TableCell>
                        <TableCell className="text-center">9.8</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-green-100 text-green-800">98%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">FER</TableCell>
                        <TableCell className="text-center">65</TableCell>
                        <TableCell className="text-center">8.1</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-green-100 text-green-800">95%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">BRUNA</TableCell>
                        <TableCell className="text-center">52</TableCell>
                        <TableCell className="text-center">6.5</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-amber-100 text-amber-800">87%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">RO</TableCell>
                        <TableCell className="text-center">45</TableCell>
                        <TableCell className="text-center">5.6</TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-amber-100 text-amber-800">82%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted">
                        <TableHead className="font-semibold">Nome</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Função</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Último Acesso</TableHead>
                        <TableHead className="font-semibold text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">João Pedro</TableCell>
                        <TableCell>joao.pedro@clinica.com</TableCell>
                        <TableCell>Administrador</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </TableCell>
                        <TableCell>08/06/2025 14:11</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fernanda Silva</TableCell>
                        <TableCell>fernanda.silva@clinica.com</TableCell>
                        <TableCell>Técnico</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </TableCell>
                        <TableCell>08/06/2025 13:45</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bruna Oliveira</TableCell>
                        <TableCell>bruna.oliveira@clinica.com</TableCell>
                        <TableCell>Técnico</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </TableCell>
                        <TableCell>08/06/2025 10:22</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Roberto Almeida</TableCell>
                        <TableCell>roberto.almeida@clinica.com</TableCell>
                        <TableCell>Técnico</TableCell>
                        <TableCell>
                          <Badge variant="outline">Inativo</Badge>
                        </TableCell>
                        <TableCell>05/06/2025 16:30</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-green-600">
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
      <footer className="bg-muted border-t border-border mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">© 2025 Sistema de Gestão de Exames Radiológicos. Todos os direitos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                Suporte
              </Button>
              <Button variant="ghost" size="sm">
                Manual
              </Button>
              <Button variant="ghost" size="sm">
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
