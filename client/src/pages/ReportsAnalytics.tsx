import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Star,
  Clock,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";

export default function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [reportType, setReportType] = useState("revenue");

  const stats = {
    totalRevenue: 15420,
    revenueGrowth: 23.5,
    totalConsultations: 234,
    consultationsGrowth: 18.2,
    avgRating: 4.8,
    ratingGrowth: 2.1,
    clientRetention: 87.4
  };

  const revenueData = [
    { month: "Jan", revenue: 8500, consultations: 85 },
    { month: "Fev", revenue: 9200, consultations: 92 },
    { month: "Mar", revenue: 10100, consultations: 101 },
    { month: "Abr", revenue: 11300, consultations: 113 },
    { month: "Mai", revenue: 12800, consultations: 128 },
    { month: "Jun", revenue: 15420, consultations: 154 }
  ];

  const serviceTypes = [
    { name: "Tarot", value: 45, revenue: 6939, color: "#8B5CF6" },
    { name: "Astrologia", value: 28, revenue: 4318, color: "#06B6D4" },
    { name: "Numerologia", value: 15, revenue: 2313, color: "#10B981" },
    { name: "Mediunidade", value: 12, revenue: 1850, color: "#F59E0B" }
  ];

  const topConsultants = [
    { name: "Consultor Especialista", revenue: 4250, consultations: 68, rating: 4.9, growth: 15.2 },
    { name: "Ana Cristal", revenue: 3890, consultations: 62, rating: 4.8, growth: 12.8 },
    { name: "Carlos Astro", revenue: 3420, consultations: 54, rating: 4.7, growth: 18.5 },
    { name: "Sofia Místico", revenue: 2980, consultations: 48, rating: 4.8, growth: 8.3 },
    { name: "João Vidente", revenue: 2650, consultations: 42, rating: 4.6, growth: 22.1 }
  ];

  const timeSlots = [
    { hour: "08:00", consultations: 12, revenue: 780 },
    { hour: "10:00", consultations: 25, revenue: 1625 },
    { hour: "14:00", consultations: 38, revenue: 2470 },
    { hour: "16:00", consultations: 42, revenue: 2730 },
    { hour: "18:00", consultations: 35, revenue: 2275 },
    { hour: "20:00", consultations: 28, revenue: 1820 }
  ];

  const MetricCard = ({ title, value, growth, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 mr-1 ${growth > 0 ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-sm font-semibold ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {growth > 0 ? '+' : ''}{growth}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs período anterior</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const RevenueChart = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Receita Mensal</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="7d">7 dias</option>
            <option value="30d">30 dias</option>
            <option value="90d">90 dias</option>
            <option value="1y">1 ano</option>
          </select>
        </div>
      </div>
      
      <div className="h-80 flex items-end justify-between space-x-4">
        {revenueData.map((data, index) => {
          const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
          const height = (data.revenue / maxRevenue) * 100;
          
          return (
            <div key={data.month} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: '240px' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg flex items-end justify-center pb-2"
                >
                  <span className="text-white text-xs font-semibold">
                    R$ {(data.revenue / 1000).toFixed(1)}k
                  </span>
                </motion.div>
              </div>
              <span className="text-sm text-gray-600 mt-2 font-medium">{data.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const ServiceDistribution = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Distribuição por Serviço</h3>
      
      <div className="space-y-4">
        {serviceTypes.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: service.color }}
              />
              <span className="font-medium text-gray-700">{service.name}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  R$ {service.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{service.value}%</p>
              </div>
              
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${service.value}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  className="h-2 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const TopConsultants = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Top Consultores</h3>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          Ver todos
        </button>
      </div>
      
      <div className="space-y-4">
        {topConsultants.map((consultant, index) => (
          <motion.div
            key={consultant.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{consultant.name}</p>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span>{consultant.consultations} consultas</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span>{consultant.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-gray-800">
                R$ {consultant.revenue.toLocaleString()}
              </p>
              <div className="flex items-center">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-semibold">
                  +{consultant.growth}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const HourlyAnalysis = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Análise por Horário</h3>
      
      <div className="space-y-3">
        {timeSlots.map((slot, index) => {
          const maxConsultations = Math.max(...timeSlots.map(s => s.consultations));
          const percentage = (slot.consultations / maxConsultations) * 100;
          
          return (
            <motion.div
              key={slot.hour}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="w-16 text-sm font-medium text-gray-700">
                {slot.hour}
              </div>
              
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  />
                </div>
              </div>
              
              <div className="text-right min-w-0 w-24">
                <p className="text-sm font-semibold text-gray-800">
                  {slot.consultations} consultas
                </p>
                <p className="text-xs text-gray-500">
                  R$ {slot.revenue}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Relatórios & Analytics
              </h1>
              <p className="text-gray-600">
                Insights detalhados sobre performance e crescimento
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Filter className="w-4 h-4 mr-2 text-gray-600" />
                Filtros
              </button>
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </button>
              <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Receita Total"
            value={`R$ ${stats.totalRevenue.toLocaleString()}`}
            growth={stats.revenueGrowth}
            icon={DollarSign}
            color="bg-green-500"
          />
          <MetricCard
            title="Total de Consultas"
            value={stats.totalConsultations}
            growth={stats.consultationsGrowth}
            icon={Users}
            color="bg-blue-500"
          />
          <MetricCard
            title="Avaliação Média"
            value={stats.avgRating}
            growth={stats.ratingGrowth}
            icon={Star}
            color="bg-yellow-500"
          />
          <MetricCard
            title="Retenção de Clientes"
            value={`${stats.clientRetention}%`}
            growth={2.3}
            icon={Target}
            color="bg-purple-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart />
          <ServiceDistribution />
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopConsultants />
          <HourlyAnalysis />
        </div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white"
        >
          <h3 className="text-xl font-bold mb-4">Insights Rápidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">🚀</div>
              <p className="text-sm opacity-90 mt-2">
                Maior crescimento em consultas de Tarot (+32%)
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">⭐</div>
              <p className="text-sm opacity-90 mt-2">
                Horário de pico: 16:00-18:00 (42 consultas)
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">💎</div>
              <p className="text-sm opacity-90 mt-2">
                Consultor Especialista é a consultora com melhor performance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}