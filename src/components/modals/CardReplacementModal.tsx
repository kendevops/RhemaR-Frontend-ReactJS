import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { Autocomplete, TextField } from "@mui/material";
import handleError from "../../utils/handleError";
import ToastContent from "../molecules/ToastContent";
import { toast } from "react-toastify";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";
import useRequestCardReplacement from "../../hooks/mutations/classes/useRequstCardReplacement";
import useUpateCardReplacement from "../../hooks/mutations/classes/useUpdateCardReplacement";

interface CareReplacementModalModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  level?: string;
  onCreate?: VoidFunction;
  defaultValues?: any;
}

export default function CareReplacementModal({
  toggle,
  visibility,
  onCreate,
  defaultValues,
  level,
}: CareReplacementModalModalProps) {
  const createCardReplacement = useRequestCardReplacement();
  const updateCardReplacement = useUpateCardReplacement(defaultValues?.id);

  const isLoading =
    createCardReplacement.isLoading || updateCardReplacement.isLoading;

  const initialState = {
    level: "",
    levelName: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
  });

  const { data: levelData, isLoading: levelLoading } = useCampusLevel();
  const levelOptions = levelData?.map((session: any) => ({
    label: session?.name,
    id: session?.name,
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (formIsValid) {
      !defaultValues
        ? createCardReplacement.mutate(formData, {
            onSuccess: (e) => {
              //   console.log(e);
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Card Replacement Application was Successfully`}
                />,
                ToastContent.Config
              );
              !!onCreate && onCreate();
              toggle();

              const paymentUrl =
                e?.data?.data?.idCardReplacementRequest?.payment?.paymentUrl;
              window?.open(paymentUrl);
              // window.location?.reload();
            },
            onError: (e: any) => {
              handleError(e, formData);
            },
          })
        : updateCardReplacement.mutate(formData, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Card Replacement Upadate was Successfully`}
                />,
                ToastContent.Config
              );
              toggle();
            },
            onError: (e: any) => {
              handleError(e, formData);
            },
          });
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }

  return (
    <Modal centered isOpen={visibility} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        //   className="bg-blue-800 text-white"
      >
        {defaultValues
          ? "Updating Card Replacement"
          : "Application For Card Replacement"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Search Level">Level</label>
            <Autocomplete
              fullWidth
              disablePortal
              id="Search Level"
              loading={levelLoading}
              value={formData?.levelName}
              options={levelOptions}
              // options={["temp", "temp2"]}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search Level"
                    className="form-control "
                  />
                );
              }}
              onChange={(e, value: any) => {
                updateForm("levelName", value?.label);
                updateForm("level", value?.id);
              }}
            />
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Submit"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
