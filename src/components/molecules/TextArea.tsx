// import { FormEvent } from "react";
import FormInputWrapper from "./FormInputWrapper";

type TextAreaProps = {
	lg?: string;
	md?: string;
	label?: string;
	placeholder?: string;
	value: string;
	onChange: any;
};

export default function TextArea({
	lg,
	md,
	label,
	placeholder,
	value,
	onChange,
}: // ...others
TextAreaProps) {
	return (
		<FormInputWrapper {...{ lg, md }}>
			<label htmlFor={label}>{label}</label>
			<textarea
				// name={label}
				value={value}
				className="form-control"
				placeholder={placeholder ?? label}
				onChange={onChange}
				// {...others}
			/>
		</FormInputWrapper>
	);
}
