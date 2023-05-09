import { useState } from "react";
import axios from "axios";
import "./GenerateClues.css";
import { Link } from "react-router-dom";

function GenerateClues() {
  const [loading, setLoading] = useState(false);
  let [clues, setClues] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [prompt, setPrompt] = useState("");

  const getRes = () => {
    setLoading(true);

    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: {
        temperature: 0.5,
        n: 10,
        max_tokens: 4000,
        model: "text-davinci-003",
        prompt: `Generate cross word puzzle clues and words on ${prompt} without repeating the clues and words as one clue and answer in a single line.`,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          createCluesAndAnswers(res?.data?.choices);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message, e);
      });
  };

  const createCluesAndAnswers = (res) => {
    let clues1 = [],
      answers1 = [];
    res?.map((item, index) => {
      if (
        item?.text?.length > 0 &&
        item?.text?.includes("Clue") &&
        item?.text?.includes("Answer")
      ) {
        let parts = item?.text.split("\n");
        parts?.map((item1, index1) => {
          if (item1?.length > 0) {
            if (item1.includes("Clue")) {
              let clue = item1?.split(":")[1];
              if (clue) clues1.push(clue.trim());
            }
            if (item1.includes("Answer")) {
              let answer = item1?.split(":")[1];
              if (answer) answers1.push(answer.trim());
            }
          }
        });
      }
    });

    removeDuplicates(clues1, answers1);
  };

  const removeDuplicates = (clues, answers) => {
    const tempClues = clues;
    const tempAnswers = answers;
    const duplicateIndices = tempAnswers.reduce((acc, item, index) => {
      if (tempAnswers.indexOf(item) !== index && !acc.includes(index)) {
        acc.push(index);
      }
      return acc;
    }, []);

    for (let i = 0; i < duplicateIndices?.length; i++) duplicateIndices[i] -= i;

    duplicateIndices?.map((item, index) => {
      tempClues.splice(item, 1);
      tempAnswers.splice(item, 1);
    });
    console.log(tempClues, tempAnswers)
    setClues([...tempClues]);
    setAnswers([...tempAnswers]);
  };

  const handleInput = (index, type, value) => {
    if (type === "clue") {
      let temp = clues;
      temp[index] = value;
      setClues([...temp]);
    }
    if (type === "answer") {
      let temp = answers;
      temp[index] = value;
      setAnswers([...temp]);
    }
  };

  const removeRow = (index) => {
    let temp = clues;
    temp.splice(index, 1);
    setClues([...temp]);
    temp = answers;
    answers.splice(index, 1);
    setAnswers([...temp]);
  };

  const addRow = () => {
    let temp = clues;
    temp.push("");
    setClues([...temp]);
    temp = answers;
    answers.push("");
    setAnswers([...temp]);
  };

  return (
    <div className="container">
      <div className="container-column">
        <div className="container-column">
          <h2>Cross Word Generator</h2>
          {clues?.length === 0 && (
            <div className="container-column">
              <input
                type="text"
                placeholder="Enter preferred area"
                readOnly={loading}
                className="input-controls"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                value={prompt}
              />
              <button disabled={loading} onClick={getRes}>
                {loading ? "Loading... " : "Search"}
              </button>
            </div>
          )}
        </div>
        <div className="result-container">
          {/* res?.choices?.map((v, i) => <div key={i}>{v.text}</div>)} */}
          {!loading && (
            <div className="container-column">
              <div className="btn-add">
                <button onClick={addRow}>+</button>
              </div>
              {[...Array(clues?.length).keys()]?.map((item, index) => {
                return (
                  <div className="container-row">
                    <input
                      type="text"
                      className="result-input-clue"
                      value={clues[item]}
                      onChange={(e) =>
                        handleInput(item, "clue", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="result-input-answer"
                      value={answers[item]}
                      onChange={(e) =>
                        handleInput(item, "answer", e.target.value)
                      }
                    />
                    <button
                      className="btn-remove"
                      onClick={() => removeRow(item)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
              {clues?.length > 0 && (
                <div className="action-container">
                  <button
                    onClick={() => {
                      setClues([]);
                      setAnswers([]);
                    }}
                  >
                    Search Again
                  </button>
                  <Link to={"/generate"}>
                    <button onClick={() => {}}>Continue</button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateClues;
