import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Send, 
  Heart, 
  ThumbsUp, 
  Award, 
  MessageSquare,
  CheckCircle,
  Camera,
  Mic
} from "lucide-react";

interface Review {
  id: string;
  clientName: string;
  clientAvatar: string;
  consultantName: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
  serviceType: string;
  helpful: number;
  verified: boolean;
  response?: {
    content: string;
    date: Date;
  };
}

export default function ReviewSystem() {
  const [activeTab, setActiveTab] = useState("leave-review");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultantInfo = {
    name: "Consultor Especialista",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    specialty: "Tarot e Astrologia",
    avgRating: 4.9,
    totalReviews: 1247
  };

  const recentReviews: Review[] = [
    {
      id: "1",
      clientName: "Ana Silva",
      clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      consultantName: "Consultor Especialista",
      rating: 5,
      title: "Consulta incrível, muito precisa!",
      content: "A Cliente é realmente especial. Suas leituras são precisas e ela consegue transmitir as mensagens de forma muito clara e acolhedora. Recomendo demais!",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      serviceType: "Tarot",
      helpful: 12,
      verified: true,
      response: {
        content: "Muito obrigada pelo carinho, Ana! Foi um prazer ajudar você. Que a luz continue iluminando seu caminho! 🙏✨",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    },
    {
      id: "2",
      clientName: "Carlos M.",
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      consultantName: "Consultor Especialista",
      rating: 5,
      title: "Orientação fantástica para minha vida profissional",
      content: "Busquei orientação sobre mudanças na carreira e recebi insights valiosos. A consulta foi além das minhas expectativas!",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      serviceType: "Astrologia",
      helpful: 8,
      verified: true
    },
    {
      id: "3",
      clientName: "Fernanda L.",
      clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=50&h=50&fit=crop&crop=face",
      consultantName: "Consultor Especialista",
      rating: 4,
      title: "Muito boa, me ajudou bastante",
      content: "Consulta esclarecedora sobre relacionamentos. A Cliente tem um dom especial e consegue ver além do óbvio.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      serviceType: "Tarot",
      helpful: 15,
      verified: true
    }
  ];

  const serviceTypes = [
    "Tarot", "Astrologia", "Numerologia", "Mediunidade", "Terapia Holística"
  ];

  const ratingLabels = [
    "", "Muito Ruim", "Ruim", "Regular", "Bom", "Excelente"
  ];

  const handleSubmitReview = async () => {
    if (!rating || !reviewTitle || !reviewContent || !selectedService) {
      return;
    }

    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setActiveTab("success");
    
    // Reset form
    setRating(0);
    setReviewTitle("");
    setReviewContent("");
    setSelectedService("");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const LeaveReviewTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Consultant Info */}
        <div className="flex items-center space-x-4 mb-8 p-4 bg-purple-50 rounded-xl">
          <img
            src={consultantInfo.avatar}
            alt={consultantInfo.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{consultantInfo.name}</h3>
            <p className="text-purple-600 font-medium">{consultantInfo.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {consultantInfo.avgRating} ({consultantInfo.totalReviews} avaliações)
              </span>
            </div>
          </div>
        </div>

        {/* Rating Selection */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Como foi sua experiência?
          </h4>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {(rating > 0 || hoverRating > 0) && (
            <p className="text-center text-lg font-medium text-purple-600">
              {ratingLabels[hoverRating || rating]}
            </p>
          )}
        </div>

        {/* Service Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Serviço
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {serviceTypes.map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedService === service
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Review Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título da Avaliação
          </label>
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder="Resuma sua experiência em poucas palavras"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={100}
          />
          <p className="text-right text-xs text-gray-500 mt-1">
            {reviewTitle.length}/100
          </p>
        </div>

        {/* Review Content */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sua Avaliação Detalhada
          </label>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Conte sobre sua experiência, o que mais gostou, como se sentiu durante a consulta..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
            maxLength={500}
          />
          <p className="text-right text-xs text-gray-500 mt-1">
            {reviewContent.length}/500
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmitReview}
          disabled={!rating || !reviewTitle || !reviewContent || !selectedService || isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Enviar Avaliação</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  const ViewReviewsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Avaliações de {consultantInfo.name}
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              {consultantInfo.avgRating}
            </span>
          </div>
          <span className="text-gray-600">
            {consultantInfo.totalReviews} avaliações
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {recentReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.clientAvatar}
                alt={review.clientName}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-800">{review.clientName}</h4>
                    {review.verified && (
                      <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verificado
                      </div>
                    )}
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                      {review.serviceType}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.date)}
                  </span>
                </div>

                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
                <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>

                {/* Consultant Response */}
                {review.response && (
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <div className="flex items-center mb-2">
                      <img
                        src={consultantInfo.avatar}
                        alt={consultantInfo.name}
                        className="w-6 h-6 rounded-full object-cover mr-2"
                      />
                      <span className="font-medium text-purple-700">
                        Resposta de {consultantInfo.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-auto">
                        {formatDate(review.response.date)}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.response.content}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Útil ({review.helpful})</span>
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-purple-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const SuccessTab = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Avaliação Enviada!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Obrigado pelo seu feedback! Sua avaliação é muito importante para nós e ajuda outros clientes.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => setActiveTab("view-reviews")}
            className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Ver Todas as Avaliações
          </button>
          
          <button
            onClick={() => setActiveTab("leave-review")}
            className="w-full bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Avaliar Outra Consulta
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sistema de Avaliações</h1>
          <p className="text-xl text-gray-600">Compartilhe sua experiência e ajude outros clientes</p>
        </motion.div>

        {/* Tabs */}
        {activeTab !== "success" && (
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl shadow-lg p-2 flex space-x-2">
              <button
                onClick={() => setActiveTab("leave-review")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "leave-review"
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Deixar Avaliação
              </button>
              <button
                onClick={() => setActiveTab("view-reviews")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "view-reviews"
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Ver Avaliações
              </button>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "leave-review" && <LeaveReviewTab />}
          {activeTab === "view-reviews" && <ViewReviewsTab />}
          {activeTab === "success" && <SuccessTab />}
        </AnimatePresence>
      </div>
    </div>
  );
}