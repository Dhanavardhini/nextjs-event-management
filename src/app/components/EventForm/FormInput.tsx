import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: string;
  max?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  name,
  value = "",
  placeholder = "",
  required = false,
  minLength,
  maxLength,
  min,
  max,
  error,
  onChange,
}) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-sm-4 col-form-label">
      {label} {required && "*"}
    </label>
    <div className="col-sm-8">
      <input
        id={id}
        type={type}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        {...(minLength !== undefined && { minLength })}
        {...(maxLength !== undefined && { maxLength })}
        {...(min !== undefined && { min })}
        {...(max !== undefined && { max })}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  </div>
);
