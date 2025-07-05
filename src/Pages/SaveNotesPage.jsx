import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver/dist/FileSaver.min.js";
import jsPDF from "jspdf";
import { MdDeleteOutline } from "react-icons/md";
import { TfiDownload } from "react-icons/tfi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";




const SaveNotesPage = () => {
  const [notes, setNotes] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("speech-notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  const speakNote = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  const deleteNote = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
    localStorage.setItem("speech-notes", JSON.stringify(updated));
  };

  const downloadNote = (text, index) => {
    const blob = new Blob([text.text || text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `note-${index + 1}.txt`);
  };

  const downloadAllTxt = () => {
    const allText = notes.map(n => `${n.timestamp || ''}\n${n.text || n}`).join("\n\n---\n\n");
    const blob = new Blob([allText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "all-notes.txt");
  };

  const downloadAllPDF = () => {
    const doc = new jsPDF();
    notes.forEach((n, i) => {
      doc.text(`${n.timestamp || ''}\n${n.text || n}`, 10, 10 + i * 30);
    });
    doc.save("all-notes.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white font-sans">
      <h1 className="text-4xl font-bold text-center mb-10 text-cyan-400 drop-shadow-lg">
        📝 Saved Voice Notes
      </h1>

      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-md shadow-xl relative group transition-all duration-300 hover:scale-[1.02]"
            >
              <p className="text-white text-base mb-4 whitespace-pre-wrap">
                {note.text || note}
              </p>
              <p className="text-xs text-gray-300 mb-6 italic">
                {note.timestamp || "— No timestamp —"}
              </p>
              <div className="absolute bottom-3 right-4 flex gap-4 opacity-90 group-hover:opacity-100 transition">
                <button
                  onClick={() => speakNote(note.text || note)}
                  className="text-green-300 hover:text-green-400 text-lg"
                  title="Speak"
                >
                  <HiOutlineSpeakerWave />
                </button>
                <button
                  onClick={() => downloadNote(note, index)}
                  className="text-blue-400 hover:text-blue-500 text-lg"
                  title="Download"
                >
                  <TfiDownload />
                </button>
                <button
                  onClick={() => deleteNote(index)}
                  className="text-red-400 hover:text-red-500 text-lg"
                  title="Delete"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))
        ) : (
         <div className="col-span-full text-center text-gray-400 text-lg flex flex-col items-center mt-10">
  <span className="text-6xl mb-4 animate-bounce">🗒️</span>
  <p className="text-xl font-semibold">Looks like your notebook is empty.</p>
  <p className="text-sm text-gray-500 mt-2">
    Start recording a voice note to save it here!
  </p>
</div>

        )}
      </div>

      {notes.length > 0 && (
        <div className="mt-10 text-center flex flex-wrap gap-6 justify-center">
          <button
            onClick={downloadAllTxt}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl shadow text-white font-medium"
          >
            ⬇ Download All (.txt)
          </button>
          <button
            onClick={downloadAllPDF}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-xl shadow text-white font-medium"
          >
            ⬇ Download All (.pdf)
          </button>
        </div>
      )}
    </div>
  );
};

export default SaveNotesPage;
