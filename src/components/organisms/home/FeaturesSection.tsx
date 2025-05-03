import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Bell, 
  Map, 
  LineChart, 
  Users, 
  Shield, 
  Zap, 
  BarChart3,
  Camera,
  Award,
  CheckCircle,
  LucideIcon
} from 'lucide-react';

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 70,
      damping: 15
    }
  }
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

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, isHighlighted = false }: FeatureCardProps) => {
  return (
    <motion.div 
      className={`p-6 rounded-xl border ${isHighlighted ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500/30 shadow-lg shadow-blue-500/20' : 'bg-white border-gray-100 hover:shadow-lg hover:shadow-blue-500/10'}`}
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${isHighlighted ? 'bg-white/20' : 'bg-blue-50'}`}>
          <Icon size={24} className={isHighlighted ? 'text-white' : 'text-blue-600'} />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">
            {title}
          </h3>
          <p className="text-base opacity-90">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-16 md:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/10 to-purple-400/20 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-400/10 to-blue-400/20 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
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
            className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600 mb-3 md:mb-4 border border-indigo-100"
            variants={itemVariants}
          >
            <span className="flex items-center gap-1">
              ⚡ <span>Fitur Mantep Gokil</span>
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3 md:mb-4"
            variants={itemVariants}
          >
            Fitur-Fitur Kece Dari SiPEKA+
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Bukan cuma aplikasi lapor biasa, SiPEKA+ punya segudang fitur canggih yang bikin urusan sama pemda jadi gampang banget dan seru!
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeatureCard 
            icon={Camera}
            title="Lapor Pake Jepretan"
            description="Tinggal jepret foto masalahnya, kasih lokasi GPS, langsung kirim. Gak perlu dateng ke kantor pemda!"
          />
          
          <FeatureCard 
            icon={Bell}
            title="Notif Gercep"
            description="Dapet update langsung di HP lu begitu ada progress. Gak perlu nanya-nanya mulu sampe dikacangin lagi."
            isHighlighted={true}
          />
          
          <FeatureCard 
            icon={Map}
            title="Peta Masalah Bekasi"
            description="Liat langsung di map mana aja di Bekasi yang lagi ada masalah dan mana yang udah diberesin sama pemda."
          />
          
          <FeatureCard 
            icon={MessageSquare}
            title="Ngobrol Langsung"
            description="Chat sama petugas yang nanganin laporan lu. Gak perlu bolak-balik telpon yang suka sibuk mulu."
          />
          
          <FeatureCard 
            icon={Users}
            title="Komunitas Warga Aktif"
            description="Gabung sama warga Bekasi lainnya, diskusi bareng dan dukung laporan yang menurut lu penting banget."
            isHighlighted={true}
          />
          
          <FeatureCard 
            icon={LineChart}
            title="Liat Progress Bekasi"
            description="Cek statistik dan grafik yang nunjukin kemajuan Bekasi. Berapa persen masalah yang udah beres, dan masih on progress."
          />
          
          <FeatureCard 
            icon={Shield}
            title="Dijamin Aman"
            description="Data pribadi lu aman banget. Identitas bisa disamarkan kalo lu gak mau namanya keluar."
          />
          
          <FeatureCard 
            icon={Zap}
            title="Response Super Kilat"
            description="Sistem pintar yang mastiin laporan lu diproses minimal 2x lebih cepet dari cara lama."
            isHighlighted={true}
          />
          
          <FeatureCard 
            icon={Award}
            title="Poin & Reward"
            description="Dapetin poin buat setiap laporan yang berguna, bisa dituker sama hadiah atau diskon dari merchant lokal Bekasi."
          />
        </motion.div>

        {/* Featured Dashboard Highlight */}
        <motion.div 
          className="mt-16 md:mt-24 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left section - Dashboard Mockup */}
            <motion.div 
              className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 p-8 md:p-12"
              variants={itemVariants}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  {/* Main Dashboard */}
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="h-10 bg-indigo-600 flex items-center px-3">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="p-3">
                      {/* Top section */}
                      <div className="flex justify-between mb-3">
                        <div className="w-1/2 bg-gray-100 h-6 rounded"></div>
                        <div className="w-1/4 bg-blue-100 h-6 rounded"></div>
                      </div>
                      
                      {/* Chart area */}
                      <div className="bg-gray-100 h-28 rounded mb-3 flex items-end p-2">
                        <div className="w-1/6 bg-blue-500 h-1/3 rounded-t mx-1"></div>
                        <div className="w-1/6 bg-blue-500 h-1/2 rounded-t mx-1"></div>
                        <div className="w-1/6 bg-blue-500 h-3/4 rounded-t mx-1"></div>
                        <div className="w-1/6 bg-blue-500 h-2/3 rounded-t mx-1"></div>
                        <div className="w-1/6 bg-blue-500 h-full rounded-t mx-1"></div>
                        <div className="w-1/6 bg-blue-500 h-2/5 rounded-t mx-1"></div>
                      </div>
                      
                      {/* Data cards */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-gray-100 h-12 rounded p-2">
                          <div className="w-1/2 bg-blue-200 h-2 rounded mb-1"></div>
                          <div className="w-2/3 bg-blue-100 h-2 rounded"></div>
                        </div>
                        <div className="bg-green-50 h-12 rounded p-2">
                          <div className="w-1/2 bg-green-200 h-2 rounded mb-1"></div>
                          <div className="w-2/3 bg-green-100 h-2 rounded"></div>
                        </div>
                      </div>
                      
                      {/* List items */}
                      <div className="space-y-2">
                        <div className="h-6 bg-gray-100 rounded flex items-center px-2">
                          <div className="w-1/4 bg-gray-300 h-2 rounded mr-auto"></div>
                          <div className="w-1/6 bg-blue-200 h-3 rounded"></div>
                        </div>
                        <div className="h-6 bg-gray-100 rounded flex items-center px-2">
                          <div className="w-2/5 bg-gray-300 h-2 rounded mr-auto"></div>
                          <div className="w-1/6 bg-green-200 h-3 rounded"></div>
                        </div>
                        <div className="h-6 bg-gray-100 rounded flex items-center px-2">
                          <div className="w-1/3 bg-gray-300 h-2 rounded mr-auto"></div>
                          <div className="w-1/6 bg-yellow-200 h-3 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating notification */}
                  <motion.div
                    variants={floatAnimation}
                    animate="animate"
                    initial="initial" 
                    className="absolute -right-4 top-1/4 bg-white rounded-lg shadow-lg p-2 w-32 border border-gray-100"
                  >
                    <div className="flex items-center mb-1">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <div className="w-2/3 bg-gray-100 h-2 rounded"></div>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded mb-1"></div>
                    <div className="w-2/3 bg-gray-100 h-2 rounded"></div>
                  </motion.div>
                  
                  {/* Floating chart */}
                  <motion.div
                    variants={floatAnimation}
                    animate="animate"
                    initial="initial"
                    custom={{ delay: 0.5 }}
                    className="absolute -left-4 bottom-8 bg-white rounded-lg shadow-lg p-2 w-24 border border-gray-100"
                  >
                    <div className="w-full h-2 bg-gray-100 rounded mb-2"></div>
                    <div className="h-10 flex items-end">
                      <div className="w-1/4 bg-green-500 h-3/4 rounded-t mx-0.5"></div>
                      <div className="w-1/4 bg-green-500 h-1/2 rounded-t mx-0.5"></div>
                      <div className="w-1/4 bg-green-500 h-full rounded-t mx-0.5"></div>
                      <div className="w-1/4 bg-green-500 h-2/3 rounded-t mx-0.5"></div>
                    </div>
                  </motion.div>
                  
                  {/* Verified Badge */}
                  <motion.div
                    variants={floatAnimation}
                    animate="animate"
                    initial="initial"
                    custom={{ delay: 0.25 }}
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-2 border border-gray-100 z-30"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs font-medium">Udah Dicek</div>
                        <div className="text-xs text-green-600">2 jam lebih cepet</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Right section - Content */}
            <motion.div 
              className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Dashboard Keren Buat Lu Pantau Semua
              </h3>
              
              <p className="text-gray-600 mb-6">
                Dashboard canggih buat warga dan petugas. Lu bisa pantau semua laporan, liat statistik, dan analisis tren masalah di Bekasi. Pejabat pemda juga bisa langsung liat mana aja yang perlu prioritas.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Tampilan yang gampang dipahami semua orang</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Data real-time yang selalu update otomatis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Filter cerdas buat nyari informasi dengan cepet</span>
                </li>
              </ul>
              
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center gap-2 self-start">
                Jajal Fitur Dashboard <BarChart3 size={16} />
              </button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Communities counter - matching hero section */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 justify-center mt-8"
        >
          <div className="flex -space-x-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5fInwYAcflC2PIBUhIAUbO25-AkU1dnJzbbUWwUbH8IQH6SBPaNYArI&s=10" alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5fInwYAcflC2PIBUhIAUbO25-AkU1dnJzbbUWwUbH8IQH6SBPaNYArI&s=10" alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5fInwYAcflC2PIBUhIAUbO25-AkU1dnJzbbUWwUbH8IQH6SBPaNYArI&s=10" alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white" />
          </div>
          <span className="text-xs text-gray-600">
            Udah dipake di <span className="font-medium text-gray-900">500+</span> wilayah
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;