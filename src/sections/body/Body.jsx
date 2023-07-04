import React, { useState } from "react";
import axios from "axios";
import "./body.css";
import { BsFillMicFill } from "react-icons/bs";
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

  const HTTP = "http://localhost:8020/chat";
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
    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <body>
      <div className="content">
        <h2>Ask Me Something!</h2>
        {/* <p>Microphone: {useSpeechRecognition.listening ? "on" : "off"}</p> */}
        <textarea
          name="prompt"
          id="prompt-text-area"
          placeholder="Recorded audio will display here"
          value={transcript}
          readOnly
        ></textarea>
        <button
          // type="submit"
          className="record-btn"
          onClick={SpeechRecognition.startListening}
        >
          Start <BsFillMicFill />
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
          Stop <BsFillMicFill />
        </button>

        <button reset-btn onClick={resetTranscript}>
          Reset
        </button>

        <div className="response-area">
          <p>{response ? response : "Ask me anything"}</p>
        </div>

        <button onClick={handleSpeak} disabled={!transcript || isSpeaking}>
          Speak
        </button>
      </div>
    </body>
  );
}

export default Body;
