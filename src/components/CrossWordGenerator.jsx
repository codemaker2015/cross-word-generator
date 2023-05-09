import React from "react";
import { useState, useEffect, useRef } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import { useReactToPrint } from "react-to-print";
import "./CrossWordGenerator.css";

function CrossWordGenerator() {
  const [data, setData] = useState({
    across: {
      // 1: { clue: "This", answer: "XXX", row: 0, col: 0 },
      // 4: { clue: "is", answer: "XXX", row: 0, col: 4 },
      // 7: { clue: "not", answer: "XXX", row: 1, col: 0 },
      // 8: { clue: "a", answer: "XXXX", row: 1, col: 4 },
      // 10: { clue: "real", answer: "XX", row: 2, col: 0 },
      // 11: { clue: "crossword", answer: "XX", row: 2, col: 3 },
      // 12: { clue: "it", answer: "XX", row: 2, col: 6 },
      // 13: { clue: "is", answer: "XXXXXX", row: 3, col: 0 },
    },
    down: {
      // 1: { clue: "create.", answer: "XXXX", row: 0, col: 0 },
      // 2: { clue: "All", answer: "XXXX", row: 0, col: 1 },
      // 3: { clue: "of", answer: "XX", row: 0, col: 2 },
      // 4: { clue: "the", answer: "XXXXXX", row: 0, col: 4 },
      // 5: { clue: "answers", answer: "XX", row: 0, col: 5 },
      // 6: { clue: "are", answer: "XXX", row: 0, col: 6 },
      // 9: { clue: '"X"', answer: "XX", row: 1, col: 7 },
      // 11: { clue: "ABC", answer: "XXXXXX", row: 2, col: 3 },
    },
  });
  const [direction, setDirection] = useState("across");
  const [number, setNumber] = useState(1);
  const [clue, setClue] = useState("");
  const [answer, setAnswer] = useState("");
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [showBoard, setShowBoard] = useState(true);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let datas = data;
    setData({});
    if (Object.keys(datas).length !== 0) {
      Object.assign(datas[direction], {
        [parseInt(number)]: {
          clue: clue,
          answer: answer,
          row: parseInt(row),
          col: parseInt(col),
        },
      });
      setData(datas);
    } else {
      setData({
        [direction]: {
          [parseInt(number)]: {
            clue: clue,
            answer: answer,
            row: parseInt(row),
            col: parseInt(col),
          },
        },
      });
    }
    loading();
	setClue("")
	setAnswer("")
  };

  const clearCrossWord = () => {
    setData({ across: {}, down: {} });
  };

  const removeItem = (direction, key) => {
    let datas = data;
    if (direction == "across") {
      let acrossData = Object.entries(data["across"])?.filter(
        ([k, v]) => k != key
      );
      datas["across"] = Object.fromEntries(acrossData);
    }
    if (direction == "down") {
      let downData = Object.entries(data["down"])?.filter(([k, v]) => k != key);
      datas["down"] = Object.fromEntries(downData);
    }
    setData(datas);
    loading();
  };

  const loading = () => {
    setShowBoard(false);
    setTimeout(() => {
      setShowBoard(true);
    }, 1000);
  };

  const getData = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL)
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  const generateRandom = () => {
    let randomData = [
      {
        across: {
          1: {
            clue: "A JavaScript front end framework for building websites",
            answer: "Angular",
            row: 0,
            col: 0,
          },
          3: {
            clue: "A set of rules that makes it possible for computers to communicate with each other",
            answer: "REST",
            row: 0,
            col: 6,
          },
          4: {
            clue: "Repetition of a process",
            answer: "Iteration",
            row: 5,
            col: 0,
          },
          7: {
            clue: "A database for web applications",
            answer: "MongoDB",
            row: 8,
            col: 0,
          },
          8: {
            clue: "Broken code that causes a program to malfunction",
            answer: "Bug",
            row: 8,
            col: 6,
          },
        },
        down: {
          1: {
            clue: "A sequence of problem-solving steps",
            answer: "Algorithm",
            row: 0,
            col: 0,
          },
          2: {
            clue: "Allows interactions between multiple software programs",
            answer: "API",
            row: 0,
            col: 5,
          },
          5: {
            clue: "An event is something that triggers a response in a program",
            answer: "Event",
            row: 5,
            col: 2,
          },
        },
      },
      {
        across: {
          1: {
            clue: "A group of templates for building the front end of a website",
            answer: "Bootstrap",
            row: 0,
            col: 0,
          },
          3: {
            clue: "A set of rules that makes it possible for computers to communicate with each other",
            answer: "API",
            row: 0,
            col: 7,
          },
          4: {
            clue: "A program that changes text-based code into the code a computer understands",
            answer: "Compiler",
            row: 8,
            col: 1,
          },
        },
        down: {
          2: {
            clue: "Software that is free for anyone to use",
            answer: "OpenSource",
            row: 0,
            col: 1,
          },
          5: {
            clue: "A linear data structure which follows LIFO",
            answer: "Stack",
            row: 0,
            col: 4,
          },
          6: {
            clue: "A set of rules that makes it possible for computers to communicate with each other",
            answer: "REST",
            row: 0,
            col: 6,
          },
          7: {
            clue: "A scripting language used for websites",
            answer: "PHP",
            row: 0,
            col: 8,
          },
        },
      },
      {
        across: {
          1: {
            clue: "Software that is free for anyone to use",
            answer: "OpenSource",
            row: 0,
            col: 0,
          },
          3: {
            clue: "An event is something that triggers a response in a program",
            answer: "Event",
            row: 5,
            col: 1,
          },
        },
        down: {
          2: { clue: "A member of a class", answer: "Objects", row: 0, col: 5 },
          4: {
            clue: "Contains a memory address instead of data",
            answer: "Pointer",
            row: 0,
            col: 1,
          },
          5: {
            clue: "A program that changes text-based code into the code a computer understands",
            answer: "Compiler",
            row: 0,
            col: 8,
          },
          6: { clue: "Empty or without value", answer: "NULL", row: 0, col: 3 },
        },
      },
      {
        across: {
          1: {
            clue: "A number, text string, or other value required for a function to run its code",
            answer: "Argument",
            row: 0,
            col: 0,
          },
          2: { clue: "Empty or without value", answer: "NULL", row: 3, col: 5 },
          3: {
            clue: "An open-source and free web server software",
            answer: "Apache",
            row: 2,
            col: 0,
          },
          4: {
            clue: "a system for electronic communication",
            answer: "ASCII",
            row: 7,
            col: 2,
          },
        },
        down: {
          1: {
            clue: "A method for getting data from a web server that uses XML, JavaScript, and HTML",
            answer: "AJAX",
            row: 0,
            col: 0,
          },
          4: {
            clue: "An event is something that triggers a response in a program",
            answer: "Event",
            row: 0,
            col: 5,
          },
          5: {
            clue: "A markup language that looks similar to HTML",
            answer: "XML",
            row: 3,
            col: 0,
          },
          6: {
            clue: "A JavaScript front end framework for building websites",
            answer: "Angular",
            row: 2,
            col: 2,
          },
        },
      },
      {
        across: {
          1: {
            clue: "A sequence of problem-solving steps",
            answer: "Algorithm",
            row: 0,
            col: 0,
          },
          4: {
            clue: "Allows interactions between multiple software programs",
            answer: "API",
            row: 5,
            col: 0,
          },
          5: {
            clue: "An open-source and free web server software",
            answer: "Apache",
            row: 4,
            col: 4,
          },
        },
        down: {
          1: {
            clue: "A JavaScript front end framework for building websites",
            answer: "Angular",
            row: 0,
            col: 0,
          },
          2: { clue: "Permanent code", answer: "Hardcode", row: 0, col: 7 },
          3: {
            clue: "A set of rules that makes it possible for computers to communicate with each other",
            answer: "REST",
            row: 0,
            col: 4,
          },
          6: {
            clue: "A linear data structure which follows LIFO",
            answer: "Stack",
            row: 2,
            col: 4,
          },
          7: {
            clue: "An event is something that triggers a response in a program",
            answer: "Event",
            row: 4,
            col: 9,
          },
        },
      },
      {
        across: {
          1: {
            clue: "A number, text string, or other value required for a function to run its code",
            answer: "Argument",
            row: 0,
            col: 0,
          },
          2: { clue: "Empty or without value", answer: "API", row: 2, col: 4 },
          3: {
            clue: "A sequence of problem-solving steps",
            answer: "Algorithm",
            row: 4,
            col: 1,
          },
        },
        down: {
          4: {
            clue: "A set of rules that makes it possible for computers to communicate with each other",
            answer: "REST",
            row: 0,
            col: 1,
          },
          5: {
            clue: "A linear data structure which follows LIFO",
            answer: "Stack",
            row: 2,
            col: 1,
          },
          6: {
            clue: "A database for web applications",
            answer: "MongoDB",
            row: 0,
            col: 4,
          },
          7: {
            clue: "Broken code that causes a program to malfunction",
            answer: "Bug",
            row: 6,
            col: 4,
          },
        },
      },
      {
        across: {
          1: {
            clue: "Software that is free for anyone to use",
            answer: "OpenSource",
            row: 0,
            col: 0,
          },
          2: {
            clue: "Contains a memory address instead of data",
            answer: "Pointer",
            row: 2,
            col: 1,
          },
          3: {
            clue: "A program that changes text-based code into the code a computer understands",
            answer: "Compiler",
            row: 6,
            col: 2,
          },
          4: {
            clue: "A linear data structure which follows LIFO",
            answer: "Stack",
            row: 8,
            col: 2,
          },
          5: {
            clue: "A common data storage format used in many web apps",
            answer: "JSON",
            row: 4,
            col: 2,
          },
        },
        down: {
          6: {
            clue: "A scripting language used for websites",
            answer: "PHP",
            row: 0,
            col: 1,
          },
          7: { clue: "A member of a class", answer: "Object", row: 2, col: 2 },
          8: {
            clue: "A set of rules that makes it possible for computers to communicate with each other",
            answer: "REST",
            row: 6,
            col: 9,
          },
          9: {
            clue: "An event is something that triggers a response in a program",
            answer: "Event",
            row: 0,
            col: 9,
          },
        },
      },
    ];
    setData(randomData[Math.floor(Math.random() * 7)]);
  };

  return (
    <div className="container-column">
      <div className="header-container">Cross Word Generator</div>
      {/* Form division */}
      <div className="container-row">
        <div className="form-container">
          <h3>Add Entries</h3>
          <form onSubmit={handleSubmit}>
            <div className="container-row">
              <label className="inp-label">Direction</label>
              <input
                className="inp-field"
                type="radio"
                value={"across"}
                checked
                name="direction"
                onChange={(e) => setDirection(e.target.value)}
              />
              {"Across"}
              <input
                className="inp-field"
                type="radio"
                value={"down"}
                name="direction"
                onChange={(e) => setDirection(e.target.value)}
              />
              {"Down"}
            </div>
            <div className="container-column">
              <label className="inp-label">Number</label>
              <input
                className="inp-field"
                type="number"
                name="number"
				min={1}
				max={30}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="container-column">
              <label className="inp-label">Clue</label>
              <input
                className="inp-field"
                type="text"
                name="clue"
                value={clue}
                onChange={(e) => setClue(e.target.value)}
              />
            </div>
            <div className="container-column">
              <label className="inp-label">Answer</label>
              <input
                className="inp-field"
                type="text"
                name="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="container-column">
              <label className="inp-label">Row</label>
              <input
                className="inp-field"
                type="number"
                name="row"
				min={0}
				max={30}
                value={row}
                onChange={(e) => setRow(e.target.value)}
              />
            </div>
            <div className="container-column">
              <label className="inp-label">Col</label>
              <input
                className="inp-field"
                type="number"
                name="col"
				min={0}
				max={30}
                value={col}
                onChange={(e) => setCol(e.target.value)}
              />
            </div>
            <input type="submit" className="inp-btn" value="Add Element" />
          </form>
        </div>

        <div className="crossword-container container-row">
          <div ref={componentRef} style={{ width: "60%", padding: "15px" }}>
            <div id="report">
              {showBoard ? (
                <Crossword
                  data={data}
                  theme={{ numberColor: "rgba(0,0,0,0.9)" }}
                />
              ) : (
                <div>Generating...</div>
              )}
            </div>
          </div>
          {/* Show Data */}
          <div className="details">
            <div className="container-row">
              <button onClick={handlePrint} style={{ margin: "5px" }}>
                Download
              </button>
              <button onClick={clearCrossWord} style={{ margin: "5px" }}>
                Clear
              </button>
            </div>
            <div className="container-row">
              <button onClick={getData} style={{ margin: "5px" }}>
                Load
              </button>
              <button onClick={generateRandom} style={{ margin: "5px" }}>
                Generate
              </button>
            </div>
            <hr />
            <div className="item-header">Across</div>
            <div>(Number, Clue, Answer, Row, Col)</div>

            {Object.keys(data["across"])?.map(function (key) {
              return (
                <div className="detail-item">
                  <div>
                    {key}:{data["across"][key]?.clue},{" "}
                    {data["across"][key]?.answer}, {data["across"][key]?.row},{" "}
                    {data["across"][key]?.col}
                  </div>
                  <div onClick={() => removeItem("across", key)}>X</div>
                </div>
              );
            })}
            <div className="item-header">Down</div>
            <div>(Number, Clue, Answer, Row, Col)</div>

            {Object.keys(data["down"])?.map(function (key) {
              return (
                <div className="detail-item">
                  <div>
                    {key}:{data["down"][key]?.clue}, {data["down"][key]?.answer}
                    , {data["down"][key]?.row}, {data["down"][key]?.col}
                  </div>
                  <div onClick={() => removeItem("down", key)}>X</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrossWordGenerator;
