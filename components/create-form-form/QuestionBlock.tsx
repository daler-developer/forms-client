import { QuestionMarkSharp } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  IconButton,
  Option,
  Select,
  Sheet,
  TextField,
  Typography,
} from "@mui/joy";
import { useFormContext } from "react-hook-form";
import { useQuestionBlockContext } from "../../context/questionBlockContext";
import { QuestionType } from "../../utils/types";
import { useFieldArray } from "react-hook-form";
import { IFormValues, Question } from "./CreateFormForm";
import OneFromManyQuestionOptions from "./one-from-many-question-options/OneFromManyQuestionOptions";
import { v4 as uuid } from "uuid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import SeveralFromManyQuestionBody from "./SeveralFromManyQuestionBody";
import MultiLineTextQuestionBody from "./MultiLineTextQuestionBody";
import TextQuestionBody from "./TextQuestionBody";

const QuestionBlock = () => {
  const questionBlockContext = useQuestionBlockContext();
  const formContext = useFormContext<IFormValues>();

  const formPath: `questions.${number}` = `questions.${questionBlockContext.questionIndex}`;

  const question = formContext.getValues(formPath);

  const isInFocus =
    formContext.getValues("questionInFocus").key === question.key;

  const formQuestions = useFieldArray({
    control: formContext.control,
    name: "questions",
  });

  const isFirstQuestion = questionBlockContext.questionIndex === 0;
  const isLastQuestion =
    questionBlockContext.questionIndex + 1 === formQuestions.fields.length;

  const isMoveUpBtnDisabled = isFirstQuestion;
  const isMoveDownBtndisabled = isLastQuestion;

  const isMinimized = !isInFocus;

  const handleTypeChange = (_: unknown, to: QuestionType) => {
    let updatedQuestion: Question;

    switch (to) {
      case "oneFromMany":
        updatedQuestion = {
          key: question.key,
          isRequired: false,
          type: "oneFromMany",
          question: "",
          options: [
            {
              key: uuid(),
              label: "Option 1",
            },
          ],
        };
        break;
      case "text":
        updatedQuestion = {
          key: question.key,
          isRequired: false,
          type: "text",
          question: "",
        };
        break;
      case "multiLineText":
        updatedQuestion = {
          key: question.key,
          isRequired: false,
          type: "multiLineText",
          question: "",
        };
        break;
      case "severalFromMany":
        updatedQuestion = {
          key: question.key,
          isRequired: false,
          type: "severalFromMany",
          question: "",
          options: [
            {
              key: uuid(),
              label: "Option 1",
            },
          ],
        };
        break;
    }

    formContext.setValue(
      `questions.${questionBlockContext.questionIndex}`,
      updatedQuestion!
    );
  };

  const setCurrentQuestionInFocus = () => {
    formContext.setValue("questionInFocus", question);
  };

  const handleDelete = () => {
    formQuestions.remove(questionBlockContext.questionIndex);
  };

  const moveQuestionUp = () => {
    formQuestions.swap(
      questionBlockContext.questionIndex,
      questionBlockContext.questionIndex - 1
    );
  };

  const moveQuestionDown = () => {
    formQuestions.swap(
      questionBlockContext.questionIndex,
      questionBlockContext.questionIndex + 1
    );
  };

  const handleDuplicate = () => {
    formQuestions.append({ ...question, key: uuid() });
  };

  const handleClick = async () => {
    const result = await formContext.trigger(formPath);

    setCurrentQuestionInFocus();
  };

  if (!question) {
    return null;
  }

  return (
    <Sheet
      onClick={handleClick}
      variant="outlined"
      className="p-[15px] rounded-[4px] relative"
    >
      {isInFocus && (
        <div className="absolute top-0 left-0 bottom-0 w-[5px] bg-blue-500" />
      )}

      {false ? (
        <div>
          <Typography>
            {formContext.getValues(
              `questions.${questionBlockContext.questionIndex}.question`
            )}
            <Typography color="danger">{question.isRequired && "*"}</Typography>
          </Typography>
        </div>
      ) : (
        <div className="flex gap-[10px]">
          <TextField
            {...formContext.register(
              `questions.${questionBlockContext.questionIndex}.question`
            )}
            className="flex-grow"
            placeholder="Question"
          />
          <Select
            onChange={handleTypeChange as any}
            value={question.type}
            className="flex-grow"
            defaultValue="text"
          >
            <Option value="text">Text</Option>
            <Option value="multiLineText">Multi-line text</Option>
            <Option value="oneFromMany">One from many</Option>
            <Option value="severalFromMany">Several from many</Option>
          </Select>
        </div>
      )}

      <div className="mt-[20px]">
        {question.type === "oneFromMany" && (
          <OneFromManyQuestionOptions isMinimized={isMinimized} />
        )}
        {question.type === "severalFromMany" && <SeveralFromManyQuestionBody />}
        {question.type === "multiLineText" && <MultiLineTextQuestionBody />}
        {question.type === "text" && <TextQuestionBody />}
      </div>

      {true && (
        <div className="mt-[20px] flex items-center gap-[10px]">
          <IconButton
            disabled={isMoveUpBtnDisabled}
            size="sm"
            onClick={() => moveQuestionUp()}
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            disabled={isMoveDownBtndisabled}
            size="sm"
            onClick={() => moveQuestionDown()}
          >
            <ArrowDownward />
          </IconButton>

          <IconButton className="ml-auto" onClick={handleDuplicate} size="sm">
            <ContentCopyIcon />
          </IconButton>
          <IconButton onClick={handleDelete} size="sm" color="danger">
            <DeleteOutlineIcon />
          </IconButton>
          <Checkbox
            label="Required"
            {...formContext.register(
              `questions.${questionBlockContext.questionIndex}.isRequired`
            )}
          />
        </div>
      )}
    </Sheet>
  );
};

export default QuestionBlock;
