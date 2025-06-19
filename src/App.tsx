import { useState, useRef, useEffect } from 'react';
import { Button } from '../src/components/ui/button';
import { Card } from '../src/components/ui/card';
import { VideoCall } from '../src/components/VideoCall';
import { PhotoTimeline } from '../src/components/PhotoTimeline';
import lesungPipiSong from './assets/lesung-pipi.mp3';
import { 
  Video, 
  Camera, 
  Heart, 
  Cake,
  Sparkles,
  Gift,
  // Music,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
// import { cn } from '../src/lib/utils';

type ActiveSection = 'home' | 'videocall' | 'photos';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set initial volume to 30%
      audioRef.current.loop = true; // Loop the song
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.log("Audio play failed:", e);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={lesungPipiSong} type="audio/mpeg" />
        {/* Note: Replace with actual song URL when available */}
        Your browser does not support the audio element.
      </audio>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400/20 animate-bounce w-4 h-4"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Sparkles */}
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-400/30 animate-pulse w-3 h-3"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-gray-900/80 border-b border-pink-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cake className="w-8 h-8 text-yellow-400 animate-bounce" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Happy Birthday My Love
              </h1>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => setActiveSection('home')}
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
              >
                <Gift className="w-4 h-4 mr-2" />
                Home
              </Button>
              
              <Button
                onClick={() => setActiveSection('videocall')}
                variant={activeSection === 'videocall' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
              >
                <Video className="w-4 h-4 mr-2" />
                Video Call
              </Button>
              
              <Button
                onClick={() => setActiveSection('photos')}
                variant={activeSection === 'photos' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
              >
                <Camera className="w-4 h-4 mr-2" />
                Kenangan
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Home Section */}
          {activeSection === 'home' && (
            <div className="text-center space-y-12 animate-fade-in">
              {/* Hero Section */}
              <div className="space-y-8">
                <div className="relative">
                  <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                    🎉 HAPPY 🎉
                  </h1>
                  <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
                    BIRTHDAY!
                  </h2>
                  
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
                  </div>
                </div>

                <Card className="backdrop-blur-md bg-gray-800/50 border-pink-500/30 max-w-2xl mx-auto">
                  <div className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <Cake className="w-16 h-16 text-yellow-400 animate-bounce" />
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-6 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                      Untuk Pacarku Tersayang ❤️
                    </h3>
                    
                    <p className="text-xl text-gray-300 leading-relaxed mb-6">
                      Di hari spesialmu ini, aku ingin memberikan hadiah yang berbeda. 
                      Website ini kubuat khusus untukmu dengan sepenuh hati. 
                      Semoga hari ulang tahunmu penuh kebahagiaan dan cinta!
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => setActiveSection('videocall')}
                        size="lg"
                        className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full"
                      >
                        <Video className="w-5 h-5 mr-2" />
                        Mulai Video Call
                      </Button>
                      
                      <Button
                        onClick={() => setActiveSection('photos')}
                        size="lg"
                        variant="outline"
                        className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Lihat Kenangan
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Features Preview */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
                  <Card className="backdrop-blur-md bg-gray-800/50 border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 transform hover:scale-105">
                    <div className="p-6 text-center">
                      <Video className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">Video Call Romantis</h4>
                      <p className="text-gray-300">
                        Video call real-time dengan dekorasi kue ulang tahun yang cantik
                      </p>
                    </div>
                  </Card>
                  
                  <Card className="backdrop-blur-md bg-gray-800/50 border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 transform hover:scale-105">
                    <div className="p-6 text-center">
                      <Camera className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                      <h4 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">Timeline Kenangan</h4>
                      <p className="text-gray-300">
                        Koleksi foto-foto indah perjalanan cinta kita berdua
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Video Call Section */}
          {activeSection === 'videocall' && (
            <div className="max-w-6xl mx-auto">
              <VideoCall />
            </div>
          )}

          {/* Photos Section */}
          {activeSection === 'photos' && (
            <div className="max-w-4xl mx-auto">
              <PhotoTimeline />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
          <span>Made with love for my special someone</span>
          <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
        </div>
        <p className="text-sm">Happy Birthday, Sayang! 🎂✨</p>
      </footer>

      {/* Music Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {/* Song Info */}
        <div className="backdrop-blur-md bg-gray-800/80 rounded-lg p-3 text-sm text-white max-w-48">
          <p className="font-medium">🎵 Lesung Pipi</p>
          <p className="text-gray-300">by Raim Laode</p>
        </div>
        
        {/* Music Controls */}
        <div className="flex gap-2">
          <Button
            onClick={togglePlay}
            size="icon"
            className="rounded-full bg-pink-600 hover:bg-pink-700 shadow-lg"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          
          <Button
            onClick={toggleMute}
            size="icon"
            className="rounded-full bg-pink-600 hover:bg-pink-700 shadow-lg"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;