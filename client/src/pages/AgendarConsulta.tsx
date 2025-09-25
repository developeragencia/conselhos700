import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Star, MessageCircle, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

interface ConsultantData {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  hourlyRate: number;
  description: string;
}

export default function AgendarConsulta() {
  const [selectedConsultant, setSelectedConsultant] = useState<ConsultantData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("chat");
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const consultants: ConsultantData[] = [
    {
      id: "1",
      name: "Consultor Disponível",
      specialty: "Tarot e Astrologia",
      rating: 4.9,
      reviewCount: 1250,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
      hourlyRate: 65,
      description: "Especialista em leitura de tarot com mais de 15 anos de experiência"
    },
    {
      id: "2", 
      name: "Ana Cristal",
      specialty: "Mediunidade",
      rating: 4.8,
      reviewCount: 890,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      hourlyRate: 55,
      description: "Médium com dom natural, conecta com o plano espiritual"
    },
    {
      id: "3",
      name: "Carlos Astro",
      specialty: "Astrologia", 
      rating: 4.7,
      reviewCount: 567,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      hourlyRate: 70,
      description: "Astrólogo profissional, mapa astral completo e previsões"
    }
  ];

  const serviceTypes = [
    {
      id: "chat",
      name: "Chat Texto",
      icon: MessageCircle,
      description: "Conversa por texto em tempo real",
      multiplier: 1
    },
    {
      id: "video",
      name: "Videochamada",
      icon: Video,
      description: "Consulta por vídeo ao vivo",
      multiplier: 1.3
    },
    {
      id: "phone",
      name: "Ligação",
      icon: Phone,
      description: "Consulta por telefone",
      multiplier: 1.1
    }
  ];

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const basePrice = selectedConsultant?.hourlyRate || 50;
    const multiplier = serviceTypes.find(s => s.id === selectedService)?.multiplier || 1;
    
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isAvailable = Math.random() > 0.3; // 70% de disponibilidade
        
        slots.push({
          time,
          available: isAvailable,
          price: Math.round(basePrice * multiplier)
        });
      }
    }
    return slots;
  };

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedConsultant && selectedDate) {
      setTimeSlots(generateTimeSlots());
    }
  }, [selectedConsultant, selectedDate, selectedService]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleConsultantSelect = (consultant: ConsultantData) => {
    setSelectedConsultant(consultant);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleConfirmBooking = async () => {
    try {
      // Simular agendamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Consulta Agendada!",
        description: `Sua consulta com ${selectedConsultant?.name} foi agendada para ${formatDate(selectedDate)} às ${selectedTime}`,
      });
      
      setStep(4);
    } catch (error) {
      toast({
        title: "Erro ao agendar",
        description: "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    }
  };

  const nextWeek = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 7);
    setSelectedDate(nextDate);
  };

  const prevWeek = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 7);
    setSelectedDate(prevDate);
  };

  const getWeekDays = () => {
    const week = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // Step 4 - Confirmação
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Consulta Agendada!</h2>
          <p className="text-gray-600 mb-6">
            Sua consulta com {selectedConsultant?.name} foi confirmada para {formatDate(selectedDate)} às {selectedTime}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700"
            >
              Ver Agendamentos
            </button>
            <button
              onClick={() => {
                setStep(1);
                setSelectedConsultant(null);
                setSelectedTime("");
              }}
              className="w-full bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200"
            >
              Agendar Outra Consulta
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Agendar Consulta</h1>
          <p className="text-xl text-gray-600">Escolha seu consultor e horário ideal</p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Escolher Consultor */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {consultants.map((consultant, index) => (
              <motion.div
                key={consultant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleConsultantSelect(consultant)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <img
                    src={consultant.imageUrl}
                    alt={consultant.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{consultant.name}</h3>
                  <p className="text-purple-600 font-semibold mb-3">{consultant.specialty}</p>
                  
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{consultant.rating}</span>
                    <span className="ml-1 text-gray-600">({consultant.reviewCount})</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{consultant.description}</p>
                  
                  <div className="text-2xl font-bold text-purple-600 mb-4">
                    R$ {consultant.hourlyRate}/hora
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700">
                    Escolher Consultor
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: Escolher Data e Horário */}
        {step === 2 && selectedConsultant && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Agendar com {selectedConsultant.name}
              </h2>
              
              {/* Tipo de Serviço */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Tipo de Atendimento</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedService === service.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <Icon className="w-8 h-8 text-purple-600 mb-2" />
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-sm font-semibold text-purple-600 mt-2">
                          R$ {Math.round(selectedConsultant.hourlyRate * service.multiplier)}/hora
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Calendário Semanal */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Escolha a Data</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevWeek}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextWeek}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {getWeekDays().map((day, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`p-3 text-center border rounded-lg cursor-pointer transition-all ${
                        day.toDateString() === selectedDate.toDateString()
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-sm text-gray-600">
                        {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </div>
                      <div className="font-semibold">
                        {day.getDate()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horários Disponíveis */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Horários para {formatDate(selectedDate)}
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        slot.available
                          ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmação */}
        {step === 3 && selectedConsultant && selectedTime && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirmar Agendamento</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedConsultant.imageUrl}
                  alt={selectedConsultant.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedConsultant.name}</h3>
                  <p className="text-purple-600">{selectedConsultant.specialty}</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{selectedConsultant.rating} ({selectedConsultant.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-semibold">Data e Horário</span>
                  </div>
                  <p>{formatDate(selectedDate)}</p>
                  <p>{selectedTime}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-semibold">Tipo de Atendimento</span>
                  </div>
                  <p>{serviceTypes.find(s => s.id === selectedService)?.name}</p>
                  <p className="text-sm text-gray-600">
                    {serviceTypes.find(s => s.id === selectedService)?.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Valor Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    R$ {Math.round(selectedConsultant.hourlyRate * (serviceTypes.find(s => s.id === selectedService)?.multiplier || 1))}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Por 1 hora de consulta</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                >
                  Voltar
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700"
                >
                  Confirmar e Pagar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}