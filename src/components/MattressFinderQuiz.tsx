import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Star, ShoppingCart, Eye, RotateCcw, Save } from 'lucide-react';

interface QuizAnswer {
  question: string;
  answer: string;
}

interface QuizResult {
  mattress: {
    id: string;
    name: string;
    tagline: string;
    image: string;
    price: number;
    reasons: string[];
  };
  confidence: number;
}

const MattressFinderQuiz: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const questions = [
    {
      id: 1,
      question: "How do you usually sleep?",
      options: [
        { value: "back", label: "🛌 Back Sleeper", description: "I sleep on my back most of the time" },
        { value: "side", label: "🤱 Side Sleeper", description: "I prefer sleeping on my side" },
        { value: "stomach", label: "😴 Stomach Sleeper", description: "I sleep on my stomach" },
        { value: "mixed", label: "🔄 Mixed Position", description: "I change positions throughout the night" }
      ]
    },
    {
      id: 2,
      question: "Any pain or discomfort while sleeping?",
      options: [
        { value: "back_pain", label: "🦴 Back Pain", description: "I experience lower back discomfort" },
        { value: "joint_pain", label: "🦵 Joint Pain", description: "My joints ache during sleep" },
        { value: "neck_pain", label: "🦒 Neck Pain", description: "I wake up with neck stiffness" },
        { value: "no_pain", label: "✅ No Pain", description: "I sleep comfortably without pain" }
      ]
    },
    {
      id: 3,
      question: "What type of feel do you prefer?",
      options: [
        { value: "soft", label: "☁️ Soft", description: "I like to sink into my mattress" },
        { value: "medium", label: "⚖️ Medium", description: "I prefer balanced comfort and support" },
        { value: "firm", label: "🪨 Firm", description: "I need strong support for my body" }
      ]
    },
    {
      id: 4,
      question: "What material do you prefer?",
      options: [
        { value: "natural_latex", label: "🌿 Natural Latex", description: "Eco-friendly and breathable" },
        { value: "foam", label: "🧽 Foam", description: "Contouring and pressure relief" },
        { value: "hybrid", label: "🔗 Hybrid", description: "Combination of materials" },
        { value: "any", label: "🤷 Any Material", description: "I'm open to recommendations" }
      ]
    },
    {
      id: 5,
      question: "What's your budget range?",
      options: [
        { value: "budget", label: "💰 ₹5,000–₹10,000", description: "Budget-friendly option" },
        { value: "mid", label: "💎 ₹10,000–₹20,000", description: "Mid-range comfort" },
        { value: "premium", label: "👑 ₹20,000+", description: "Premium luxury experience" }
      ]
    }
  ];

  const mattressDatabase = {
    'hevea-heaven': {
      id: 'hevea-heaven',
      name: 'Hevea Heaven',
      tagline: '100% Natural Latex Comfort',
      image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 25000,
      reasons: []
    },
    'spinerelax': {
      id: 'spinerelax',
      name: 'SpineRelax',
      tagline: 'Dual-Layer Spine Support',
      image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 22000,
      reasons: []
    },
    'ortho': {
      id: 'ortho',
      name: 'Ortho',
      tagline: 'Triple-Layer Joint Comfort',
      image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 28000,
      reasons: []
    }
  };

  const calculateResult = (): QuizResult => {
    const answerMap = answers.reduce((acc, answer) => {
      acc[answer.question] = answer.answer;
      return acc;
    }, {} as Record<string, string>);

    let recommendedMattress = 'hevea-heaven';
    let confidence = 85;
    let reasons: string[] = [];

    // Quiz logic
    if (answerMap["Any pain or discomfort while sleeping?"] === "back_pain" && 
        answerMap["What type of feel do you prefer?"] === "firm") {
      recommendedMattress = 'spinerelax';
      reasons = [
        "Firm support ideal for back pain relief",
        "Dual-layer design promotes spinal alignment",
        "Recommended by physiotherapists"
      ];
      confidence = 95;
    } else if (answerMap["How do you usually sleep?"] === "side" && 
               answerMap["What type of feel do you prefer?"] === "soft" && 
               answerMap["What material do you prefer?"] === "natural_latex") {
      recommendedMattress = 'hevea-heaven';
      reasons = [
        "Natural latex perfect for side sleepers",
        "Soft comfort with responsive support",
        "Breathable and eco-friendly materials"
      ];
      confidence = 92;
    } else if (answerMap["Any pain or discomfort while sleeping?"] === "joint_pain" && 
               answerMap["What type of feel do you prefer?"] === "medium") {
      recommendedMattress = 'ortho';
      reasons = [
        "Triple-layer design for joint relief",
        "Medium firmness balances comfort and support",
        "Orthopedic excellence for better sleep"
      ];
      confidence = 90;
    } else if (answerMap["What material do you prefer?"] === "foam" && 
               answerMap["What's your budget range?"] === "budget") {
      recommendedMattress = 'ortho';
      reasons = [
        "Great value for premium comfort",
        "Foam layers provide pressure relief",
        "Long-lasting durability"
      ];
      confidence = 80;
    } else {
      // Default recommendation
      reasons = [
        "Versatile comfort for all sleep positions",
        "100% natural and hypoallergenic",
        "Perfect balance of comfort and support"
      ];
      confidence = 75;
    }

    const mattress = { ...mattressDatabase[recommendedMattress as keyof typeof mattressDatabase], reasons };
    
    return { mattress, confidence };
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentStep - 1];
    const newAnswers = [...answers.filter(a => a.question !== currentQuestion.question)];
    newAnswers.push({ question: currentQuestion.question, answer });
    setAnswers(newAnswers);

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      const result = calculateResult();
      setQuizResult(result);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setAnswers([]);
    setShowResult(false);
    setQuizResult(null);
  };

  const saveResult = () => {
    if (quizResult) {
      localStorage.setItem('mattressQuizResult', JSON.stringify({
        result: quizResult,
        timestamp: new Date().toISOString(),
        answers
      }));
      alert('Quiz result saved! You can find it in your profile.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Quiz Modal */}
      <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-deep-indigo to-forest-green p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-champagne/20 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif font-bold">🛏️ Mattress Finder Quiz</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </div>
            
            {!showResult && (
              <div className="flex items-center justify-between">
                <span className="text-white/90">Find your perfect sleep solution</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white/80">Step {currentStep} of {questions.length}</span>
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold-champagne transition-all duration-500 ease-out"
                      style={{ width: `${(currentStep / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {!showResult ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-serif font-bold text-deep-indigo mb-2">
                  {questions[currentStep - 1].question}
                </h3>
                <p className="text-slate-gray">Choose the option that best describes you</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentStep - 1].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="group p-4 rounded-2xl border-2 border-gray-200 hover:border-gold-champagne hover:bg-gold-champagne/5 transition-all duration-300 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-deep-indigo group-hover:text-gold-champagne transition-colors duration-300">
                          {option.label}
                        </div>
                        <div className="text-sm text-slate-gray mt-1">
                          {option.description}
                        </div>
                      </div>
                      <ChevronRight className="text-slate-gray group-hover:text-gold-champagne transition-colors duration-300" size={20} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full border border-gray-300 text-slate-gray hover:border-gold-champagne hover:text-gold-champagne transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                
                <div className="flex space-x-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index < currentStep ? 'bg-gold-champagne' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Results
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-green-600 fill-current" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-deep-indigo mb-2">
                  Perfect Match Found!
                </h3>
                <p className="text-slate-gray">
                  Based on your preferences, we recommend:
                </p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  {quizResult?.confidence}% Match Confidence
                </div>
              </div>

              {quizResult && (
                <div className="bg-gradient-to-br from-ivory to-white rounded-2xl p-6 border border-gold-champagne/20">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <img
                        src={quizResult.mattress.image}
                        alt={quizResult.mattress.name}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                    
                    <div className="md:w-2/3">
                      <h4 className="text-2xl font-serif font-bold text-deep-indigo mb-2">
                        {quizResult.mattress.name}
                      </h4>
                      <p className="text-gold-champagne font-medium mb-4">
                        {quizResult.mattress.tagline}
                      </p>
                      
                      <div className="mb-4">
                        <h5 className="font-semibold text-deep-indigo mb-2">Why this mattress is perfect for you:</h5>
                        <ul className="space-y-2">
                          {quizResult.mattress.reasons.map((reason, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-gold-champagne rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-gray">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-2xl font-bold text-deep-indigo mb-4">
                        ₹{quizResult.mattress.price.toLocaleString()}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => window.open(`/products/${quizResult.mattress.id}`, '_blank')}
                          className="flex-1 bg-deep-indigo hover:bg-deep-indigo/90 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                        >
                          <Eye size={18} />
                          <span>View Product</span>
                        </button>
                        <button
                          onClick={() => {
                            // Add to cart with proper structure
                            const existingCart = JSON.parse(localStorage.getItem('sleeponix_cart') || '[]');
                            const existingItemIndex = existingCart.findIndex((item: any) => 
                              item.id === quizResult.mattress.id && item.size === 'Queen'
                            );
                            
                            if (existingItemIndex >= 0) {
                              existingCart[existingItemIndex].quantity += 1;
                            } else {
                              existingCart.push({
                                id: quizResult.mattress.id,
                                name: quizResult.mattress.name,
                                price: quizResult.mattress.price,
                                quantity: 1,
                                image: quizResult.mattress.image,
                                size: 'Queen'
                              });
                            }
                            
                            localStorage.setItem('sleeponix_cart', JSON.stringify(existingCart));
                            window.dispatchEvent(new CustomEvent('cartUpdated'));
                            onClose();
                          }}
                          className="flex-1 bg-gold-champagne hover:bg-yellow-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart size={18} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetQuiz}
                  className="flex-1 border-2 border-gold-champagne text-gold-champagne hover:bg-gold-champagne hover:text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={18} />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={saveResult}
                  className="flex-1 bg-forest-green hover:bg-forest-green/90 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Save size={18} />
                  <span>Save Result</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MattressFinderQuiz;