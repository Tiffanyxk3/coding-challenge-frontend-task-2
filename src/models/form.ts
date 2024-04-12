export enum FormFieldType {
  TEXT = "text",
  EMAIL = "email",
  TEL = "tel",
  DATE = "date",
  DATETIME = "datetime-local",
  TIME = "time",
  URL = "url",
  PASSWORD = "password",
  HIDDEN = "hidden",
  NUMBER = "number",
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  TEXTAREA = "textarea",
}

// React Hook Form Error Types
// https://react-hook-form.com/api/useform/register
export type FormFieldErrorTypes =
  | "required"
  | "max"
  | "min"
  | "pattern"
  | "maxLength"
  | "minLength"
  | "validate"
  | "custom";

export interface FormSelectOption {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface FormField {
  type: FormFieldType;
  label: string;
  key: string;
  value?: string | number | boolean | string[]; // default value or value for checkbox/radio
  options?: FormSelectOption[];
  placeholder?: string;
  errorMessages?: {
    [key in FormFieldErrorTypes]?: string;
  };

  // Standard HTML5 Input Restrictions
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  checked?: boolean;
  size?: number;
  step?: number;

  // Form Validation
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  pattern?: RegExp;
}

export type FormFieldValue = {
  name: string;
  email: string;
  phone: number;
  meeting_date: string;
  meeting_time: string;
  date_time: string;
  website: string;
  password: string;
  id: number;
  age: number;
  gender: string;
  subscription: boolean;
  contact: string;
  comments: string;
}
