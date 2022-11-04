import { useState } from "react";

export type useFormProps<FormData> = {
  initialState: FormData;
};

export default function useForm<T>({ initialState }: useFormProps<T>) {
  const [formData, setFormData] = useState(initialState);

  function updateForm(key: string, value: any) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  const formIsValid = Object.values(formData as object).every((v) => v > "");
  return { formData, updateForm, formIsValid };
}
