import useForm from "../../utility/hooks/useForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import FormDropdown from "../molecules/FormDropdown";
import TextArea from "../molecules/TextArea";
import useCreateCourse from "../../hooks/mutations/classes/useCreateCourse";
import useCreateFAQ from "../../hooks/queries/faqs/useCreateFAQ";
import useEditCourse from "../../hooks/mutations/classes/useEditCourse";
import useUpdateFaq from "../../hooks/queries/faqs/useUpdateFAQ";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllFaqs from "../../hooks/queries/faqs/useAllFaqs";

type AssignInstructorModalProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: {
    id?: string;
    question: string;
    answer: string;
    category: string;
    // placeholder?: string;
  };
};

const options = [
  "Exam & Courses",
  "Tuition & Payment",
  "Login & Security",
  "Events & Meetings",
];

export default function AddFaq({
  toggle,
  visibility,
  defaultValues,
}: AssignInstructorModalProps) {
  const { refetch, data } = useAllFaqs();

  const { formData, updateForm } = useForm({
    initialState: defaultValues ?? {
      category: "",
      question: "",
      answer: "",
    },
  });

  console.log(defaultValues);

  const isCreating = !defaultValues;

  const createCourse = useCreateCourse();
  const createFAQ = useCreateFAQ();

  const isLoading = createCourse.isLoading;

  const { isLoading: editIsLoading, mutate: mutateEdit } = useUpdateFaq(
    defaultValues?.id
  );

  function handleSubmit(e: FormEvent) {
    e?.preventDefault();

    // formData.isActive = formData.isActive === "false" ? false : (true as any);

    /// Creating
    if (!defaultValues) {
      createCourse.mutate(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"FAQ added successfully"}
            />,
            ToastContent.Config
          );
          refetch();
          toggle();
        },

        onError: (e: any) => {
          handleError(e);
          console.log(e);

          !isLoading && toggle();
        },
      });
      return;
    }

    // Modifying

    if (defaultValues) {
      mutateEdit(formData, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"FAQ edited successfully"}
            />,
            ToastContent.Config
          );
          refetch();
          toggle();
        },

        onError: (e: any) => {
          console.log(e);
          handleError(e);

          !editIsLoading && toggle();
        },
      });

      return;
    }
    // if (!!defValues) return;
  }

  return (
    <>
      <Modal
        centered
        isOpen={visibility}
        toggle={toggle}
        id="assignInstructorModal"
      >
        <ModalHeader toggle={toggle}>
          {defaultValues ? "Update F.A.Q" : "Add F.A.Q"}
        </ModalHeader>
        <ModalBody>
          <form className="mt-3" onSubmit={handleSubmit}>
            {/* dropdown */}
            <FormDropdown
              title="Category"
              value={formData?.category as any}
              options={options?.map((o) => ({
                children: o,
                onClick: () => updateForm("category", o),
              }))}
            />

            {/* question */}
            <FormInput
              label="Question"
              value={formData?.question}
              onChange={(e) => updateForm("question", e.target.value)}
              placeholder="Enter Question"
            />

            {/* answer */}
            <TextArea
              value={formData?.answer as any}
              onChange={(e: { target: { value: any } }) =>
                updateForm("answer", e.target.value)
              }
              placeholder="Enter Answer"
            />

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {defaultValues ? "Update Question" : "Publish Question"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
