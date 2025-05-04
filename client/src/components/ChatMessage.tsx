
import React from 'react';
import { Copy, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export interface MessageProps {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  detectedDialect?: string;
  translatedText?: string;
}

const ChatMessage = ({ message }: { message: MessageProps }) => {
  const { isUser, text, timestamp, detectedDialect, translatedText } = message;

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard!');
  };

  const playAudio = () => {
    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = "en-IN"; // or "hi-IN" for Hindi
      speechSynthesis.speak(utterance);
    }
  };


  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      <div className={isUser ? 'message-bubble-user' : 'message-bubble-system'}>
        {!isUser && detectedDialect && (
          <div className="text-xs font-medium text-brand mb-1">
            Detected: {detectedDialect}
          </div>
        )}

        <div className="whitespace-pre-wrap">{isUser ? text : translatedText || text}</div>

        {!isUser && (
          <div className="flex items-center justify-end mt-2 gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(translatedText || text)}
            >
              <Copy className="h-3 w-3" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={playAudio}
            >
              <Volume2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      <span className="text-xs text-muted-foreground mt-1 mx-1">
        {formattedTime}
      </span>
    </div>
  );
};

export default ChatMessage;
