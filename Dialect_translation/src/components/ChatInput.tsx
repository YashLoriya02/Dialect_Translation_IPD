
import React, { useState } from 'react';
import { Send, Mic, Upload, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  audioOutput: boolean;
  onToggleAudio: () => void;
}

const ChatInput = ({ onSendMessage, audioOutput, onToggleAudio }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app we would use MediaRecorder API here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app we would stop recording and process audio
  };

  const handleFileUpload = () => {
    // In a real app we would handle file upload here
  };

  return (
    <div className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2 mr-4">
            <span className="text-sm font-medium">
              {audioOutput ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </span>
            <Switch checked={audioOutput} onCheckedChange={onToggleAudio} />
          </div>

          <div className="relative flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter text or record audio..."
              className="min-h-12 resize-none pr-20"
              onKeyDown={handleKeyPress}
            />
            
            <div className="absolute right-2 bottom-1 flex gap-1">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                onClick={handleFileUpload} 
                className="h-8 w-8"
              >
                <Upload className="h-4 w-4" />
              </Button>
              
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className={`h-8 w-8 ${isRecording ? 'text-red-500' : ''}`}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              <Button
                type="button"
                size="icon"
                variant={message.trim() ? "default" : "ghost"}
                className="h-8 w-8"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
