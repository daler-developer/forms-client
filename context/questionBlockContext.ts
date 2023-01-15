import { createContext, useContext } from "react";
import { Question } from "../components/create-form-form/CreateFormForm";

export interface QuestionBlockContextValues {
  question: Question;
  updateQuestion(callback: (question: Question) => Question): void;
  formPath: `questions.${number}`;
  deleteQuestion: () => void;
  duplicateQuestion: () => void;
  questionIndex: number;
  questionKey: string;
}

export const QuestionBlockContext = createContext<QuestionBlockContextValues>(
  null!
);

export const useQuestionBlockContext = <T extends Question>() => {
  return useContext(QuestionBlockContext) as {
    question: T;
    updateQuestion(callback: (question: T) => T): void;
    formPath: `questions.${number}`;
    deleteQuestion: () => void;
    duplicateQuestion: () => void;
    questionIndex: number;
    questionKey: string;
  };
};
