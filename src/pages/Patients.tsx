
import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Eye, Edit, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 'P001',
      name: 'MARIA SILVA SANTOS',
      cpf: '123.456.789-00',
      birthDate: '15/03/1985',
      phone: '(11) 99999-9999',
      insurance: 'Unimed',
      lastExam: '08/07/2025',
      totalExams: 5,
      status: 'Ativo'
    },
    {
      id: 'P002',
      name: 'JOSÉ OLIVEIRA LIMA',
      cpf: '987.654.321-00',
      birthDate: '22/08/1978',
      phone: '(11) 88888-8888',
      insurance: 'Bradesco Saúde',
      lastExam: '07/07/2025',
      totalExams: 12,
      status: 'Ativo'
    },
    {
      id: 'P003',
      name: 'ANA PAULA COSTA',
      cpf: '456.789.123-00',
      birthDate: '10/12/1992',
      phone: '(11) 77777-7777',
      insurance: 'SUS',
      lastExam: '05/07/2025',
      totalExams: 3,
      status: 'Ativo'
    },
    {
      id: 'P004',
      name: 'PEDRO SANTOS ALVES',
      cpf: '321.654.987-00',
      birthDate: '03/06/1965',
      phone: '(11) 66666-6666',
      insurance: 'Particular',
      lastExam: '01/07/2025',
      totalExams: 8,
      status: 'Inativo'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestão de Pacientes</h1>
            <p className="text-white/70">Cadastro e histórico de pacientes</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Buscar por nome, CPF ou ID do paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
              <CardContent className="p-6">
                <h3 className="text-white/80 text-sm font-medium mb-2">Total de Pacientes</h3>
                <p className="text-3xl font-bold">1.247</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 text-white">
              <CardContent className="p-6">
                <h3 className="text-white/80 text-sm font-medium mb-2">Pacientes Ativos</h3>
                <p className="text-3xl font-bold">1.198</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
              <CardContent className="p-6">
                <h3 className="text-white/80 text-sm font-medium mb-2">Novos este Mês</h3>
                <p className="text-3xl font-bold">84</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white">
              <CardContent className="p-6">
                <h3 className="text-white/80 text-sm font-medium mb-2">Com Exames Pendentes</h3>
                <p className="text-3xl font-bold">23</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Patients Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Lista de Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/80">ID</TableHead>
                      <TableHead className="text-white/80">Nome</TableHead>
                      <TableHead className="text-white/80">CPF</TableHead>
                      <TableHead className="text-white/80">Data Nascimento</TableHead>
                      <TableHead className="text-white/80">Telefone</TableHead>
                      <TableHead className="text-white/80">Convênio</TableHead>
                      <TableHead className="text-white/80">Último Exame</TableHead>
                      <TableHead className="text-white/80">Total Exames</TableHead>
                      <TableHead className="text-white/80">Status</TableHead>
                      <TableHead className="text-white/80">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white font-medium">{patient.id}</TableCell>
                        <TableCell className="text-white">{patient.name}</TableCell>
                        <TableCell className="text-white/80">{patient.cpf}</TableCell>
                        <TableCell className="text-white/80">{patient.birthDate}</TableCell>
                        <TableCell className="text-white/80">{patient.phone}</TableCell>
                        <TableCell className="text-white/80">{patient.insurance}</TableCell>
                        <TableCell className="text-white/80">{patient.lastExam}</TableCell>
                        <TableCell className="text-white/80">{patient.totalExams}</TableCell>
                        <TableCell>
                          <Badge className={`${patient.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'} text-white border-0`}>
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <Calendar className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                              <FileText className="h-4 w-4" />
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

export default Patients;
