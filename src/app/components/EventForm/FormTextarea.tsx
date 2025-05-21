import React from "react";

interface FormTextareaProps {
  id: string;
  label: string;
  name: string;
  value: string;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  name,
  value = "",
  rows = 3,
  maxLength,
  required = false,
  error,
  onChange,
}) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-sm-4 col-form-label">
      {label} {required && "*"}
    </label>
    <div className="col-sm-8">
      <textarea
        id={id}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value ?? ""}
        rows={rows}
        onChange={onChange}
        required={required}
        {...(maxLength !== undefined && { maxLength })}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  </div>
);
