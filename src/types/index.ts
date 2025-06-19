export interface Photo {
  id: number;
  url: string;
  title: string;
  date: string;
  description: string;
}

export interface VideoCallProps {
  isConnected: boolean;
  isMuted: boolean;
  isCameraOn: boolean;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onEndCall: () => void;
}