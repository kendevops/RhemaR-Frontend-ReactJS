import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import { Autocomplete, TextField } from "@mui/material";
import handleError from "../../utils/handleError";
import ToastContent from "../molecules/ToastContent";
import { toast } from "react-toastify";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";
import useRequestTranscript from "../../hooks/mutations/classes/useTranscriptRequest";
import useUpateTranscript from "../../hooks/mutations/classes/useUpdateTranscript";
import FormDropdown from "../molecules/FormDropdown";
import FormInput from "../molecules/FormInput";
import countries from "../../data/Countries";
import { states } from "../../data/States";

interface TranscriptModalModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  level?: string;
  onCreate?: VoidFunction;
  defaultValues?: any;
}

export default function TranscriptModal({
  toggle,
  visibility,
  onCreate,
  defaultValues,
  level,
}: TranscriptModalModalProps) {
  const countriesOptions = countries?.map((c) => c?.en_short_name);

  const createTranscript = useRequestTranscript();
  const updateTranscript = useUpateTranscript(defaultValues?.id);

  const isLoading = createTranscript.isLoading || updateTranscript.isLoading;

  const initialState = {
    type: "",
    comment: "",
    city: "",
    street: "",
    state: "",
    country: "",
    zipCode: "",
  };

  const { formData, formIsValid, updateForm, formErrors } = useForm<
    typeof initialState
  >({
    initialState: defaultValues ?? initialState,
  });

  const typeOptions = ["OFFICIAL", "UNOFFICIAL"];

  const { data: levelData, isLoading: levelLoading } = useCampusLevel();
  const levelOptions = levelData?.map((session: any) => ({
    label: session?.name,
    id: session?.name,
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { state, city, country, street, zipCode, ...otherData } = formData;

    const body = {
      ...otherData,
      address: {
        city,
        street,
        state,
        country,
        zipCode: +zipCode,
      },
    };

    if (formIsValid) {
      !defaultValues
        ? createTranscript.mutate(body, {
            onSuccess: (e) => {
              //   console.log(e);
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Transcript Application was Successfully`}
                />,
                ToastContent.Config
              );
              !!onCreate && onCreate();
              toggle();

              //   const paymentUrl =
              //     e?.data?.data?.idCardReplacementRequest?.payment?.paymentUrl;
              //   window?.open(paymentUrl);
              // window.location?.reload();
            },
            onError: (e: any) => {
              handleError(e, formData);
            },
          })
        : updateTranscript.mutate(body, {
            onSuccess: () => {
              toast.success(
                <ToastContent
                  type={"success"}
                  heading={"Success"}
                  message={`Transcript Upadate was Successfully`}
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
        {defaultValues ? "Updating Transcript" : "Application For Transcript"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormDropdown
            onChange={(e) => updateForm("type", e?.target?.value)}
            options={typeOptions.map((o) => ({
              children: o,
            }))}
            title={"Type"}
            value={formData.type}
            hasErrors={formErrors?.type}
          />

          <FormInput
            label="Comment"
            placeholder="Comment"
            onChange={(e) => updateForm("comment", e.target.value)}
            value={formData.comment}
          />

          <FormInput
            label="Street Address"
            placeholder="Enter Street Address"
            onChange={(e) => updateForm("street", e.target.value)}
            hasErrors={formErrors?.address}
            value={formData.street}
          />

          <FormInput
            label="City"
            placeholder="Enter City"
            onChange={(e) => updateForm("city", e.target.value)}
            hasErrors={formErrors?.city}
            value={formData.city}
          />

          <FormDropdown
            title="Address (State)"
            value={formData?.state}
            options={states?.map((d) => ({ children: d }))}
            onChange={(e) => updateForm("state", e?.target?.value)}
            hasErrors={formErrors?.state}
          />

          <FormDropdown
            title="Country"
            onChange={(e) => updateForm("country", e.target.value)}
            options={countriesOptions.map((o) => ({
              children: o,
            }))}
            hasErrors={formErrors?.country}
            value={formData?.country}
          />

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
