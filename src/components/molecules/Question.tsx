import { useState } from "react";
import colors from "../../assets/img/Colors";
import typography from "../../assets/img/Typography";
import CardWrapper from "../students/CardWrapper";

export type QuestionProps = {
  id: string;
  index: number;
  text: string;
  options: string[];
  onSelect?: (answer: string, id: string) => void;
};

const letters = ["A", "B", "C", "D", "E"];

export default function Question({
  index,
  options,
  text,
  onSelect,
  id,
}: QuestionProps) {
  const [selected, setSelected] = useState(-1);

  return (
    <CardWrapper>
      {/* Top */}
      <div className="mb-4">
        <p className="mb-2">{`Question ${index + 1}`}</p>
        <h2
          style={{
            fontSize: typography.h2,
          }}
        >
          {text}
        </h2>
      </div>

      {/* Options */}
      <ul className="no-padding-left">
        {options?.map((o, i) => {
          const isSelected = selected === i;

          function handleClick() {
            setSelected(i);
            onSelect && onSelect(o, id);
          }

          return (
            <li
              style={{ cursor: "pointer" }}
              onClick={handleClick}
              key={o}
              className={`d-flex mt-3 align-items-center gap-3 p-3 rounded-3 ${
                isSelected
                  ? "bg-blue-800 text-white "
                  : "bg-blue-200 text-blue-500"
              }`}
            >
              <span
                className={`p-2 rounded-2`}
                style={{
                  borderStyle: "solid",
                  borderColor: isSelected ? "white" : colors.primary,
                }}
              >
                {letters[i]}
              </span>
              {o}
            </li>
          );
        })}
      </ul>
    </CardWrapper>
  );
}
