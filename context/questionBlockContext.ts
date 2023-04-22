import { createContext, useContext } from "react";
import { Question } from "../components/create-form-form/CreateFormForm";

export interface QuestionBlockContextValues {
  questionIndex: number;
}

export const QuestionBlockContext = createContext<QuestionBlockContextValues>(
  null!
);

export const useQuestionBlockContext = () => {
  return useContext(QuestionBlockContext);
};
