import React from "react";

interface FormSelectProps {
  id: string;
  label: string;
  name: string;
  value: string | string[];
  options: string[];
  multiple?: boolean;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  name,
  value,
  options,
  multiple = false,
  required = false,
  error,
  onChange,
}) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-sm-4 col-form-label">
      {label} {required && "*"}
    </label>
    <div className="col-sm-8">
      <select
        id={id}
        name={name}
        className={`form-select ${error ? "is-invalid" : ""}`}
        value={value ?? (multiple ? [] : "")}
        onChange={onChange}
        multiple={multiple}
        required={required}
      >
        {!multiple && <option value="">Select one</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  </div>
);
