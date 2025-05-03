'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };
  
  const features = [
    "Respons keluhan warga jadi 45% lebih cepat",
    "Dashboard kece, semua data langsung keliatan jelas",
    "Aplikasi gampang banget, emak-emak sampe anak muda bisa pake",
    "Tim SiPEKA+ siaga 24/7 buat bantu warga Bekasi"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-indigo-500 to-blue-600 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 opacity-10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants}>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-700 bg-opacity-50 rounded-full mb-6">
              🚀 Langsung Tancep Gas!
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Nyok! Bikin Kota Bekasi Kita<br />
              <span className="text-indigo-200">Jadi Paling Kece</span> <br />
              Pake SiPEKA+
            </h2>
            
            <p className="text-lg mb-8 text-indigo-100">
              Anak Bekasi masa gatau SiPEKA+? Nih aplikasi buat lo yang pengen lingkungan jadi lebih enak. Keluhan tinggal lapor, langsung ditanggepin. Gratis pula! Yuk, bareng-bareng bikin Bekasi lebih kece!
            </p>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <CheckCircle className="h-6 w-6 text-indigo-200 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Form */}
            <div className="mt-10">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-800 bg-opacity-50 p-4 rounded-lg flex items-center"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>Sip! Tim kite bakal ngehubungin lo secepatnya!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukin email kantor lo di sini..."
                    required
                    className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-800 hover:bg-indigo-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors whitespace-nowrap"
                  >
                    Coba Demo Sekarang <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </form>
              )}
              <p className="text-xs mt-3 text-indigo-200">
                Santai, kite bukan tukang spam. Privasi nomor satu buat kite.
              </p>
            </div>
          </motion.div>
          
          {/* Right Column - Image/Illustration */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block relative"
          >
            <div className="relative bg-indigo-800 bg-opacity-40 rounded-2xl p-6 overflow-hidden shadow-xl border border-indigo-700">
              {/* Device mockup */}
              <div className="relative z-10">
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl p-2">
                  <div className="w-full max-w-md relative rounded-lg overflow-hidden">
                    {/* App Screenshot Placeholder */}
                    <div className="aspect-[9/16] bg-gradient-to-br from-indigo-900 to-blue-900 rounded-md overflow-hidden relative">
                      {/* App Interface Elements */}
                      <div className="absolute top-0 left-0 right-0 h-12 bg-indigo-800 flex items-center px-4">
                        <div className="w-12 h-4 bg-white bg-opacity-20 rounded-full"></div>
                      </div>
                      
                      <div className="absolute top-16 left-4 right-4 bg-white bg-opacity-10 rounded-lg h-28 p-3">
                        <div className="w-full h-4 bg-white bg-opacity-20 rounded mb-2"></div>
                        <div className="w-2/3 h-4 bg-white bg-opacity-20 rounded mb-4"></div>
                        <div className="flex justify-between">
                          <div className="w-24 h-8 bg-indigo-500 rounded"></div>
                          <div className="w-24 h-8 bg-indigo-700 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="absolute top-48 left-4 right-4 flex space-x-2">
                        <div className="flex-1 h-24 bg-white bg-opacity-10 rounded-lg"></div>
                        <div className="flex-1 h-24 bg-white bg-opacity-10 rounded-lg"></div>
                      </div>
                      
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <div className="w-32 h-1 bg-white bg-opacity-30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats/Features Cards */}
                <div className="absolute -right-16 top-12 bg-white rounded-lg shadow-lg p-3 w-40 transform rotate-6">
                  <div className="text-xs text-gray-600">Kepuasan Warge</div>
                  <div className="text-xl font-bold text-indigo-600">97% 🎉</div>
                </div>
                
                <div className="absolute -left-10 top-64 bg-white rounded-lg shadow-lg p-3 w-40 transform -rotate-3">
                  <div className="text-xs text-gray-600">Laporan Kelar</div>
                  <div className="text-xl font-bold text-green-600">312 ✓</div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Brands/Trust Signals */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.p 
            variants={itemVariants}
            className="text-center text-sm text-indigo-200 mb-6"
          >
            Dipercaya ribuan warga Bekasi buat nyampein keluhan secara cepet dan gampang.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;