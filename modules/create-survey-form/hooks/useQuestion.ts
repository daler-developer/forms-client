import { useFieldArray, useFormContext } from "react-hook-form";
import { useQuestionContext } from "../context/questionContext";
import { IFormValues, Question } from "../components/CreateSurveyForm";

const useQuestion = () => {
  const questionContext = useQuestionContext();

  const formContext = useFormContext<IFormValues>();

  const formQuestions = useFieldArray({
    control: formContext.control,
    name: "questions",
  });

  const formPath: `questions.${number}` = `questions.${questionContext.questionIndex}`;

  const question = formContext.getValues(formPath);

  const isFirstQuestion = questionContext.questionIndex === 0;
  const isLastQuestion =
    questionContext.questionIndex + 1 === formQuestions.fields.length;

  return {
    question,
    isFirstQuestion,
    isLastQuestion,
  };
};

export { useQuestion };
