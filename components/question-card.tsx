"use client";
import { CircleIcon, HeartIcon, SlashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface Props {
  idx: number;
  question: string;
  answer: string;
  choice_1: string;
  choice_2: string;
  choice_3: string;
  choice_4: string;
  choice_5: string | null;
}

export const QuestionCard = ({
  idx,
  question,
  answer,
  choice_1,
  choice_2,
  choice_3,
  choice_4,
  choice_5,
}: Props) => {
  const [checkedAnswer, setCheckedAnswer] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswer = (val: string) => {
    setShowAnswer(false);
    setCheckedAnswer(parseInt(val));
  };
  return (
    <article className="p-5 relative flex flex-col border rounded-lg">
      {showAnswer && checkedAnswer == parseInt(answer) && (
        <CircleIcon
          className="absolute top-1/2 left-1/2 h-4/5 w-4/5 -translate-y-1/2 -translate-x-1/2 text-destructive pointer-events-none opacity-30"
          strokeWidth={1}
          size={128}
        />
      )}
      {showAnswer && checkedAnswer != parseInt(answer) && (
        <SlashIcon
          className="absolute top-1/2 left-1/2 h-4/5 w-4/5 -translate-y-1/2 -translate-x-1/2 text-destructive pointer-events-none opacity-30"
          strokeWidth={1}
          size={128}
        />
      )}
      <h4>{`${idx}. ${question}`}</h4>
      <div role="radiogroup" className="my-5 space-y-2 w-fit">
        {choice_1 && (
          <Choice
            idx={idx}
            checkedAnswer={checkedAnswer}
            choiceIdx={1}
            choice={choice_1}
            handleAnswer={handleAnswer}
          />
        )}

        {choice_2 && (
          <Choice
            idx={idx}
            checkedAnswer={checkedAnswer}
            choiceIdx={2}
            choice={choice_2}
            handleAnswer={handleAnswer}
          />
        )}

        {choice_3 && (
          <Choice
            idx={idx}
            checkedAnswer={checkedAnswer}
            choiceIdx={3}
            choice={choice_3}
            handleAnswer={handleAnswer}
          />
        )}

        {choice_4 && (
          <Choice
            idx={idx}
            checkedAnswer={checkedAnswer}
            choiceIdx={4}
            choice={choice_4}
            handleAnswer={handleAnswer}
          />
        )}

        {choice_5 && (
          <Choice
            idx={idx}
            checkedAnswer={checkedAnswer}
            choiceIdx={5}
            choice={choice_5}
            handleAnswer={handleAnswer}
          />
        )}
      </div>
      <div className="mt-auto pt-2 align-bottom border-t flex items-center justify-end gap-2">
        {showAnswer && parseInt(answer) == checkedAnswer && (
          <span className="mr-2 font-medium">정답: {answer}번</span>
        )}
        <Button onClick={() => setShowAnswer((cur) => !cur)}>채점</Button>
        <Button>해설</Button>
        <Button variant={"secondary"}>
          <HeartIcon strokeWidth={0} fill="#ffa1ad" />
        </Button>
      </div>
    </article>
  );
};

interface ChoiceProps {
  idx: number;
  choiceIdx: number;
  choice: string;
  checkedAnswer: number;
  handleAnswer: (val: string) => void;
}
const Choice = ({ idx, choiceIdx, choice, checkedAnswer, handleAnswer }: ChoiceProps) => (
  <>
    <input
      type="radio"
      id={`q-${idx}-c-${choiceIdx}`}
      name={`q-${idx}`}
      value={choiceIdx}
      className="hidden"
      onChange={(e) => handleAnswer(e.target.value)}
    />
    <label
      role="radio"
      aria-checked={choiceIdx == checkedAnswer}
      htmlFor={`q-${idx}-c-${choiceIdx}`}
      className={`mr-auto p-2 pr-10 block rounded-lg text-sm font-medium cursor-pointer hover:bg-secondary aria-checked:bg-secondary duration-150`}
    >
      {`${choiceIdx}. ${choice}`}
    </label>
  </>
);
