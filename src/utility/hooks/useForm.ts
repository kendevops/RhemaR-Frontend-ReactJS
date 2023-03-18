import { useEffect, useMemo, useState } from "react";

export type useFormProps<FormData> = {
  initialState: FormData;
};

export default function useForm<T>({ initialState }: useFormProps<T>) {
  const [formData, setFormData] = useState(initialState);

  let errObj: any = useMemo(() => {
    return {};
  }, []);

  useEffect(() => {
    Object.keys(initialState as any)?.forEach((key) => {
      errObj[key] = false;
    });
  }, [initialState, errObj]);

  const [formErrors, setFormErrors] = useState(errObj);

  function toggleError(key: keyof T) {
    setFormErrors((p: any) => ({ ...p, [key]: !p[key] }));
  }

  function updateForm(key: keyof T, value: any) {
    setFormData((p) => ({ ...p, [key]: value }));
    formErrors[key] && toggleError(key);
  }

  const formIsValid = Object.values(formData as object).every((v) => v > "");
  return { formData, updateForm, formIsValid, formErrors, toggleError };
}
