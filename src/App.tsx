import { useState } from "react";
import { FC } from "react";
import "./index.scss";

interface Question {
  title: string;
  variants: string[];
  correct: number;
}

const questions: Question[] = [
  {
    title: "У кого был третий глаз?",
    variants: ["Гаара", "Мадара", "Какаши"],
    correct: 0,
  },
  {
    title: "Кто не имел вечный мангеку шаринган?",
    variants: ["Саске", "Индра", "Мадара"],
    correct: 1,
  },
  {
    title: "Во сколько лет Обито напал на Коноху?",
    variants: ["25", "17", "14"],
    correct: 2,
  },
];

interface IResultProps {
  correct: number;
}
const Result: FC<IResultProps> = ({ correct }) => {
  return (
    <div className='result'>
      <img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' />
      <h2>
        Вы отгадали {correct} ответа из {questions.length}
      </h2>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
};

interface IGameProps {
  question: Question;
  onClickVariant: (index: number) => void;
  step: number;
}

const Game: FC<IGameProps> = ({ question, onClickVariant, step }) => {
  const percent: number = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className='progress'>
        <div style={{ width: `${percent}%` }} className='progress__inner'></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
};

function App() {
  const [step, setStep] = useState(0);
  const question = questions[step];
  const [correct, setCorrect] = useState(0);

  const onClickVariant = (index: number) => {
    console.log(step, index);
    setStep(step + 1);
    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  };
  return (
    <div className='App'>
      {step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
}

export default App;
