import { Button, TextField } from "@mui/joy";
import { useForm, FormProvider } from "react-hook-form";
import { useWatch } from "react-hook-form";
import QuestionBlock from "./QuestionBlock";
import { v4 as uuid } from "uuid";
import { QuestionBlockContext } from "../../context/questionBlockContext";
import { useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDebugValue, useState } from "react";

interface QuestionCommonFields {
  question: string;
  isRequired: boolean;
  key: string;
}

interface TextQuestion extends QuestionCommonFields {
  type: "text";
}

export interface MultiLineTextQuestion extends QuestionCommonFields {
  type: "multiLineText";
}

export interface OneFromManyQuestion extends QuestionCommonFields {
  type: "oneFromMany";
  options: {
    label: string;
    key: string;
  }[];
}

export interface SeveralFromManyQuestion extends QuestionCommonFields {
  type: "severalFromMany";
  options: {
    label: string;
    key: string;
  }[];
}

export type Question =
  | TextQuestion
  | MultiLineTextQuestion
  | OneFromManyQuestion
  | SeveralFromManyQuestion;

export interface IFormValues {
  name: string;
  desc: string;
  questions: Array<Question>;
  questionInFocus: Question | null;
}

const validationSchema = yup.object({
  name: yup.string().required().min(4),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required().min(3),
      })
    )
    .required(),
});

const CreateFormForm = () => {
  const form = useForm<IFormValues>({
    defaultValues: {
      name: "My new form",
      desc: "",
      questions: [],
      questionInFocus: null,
    },
    resolver: yupResolver(validationSchema),
  });

  const formQuestions = useFieldArray({
    control: form.control,
    name: "questions",
  });

  useWatch({ control: form.control, name: "questions" });

  const handleAddQuestion = () => {
    const newQuestion: TextQuestion = {
      type: "text",
      question: "",
      isRequired: false,
      key: uuid(),
    };

    formQuestions.append(newQuestion);

    form.setValue("questionInFocus", newQuestion);
  };

  const handleSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <Button type="submit" fullWidth>
          Submit
        </Button>
        <TextField {...form.register("name")} />

        <Button onClick={handleAddQuestion} className="mt-[20px]" fullWidth>
          Add question
        </Button>

        <div className="mt-[10px] flex flex-col gap-[10px]">
          {form.getValues("questions").map((question, i) => (
            <QuestionBlockContext.Provider
              key={question.key}
              value={{
                questionIndex: i,
              }}
            >
              <QuestionBlock />
            </QuestionBlockContext.Provider>
          ))}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateFormForm;
