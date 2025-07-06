
import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Eye, Edit, FileImage } from 'lucide-react';
import { motion } from 'framer-motion';

const Exams: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const exams = [
    { 
      id: 'EX001', 
      patient: 'MARIA SILVA SANTOS', 
      type: 'TÓRAX PA/P', 
      doctor: 'Dr. João Carlos', 
      technician: 'Ana Costa',
      status: 'Concluído', 
      date: '08/07/2025', 
      priority: 'Normal',
      modality: 'RX'
    },
    { 
      id: 'EX002', 
      patient: 'JOSÉ OLIVEIRA LIMA', 
      type: 'CRÂNIO AP/P', 
      doctor: 'Dra. Maria Fernanda', 
      technician: 'Carlos Mendes',
      status: 'Em Execução', 
      date: '08/07/2025', 
      priority: 'Urgente',
      modality: 'RX'
    },
    { 
      id: 'EX003', 
      patient: 'ANA PAULA COSTA', 
      type: 'JOELHO DIREITO', 
      doctor: 'Dr. Roberto Silva', 
      technician: 'Fernanda Santos',
      status: 'Agendado', 
      date: '09/07/2025', 
      priority: 'Normal',
      modality: 'RX'
    },
    { 
      id: 'EX004', 
      patient: 'PEDRO SANTOS ALVES', 
      type: 'COLUNA LOMBAR', 
      doctor: 'Dra. Juliana Rocha', 
      technician: 'Bruno Silva',
      status: 'Aguardando Laudo', 
      date: '08/07/2025', 
      priority: 'Normal',
      modality: 'RX'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Concluído': 'bg-green-500',
      'Em Execução': 'bg-blue-500',
      'Agendado': 'bg-yellow-500',
      'Aguardando Laudo': 'bg-orange-500',
      'Cancelado': 'bg-red-500'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-500';
  };

  const getPriorityBadge = (priority: string) => {
    return priority === 'Urgente' ? 'bg-red-500' : 'bg-blue-500';
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestão de Exames</h1>
            <p className="text-white/70">Controle completo dos exames radiológicos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Exame
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Buscar por paciente, ID ou tipo de exame..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Agendado">Agendado</SelectItem>
                  <SelectItem value="Em Execução">Em Execução</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Aguardando Laudo">Aguardando Laudo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exams Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Lista de Exames</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/80">ID</TableHead>
                      <TableHead className="text-white/80">Paciente</TableHead>
                      <TableHead className="text-white/80">Tipo de Exame</TableHead>
                      <TableHead className="text-white/80">Médico Solicitante</TableHead>
                      <TableHead className="text-white/80">Técnico</TableHead>
                      <TableHead className="text-white/80">Status</TableHead>
                      <TableHead className="text-white/80">Prioridade</TableHead>
                      <TableHead className="text-white/80">Data</TableHead>
                      <TableHead className="text-white/80">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.map((exam) => (
                      <TableRow key={exam.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white font-medium">{exam.id}</TableCell>
                        <TableCell className="text-white">{exam.patient}</TableCell>
                        <TableCell className="text-white/80">{exam.type}</TableCell>
                        <TableCell className="text-white/80">{exam.doctor}</TableCell>
                        <TableCell className="text-white/80">{exam.technician}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusBadge(exam.status)} text-white border-0`}>
                            {exam.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityBadge(exam.priority)} text-white border-0`}>
                            {exam.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white/80">{exam.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <FileImage className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Exams;
