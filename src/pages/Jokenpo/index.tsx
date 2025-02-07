import React, { useState } from "react";
import { useMemo } from "react";
import "./index.css";

interface Choices {
  value: string;
  win: string;
}
const JokenpoGame = () => {
  const choices: Choices[] = [
    { value: "scissor", win: "paper" },
    { value: "rock", win: "scissor" },
    { value: "paper", win: "rock" },
  ];
  const [userChoice, setUserChoice] = useState<Choices>();
  const [machineChoice, setMachineChoice] = useState<Choices>();
  const [userFinalResult, setUserFinalResult] = useState<string>("");

  const randomlySetMachineChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log(randomChoice);
    setMachineChoice(randomChoice);
  };

  useMemo(() => {
    if (machineChoice && userChoice) {
      const finalResult =
        machineChoice.value === userChoice.value
          ? "draw"
          : machineChoice.value === userChoice.win
          ? "win"
          : "lose";

      setUserFinalResult(finalResult);
    }
  }, [machineChoice]);

  return (
    <div>
      <div className="score-div">
        <p>Score</p>
        <p>100</p>
      </div>
      {!userChoice ? (
        <div>
          {choices.map((choice) => (
            <button
              onClick={() => {
                setUserChoice(choice);
                randomlySetMachineChoice();
              }}
            >
              {choice.value}
            </button>
          ))}
        </div>
      ) : machineChoice && userFinalResult !== "" ? (
        <div>
          <div>
            <p>{userChoice.value}</p>
            <p>{machineChoice.value}</p>
          </div>
          <div>
            <p>{userFinalResult}</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div>Texto</div>
    </div>
  );
};

export default JokenpoGame;
