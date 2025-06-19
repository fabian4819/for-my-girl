import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, Calendar, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Photo } from '../types';

// Import foto dari assets
import photo1 from '../assets/1.jpeg';
import photo2 from '../assets/2.jpeg';
import photo3 from '../assets/3.jpeg';
import photo4 from '../assets/4.jpeg';
import photo5 from '../assets/5.jpeg';
import photo6 from '../assets/6.jpeg';
import photo7 from '../assets/7.jpeg';

// Data foto dengan path lokal
const photos: Photo[] = [
  {
    id: 1,
    url: photo1,
    title: 'Funtopia',
    date: '13 Mei 2025',
    description: 'kita main seruuu banget di funtopia, ini pas naik keretaaa 💕'
  },
  {
    id: 2,
    url: photo2,
    title: 'Parangtritis',
    date: '21 April 2025',
    description: 'kita 2 hari jalan-jalan di jogjaa, seru gaa tp belom official waktu itu wehehe ✨'
  },
  {
    id: 3,
    url: photo3,
    title: 'Pura Mangkunegaran',
    date: '14 Juni 2025',
    description: 'first time jalan bareng di soloo, seru banget di pura bareng kamu 🌅'
  },
  {
    id: 4,
    url: photo4,
    title: 'Nonton Bareng',
    date: '1 Mei 2025',
    description: 'first time nonton bioskop bareng, nontonnya komang, kamuu yang request ahahaa 🏖️'
  },
  {
    id: 5,
    url: photo5,
    title: 'Lika Liku',
    date: '19 April 2025',
    description: 'FIRST DATEE KITAAA, SERU YAA NGOBROL LANGSUNG 🥂'
  },
  {
    id: 6,
    url: photo6,
    title: 'UPTOWN',
    date: '1 Mei 2025',
    description: 'Kita eksplor BSB terus ke uptown di situ kita officiall finally ahahaa setelah bbrp bulan itu ❄️'
  },
  {
    id: 7,
    url: photo7,
    title: 'Funtopia Versi 2',
    date: '13 Mei 2025',
    description: 'masi di funtopia, fotonya bagus jadi aku pasang ajaa wehehee ❤️'
  }
];

interface PhotoTimelineProps {
  className?: string;
}

export const PhotoTimeline: React.FC<PhotoTimelineProps> = ({ className }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const openPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(photos.findIndex(p => p.id === photo.id));
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

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <Card
            key={photo.id}
            className={cn(
              "glass-effect border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 cursor-pointer transform hover:scale-105 group",
              // Random heights untuk tampilan yang lebih menarik
              index % 4 === 0 ? "lg:row-span-2" : "",
              index % 3 === 1 ? "md:mt-8" : "",
              index % 5 === 2 ? "lg:mt-12" : ""
            )}
            onClick={() => openPhoto(photo)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <CardContent className="p-0 relative overflow-hidden">
              {/* Photo */}
              <div className="relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className={cn(
                    "w-full object-cover group-hover:scale-110 transition-transform duration-500",
                    // Varied heights
                    index % 4 === 0 ? "h-80 lg:h-96" : "h-64"
                  )}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-sparkle" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-lg font-bold gradient-text line-clamp-1">
                    {photo.title}
                  </CardTitle>
                </CardHeader>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{photo.date}</span>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {photo.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add floating hearts around the grid */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className={cn(
              "absolute text-pink-400/20 animate-float",
              "w-6 h-6"
            )}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + ((i % 3) * 25)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + (i % 2)}s`
            }}
          />
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Card className="glass-effect border-pink-500/30">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={photos[currentIndex].url}
                    alt={photos[currentIndex].title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  
                  {/* Navigation Buttons */}
                  <Button
                    onClick={prevPhoto}
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 border-0"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </Button>
                  
                  <Button
                    onClick={nextPhoto}
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 border-0"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </Button>
                  
                  {/* Close Button */}
                  <Button
                    onClick={closePhoto}
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  
                  {/* Photo Counter */}
                  <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                    <span className="text-white text-sm">
                      {currentIndex + 1} / {photos.length}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold gradient-text mb-2">
                    {photos[currentIndex].title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{photos[currentIndex].date}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-lg">
                    {photos[currentIndex].description}
                  </p>
                  
                  {/* Photo Indicators */}
                  <div className="flex justify-center mt-6">
                    <div className="flex gap-2">
                      {photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={cn(
                            "w-3 h-3 rounded-full transition-all hover:scale-125",
                            index === currentIndex 
                              ? "bg-pink-500 scale-125" 
                              : "bg-gray-600 hover:bg-gray-500"
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

      {/* Bottom Message */}
      <div className="text-center mt-16">
        <Card className="glass-effect border-pink-500/30 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-4 animate-pulse-heart" />
            <h3 className="text-xl font-bold gradient-text mb-2">
              Untuk Cinta Hidupku
            </h3>
            <p className="text-muted-foreground">
              Setiap kenangan bersama adalah harta yang tak ternilai. 
              Terima kasih telah membuat hidup ini penuh warna dan kebahagiaan. 
              Happy Birthday, my love! 💕
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};