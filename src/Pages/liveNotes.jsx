
import React, { useState, useRef, useEffect } from "react";
import { HiMiniSparkles } from "react-icons/hi2";


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;


const liveNotes = () => {
  const recognitionRef = useRef(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("speech-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!SpeechRecognition) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
      setNote((prev) => prev + finalTranscript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startRecording = async () => {
    if (!recognitionRef.current) return;

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setNote("");
      setIsRecording(true);
      recognitionRef.current.start();
    } catch (err) {
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  const handleSave = () => {
    if (note.trim()) {
      const newNotes = [...notes, note.trim()];
      setNotes(newNotes);
      localStorage.setItem("speech-notes", JSON.stringify(newNotes));
      setNote("");
    }
  };

  const handleDelete = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
    localStorage.setItem("speech-notes", JSON.stringify(updated));
  };

  // 🔊 Text-to-Speech function
  const speakNote = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert("Your browser doesn't support text-to-speech.");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-10 text-cyan-400 drop-shadow-lg">
      🎙️ Voice Notes AI 
    </h1> 

    <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10">
      <textarea
        className="w-full h-40 bg-black/30 text-white placeholder-gray-400 p-4 rounded-xl resize-none outline-none focus:ring-2 focus:ring-cyan-500 transition"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Start speaking and your note will appear here..."
      />

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-md disabled:opacity-50"
        >
          🎤 Start
        </button>
        <button
          onClick={stopRecording}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-md"
        >
          ⛔ Stop
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md"
        >
          💾 Save Note
        </button>
      </div>

      {notes.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">📝 Saved Notes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.map((n, i) => (
              <div key={i} className="relative bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-md">
                <p className="text-white mb-6">{n}</p>
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    onClick={() => speakNote(n)}
                    className="text-green-300 hover:text-green-400 text-sm"
                  >
                    🔊
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-300 hover:text-red-500 text-sm"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
    </div>
  )
}

export default liveNotes;
