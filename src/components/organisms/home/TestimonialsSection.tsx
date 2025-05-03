import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, CheckCircle, Users } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  district: string;
  image: string;
  rating: number;
  badge: string;
  impact: "Infrastruktur" | "Partisipasi" | "Efisiensi" | "Transparansi";
}

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [autoplay, setAutoplay] = useState<boolean>(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "SiPEKA+ bikin suara warga kayak saya benar-benar didengar. Keluhan soal jalan rusak yang udah bertahun-tahun akhirnya ditanggapi dalam seminggu. Warga jadi semangat berpartisipasi!",
      author: "Jejen",
      district: "Bekasi Barat",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      badge: "Masalah Terselesaikan",
      impact: "Infrastruktur"
    },
    {
      id: 2,
      content: "Sebagai pemuda karang taruna, SiPEKA+ jadi jembatan antara warga dengan pemerintah daerah. Transparan, cepat, dan bisa dipantau langsung perkembangannya.",
      author: "Budi Santoso",
      district: "Tangerang Selatan",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      badge: "Penggerak Komunitas",
      impact: "Partisipasi"
    },
    {
      id: 3,
      content: "Dulu kalau ada masalah di lingkungan, harus bolak-balik ke kelurahan. Sekarang tinggal buka SiPEKA+, lapor, dan bisa pantau prosesnya. Simple banget!",
      author: "Dewi Lestari",
      district: "Depok Baru",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      badge: "Pengguna Aktif",
      impact: "Efisiensi"
    },
    {
      id: 4,
      content: "SiPEKA+ berhasil mendigitalisasi pelayanan publik tanpa menghilangkan sentuhan personal. Tiap laporan ditanggapi dengan serius dan warga dilibatkan dalam solusi.",
      author: "Eko Prasetyo",
      district: "Bogor Utara",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      badge: "Warga Pelopor",
      impact: "Transparansi"
    }
  ];
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleCardInteraction = (): void => {
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };
  
  const nextTestimonial = (): void => {
    handleCardInteraction();
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = (): void => {
    handleCardInteraction();
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = (): number[] => {
    const visibleIndices: number[] = [];
    const count = testimonials.length;
    
    for (let i = 0; i < 3; i++) {
      const idx = (activeIndex + i) % count;
      visibleIndices.push(idx);
    }
    
    return visibleIndices;
  };

  const visibleIndices = getVisibleTestimonials();

  const getPositionClass = (index: number): string => {
    const position = visibleIndices.indexOf(index);
    if (position === 0) return "left-card";
    if (position === 1) return "center-card";
    if (position === 2) return "right-card";
    return "hidden-card";
  };

  const getImpactIcon = (impact: Testimonial['impact']): React.ReactNode => {
    switch (impact) {
      case "Infrastruktur": return <CheckCircle size={16} className="text-green-500" />;
      case "Partisipasi": return <Users size={16} className="text-blue-500" />;
      case "Efisiensi": return <ChevronRight size={16} className="text-yellow-500" />;
      case "Transparansi": return <MessageSquare size={16} className="text-purple-500" />;
      default: return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-300 rounded-full opacity-10 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-300 rounded-full opacity-10 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-indigo-300 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span>Kata Warga</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 font-light">
            Warga ngomong, sistem dengerin
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative mb-20 h-96 sm:h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const positionClass = getPositionClass(index);
              const isActive = positionClass === "center-card";
              
              return (
                <div
                  key={testimonial.id}
                  className={`absolute transform transition-all duration-500 ease-out 
                    ${positionClass === "center-card" ? "z-30 opacity-100 translate-y-0 scale-100" : ""}
                    ${positionClass === "left-card" ? "z-20 opacity-70 -translate-x-40 sm:-translate-x-56 -translate-y-4 scale-90" : ""}
                    ${positionClass === "right-card" ? "z-20 opacity-70 translate-x-40 sm:translate-x-56 -translate-y-4 scale-90" : ""}
                    ${positionClass === "hidden-card" ? "opacity-0 translate-y-16 scale-85" : ""}`}
                  onClick={() => {
                    if (!isActive) {
                      handleCardInteraction();
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div className={`w-72 sm:w-96 rounded-2xl p-6 transition-all
                    backdrop-blur-xl backdrop-saturate-150 border
                    ${isActive ? 
                      "bg-white/70 border-white/80 shadow-lg shadow-indigo-100/30" : 
                      "bg-white/50 border-white/60 cursor-pointer"}`}>
                    
                    {/* Verification badge */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs py-1 px-3 rounded-full font-medium shadow-md transform -rotate-3">
                      Disampaikan lewat SiPEKA+
                    </div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-6 right-8">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                           className="text-indigo-100">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <div className="mt-2 mb-4">
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      
                      <p className={`text-gray-700 relative z-10 
                        ${isActive ? "text-base" : "text-sm"}
                        font-light leading-relaxed`}>
                        &quot;{testimonial.content}&quot;
                      </p>
                    </div>
                    
                    {/* Author info */}
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-blue-100 p-0.5">
                          <div className="w-full h-full rounded-full overflow-hidden">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.author} 
                              className="w-full h-full object-cover"
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://ui-avatars.com/api/?name=" + testimonial.author.split(" ").join("+") + "&background=6366f1&color=fff";
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{testimonial.district}</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs">
                            {getImpactIcon(testimonial.impact)}
                            <span>{testimonial.badge}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center text-indigo-600 hover:bg-white transition-colors shadow-md"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    handleCardInteraction();
                    setActiveIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-indigo-200'
                  }`}
                  aria-label={`Pindah ke testimoni ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center text-indigo-600 hover:bg-white transition-colors shadow-md"
              aria-label="Testimoni selanjutnya"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Stats and CTA Section */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto">
            {/* Stats */}
            <div className="flex-1 grid grid-cols-3 gap-6 w-full">
              <div className="backdrop-blur-lg backdrop-saturate-150 bg-white/40 rounded-xl p-4 border border-white/60 text-center shadow-sm">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-600 font-light">Suara Warga</div>
              </div>
              
              <div className="backdrop-blur-lg backdrop-saturate-150 bg-white/40 rounded-xl p-4 border border-white/60 text-center shadow-sm">
                <div className="text-3xl font-bold">45%</div>
                <div className="text-sm text-gray-600 font-light">Lebih Cepat</div>
              </div>
              
              <div className="backdrop-blur-lg backdrop-saturate-150 bg-white/40 rounded-xl p-4 border border-white/60 text-center shadow-sm">
                <div className="text-3xl font-bold">97%</div>
                <div className="text-sm text-gray-600 font-light">Warga Puas</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex-1 text-center md:text-right">
              <p className="mb-4 text-gray-600 max-w-xs mx-auto md:mx-0 md:ml-auto">
                Punya pengalaman dengan layanan SiPEKA+? Bagikan cerita Anda dan bantu meningkatkan pelayanan publik
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                  Ikut Cerita Juga
                </button>
                <button className="px-6 py-3 bg-white/70 backdrop-blur-md border border-indigo-100 text-indigo-600 font-medium rounded-xl hover:bg-white transition-all">
                  Lihat Semua Cerita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;