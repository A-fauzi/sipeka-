import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Clock, Users, Megaphone, AlertTriangle, FileText, ChevronRight } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
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

const cardHoverVariants = {
  initial: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -5, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

const ProblemSolutionSection = () => {
  const [activeTab, setActiveTab] = useState('problems');

  const problems = [
    {
      icon: XCircle,
      title: "Laporan Suka Nyasar",
      description: "Warga suka bingung mau lapor ke mana, dan laporan sering nyasar ke bagian yang salah atau malah ilang entah ke mana."
    },
    {
      icon: Clock,
      title: "Nungguin Mulu Ga Ada Update",
      description: "Udah capek-capek lapor, warga cuma bisa gigit jari sambil nungguin respon yang ga jelas kapan datengnya, kalo dateng juga."
    },
    {
      icon: Megaphone,
      title: "Suara Warga Ga Didenger",
      description: "Warga udah teriak-teriak soal masalah di lingkungan, tapi sering banget kayak ngomong ke tembok. Ga ada yang nanggepin."
    },
    {
      icon: AlertTriangle,
      title: "Proses Yang Ruwet Banget",
      description: "Formulir yang buanyak, prosedur ga jelas, bikin warga males bahkan sebelum mulai lapor masalah mereka."
    }
  ];

  const solutions = [
    {
      icon: CheckCircle,
      title: "Langsung Nyampe ke Orang Yang Bener",
      description: "SiPEKA+ pinter banget ngasih laporan lu ke orang yang tepat, biar langsung ditangani sama yang punya wewenang."
    },
    {
      icon: Clock,
      title: "Update Real-time, Ga Pake Lama",
      description: "Lu bisa ngecek progres laporan kapan aja. Setiap update bakalan langsung muncul di HP lu, jadi ga perlu nanya-nanya mulu."
    },
    {
      icon: Users,
      title: "Warga Diajak Kolaborasi",
      description: "SiPEKA+ bikin platform di mana suara lu itu penting. Warga bisa vote, komen, dan support bareng-bareng buat dapetin solusi."
    },
    {
      icon: FileText,
      title: "Gampang Banget Prosesnya",
      description: "Tinggal 3 klik, laporan lu udah masuk! Bisa pake foto, lokasi GPS, dan gampang banget diakses dari HP atau komputer."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20 md:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1 bg-indigo-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-700 mb-4"
          >
            <span>✨ Warga Bekasi Punya Masalah? SiPEKA+ Punya Solusi!</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Masalah Yang Sering Bikin Pusing Warga Bekasi
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Kita semua tau kalau ngurus laporan ke pemda tuh ribet banget. Nah, SiPEKA+ ngerti banget susahnya warga Bekasi. Kita punya solusi biar hidup lu jadi lebih enak!
          </motion.p>
          
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'problems' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Masalah 🤔
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'solutions' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Solusi SiPEKA+ 🎉
            </button>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {(activeTab === 'problems' ? problems : solutions).map((item, index) => {
            const IconComponent = item.icon;
            const cardColor = activeTab === 'problems' ? 'red' : 'green';
            
            return (
              <motion.div
                key={index}
                variants={cardHoverVariants}
                initial="initial"
                whileHover="hover"
                className={`bg-${cardColor}-50 rounded-xl p-5 sm:p-6 border border-${cardColor}-100 shadow-md transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-white p-3 rounded-lg shadow-sm`}>
                    <IconComponent size={28} className={`text-${cardColor}-500`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 ${
              activeTab === 'problems' 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
            } text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200`}
          >
            {activeTab === 'problems' 
              ? 'Lihat Solusi SiPEKA+' 
              : 'Cobain SiPEKA+ Sekarang'} 
            <ChevronRight size={18} />
          </motion.button>
          
          <p className="mt-4 text-sm text-gray-500">
            Udah dipake sama 500+ RT/RW di seluruh Bekasi
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemSolutionSection;