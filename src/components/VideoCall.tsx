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
  Sparkles
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
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      
      setIsConnected(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Tidak dapat mengakses kamera/mikrofon. Pastikan izin sudah diberikan!');
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsConnected(false);
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
      {/* Birthday Cake Decorations */}
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

      {/* Video Call Interface */}
      <Card className="glass-effect border-pink-500/30">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Local Video (You) */}
            <div className="relative">
              <div className="video-frame aspect-video bg-gray-800 rounded-2xl overflow-hidden relative">
                {isConnected ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                    <Video className="w-16 h-16 text-white/70" />
                  </div>
                )}
                
                {!isCameraOn && isConnected && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <VideoOff className="w-16 h-16 text-white/70" />
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">Kamu ❤️</span>
                </div>
              </div>
            </div>

            {/* Remote Video (Girlfriend) */}
            <div className="relative">
              <div className="video-frame aspect-video bg-gray-800 rounded-2xl overflow-hidden relative">
                {isConnected ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600">
                    <div className="text-center text-white">
                      <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse-heart text-pink-300" />
                      <p className="text-lg font-medium">Menunggu pacar tersayang...</p>
                      <p className="text-sm opacity-75">Share link ini dengannya! 💕</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600">
                    <Video className="w-16 h-16 text-white/70" />
                  </div>
                )}
                
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
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                Mulai Video Call
              </Button>
            ) : (
              <>
                <Button
                  onClick={toggleMute}
                  variant={isMuted ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                
                <Button
                  onClick={toggleCamera}
                  variant={!isCameraOn ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                >
                  {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </Button>
                
                <Button
                  onClick={endCall}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {/* Birthday Message */}
          <div className="text-center mt-6">
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