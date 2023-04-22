import { Typography, IconButton, Radio, TextField, Checkbox } from "@mui/joy";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useQuestionBlockContext } from "../../context/questionBlockContext";
import { IFormValues, SeveralFromManyQuestion } from "./CreateFormForm";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

const SeveralFromManyQuestionBody = () => {
  const formContext = useFormContext<IFormValues>();
  const questionBlockContext = useQuestionBlockContext();

  const questionOptions = useFieldArray({
    control: formContext.control,
    name: `questions.${questionBlockContext.questionIndex}.options`,
  });

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

  const deleteOption = (optionIndex: number) => {
    questionOptions.remove(optionIndex);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      {(questionOptions.fields as SeveralFromManyQuestion["options"]).map(
        (option, optionIndex) => (
          <div key={option.key} className="flex items-center gap-[5px]">
            <Checkbox disabled />
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
        )
      )}
    </div>
  );
};

export default SeveralFromManyQuestionBody;
