import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, Calendar, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Photo } from '../types';

// Dummy data - ganti dengan foto kalian yang sebenarnya
const dummyPhotos: Photo[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop',
    title: 'Pertemuan Pertama',
    date: '14 Februari 2023',
    description: 'Hari dimana semuanya dimulai... Saat pertama kali mata kita bertemu 💕'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=300&fit=crop',
    title: 'Kencan Pertama',
    date: '20 Februari 2023',
    description: 'Makan malam pertama kita berdua. Kamu cantik sekali malam itu ✨'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    title: 'Jalan-jalan ke Pantai',
    date: '15 Maret 2023',
    description: 'Sunrise di pantai bersama, moment paling romantis yang pernah ada 🌅'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    title: 'Liburan Bersama',
    date: '10 Mei 2023',
    description: 'Trip pertama kita ke luar kota. Banyak tawa dan kenangan indah 🏖️'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop',
    title: 'Anniversary',
    date: '14 Agustus 2023',
    description: 'Merayakan 6 bulan bersama dengan dinner romantis 🥂'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
    title: 'Hari Spesial',
    date: '25 Desember 2023',
    description: 'Natal pertama kita bersama, dengan banyak hadiah dan cinta ❄️'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400&h=300&fit=crop',
    title: 'Moment Terbaru',
    date: '1 Januari 2024',
    description: 'Tahun baru, resolusi baru, tapi cinta kita tetap sama ❤️'
  }
];

interface PhotoTimelineProps {
  className?: string;
}

export const PhotoTimeline: React.FC<PhotoTimelineProps> = ({ className }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % dummyPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + dummyPhotos.length) % dummyPhotos.length);
  };

  const openPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(dummyPhotos.findIndex(p => p.id === photo.id));
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-pink-400 animate-pulse-heart" />
          Kenangan Indah Kita
          <Heart className="w-8 h-8 text-pink-400 animate-pulse-heart" />
        </h2>
        <p className="text-muted-foreground text-lg">
          Setiap foto menyimpan cerita cinta kita yang tak terlupakan
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-400 via-purple-500 to-pink-400 h-full"></div>

        {/* Photos */}
        <div className="space-y-16">
          {dummyPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={cn(
                "relative animate-slide-in-left",
                index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-8"
              )}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full border-4 border-background z-10">
                <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping"></div>
              </div>

              {/* Photo Card */}
              <Card 
                className={cn(
                  "glass-effect border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 cursor-pointer transform hover:scale-105",
                  index % 2 === 0 ? "md:mr-8" : "md:ml-0"
                )}
                onClick={() => openPhoto(photo)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-sparkle" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold gradient-text">
                        {photo.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{photo.date}</span>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {photo.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Card className="glass-effect border-pink-500/30">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={dummyPhotos[currentIndex].url}
                    alt={dummyPhotos[currentIndex].title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  
                  {/* Navigation Buttons */}
                  <Button
                    onClick={prevPhoto}
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    onClick={nextPhoto}
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                  
                  {/* Close Button */}
                  <Button
                    onClick={closePhoto}
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold gradient-text mb-2">
                    {dummyPhotos[currentIndex].title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{dummyPhotos[currentIndex].date}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-lg">
                    {dummyPhotos[currentIndex].description}
                  </p>
                  
                  <div className="flex justify-center mt-6">
                    <div className="flex gap-2">
                      {dummyPhotos.map((_, index) => (
                        <div
                          key={index}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            index === currentIndex ? "bg-pink-500" : "bg-gray-600"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};