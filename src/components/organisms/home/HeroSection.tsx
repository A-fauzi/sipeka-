import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, Zap, MessageSquare } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

interface CustomAnimationProps {
  rotate?: number;
  delay?: number;
  // Add any other custom props you need
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: CustomAnimationProps) => ({
    opacity: 1,
    y: 0,
    rotate: custom.rotate,
    transition: { 
      type: "spring",
      stiffness: 70,
      damping: 15,
      delay: custom.delay
    }
  })
};

const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 pt-32 md:pt-32 pb-16 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/10 to-purple-400/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-400/10 to-blue-400/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {/* Text content - centered on mobile */}
          <div className="w-full max-w-xl text-center mb-8 md:mb-12">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600 mb-3 md:mb-4 border border-indigo-100"
            >
              <span className="flex items-center gap-1">
                🌐 <span>Platform Warga Gokil Abis</span>
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3 md:mb-4 px-2"
            >
              SiPEKA+ bikin suara lu jadi kenyataan di Bekasi
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 mb-5 md:mb-6 px-2"
            >
              Mesin joss gandoss buat Bekasi kekinian yang makin maju terus
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3"
            >
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center gap-2">
                Cobain SiPEKA+ <ArrowRight size={16} />
              </button>
              <button className="bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-xl font-medium hover:bg-indigo-50 transition-all duration-200">
                Mau Tau Gimana?
              </button>
            </motion.div>
          </div>
          
          {/* Cards section - better positioning for mobile */}
          <div className="relative w-full max-w-sm mx-auto h-64 sm:h-80 mt-4 mb-6">
            {/* Community Impact Card */}
            <motion.div
              custom={{ rotate: 3, delay: 0.2 }}
              variants={cardVariants}
              animate="visible"
              initial="hidden"
              className="absolute left-0 bottom-0 w-60 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <div className="text-sm font-medium">Dampak Buat Warga</div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-600">Masalah Kelar</div>
                  <div className="text-lg font-semibold">2,543</div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mb-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full w-4/5"></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>120 nongkrong</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={12} />
                    <span>93% beres</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Road Repair Card */}
            <motion.div
              custom={{ rotate: -3, delay: 0.1 }}
              variants={cardVariants}
              animate="visible"
              initial="hidden"
              className="absolute top-0 right-0 w-60 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
            >
              <div className="px-3 py-2 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium">Lapor Jalan Bolong</span>
                </div>
                <span className="text-xs text-gray-500">1m lalu</span>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageSquare size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Tambal Jalan</div>
                    <div className="text-xs text-gray-500">ID: #SIP-2025</div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Lagi Jalan</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-100 rounded w-full"></div>
                  <div className="h-1.5 bg-gray-100 rounded w-4/5"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Verified Response Badge */}
            <motion.div
              variants={itemVariants}
              animate="visible"
              initial="hidden"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-2 border border-gray-100 z-30"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle size={14} className="text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-medium">Udah Dicek Nih</div>
                  <div className="text-xs text-green-600">2 jam lebih cepet</div>
                </div>
              </div>
            </motion.div>
            
            {/* Civic Leader Badge */}
            <motion.div
              variants={floatAnimation}
              animate="animate"
              initial="initial"
              className="absolute bottom-4 right-2 flex items-center z-40"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-md">
                  <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZUB7tU69KkPxcDfdP0ErXuZb0sSA5te9vUqqZabauyCH3XJ4YzC9MVlU&s=10" 
                      alt="Warga Aktif" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border border-white flex items-center justify-center">
                  <CheckCircle size={8} className="text-white" />
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg py-0.5 px-2 ml-1 text-xs">
                🏛️ Pak Walkot
              </div>
            </motion.div>
          </div>
          
          {/* Communities counter */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 justify-center"
          >
            <div className="flex -space-x-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5fInwYAcflC2PIBUhIAUbO25-AkU1dnJzbbUWwUbH8IQH6SBPaNYArI&s=10" alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5fInwYAcflC2PIBUhIAUbO25-AkU1dnJzbbUWwUbH8IQH6SBPaNYArI&s=10" alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5fInwYAcflC2PIBUhIAUbO25-AkU1dnJzbbUWwUbH8IQH6SBPaNYArI&s=10" alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white" />
            </div>
            <span className="text-xs text-gray-600">
              Dipercaya sama <span className="font-medium text-gray-900">500+</span> wilayah
            </span>
          </motion.div>
        </motion.div>
        
        {/* Reimagined Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 md:mt-24 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
          >
            Partisipasi warga jadi kekinian<br />buat Bekasi makin goks
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2"
          >
            SiPEKA+ nyambungin warga sama pemda, biar semuanya transparan, cepet ditanggapin, dan Bekasi jadi makin ciamik.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;