import React, { useState } from "react";
import axios from "axios";
import "./body.css";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { MdRestartAlt } from "react-icons/md";
import {RiSpeakFill} from 'react-icons/ri';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Body() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // const HTTP = "http://localhost:8020/chat";
  const HTTP = "https://scintillating-piroshki-458886.netlify.app/chat"
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${HTTP}`, { transcript })
      .then((res) => setResponse(res.data))
      .catch((error) => {
        console.log(error);
      });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSpeak = () => {
    const chunks = response.split(".");
    setIsSpeaking(true);

    const speakChunk = (index) => {
      if (index >= chunks.length) {
        setIsSpeaking(false); // Set isSpeaking to false when all chunks are spoken
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index].trim());
      utterance.onend = () => {
        speakChunk(index + 1); // Speak the next chunk after the current one ends
      };
      speechSynthesis.speak(utterance);
    };

    speakChunk(0); // Start speaking from the first chunk
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <body className="main-section">
      <div className="content">
        <h2>Ask a question</h2>
        <input
          name="prompt"
          id="prompt-text-area"
          placeholder="Recorded audio will display here"
          value={transcript}
          readOnly
        ></input>
        <div className="recording-btns">
          <button
            // type="submit"
            className="record-btn"
            onClick={SpeechRecognition.startListening}
          >
            Start Recording <BsFillMicFill />
          </button>
          <button
            type="button"
            className="record-btn"
            onClick={(e) => {
              e.preventDefault();
              SpeechRecognition.stopListening();
              handleSubmit(e);
            }}
          >
            End Recording <BsFillMicMuteFill />
          </button>
          <button className="record-btn" id="reset" reset-btn onClick={resetTranscript}>
            Reset <MdRestartAlt />
          </button>
        </div>

        <div className="response-area">
          <p>{response ? response : "Response . . ."}</p>
        </div>

        <button className="record-btn" onClick={handleSpeak} disabled={!transcript || isSpeaking}>
          Response Audio <RiSpeakFill />
        </button>
      </div>
    </body>
  );
}

export default Body;
