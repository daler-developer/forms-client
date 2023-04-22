import { Typography, IconButton, Radio, TextField } from "@mui/joy";
import { useEffect, useRef } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormValues, OneFromManyQuestion, Question } from "../CreateFormForm";
import { useQuestionBlockContext } from "../../../context/questionBlockContext";
import { v4 as uuid } from "uuid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

interface IProps {
  isMinimized: boolean;
}

export default ({ isMinimized }: IProps) => {
  const formContext = useFormContext<IFormValues>();
  const questionBlockContext = useQuestionBlockContext();

  const questionOptions = useFieldArray({
    control: formContext.control,
    name: `questions.${questionBlockContext.questionIndex}.options`,
  });

  const addOption = () => {
    const generateNewOptionInitialValue = () =>
      "Option " + String(questionOptions.fields.length + 1);

    questionOptions.append({
      label: generateNewOptionInitialValue(),
      key: uuid(),
    });
  };

  const deleteOption = (optionIndex: number) => {
    questionOptions.remove(optionIndex);
  };

  const moveOptionUpward = (optionIndex: number) => {
    const isFirstOption = optionIndex === 0;

    if (!isFirstOption) {
      questionOptions.swap(optionIndex, optionIndex - 1);
    }
  };

  const moveOptionDownward = (optionIndex: number) => {
    const isLastOption = optionIndex + 1 === questionOptions.fields.length;

    if (!isLastOption) {
      questionOptions.swap(optionIndex, optionIndex + 1);
    }
  };

  // if (isMinimized) {
  //   return (
  //     <div className="">
  //       {questionOptions.fields.map((option, optionIndex) => (
  //         <div key={option.key} className="flex items-center gap-[5px]">
  //           <Radio disabled />
  //           <Typography>{option.label}</Typography>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-[10px]">
      {questionOptions.fields.map((option, optionIndex) => (
        <div key={option.key} className="flex items-center gap-[5px]">
          <Radio disabled />
          <TextField
            className="flex-grow"
            placeholder="Enter text"
            {...formContext.register(
              `questions.${questionBlockContext.questionIndex}.options.${optionIndex}.label`
            )}
          />
          <IconButton
            disabled={optionIndex === 0}
            size="sm"
            onClick={() => moveOptionUpward(optionIndex)}
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            disabled={optionIndex + 1 === questionOptions.fields.length}
            size="sm"
            onClick={() => moveOptionDownward(optionIndex)}
          >
            <ArrowDownward />
          </IconButton>
          <IconButton
            className="ml-auto"
            size="sm"
            color="danger"
            onClick={() => deleteOption(optionIndex)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      ))}
      <div key="add-new-option" className="flex items-center gap-[5px]">
        <Radio disabled />
        <TextField
          className="flex-grow"
          variant="plain"
          onClick={() => addOption()}
          placeholder="Enter text"
        />
      </div>
    </div>
  );
};
