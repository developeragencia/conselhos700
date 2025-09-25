"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, MessageCircle, Clock, Shield, Award, ArrowLeft, User, Heart } from "lucide-react";

interface DbConsultant {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  specialty: string | null;
  description: string | null;
  price_per_minute: number | string;
  rating: number | string;
  review_count: number | string;
  status: 'online' | 'offline' | 'busy' | string | null;
  image_url: string | null;
}

interface Consultant {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  description: string | null;
  pricePerMinute: number;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  specialty: string | null;
  specialties: string[];
  status: string;
  experience: string;
}

export default function ConsultorPage() {
  const params = useParams();
  const router = useRouter();
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.slug) {
      loadConsultant(params.slug as string);
    }
  }, [params.slug]);

  const loadConsultant = async (slug: string) => {
    try {
      const response = await fetch(`/api/consultants/slug/${slug}`);
      if (response.ok) {
        const data: DbConsultant = await response.json();
        const mapped: Consultant = {
          id: data.id,
          name: data.name,
          slug: data.slug,
          title: data.title,
          description: data.description,
          pricePerMinute: Number(data.price_per_minute ?? 0) || 0,
          rating: Number(data.rating ?? 0) || 0,
          reviewCount: Number(data.review_count ?? 0) || 0,
          imageUrl: data.image_url,
          specialty: data.specialty,
          specialties: data.specialty ? data.specialty.split(',').map(s => s.trim()).filter(Boolean) : [],
          status: data.status || 'offline',
          experience: 'Experiência sólida em consultas esotéricas',
        };
        setConsultant(mapped);
      } else {
        setError("Consultor não encontrado");
      }
    } catch (err) {
      setError("Erro ao carregar consultor");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-red-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Disponível";
      case "busy":
        return "Em Atendimento";
      case "offline":
        return "Offline";
      default:
        return "Indisponível";
    }
  };

  const handleStartConsultation = () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    
    // Redirecionar para página de chat
    router.push(`/chat/${consultant?.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !consultant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Consultor não encontrado</h1>
          <Link href="/">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Voltar ao início
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <Link href="/" className="text-2xl font-bold text-purple-600">
              Portal Esotérico
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors">
                Entrar
              </Link>
              <Link href="/registro" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Perfil do Consultor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <img
                    src={consultant.imageUrl || "/images/placeholder-avatar.png"}
                    alt={consultant.name}
                    className="w-48 h-48 rounded-lg object-cover mx-auto md:mx-0"
                  />
                  <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${getStatusColor(consultant.status)}`}></div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{consultant.name}</h1>
                  <p className="text-xl text-purple-600 mb-4">{consultant.title || consultant.specialty || 'Especialista'}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(consultant.rating) ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {consultant.rating} ({consultant.reviewCount} avaliações)
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(consultant.status)} mr-2`}></div>
                      <span className="text-gray-600">{getStatusText(consultant.status)}</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      R$ {consultant.pricePerMinute.toFixed(2)}/min
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{consultant.description || 'Consultor experiente em orientação espiritual.'}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {consultant.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experiência */}
            <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiência</h2>
              <p className="text-gray-700">{consultant.experience}</p>
            </div>

            {/* Depoimentos */}
            <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Depoimentos</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-gray-700 mb-2">
                    "Consulta incrível! {consultant.name} me ajudou muito com suas orientações."
                  </p>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Maria Silva</span>
                    <div className="flex text-yellow-400 ml-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-gray-700 mb-2">
                    "Profissional excepcional, muito atenciosa e precisa em suas colocações."
                  </p>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">João Santos</span>
                    <div className="flex text-yellow-400 ml-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Ações */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  R$ {consultant.pricePerMinute.toFixed(2)}
                </div>
                <div className="text-gray-600">por minuto</div>
              </div>

              <button
                onClick={handleStartConsultation}
                disabled={consultant.status === "offline"}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-medium flex items-center justify-center mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <MessageCircle className="mr-2" size={20} />
                {consultant.status === "offline" ? "Indisponível" : "Iniciar Consulta"}
              </button>

              <div className="text-center text-sm text-gray-600 mb-6">
                Consulta segura e confidencial
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 mr-3 text-green-500" />
                  <span>Pagamento Seguro</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Resposta Imediata</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-purple-500" />
                  <span>Consultor Verificado</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Heart className="w-5 h-5 mr-3 text-red-500" />
                  <span>Satisfação Garantida</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Dica Especial</h4>
                <p className="text-sm text-purple-700">
                  Prepare suas perguntas antes da consulta para aproveitar melhor o tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}