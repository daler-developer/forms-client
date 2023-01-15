import { Button, formControlClasses, TextField } from "@mui/joy";
import { useForm, FormProvider } from "react-hook-form";
import { useWatch } from "react-hook-form";
import QuestionBlock from "./QuestionBlock";
import { createContext } from "react";
import { v4 as uuid } from "uuid";
import { QuestionBlockContext } from "../../context/questionBlockContext";
import { useFieldArray } from "react-hook-form";

interface QuestionCommonFields {
  question: string;
  order: number;
  isRequired: boolean;
  key: string;
}

interface TextQuestion extends QuestionCommonFields {
  type: "text";
}

interface MultiLineTextQuestion extends QuestionCommonFields {
  type: "multiLineText";
}

export interface OneFromManyQuestion extends QuestionCommonFields {
  type: "oneFromMany";
  options: {
    label: string;
    order: number;
    key: string;
  }[];
}

interface SeveralFromManyQuestion extends QuestionCommonFields {
  type: "severalFromMany";
  options: {
    label: string;
    order: number;
  };
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
}

const CreateFormForm = () => {
  const form = useForm<IFormValues>({
    defaultValues: {
      name: "",
      desc: "",
      questions: [],
    },
  });

  const formQuestions = useFieldArray({
    control: form.control,
    name: "questions",
  });

  useWatch({ control: form.control, name: "questions" });

  const handleAddQuestion = () => {
    form.setValue("questions", [
      ...form.getValues("questions"),
      {
        type: "text",
        question: "",
        isRequired: false,
        key: uuid(),
        order: 1,
      },
    ]);
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
        <TextField value="My new Form" />

        <Button onClick={handleAddQuestion} className="mt-[20px]" fullWidth>
          Add question
        </Button>

        <div className="mt-[10px]">
          {form.getValues("questions").map((question, i) => (
            <QuestionBlockContext.Provider
              key={question.key}
              value={{
                questionIndex: i,
                question,
                questionKey: question.key,
                formPath: `questions.${i}`,
                updateQuestion(callback) {
                  const updatedQuestion = callback(question);

                  formQuestions.update(i, updatedQuestion);
                },
                deleteQuestion() {
                  formQuestions.remove(i);
                },
                duplicateQuestion() {
                  formQuestions.append({ ...question, key: uuid() });
                },
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
