// // src/components/Chat/VoiceRecorder.jsx
// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiMic, FiStopCircle } from 'react-icons/fi'
// import PropTypes from 'prop-types'

// export default function VoiceRecorder({ onResult, isRecording, setIsRecording }) {
//   const [mediaRecorder, setMediaRecorder] = useState(null)
//   const [audioChunks, setAudioChunks] = useState([])
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(stream => {
//         const recorder = new MediaRecorder(stream)
//         setMediaRecorder(recorder)
        
//         recorder.ondataavailable = (e) => {
//           setAudioChunks(prev => [...prev, e.data])
//         }
//       })
//       .catch(err => setError('Microphone access required for voice messages'))
//   }, [])

//   const startRecording = () => {
//     if (!mediaRecorder) return
    
//     setAudioChunks([])
//     mediaRecorder.start()
//     setIsRecording(true)
//   }

//   const stopRecording = () => {
//     if (!mediaRecorder || !isRecording) return
    
//     mediaRecorder.stop()
//     setIsRecording(false)
    
//     mediaRecorder.onstop = async () => {
//       const audioBlob = new Blob(audioChunks)
      
//       // Here you would send the audio to your backend for processing
//       // For this example, we'll use mock transcription
//       const mockTranscription = "This is a mock voice transcription"
//       onResult(mockTranscription)
//     }
//   }

//   return (
//     <div className="relative">
//       <motion.button
//         whileTap={{ scale: 0.95 }}
//         onClick={isRecording ? stopRecording : startRecording}
//         className={`p-2 rounded-full ${
//           isRecording 
//             ? 'bg-red-500 text-white animate-pulse' 
//             : 'bg-medical-primary/10 text-medical-primary'
//         } transition-colors`}
//         type="button"
//       >
//         {isRecording ? (
//           <FiStopCircle className="w-5 h-5" />
//         ) : (
//           <FiMic className="w-5 h-5" />
//         )}
//       </motion.button>
      
//       <AnimatePresence>
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             className="absolute top-full mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm"
//           >
//             {error}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// VoiceRecorder.propTypes = {
//   onResult: PropTypes.func.isRequired,
//   isRecording: PropTypes.bool.isRequired,
//   setIsRecording: PropTypes.func.isRequired
// }
















































import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiStopCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

export default function VoiceRecorder({ onResult, isRecording, setIsRecording }) {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream;
    const initRecorder = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        
        recorder.ondataavailable = (e) => {
          setAudioChunks(prev => [...prev, e.data]);
        };
      } catch (err) {
        setError('Microphone access required for voice messages');
      }
    };

    initRecorder();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!mediaRecorder) return;
    
    setAudioChunks([]);
    mediaRecorder.start(1000);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorder || !isRecording) return;
    
    mediaRecorder.stop();
    setIsRecording(false);
    
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      try {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onResult({
            text: transcript,
            audio: audioUrl,
            transcript: transcript
          });
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          onResult({
            text: '[Voice message]',
            audio: audioUrl,
            transcript: 'Could not transcribe voice message'
          });
        };
        
        recognition.start();
      } catch (e) {
        console.error('Speech recognition not supported', e);
        onResult({
          text: '[Voice message]',
          audio: audioUrl,
          transcript: 'Voice message transcription not supported'
        });
      }
    };
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-2 rounded-full ${
          isRecording 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-medical-primary/10 text-medical-primary'
        } transition-colors`}
        type="button"
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? (
          <FiStopCircle className="w-5 h-5" />
        ) : (
          <FiMic className="w-5 h-5" />
        )}
      </motion.button>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

VoiceRecorder.propTypes = {
  onResult: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired,
  setIsRecording: PropTypes.func.isRequired
};