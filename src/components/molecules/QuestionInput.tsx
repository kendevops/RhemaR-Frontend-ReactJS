import { ChangeEventHandler } from "react";
import useToggle from "../../utility/hooks/useToggle";
import CardWrapper from "../students/CardWrapper";
import FormInput from "./FormInput";
import { Icon } from "@iconify/react";

type QuestionInputProps = {
  serialNumber: number;
  onChangeQuestion: ChangeEventHandler<HTMLInputElement>;
  onChangeAnswer: ChangeEventHandler<HTMLInputElement>;
  onChangeOption: (option: number, value: string) => void;
};

export default function QuestionInput({
  serialNumber,
  onChangeOption,
  onChangeQuestion,
  onChangeAnswer,
}: QuestionInputProps) {
  const [open, toggleOpen] = useToggle();
  let options = ["A", "B", "C", "D"];

  return (
    <CardWrapper>
      <div className="d-flex gap-4 align-items-center">
        <div style={{ width: "95%" }}>
          <FormInput
            label={`Question ${serialNumber}`}
            onChange={onChangeQuestion}
          />
        </div>
        <button
          type="button"
          style={{ width: "5%", height: "50%" }}
          className="btn btn-lg  btn-blue-800"
          onClick={toggleOpen}
        >
          {open ? <Icon icon="mdi:caret-up" /> : <Icon icon="mdi:caret-down" />}
        </button>
      </div>

      {open && (
        <>
          <div className="row">
            {options?.map((o, i) => {
              return (
                <FormInput
                  label={`Option ${o}`}
                  onChange={(e) => onChangeOption(i, e?.target?.value)}
                  lg="6"
                />
              );
            })}
          </div>
          <FormInput label={`Answer`} onChange={onChangeAnswer} />
        </>
      )}
    </CardWrapper>
  );
}
