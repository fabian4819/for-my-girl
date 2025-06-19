import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Video, 
  Phone,
  Heart,
  Cake,
  Sparkles,
  Copy,
//   Share2,
  Users,
  ExternalLink,
  MessageCircle,
  Send
} from 'lucide-react';
import { cn } from '../lib/utils';

interface VideoCallProps {
  className?: string;
}

export const VideoCall: React.FC<VideoCallProps> = ({ className }) => {
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [roomId] = useState(() => `birthday-${Date.now().toString(36)}`);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  
  // Using Jitsi Meet - reliable and works everywhere
  const jitsiUrl = `https://meet.jit.si/${roomId}`;
  
  // Alternative video call options
  const alternatives = [
    {
      name: "Google Meet",
      url: "https://meet.google.com/new",
      icon: Video,
      description: "Buat room baru di Google Meet"
    },
    {
      name: "WhatsApp Video Call",
      url: "https://web.whatsapp.com/",
      icon: MessageCircle,
      description: "Video call langsung via WhatsApp"
    }
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(jitsiUrl);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = jitsiUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`🎂 Sayang! Aku bikin website birthday special buat kamu! 

Ada video call romantis nya loh 💕

Klik link ini untuk join video call bareng aku:
${jitsiUrl}

Happy Birthday my love! ❤️🎉`);
    
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareViaTelegram = () => {
    const message = encodeURIComponent(`🎂 Sayang! Aku bikin website birthday special buat kamu! 

Ada video call romantis nya loh 💕

Klik link ini untuk join video call bareng aku:
${jitsiUrl}

Happy Birthday my love! ❤️🎉`);
    
    window.open(`https://t.me/share/url?url=${jitsiUrl}&text=${message}`, '_blank');
  };

  const startJitsiCall = () => {
    setIsCallStarted(true);
    window.open(jitsiUrl, '_blank', 'width=1200,height=800');
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Birthday Decorations */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-float">
          <Cake className="w-12 h-12 text-yellow-400" />
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-sparkle" />
          </div>
        </div>
      </div>

      {/* Hearts Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Heart 
            key={i}
            className={cn(
              "absolute w-6 h-6 text-pink-400 animate-pulse-heart",
              i % 2 === 0 ? "left-4" : "right-4"
            )}
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Share Link Section */}
      {isCallStarted && (
        <Card className="glass-effect border-green-500/30 mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-green-400" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-400">Bagikan ke Pasangan Anda</h3>
                <p className="text-sm text-muted-foreground">Pilih cara untuk share link video call</p>
              </div>
            </div>
            
            {/* Link Display */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-sm font-mono break-all text-gray-300 mb-3">{jitsiUrl}</p>
              
              <div className="flex gap-2">
                <Button
                  onClick={copyLink}
                  size="sm"
                  variant={isLinkCopied ? "default" : "outline"}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {isLinkCopied ? 'Copied!' : 'Copy Link'}
                </Button>
                
                <Button
                  onClick={() => window.open(jitsiUrl, '_blank')}
                  size="sm"
                  variant="secondary"
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Call
                </Button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={shareViaWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white justify-start"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Share via WhatsApp
              </Button>
              
              <Button
                onClick={shareViaTelegram}
                className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
              >
                <Send className="w-5 h-5 mr-3" />
                Share via Telegram
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Main Video Call Interface */}
      <Card className="glass-effect border-pink-500/30">
        <div className="p-6">
          {!isCallStarted ? (
            /* Before Call Started */
            <div className="text-center space-y-8">
              <div className="relative">
                <div className="video-frame aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-24 h-24 mx-auto mb-4 text-white/70" />
                    <h3 className="text-2xl font-bold mb-2">Ready for Video Call? 💕</h3>
                    <p className="text-lg opacity-90">Klik tombol di bawah untuk memulai</p>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">Birthday Video Call 🎂</span>
                  </div>
                </div>
              </div>

              {/* Main Call Button */}
              <Button
                onClick={startJitsiCall}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full text-lg"
              >
                <Phone className="w-6 h-6 mr-3" />
                Mulai Birthday Video Call
              </Button>

              {/* Alternative Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-muted-foreground">Atau gunakan alternatif lain:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alternatives.map((alt, index) => (
                    <Card key={index} className="glass-effect border-gray-500/30 hover:border-pink-500/50 transition-all duration-300">
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <alt.icon className="w-6 h-6 text-pink-400" />
                          <h5 className="font-semibold">{alt.name}</h5>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{alt.description}</p>
                        <Button
                          onClick={() => window.open(alt.url, '_blank')}
                          size="sm"
                          variant="outline"
                          className="w-full"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Buka {alt.name}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6 text-sm max-w-2xl mx-auto">
                <h4 className="font-semibold text-blue-200 mb-3">📋 Cara Menggunakan:</h4>
                <ol className="text-blue-200 space-y-2 text-left">
                  <li>1. Klik "Mulai Birthday Video Call" (akan buka Jitsi Meet)</li>
                  <li>2. Allow camera & microphone access di Jitsi</li>
                  <li>3. Copy link atau gunakan tombol "Share via WhatsApp/Telegram"</li>
                  <li>4. Kirim ke pasangan Anda</li>
                  <li>5. Pasangan klik link untuk join video call 💕</li>
                </ol>
                
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded">
                  <p className="text-green-200 text-center">
                    ✨ <strong>Pro Tip:</strong> Jitsi Meet gratis, tidak perlu daftar, dan bekerja di semua device!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* After Call Started */
            <div className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Your Side */}
                <div className="relative">
                  <div className="video-frame aspect-video bg-gray-800 rounded-2xl overflow-hidden relative">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-600 to-blue-600">
                      <div className="text-center text-white">
                        <ExternalLink className="w-16 h-16 mx-auto mb-4 text-white/70" />
                        <p className="text-lg font-medium">Video Call Aktif</p>
                        <p className="text-sm opacity-75">Jitsi Meet terbuka di tab baru</p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">Kamu ❤️</span>
                    </div>
                  </div>
                </div>

                {/* Partner's Side */}
                <div className="relative">
                  <div className="video-frame aspect-video bg-gray-800 rounded-2xl overflow-hidden relative">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600">
                      <div className="text-center text-white">
                        <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse-heart text-pink-300" />
                        <p className="text-lg font-medium">Menunggu pasangan...</p>
                        <p className="text-sm opacity-75">Share link di atas! 💕</p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">Sayangku 💕</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Birthday Message */}
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              🎉 Selamat Ulang Tahun Sayang! 🎉
            </h2>
            <p className="text-muted-foreground">
              Video call spesial untukmu di hari istimewa ini ❤️
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};