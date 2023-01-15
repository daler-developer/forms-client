import { QuestionMarkSharp } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  IconButton,
  Option,
  Select,
  Sheet,
  TextField,
} from "@mui/joy";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuestionBlockContext } from "../../context/questionBlockContext";
import { QuestionType } from "../../utils/types";
import { useFieldArray } from "react-hook-form";
import { IFormValues, Question } from "./CreateFormForm";
import OneFromManyQuestionOptions from "./one-from-many-question-options/OneFromManyQuestionOptions";
import { v4 as uuid } from "uuid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface IProps {}

const QuestionBlock = ({}: IProps) => {
  const questionBlockContext = useQuestionBlockContext<Question>();
  const formContext = useFormContext<IFormValues>();

  const formQuestions = useFieldArray({
    control: formContext.control,
    name: "questions",
  });

  const question = formContext.getValues(
    `questions.${questionBlockContext.questionIndex}`
  );

  const handleTypeChange = (_: any, to: QuestionType) => {
    let updatedQuestion: Question;

    switch (to) {
      case "oneFromMany":
        updatedQuestion = {
          key: question.key,
          order: question.order,
          isRequired: false,
          type: "oneFromMany",
          question: "",
          options: [
            {
              key: uuid(),
              label: "Option 1",
              order: 1,
            },
          ],
        };
        break;
      case "text":
        updatedQuestion = {
          key: question.key,
          order: question.order,
          isRequired: false,
          type: "text",
          question: "",
        };
        break;
    }

    formContext.setValue(
      `questions.${questionBlockContext.questionIndex}`,
      updatedQuestion!
    );
  };

  const handleDelete = () => {
    formQuestions.remove(questionBlockContext.questionIndex);
  };

  if (!question) {
    return null;
  }

  return (
    <Sheet variant="outlined" className="p-[15px] rounded-[4px]">
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
      <div className="mt-[20px]">
        {questionBlockContext.question.type === "oneFromMany" && (
          <OneFromManyQuestionOptions />
        )}
      </div>
      <div className="mt-[20px] flex items-center justify-end gap-[10px]">
        <IconButton onClick={questionBlockContext.duplicateQuestion} size="sm">
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
    </Sheet>
  );
};

export default QuestionBlock;
