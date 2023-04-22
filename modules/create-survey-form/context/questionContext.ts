import { createContext, useContext } from "react";

export interface QuestionBlockContextValues {
  questionIndex: number;
}

export const QuestionContext = createContext<QuestionBlockContextValues>(null!);

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};
