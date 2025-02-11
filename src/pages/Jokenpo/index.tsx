import React, { useState } from "react";
import { useMemo } from "react";
import "./index.css";
import paperImg from "../../assets/paper.png";
import scissorImg from "../../assets/scissor.png";
import rockImg from "../../assets/rock.png";

interface ChoiceProps {
  value: string;
  win: string;
  img: string;
  color: string;
}

const JokenpoGame = () => {
  const choices: ChoiceProps[] = [
    { value: "scissor", win: "paper", img: scissorImg, color: "#2980B9" },
    { value: "rock", win: "scissor", img: rockImg, color: "#27AE60" },
    { value: "paper", win: "rock", img: paperImg, color: "#F1C40F" },
  ];

  const [userChoice, setUserChoice] = useState<ChoiceProps>();
  const [machineChoice, setMachineChoice] = useState<ChoiceProps>();
  const [userFinalResult, setUserFinalResult] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const randomlySetMachineChoice = () => {
    setTimeout(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setMachineChoice(randomChoice);
    }, 2000);
  };

  useMemo(() => {
    if (machineChoice?.value && userChoice?.value) {
      const finalResult =
        machineChoice.value === userChoice.value
          ? "Empate"
          : machineChoice.value === userChoice.win
          ? "Você ganhou!"
          : "Você perdeu";
      if (finalResult === "Você ganhou!") setScore(score + 1);
      else if (finalResult === "Você perdeu") setScore(score - 1);
      setUserFinalResult(finalResult);
    }
  }, [machineChoice]);

  return (
    <div>
      <div>
        <p style={{ fontSize: "30px" }}>Bem vindo ao Jokenpo Game!</p>
      </div>
      <div className="score-div">
        <p>Seus pontos</p>
        <p
          style={{
            color: score > 0 ? "green" : score === 0 ? "inherit" : "red",
          }}
        >
          {score}
        </p>
      </div>
      {!userChoice?.value ? (
        <div>
          <p style={{ fontSize: "26px" }}>Faça sua escolha!</p>
          <div className="grid-div">
            {choices.map((choice: ChoiceProps, index: number) => (
              <button
                className="choice-button"
                style={
                  index !== choices.length - 1
                    ? { color: choice.color }
                    : { color: choice.color, gridColumn: "span 2" }
                }
                onClick={() => {
                  setUserChoice(choice);
                  randomlySetMachineChoice();
                }}
              >
                <img src={choice.img} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="results-align">
            <div className="choice-div-wrapper">
              <div className="choice-div" style={{ color: userChoice.color }}>
                <img src={userChoice.img} />
              </div>
              <p>Você</p>
            </div>
            {machineChoice && userFinalResult !== "" ? (
              <div className="choice-div-wrapper">
                <div
                  className="choice-div"
                  style={{ color: machineChoice.color }}
                >
                  <img src={machineChoice.img} />
                </div>
                <p>Máquina</p>
              </div>
            ) : (
              <div className="choice-div-wrapper">
                <p>Máquina escolhendo...</p>
              </div>
            )}
          </div>
          <div>
            <p
              style={{
                color:
                  userFinalResult === "Você ganhou!"
                    ? "green"
                    : userFinalResult === "Empate"
                    ? "inherit"
                    : "red",
              }}
            >
              {userFinalResult}
            </p>
          </div>
          <button
            onClick={() => {
              setUserChoice({ value: "", win: "", img: "", color: "" });
              setMachineChoice({ value: "", win: "", img: "", color: "" });
              setUserFinalResult("");
            }}
            className="play-again-btn"
          >
            Jogar novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default JokenpoGame;
