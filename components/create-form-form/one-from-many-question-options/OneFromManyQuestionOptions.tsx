import { Button, IconButton, Radio, TextField } from "@mui/joy";
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

interface IProps {}

export default ({}: IProps) => {
  const formContext = useFormContext<IFormValues>();
  const questionBlockContext = useQuestionBlockContext<OneFromManyQuestion>();

  const questionOptions = useFieldArray({
    control: formContext.control,
    name: `questions.${questionBlockContext.questionIndex}.options`,
  });

  const addOption = () => {
    const generateNewOptionInitialValue = () =>
      "Option " + String(questionOptions.fields.length + 1);
    const generateNewOptionOrder = () => questionOptions.fields.length + 1;

    questionOptions.append({
      label: generateNewOptionInitialValue(),
      order: generateNewOptionOrder(),
      key: uuid(),
    });
  };

  const deleteOption = (optionIndex: number) => {
    questionOptions.remove(optionIndex);
  };

  const moveOptionUpward = (optionIndex: number) => {
    questionOptions.swap(optionIndex, optionIndex--);
  };

  const moveOptionDownward = (optionIndex: number) => {
    questionOptions.swap(optionIndex, optionIndex++);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {questionBlockContext.question.options.map((option, optionIndex) => (
        <div key={option.key} className="flex items-center gap-[5px]">
          <Radio disabled />
          <TextField
            className="flex-grow"
            placeholder="Enter text"
            {...formContext.register(
              `${questionBlockContext.formPath}.options.${optionIndex}.label`
            )}
          />
          <IconButton onClick={() => moveOptionUpward(optionIndex)}>
            <ArrowUpward />
          </IconButton>
          <IconButton onClick={() => moveOptionDownward(optionIndex)}>
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
