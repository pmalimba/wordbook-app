import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  const getMeaning = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData(null); // reset if there's an error
      });
  };
  const playAudio = () => {
    if (data?.phonetics?.[0]?.audio) {
      const audio = new Audio(data.phonetics[0].audio);
      audio.play();
    } else {
      alert("No audio pronunciation available.");
    }
  };

  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button onClick={getMeaning}>
          <FaSearch size="20px" />
        </button>
      </div>

      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button onClick={playAudio}>
              <FcSpeaker size="26px" />
            </button>
          </h2>

          {/* Display phonetic text(s) */}
          <h4>Phonetics:</h4>
          {data.phonetics?.length > 0 ? (
            data.phonetics.map((item, index) =>
              item.text ? <p key={index}>{item.text}</p> : null
            )
          ) : (
            <p>No phonetic transcription available.</p>
          )}

          <h4>Parts of speech:</h4>
          <p>{data.meanings?.[0]?.partOfSpeech}</p>

          <h4>Definition:</h4>
          <p>{data.meanings?.[0]?.definitions?.[0]?.definition}</p>

          <h4>Example:</h4>
          <p>{data.meanings?.[0]?.definitions?.[0]?.example || "N/A"}</p>

          <h4>Synonyms:</h4>
          <p>
            {data.meanings?.[0]?.definitions?.[0]?.synonyms?.join(", ") ||
              "None"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
