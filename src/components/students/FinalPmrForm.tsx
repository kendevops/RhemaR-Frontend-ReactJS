import { FormEvent } from "react";
import useForm from "../../utility/hooks/useForm";
import FormRadioGroup from "../molecules/FormRadioGroup";
import { Spinner } from "reactstrap";
import useScorePmr from "../../hooks/mutations/classes/useScorePmr";
import { getUserData } from "../../utility/utilsGeneric";
import { useHistory } from "react-router-dom";
import handleError from "../../utils/handleError";

const fields = [
  { name: "Attitude", key: "attitude" },
  { name: "Work Ethic", key: "workEthic" },
  { name: "Response to Authority", key: "respToAuthority" },
  { name: "Team Work", key: "teamWork" },
  { name: "Ability to follow instructions", key: "followInstructions" },
];

const options = ["isExcellent", "isGood", "isFair", "isPoor"];

const initialState = {
  teamWork: {},
  workEthic: {},
  respToAuthority: {},
  followInstructions: {},
};

export default function FinalPMRForm() {
  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({
      initialState,
    });
  const history = useHistory();
  const studentData = getUserData();

  const { mutate, isLoading } = useScorePmr(studentData?.id);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        alert("Final PMR form submitted");
        history.push("/student/courses");
      },
      onError: (e) => {
        handleError(e, formData, toggleError);
      },
    });
  }

  return (
    <section className="row">
      <h3 className="title mb-4">Final PMR Assessment</h3>
      <form onSubmit={handleSubmit}>
        {fields?.map(({ key, name }) => {
          return (
            <div className="mb-5" key={key}>
              <FormRadioGroup
                label={name}
                options={options}
                onChange={(e) => {
                  updateForm(key as any, { [e.target.value]: true });
                }}
              />
            </div>
          );
        })}

        {isLoading ? (
          <Spinner />
        ) : (
          <button className="btn btn-blue-800 btn-lg w-100" type="submit">
            Submit
          </button>
        )}
      </form>
    </section>
  );
}
