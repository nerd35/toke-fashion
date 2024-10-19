/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CustomForm.tsx
"use client"; // Ensure this file is treated as a client component

import React, { createContext, useContext, useState } from "react";

interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  handleChange: (name: string, value: any) => void;
  validate: () => boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const Form: React.FC<{ children: React.ReactNode; onSubmit: () => void }> = ({ children, onSubmit }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};
    // Example validation: required fields
    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        valid = false;
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <FormContext.Provider value={{ values, errors, handleChange, validate }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a Form component");
  }
  return context;
};

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type = "text" }) => {
  const { values, errors, handleChange } = useForm();

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        className={errors[name] ? "error" : ""}
      />
      {errors[name] && <p className="error-message">{errors[name]}</p>}
    </div>
  );
};
