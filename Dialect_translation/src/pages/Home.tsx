import { useRef, useState } from 'react';
import { Loader2, Volume2, Copy, Mic, Pause } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import axios from "axios"
import TypingText from '@/components/TypingText';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [outputTextHindi, setOutputTextHindi] = useState('');
  const [inputTextLang, setInputTextLang] = useState('');
  const [detectedDialect, setDetectedDialect] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingOption, setPlayingOption] = useState("");
  const [micLoader, setMicLoader] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) return toast.error("Enter text to translate");

    setIsLoading(true);
    setOutputText('');
    setOutputTextHindi('');
    setDetectedDialect('');

    try {
      const res = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text_to_translate: inputText })
      });
      const data = await res.json();

      if (data.translation.input_language === 'english') {
        setOutputText(data.translation?.translated_text_mr || 'Translation failed.');
      }
      else {
        setOutputText(data.translation?.translated_text_en || 'Translation failed.');
      }

      setOutputTextHindi(data.translation?.translated_text_hi || 'Translation failed.');
      setDetectedDialect(data.translation?.identified_language_dialect || 'Unknown');
    } catch (err) {
      toast.error("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const playAudio = (
    outputText: string,
    lang: string,
  ) => {
    if (!outputText) return;

    setIsPlaying(true);
    setPlayingOption(lang)

    fetch("http://localhost:5000/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target_language_code: `${lang}-IN`,
        text: outputText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.audios) {
          const audioBytes = atob(data.audios);
          const byteArray = new Uint8Array(audioBytes.length);
          for (let i = 0; i < audioBytes.length; i++) {
            byteArray[i] = audioBytes.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);

          audio.onended = () => setIsPlaying(false);
          audio.onerror = () => setIsPlaying(false);

          audio.play();
        } else {
          setIsPlaying(false);
          console.error("Audio not found in response:", data);
        }
      })
      .catch((err) => {
        setIsPlaying(false);
        console.error("TTS error:", err);
      });
  };

  const convertToBase64AndGetText = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        setMicLoader(true);
        const res = await axios.post(`http://localhost:5000/speech-to-text`, {
          audio: reader.result,
        });
        if (res.status === 200) {
          if (res.data !== "This is a transcription of the audio.") {
            setInputText(res.data.transcript);
            setInputTextLang(res.data.language_code);
          } else {
            setMicLoader(false);
          }
        } else {
          console.log("Error in STT API", res.data);
        }
        setMicLoader(false);
      } catch (error) {
        console.log(error);
        setMicLoader(false);
      }
    };
    reader.onerror = (error) => {
      console.error("Error converting to Base64:", error);
    };
  };

  const startMediaRecorder = () => {
    mediaRecorderRef.current = new MediaRecorder(streamRef.current);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      clearInterval(recordingIntervalRef.current); // 🛑 Stop the timer when recording stops
      recordingIntervalRef.current = null;
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      if (audioBlob.size < 2000) {
        console.log("Silent audio detected, skipping API call.");
        setMicLoader(false);
        audioChunksRef.current = [];
        return;
      }

      convertToBase64AndGetText(audioBlob);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new (window.AudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      analyser.fftSize = 512;
      analyserRef.current = analyser;
      audioContextRef.current = audioContext;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVoice = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume =
          dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

        if (volume > 5) {
          console.log("Voice detected, starting recording...");
          startMediaRecorder();
        } else {
          requestAnimationFrame(checkVoice);
        }
      };

      requestAnimationFrame(checkVoice);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track: any) => track.stop());
    }

    setIsRecording(false);
  };

  const langMapping = (langCode: string) => {
    const mapper = {
      "mr-IN": "Marathi",
      "hi-IN": "Hindi",
      "en-IN": "English",
      "gu-IN": "Gujarati",
      "bn-IN": "Bengali",
      "ml-IN": "Malayalam",
      "tl-IN": "Telugu",
      "": "Other",
    }

    return mapper[langCode]
  }

  return (
    <div className="flex flex-col relative items-center gap-6 w-full min-h-[calc(100vh-4rem)] p-4">

      <TypingText />

      <div className="max-w-2xl w-full space-y-4 mt-5">
        <h1 className="text-2xl font-semibold">Dialect Translator</h1>

        <div className="relative w-full">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={micLoader ? "Processing..." : "Enter your sentence.."}
            rows={7}
            className="w-full focus:border-none focus:outline-none bxsd-class bg-transparent rounded-md p-3 text-sm resize-none"
          />

          {/* STT Icon input text */}
          {
            inputText.length === 0 &&
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-3 right-11"
              onClick={() => {
                if (!micLoader) {
                  if (!isRecording) {
                    startRecording()
                  }
                  else {
                    stopRecording()
                  }
                }
              }}
            >
              {
                micLoader
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : !isRecording
                    ? <Mic className="w-3 h-3" />
                    : <Pause className="w-3 h-3" />
              }
            </Button>
          }

          {
            inputText.length !== 0 && inputTextLang !== "" &&
            <Button
              variant="ghost"
              size="icon"
              className="absolute hover:!bg-transparent border bottom-3 w-56 right-12"
            >
              Detected Language: {langMapping(inputTextLang)}
            </Button>
          }

          {/* TTS Icon for Marathi input text */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-3 ml-2 right-2"
            onClick={() => playAudio(inputText, "mr")}
            disabled={!inputText.trim() || isPlaying}
          >
            {isPlaying && playingOption === 'mr' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </div>


        <Button className='mx-auto w-36' onClick={handleTranslate} disabled={isLoading}>
          {
            isLoading
              ? <span className="flex items-center gap-3">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  />
                </svg>
                Translating...
              </span>
              : <h2 className='text-[16px]'>Translate</h2>
          }
        </Button>
      </div>
      <div className='w-full px-24 flex justify-center items-center gap-10'>

        {outputText && (
          <div className="bg-muted w-full p-4 rounded-md shadow">
            <div className="text-xs mb-2 text-gray-500">
              Detected Dialect: <strong>{detectedDialect}</strong>
            </div>
            <div className="text-base whitespace-pre-wrap">{outputText}</div>

            <div className="flex gap-2 mt-2 justify-end">
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button disabled={isPlaying} variant="ghost" size="icon" onClick={() => playAudio(outputText, "en")}>
                {isPlaying && playingOption === 'en' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {outputTextHindi && (
          <div className="bg-muted w-full p-4 rounded-md shadow">
            <div className="text-xs mb-2 text-gray-500">
              Detected Dialect: <strong>{detectedDialect}</strong>
            </div>
            <div className="text-base whitespace-pre-wrap">{outputTextHindi}</div>

            <div className="flex gap-2 mt-2 justify-end">
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button disabled={isPlaying} variant="ghost" size="icon" onClick={() => playAudio(outputTextHindi, "hi")}>
                {isPlaying && playingOption === 'hi' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div >
  );
};

export default Home;
