"use client";

import { Star, MessageCircle, Filter, Search, Clock, Award } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useMemo, useState } from "react";

interface Consultant {
  id: string | number;
  name: string;
  slug: string;
  title: string | null;
  description: string | null;
  pricePerMinute: number;
  rating: number;
  reviewCount: number;
  imageUrl: string | null;
  whatsapp?: string;
  specialty: string | null;
  specialties: string[];
  status: 'online' | 'offline' | 'busy';
  statusColor: string;
  experience: string;
  consultations: string;
  isVip: boolean;
  isFeatured: boolean;
}

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

const statusToColor = (status?: string | null) => {
  if (status === 'online') return 'bg-green-500';
  if (status === 'busy') return 'bg-red-500';
  return 'bg-gray-500';
};

export default function ConsultoresPage() {
  const [items, setItems] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/consultants', { cache: 'no-store' });
        if (!res.ok) throw new Error('Falha ao carregar consultores');
        const data: DbConsultant[] = await res.json();
        if (!mounted) return;
        const mapped: Consultant[] = (data || []).map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          title: c.title ?? null,
          description: c.description ?? null,
          pricePerMinute: Number(c.price_per_minute ?? 0) || 0,
          rating: Number(c.rating ?? 0) || 0,
          reviewCount: Number(c.review_count ?? 0) || 0,
          imageUrl: c.image_url ?? null,
          specialty: c.specialty ?? null,
          specialties: (c.specialty ? c.specialty.split(',').map(s => s.trim()).filter(Boolean) : []),
          status: (c.status === 'online' || c.status === 'busy' || c.status === 'offline') ? c.status : 'offline',
          statusColor: statusToColor(c.status),
          experience: '—',
          consultations: '—',
    isVip: false,
          isFeatured: false,
        }));
        setItems(mapped);
      } catch (e: any) {
        setError(e?.message || 'Erro ao carregar consultores');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const displayConsultants = useMemo(() => {
    let filtered = items;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(consultant =>
        consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Specialty filter
    if (selectedSpecialty && selectedSpecialty !== "Todos") {
      filtered = filtered.filter(consultant =>
        consultant.specialty?.toLowerCase().includes(selectedSpecialty.toLowerCase()) ||
        consultant.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()))
      );
    }

    // Status filter
    if (selectedStatus && selectedStatus !== "Todos") {
      const statusMap: { [key: string]: string } = {
        "Online": "online",
        "Ocupado": "busy",
        "Offline": "offline"
      };
      filtered = filtered.filter(consultant =>
        consultant.status === statusMap[selectedStatus]
      );
    }

    return filtered;
  }, [items, searchTerm, selectedSpecialty, selectedStatus]);

const specialties = ["Todos", "Tarot", "Numerologia", "Astrologia", "Cristais", "Vidência", "Búzios", "Runas", "Reiki"];
const statusOptions = ["Todos", "Online", "Ocupado", "Offline"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-dark-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gold mb-4">🧙‍♂️ Nossos Consultores</h1>
          <p className="text-xl text-gray-300">Especialistas experientes prontos para guiar sua jornada espiritual</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-dark-blue hover:text-gold font-medium">
            ← Voltar para Home
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-dark-blue font-medium">HOME</Link>
            <Link href="/blog" className="text-gray-700 hover:text-dark-blue font-medium">BLOG</Link>
            <Link href="/consultores" className="text-dark-blue font-medium">CONSULTORES</Link>
            <Link href="/creditos" className="text-gray-700 hover:text-dark-blue font-medium">CRÉDITOS</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros e Busca */}
        <section className="mb-8">
          <Card className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Busca */}
              <div className="col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar consultor..."
                    className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtro por Especialidade */}
              <div>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">Todas as Especialidades</option>
                  {specialties.slice(1).map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Status */}
              <div>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Todos os Status</option>
                  {statusOptions.slice(1).map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </section>

        {/* Consultores em Destaque */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark-blue mb-6">⭐ Consultores em Destaque</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayConsultants.filter(consultant => consultant.isFeatured).map((consultant) => (
              <Card key={consultant.id} className="hover:shadow-xl transition-all duration-300 border-gold/30">
                <div className="relative">
                  <img 
                    src={consultant.imageUrl || "/images/placeholder-avatar.png"}
                    alt={consultant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-3 right-3 ${consultant.statusColor} text-white`}>
                    {consultant.status === 'online' ? 'Disponível' : 
                     consultant.status === 'busy' ? 'Em Atendimento' : 'Offline'}
                  </Badge>
                  {consultant.isVip && (
                    <Badge className="absolute top-3 left-3 bg-deep-purple text-white">
                      VIP
                    </Badge>
                  )}
                  <Badge className="absolute bottom-3 left-3 bg-gold text-dark-blue">
                    Destaque
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={consultant.imageUrl || undefined} alt={consultant.name} />
                      <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-dark-blue">{consultant.name}</CardTitle>
                      <CardDescription className="text-sm">{consultant.specialty || 'Especialista'}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{consultant.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award size={14} />
                      <span>{consultant.consultations}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {consultant.rating} ({consultant.reviewCount} avaliações)
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-3">{consultant.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {consultant.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-center pt-4 border-t">
                    <div className="text-2xl font-bold text-green mb-3">
                      R$ {consultant.pricePerMinute.toFixed(2)}/min
                    </div>
                    <div className="space-y-2">
                      <Link href={`/consultor/${consultant.slug}`}>
                        <Button className="w-full bg-green hover:bg-green/90 text-white">
                          <MessageCircle className="mr-2" size={16} />
                          Ver Perfil
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-white">
                        Consultar Agora
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Todos os Consultores */}
        <section>
          <h2 className="text-2xl font-bold text-dark-blue mb-6">👥 Todos os Consultores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayConsultants.map((consultant) => (
              <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={consultant.imageUrl || "/images/placeholder-avatar.png"}
                    alt={consultant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-3 right-3 ${consultant.statusColor} text-white`}>
                    {consultant.status === 'online' ? 'Disponível' : 
                     consultant.status === 'busy' ? 'Em Atendimento' : 'Offline'}
                  </Badge>
                  {consultant.isVip && (
                    <Badge className="absolute top-3 left-3 bg-deep-purple text-white">
                      VIP
                    </Badge>
                  )}
                  {consultant.isFeatured && (
                    <Badge className="absolute bottom-3 left-3 bg-gold text-dark-blue">
                      Destaque
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={consultant.imageUrl || undefined} alt={consultant.name} />
                      <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-dark-blue">{consultant.name}</CardTitle>
                      <CardDescription className="text-sm">{consultant.specialty || 'Especialista'}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{consultant.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award size={14} />
                      <span>{consultant.consultations}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {consultant.rating} ({consultant.reviewCount})
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-2">{consultant.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {consultant.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-center pt-4 border-t">
                    <div className="text-xl font-bold text-green mb-2">
                      R$ {consultant.pricePerMinute.toFixed(2)}/min
                    </div>
                    <Link href={`/consultor/${consultant.slug}`}>
                      <Button className="w-full bg-green hover:bg-green/90 text-white">
                        <MessageCircle className="mr-2" size={16} />
                        Ver Perfil
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-mystic-purple to-deep-purple text-white text-center">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Não encontrou o consultor ideal?</h2>
              <p className="text-lg mb-6">Entre em contato conosco e te ajudaremos a encontrar o especialista perfeito para suas necessidades</p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5511951653210?text=Olá! Gostaria de ajuda para encontrar um consultor."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green hover:bg-green/90 text-white px-6 py-3">
                    Falar no WhatsApp
                  </Button>
                </a>
                <p className="text-sm opacity-80">Atendimento 24 horas por dia</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Botão WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5511951653210?text=Olá! Gostaria de falar com um consultor."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green hover:bg-green/90 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Contato WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
        </a>
      </div>
    </div>
  );
}