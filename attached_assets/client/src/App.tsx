import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useState, useEffect, Suspense, lazy } from "react";

import Home from "@/pages/Home";
import MainLayout from "@/layouts/MainLayout";

// Lazy load páginas para carregamento mais rápido

const QuemSomos = lazy(() => import("@/pages/QuemSomos"));
const ServicosTarot = lazy(() => import("@/pages/ServicosTarot"));
const ServicosAstrologia = lazy(() => import("@/pages/ServicosAstrologia"));
const ServicosNumerologia = lazy(() => import("@/pages/ServicosNumerologia"));
const ConsultoresEspecialistas = lazy(() => import("@/pages/ConsultoresEspecialistas"));
const Blog = lazy(() => import("@/pages/Blog"));
const Contact = lazy(() => import("@/pages/Contact"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Shop = lazy(() => import("@/pages/Shop"));
const ConsultoresFixed = lazy(() => import("@/pages/ConsultoresFixed"));
const ConsultoresEnhanced = lazy(() => import("@/pages/ConsultoresEnhanced"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Promotions = lazy(() => import("@/pages/Promotions"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const FreeTarot = lazy(() => import("@/pages/FreeTarot"));
const Register = lazy(() => import("@/pages/Register"));
const AccessTypeSelection = lazy(() => import("@/pages/AccessTypeSelection"));
const ConsultantProfile = lazy(() => import("@/pages/ConsultantProfile"));
const CartPage = lazy(() => import("@/pages/Cart"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboardWorking"));
const ClientDashboard = lazy(() => import("@/pages/ClientDashboard"));
const ClientDashboardComplete = lazy(() => import("@/pages/ClientDashboardComplete"));
const ConsultantDashboard = lazy(() => import("@/pages/ConsultantDashboard"));

// Novas páginas dos submenus
const ConsultoresAstrologia = lazy(() => import("@/pages/ConsultoresAstrologia"));
const ConsultoresMediunidade = lazy(() => import("@/pages/ConsultoresMediunidade"));
const ConsultoresTerapeutas = lazy(() => import("@/pages/ConsultoresTerapeutas"));
const ComprarConsultas = lazy(() => import("@/pages/ComprarConsultas"));
const ComprarPacotes = lazy(() => import("@/pages/ComprarPacotes"));
const ComprarCreditos = lazy(() => import("@/pages/ComprarCreditos"));
const ComprarPlanos = lazy(() => import("@/pages/ComprarPlanos"));
const ComprarAssinaturas = lazy(() => import("@/pages/ComprarAssinaturas"));
const CadastroCliente = lazy(() => import("@/pages/CadastroCliente"));
const CadastroConsultor = lazy(() => import("@/pages/CadastroConsultor"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const Chat = lazy(() => import("@/pages/Chat"));
const ConsultorConfig = lazy(() => import("@/pages/ConsultorConfig"));
const Login = lazy(() => import("@/pages/Login"));
const LoginWithCPF = lazy(() => import("@/pages/LoginWithCPF"));
const RegisterWithCPF = lazy(() => import("@/pages/RegisterWithCPF"));
const CreditsDemo = lazy(() => import("@/pages/CreditsDemo"));
const DataManagement = lazy(() => import("@/pages/DataManagement"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AgendarConsulta = lazy(() => import("@/pages/AgendarConsulta"));
const ChatRoom = lazy(() => import("@/pages/ChatRoom"));
const ReportsAnalytics = lazy(() => import("@/pages/ReportsAnalytics"));
const ReviewSystem = lazy(() => import("@/pages/ReviewSystem"));
const ConsultationSystem = lazy(() => import("@/pages/ConsultationSystem"));
const ConsultasOnline = lazy(() => import("@/pages/ConsultasOnline"));
const ConsultationRoom = lazy(() => import("@/pages/ConsultationRoom"));
const TarotGratis = lazy(() => import("@/pages/TarotGratis"));
const ServicosRunas = lazy(() => import("@/pages/ServicosRunas"));
const ServicosMediunidade = lazy(() => import("@/pages/ServicosMediunidade"));
const ServicosOraculos = lazy(() => import("@/pages/ServicosOraculos"));
const ServicosReiki = lazy(() => import("@/pages/ServicosReiki"));
const ServicosCristaloterapia = lazy(() => import("@/pages/ServicosCristaloterapia"));
const ConsultoresTarot = lazy(() => import("@/pages/ConsultoresTarot"));
const ConsultoresPage = lazy(() => import("@/pages/ConsultoresClean"));
const ComoSerConsultor = lazy(() => import("@/pages/ComoSerConsultor"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

// Componente de loading rápido
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Páginas sem layout (acesso, login e dashboard) */}
        <Route path="/acesso" component={AccessTypeSelection} />
        <Route path="/login" component={LoginWithCPF} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/dashboard" component={Dashboard} />
        
        {/* Painéis administrativos - páginas independentes sem MainLayout */}
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/client-dashboard" component={ClientDashboardComplete} />
        <Route path="/consultant-dashboard" component={ConsultantDashboard} />
        
        {/* Painéis antigos para compatibilidade */}
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/cliente" component={ClientDashboard} />
        <Route path="/consultor" component={ConsultantDashboard} />
        
        {/* Todas as outras páginas com MainLayout */}
        <Route>
          {() => (
            <MainLayout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/quem-somos" component={QuemSomos} />
                <Route path="/consultores" component={ConsultoresPage} />
                <Route path="/consultores/:id" component={ConsultantProfile} />
                <Route path="/consultores/astrologia" component={ConsultoresAstrologia} />
                <Route path="/consultores/mediunidade" component={ConsultoresMediunidade} />
                <Route path="/consultores/terapeutas" component={ConsultoresTerapeutas} />
                <Route path="/consultores/tarot" component={ConsultoresTarot} />
                <Route path="/consultores/cadastro" component={ComoSerConsultor} />
                <Route path="/comprar" component={Checkout} />
                <Route path="/comprar/consultas" component={ComprarConsultas} />
                <Route path="/comprar/pacotes" component={ComprarPacotes} />
                <Route path="/comprar/creditos" component={ComprarCreditos} />
                <Route path="/comprar/planos" component={ComprarPlanos} />
                <Route path="/comprar/assinaturas" component={ComprarAssinaturas} />
                <Route path="/cadastre-se/cliente" component={CadastroCliente} />
                <Route path="/cadastre-se/consultor" component={CadastroConsultor} />
                <Route path="/cadastre-se/newsletter" component={Newsletter} />
                <Route path="/promocoes" component={Promotions} />
                <Route path="/depoimentos" component={Testimonials} />
                <Route path="/blog" component={Blog} />
                <Route path="/blog/:slug" component={BlogPost} />
                <Route path="/loja" component={Shop} />
                <Route path="/tarot-gratis" component={TarotGratis} />
                <Route path="/servicos/tarot" component={ServicosTarot} />
                <Route path="/servicos/astrologia" component={ServicosAstrologia} />
                <Route path="/servicos/numerologia" component={ServicosNumerologia} />
                <Route path="/servicos/runas" component={ServicosRunas} />
                <Route path="/servicos/mediunidade" component={ServicosMediunidade} />
                <Route path="/servicos/oraculos" component={ServicosOraculos} />
                <Route path="/servicos/reiki" component={ServicosReiki} />
                <Route path="/servicos/cristaloterapia" component={ServicosCristaloterapia} />
                <Route path="/cadastre-se" component={Register} />
                <Route path="/register" component={RegisterWithCPF} />
                <Route path="/credits-demo" component={CreditsDemo} />
                <Route path="/data-management" component={DataManagement} />
                <Route path="/contato" component={Contact} />
                <Route path="/carrinho" component={CartPage} />
                <Route path="/chat/:consultantId" component={Chat} />
                <Route path="/chat-room" component={ChatRoom} />
                <Route path="/consultor/configuracoes" component={ConsultorConfig} />
                <Route path="/agendar" component={AgendarConsulta} />
                <Route path="/relatorios" component={ReportsAnalytics} />
                <Route path="/avaliacoes" component={ReviewSystem} />
                <Route path="/consultas-online" component={ConsultasOnline} />
                <Route path="/consultation/:roomId" component={ConsultationRoom} />
                <Route path="/sistema-consultas" component={ConsultationSystem} />
                <Route component={NotFoundPage} />
              </Switch>
            </MainLayout>
          )}
        </Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Tratamento global de erros para toda a aplicação
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      console.warn('Global: Unhandled promise rejection prevented:', event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      console.warn('Global: Error event caught:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        {showContent && <Router />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
