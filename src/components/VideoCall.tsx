import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Heart,
  Cake,
  Sparkles,
  AlertCircle,
  Copy,
  Share2,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';

interface VideoCallProps {
  className?: string;
}

export const VideoCall: React.FC<VideoCallProps> = ({ className }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roomId] = useState(() => Math.random().toString(36).substring(7));
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const shareLink = `${window.location.origin}/join/${roomId}`;

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch {
      // Fallback untuk browser yang tidak support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  };

  const shareViaApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Birthday Video Call! 🎂',
          text: 'Join me for a special birthday video call! 💕',
          url: shareLink
        });
      } catch {
        console.log('Sharing cancelled');
      }
    } else {
      copyLink();
    }
  };

  const startCall = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Requesting camera access...');
      
      // Simplified constraints
      const constraints = {
        video: true,
        audio: true
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Got media stream:', mediaStream);
      
      setStream(mediaStream);
      
      // Direct assignment to video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.onloadedmetadata = () => {
          localVideoRef.current?.play().catch(e => console.warn('Play failed:', e));
        };
      }
      
      setIsConnected(true);
      setIsLoading(false);
      
    } catch (error: unknown) {
      console.error('Camera access error:', error);
      setIsLoading(false);
      
      let errorMessage = 'Gagal mengakses kamera. ';
      
      if (error instanceof Error) {
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage += 'Silakan klik "Allow" untuk memberikan izin kamera.';
            break;
          case 'NotFoundError':
            errorMessage += 'Kamera tidak ditemukan pada perangkat ini.';
            break;
          case 'NotReadableError':
            errorMessage += 'Kamera sedang digunakan aplikasi lain. Tutup aplikasi tersebut.';
            break;
          case 'OverconstrainedError':
            errorMessage += 'Kamera tidak mendukung pengaturan yang diminta.';
            break;
          default:
            errorMessage += `Error: ${error.message}`;
        }
      } else {
        errorMessage += 'Terjadi kesalahan tidak dikenal.';
      }
      
      setError(errorMessage);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Stopping track:', track);
        track.stop();
      });
      setStream(null);
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setIsConnected(false);
    setError(null);
  };

  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
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

      {/* Share Link Section */}
      {isConnected && (
        <Card className="glass-effect border-green-500/30 mb-6">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-400">Bagikan Link ke Pasangan Anda</h3>
                <p className="text-sm text-muted-foreground">Copy link ini dan kirim ke pasangan untuk join video call</p>
              </div>
            </div>
            
            <div className="mt-3 flex gap-2">
              <div className="flex-1 bg-gray-800 rounded-lg p-3 text-sm font-mono break-all">
                {shareLink}
              </div>
              
              <Button
                onClick={copyLink}
                size="sm"
                variant={isLinkCopied ? "default" : "outline"}
                className="shrink-0"
              >
                <Copy className="w-4 h-4 mr-1" />
                {isLinkCopied ? 'Copied!' : 'Copy'}
              </Button>
              
              <Button
                onClick={shareViaApp}
                size="sm"
                variant="outline"
                className="shrink-0"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-200 text-sm">{error}</p>
              <div className="mt-2 text-red-300 text-xs space-y-1">
                <p>• Pastikan kamera tidak digunakan aplikasi lain</p>
                <p>• Coba refresh halaman dan klik "Allow" saat diminta izin</p>
                <p>• Test di browser lain (Chrome recommended)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Interface */}
      <Card className="glass-effect border-pink-500/30">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Your Video */}
            <div className="relative">
              <div className="video-frame aspect-video bg-gray-800 rounded-2xl overflow-hidden relative">
                {isConnected ? (
                  <>
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className={cn(
                        "w-full h-full object-cover",
                        !isCameraOn && "hidden"
                      )}
                    />
                    
                    {!isCameraOn && (
                      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <div className="text-center text-white">
                          <VideoOff className="w-16 h-16 mx-auto mb-2 text-white/70" />
                          <p className="text-sm">Camera Off</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                    {isLoading ? (
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-sm">Mengakses kamera...</p>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-2 text-white/70" />
                        <p className="text-sm">Klik tombol untuk mulai</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">Kamu ❤️</span>
                </div>
              </div>
            </div>

            {/* Partner's Video */}
            <div className="relative">
              <div className="video-frame aspect-video bg-gray-800 rounded-2xl overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600">
                  <div className="text-center text-white">
                    <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse-heart text-pink-300" />
                    <p className="text-lg font-medium">Menunggu pacar tersayang...</p>
                    <p className="text-sm opacity-75">
                      {isConnected ? 'Share link di atas! 💕' : 'Mulai call untuk mendapat link 📞'}
                    </p>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">Sayangku 💕</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {!isConnected ? (
              <Button
                onClick={startCall}
                size="lg"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full disabled:opacity-50"
              >
                <Phone className="w-5 h-5 mr-2" />
                {isLoading ? 'Connecting...' : 'Mulai Video Call'}
              </Button>
            ) : (
              <>
                <Button
                  onClick={toggleMute}
                  variant={isMuted ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                
                <Button
                  onClick={toggleCamera}
                  variant={!isCameraOn ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  title={isCameraOn ? "Turn off camera" : "Turn on camera"}
                >
                  {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </Button>
                
                <Button
                  onClick={endCall}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  title="End call"
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              🎉 Selamat Ulang Tahun Sayang! 🎉
            </h2>
            <p className="text-muted-foreground mb-4">
              Video call spesial untukmu di hari istimewa ini ❤️
            </p>
            
            {!isConnected && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-sm">
                <p className="text-blue-200">
                  💡 <strong>Cara menggunakan:</strong> Klik "Mulai Video Call" → Allow camera access → 
                  Share link yang muncul ke pasangan Anda via WhatsApp/Telegram
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};