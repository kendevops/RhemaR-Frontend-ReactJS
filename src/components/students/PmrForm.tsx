import { FormEvent, useState } from "react";
import useSubmitPmr from "../../hooks/mutations/classes/useSubmitPmr";
import useForm from "../../utility/hooks/useForm";
import handleError from "../../utils/handleError";
import FormInput from "../molecules/FormInput";
import { Spinner } from "reactstrap";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";
import FormDropdown from "../molecules/FormDropdown";
import ToastContent from "../molecules/ToastContent";
import { toast } from "react-toastify";

const initialState = {
  area: "",
  church: "",
  studentComment: " ",
  mentorComment: " ",
  level: " ",
};

const initialData = {
  date: "",
  timeCompleted: 0,
  accomplishedMinistryDesc: "",
};

export default function PMRForm() {
  const { mutate, isLoading } = useSubmitPmr();
  const { data: levelData } = useCampusLevel();
  const levels = levelData?.map((v: any) => v.name);

  console.log(levelData);

  const { formData, formErrors, formIsValid, toggleError, updateForm } =
    useForm({ initialState });

  const [studentData, setStudentData] = useState([initialData]);

  function addData() {
    setStudentData((p) => {
      return [...p, initialData];
    });
  }

  function removeData(index: number) {
    setStudentData((p) => {
      return p?.filter((_, i) => i !== index);
    });
  }

  function updateData(
    index: number,
    field: keyof typeof initialData,
    value: any
  ) {
    setStudentData((p) => {
      const selected: any = p[index];
      selected[field] = value;
      return p;
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formIsValid) {
      alert("Please fill in all fields");
      console.log(formData);
      return;
    }

    mutate(
      {
        ...formData,
        studentData,
      },
      {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Form submitted"}
              message={"Form submitted successfully"}
            />
          );
        },
        onError: (e) => handleError(e, formData, toggleError),
      }
    );
  }

  return (
    <section className="row">
      <h3 className="title mb-4">PMR Form</h3>

      <form onSubmit={handleSubmit}>
        <FormInput
          hasErrors={formErrors.area}
          label="Area"
          onChange={(e) => updateForm("area", e.target.value)}
        />

        <FormInput
          hasErrors={formErrors.church}
          label="Church"
          onChange={(e) => updateForm("church", e.target.value)}
        />

        <FormInput
          hasErrors={formErrors.studentComment}
          label="Student Comment"
          onChange={(e) => updateForm("studentComment", e.target.value)}
        />

        <FormInput
          hasErrors={formErrors.mentorComment}
          label="Mentor Comment"
          onChange={(e) => updateForm("mentorComment", e.target.value)}
        />

        <FormDropdown
          title="Select Level"
          value={formData?.level}
          options={levels?.map((d: any) => ({ children: d }))}
          onChange={(e) => updateForm("level", e?.target?.value)}
        />

        {/* Student Data */}
        <div className="d-flex align-items-center justify-content-between">
          <h2>Slots </h2>
          <u onClick={() => addData()}>Add +</u>
        </div>
        {studentData?.map((v, i) => {
          return (
            <article key={i.toString()}>
              <FormInput
                hasErrors={formErrors.studentData}
                label="Description of Ministry Accomplished"
                onChange={(e) =>
                  updateData(i, "accomplishedMinistryDesc", e.target.value)
                }
              />
              <div className="d-flex gap-3">
                <FormInput
                  hasErrors={formErrors.studentData}
                  label="Date"
                  type="date"
                  onChange={(e) =>
                    updateData(
                      i,
                      "date",
                      new Date(e?.target?.value).toISOString()
                    )
                  }
                  lg="6"
                />
                <FormInput
                  hasErrors={formErrors.studentData}
                  label="Time Completed"
                  type="number"
                  onChange={(e) =>
                    updateData(i, "timeCompleted", parseInt(e?.target?.value))
                  }
                  lg="6"
                />
              </div>
              {i > 0 && <u onClick={() => removeData(i)}>Delete</u>}
            </article>
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
