"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface Props {
  id: number;
  question: string;
  answer: string;
  choice_1: string;
  choice_2: string;
  choice_3: string;
  choice_4: string;
  choice_5: string | null;
}

export const QuestionCard = ({
  id,
  question,
  answer,
  choice_1,
  choice_2,
  choice_3,
  choice_4,
  choice_5,
}: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <Card id={`q${id}`} className="col-span-1 shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between break-keep">
          <h5>{`${id}. ${question}`}</h5>
          <HeartIcon size={18} role="button" className="cursor-pointer" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id={`q${id}r1`} />
            <Label htmlFor={`q${id}r1`}>1. {choice_1}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id={`q${id}r2`} />
            <Label htmlFor={`q${id}r2`}>2. {choice_2}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id={`q${id}r3`} />
            <Label htmlFor={`q${id}r3`}>3. {choice_3}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id={`q${id}r4`} />
            <Label htmlFor={`q${id}r4`}>4. {choice_4}</Label>
          </div>
          {choice_5 && (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id={`q${id}r5`} />
              <Label htmlFor={`q${id}r5`}>4. {choice_5}</Label>
            </div>
          )}
        </RadioGroup>
      </CardContent>
      <CardFooter className="ml-auto space-x-2">
        <div className="font-semibold">{showAnswer && `정답: ${answer}번`}</div>
        <Button className="cursor-pointer" onClick={() => setShowAnswer((cur) => !cur)}>
          정답 확인
        </Button>
      </CardFooter>
    </Card>
  );
};
