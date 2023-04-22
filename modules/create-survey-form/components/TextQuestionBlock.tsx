import { TextField } from "@mui/joy";
import { useQuestion } from "../hooks/useQuestion";
import { TextQuestion } from "./CreateSurveyForm";
import QuestionBlock from "./QuestionBlock";

const TextQuestionBlock = () => {
  const {question} = useQuestion()

  return (
    <QuestionBlock>
      <div>
        {question.id}
      </div>
      <div>
        {question.question}
      </div>
    </QuestionBlock>
  )
};

export default TextQuestionBlock;
