import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Send, 
  CheckCircle2, 
  UserCheck, 
  Bell, 
  ThumbsUp,
  ArrowRight,
  LucideIcon // Menambahkan import untuk LucideIcon
} from 'lucide-react';

// Animation variants
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
  hidden: { opacity: 0, y: 30 },
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

// LineConnector component for connecting steps
const LineConnector = ({ orientation = "vertical" }) => {
  return orientation === "vertical" ? (
    <div className="hidden md:flex flex-col items-center">
      <div className="w-0.5 h-16 bg-indigo-200 rounded-full"></div>
    </div>
  ) : (
    <div className="flex md:hidden justify-center my-2">
      <div className="h-0.5 w-16 bg-indigo-200 rounded-full"></div>
    </div>
  );
};

interface StepItemProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
}

// Step item component
const StepItem = ({ number, icon: Icon, title, description, isLast = false }: StepItemProps) => {
  return (
    <>
      <motion.div 
        className="flex flex-col items-center text-center md:text-left md:flex-row gap-5"
        variants={itemVariants}
      >
        {/* Step number and icon */}
        <div className="relative">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600">
            <Icon size={32} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            {number}
          </div>
        </div>
        
        {/* Step content */}
        <div className="max-w-xs md:max-w-none">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </motion.div>
      
      {!isLast && (
        <>
          <LineConnector orientation="vertical" />
          <LineConnector orientation="horizontal" />
        </>
      )}
    </>
  );
};

// Fixed Mobile app preview component
const MobileAppPreview = () => {
  return (
    <motion.div 
      className="relative mx-auto w-full flex justify-center"
      variants={itemVariants}
    >
      <div className="relative">
        {/* Phone frame */}
        <div className="w-64 h-auto md:w-72 bg-gray-900 rounded-[3rem] p-2 overflow-hidden shadow-xl">
          {/* Screen */}
          <div className="bg-indigo-50 rounded-[2.5rem] h-full overflow-hidden">
            {/* Status bar */}
            <div className="bg-indigo-600 text-white px-4 py-2 flex justify-between items-center">
              <span className="text-xs">9:41 AM</span>
              <div className="w-16 h-6 rounded-full bg-black/10 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-1 bg-white rounded-full"></div>
              </div>
              <span className="text-xs">85%</span>
            </div>
            
            {/* App header */}
            <div className="p-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div className="font-bold text-indigo-600">SiPEKA+</div>
                <div className="w-8 h-8 rounded-full bg-indigo-100"></div>
              </div>
            </div>
            
            {/* App content */}
            <div className="p-4">
              {/* Report form preview */}
              <div className="mb-4">
                <div className="w-full h-5 bg-gray-200 rounded mb-3"></div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-1/2 h-10 bg-gray-200 rounded"></div>
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Camera size={20} className="text-indigo-600" />
                  </div>
                </div>
                <div className="w-full h-24 bg-gray-200 rounded mb-3"></div>
                <div className="w-2/3 h-5 bg-gray-200 rounded mb-6"></div>
                <div className="rounded-lg p-3 bg-indigo-100 flex items-center justify-between">
                  <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
                  <div className="w-24 h-5 bg-indigo-200 rounded"></div>
                  <Send size={18} className="text-indigo-600" />
                </div>
              </div>
              
              {/* Report status */}
              <div className="p-3 bg-white rounded-lg shadow-sm mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded mb-1"></div>
                <div className="w-2/3 h-3 bg-gray-100 rounded"></div>
              </div>
              
              {/* Notification */}
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Bell size={16} className="text-indigo-600" />
                  </div>
                  <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded mb-1"></div>
                <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Positioning the floating notifications within the phone's container width */}
        {/* Right notification - Laporan Diterima */}
        <motion.div 
          className="absolute -right-16 md:-right-10 top-1/4 bg-white rounded-lg shadow-lg p-3 w-32 md:w-40"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <UserCheck size={14} className="text-white" />
            </div>
            <div className="text-xs font-medium">Laporan Diterima</div>
          </div>
          <div className="text-xs text-gray-600">Petugas akan segera menindaklanjuti laporan lu!</div>
        </motion.div>
        
        {/* Left notification - Reward points */}
        <motion.div 
          className="absolute -left-16 md:-left-10 bottom-1/4 bg-white rounded-lg shadow-lg p-3 w-32"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8, type: "spring" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <ThumbsUp size={14} className="text-indigo-600" />
            <div className="text-xs font-medium text-gray-900">Mantep Boss!</div>
          </div>
          <div className="text-xs text-gray-600">Lu dapet 5 poin reward!</div>
        </motion.div>

        {/* Bottom camera button */}
      </div>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="inline-block mb-4"
            variants={itemVariants}
          >
            <span className="inline-flex items-center gap-1 bg-indigo-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-700 mb-4">
              Cara Pakenya Gampang banget!
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Gini Loh Cara Kerja SiPEKA+
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Cuma butuh beberapa langkah doang buat laporin masalah dan ikutin progressnya. Gak ribet, gak pake lama!
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column - Steps */}
          <motion.div 
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StepItem 
              number={1}
              icon={Camera}
              title="Foto Masalahnya"
              description="Jepret foto masalah yang lu temuin, kasih lokasi GPS-nya biar petugas gampang nemuin tempatnya."
            />
            
            <StepItem 
              number={2}
              icon={Send}
              title="Kirim Laporannya"
              description="Isi detail dikit tentang masalahnya, terus langsung kirim deh. Lu juga bisa nambahin kategori biar lebih jelas."
            />
            
            <StepItem 
              number={3}
              icon={Bell}
              title="Tunggu Notifnya"
              description="SiPEKA+ bakal ngasih tau kapan laporan lu udah diterima dan diproses sama petugas terkait."
            />
            
            <StepItem 
              number={4}
              icon={CheckCircle2}
              title="Liat Progressnya"
              description="Cek status laporan buat tau udah sampe mana penanganannya. Udah beres? Kasih rating ke petugasnya!"
              isLast={true}
            />
            
            <motion.div 
              className="mt-8 self-center md:self-start"
              variants={itemVariants}
            >
              <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition duration-200">
                Download Aplikasinya Sekarang <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - App Preview */}
          <motion.div 
            className="order-first md:order-last mb-8 md:mb-0 w-full flex justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <MobileAppPreview />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;