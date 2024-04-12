import { FormFieldType, FormField, FormFieldValue } from "@/models/form";
import { useForm } from "react-hook-form";

const FormBuilder = ({fields, onSubmit: onSubmit = () => {}, onClick: onClick = () => Promise.resolve()}: {
  fields: FormField[];
  onSubmit?: (data: FormFieldValue) => void; // TODO: Define appropriate type
  onClick?: () => Promise<void>;
}) => {
  const {handleSubmit, register, formState, setValue, getValues, watch, trigger, formState: { errors }
  } = useForm<FormFieldValue>({
    mode: "onChange",
  });

  const getErrors = (field: any): any => {
    const result: { [key: string]: any } = {};
    if (field.required !== undefined) {
      result["required"] = {value: field.required, message: field.errorMessages.required}
    }
    if (field.max !== undefined) {
      result["max"] = {value: field.max, message: field.errorMessages.max}
    }
    if (field.min !== undefined) {
      result["min"] = {value: field.min, message: field.errorMessages.min}
    }
    if (field.pattern !== undefined) {
      result["pattern"] = {value: field.pattern, message: field.errorMessages.pattern}
    }
    if (field.maxLength !== undefined) {
      result["maxLength"] = {value: field.maxLength, message: field.errorMessages.maxLength}
    }
    if (field.minLength !== undefined) {
      result["minLength"] = {value: field.minLength, message: field.errorMessages.minLength}
    }
    if (field.validate !== undefined) {
      result["validate"] = {value: field.validate, message: field.errorMessages.validate}
    }
    if (field.custom !== undefined) {
      result["custom"] = {value: field.custom, message: field.errorMessages.custom}
    }
    return result
  };

  const getErrorType = (key: any): any => {
    switch (key) {
      case "name":
        return errors.name;
      case "email":
        return errors.email;
      case "phone":
        return errors.phone;
      case "meeting_date":
        return errors.meeting_date;
      case "meeting_time":
        return errors.meeting_time;
      case "date_time":
        return errors.date_time;
      case "website":
        return errors.website;
      case "password":
        return errors.password;
      case "age":
        return errors.age;
      case "subscription":
        return errors.subscription;
    }
  }

  /* TODO: Render form fields as defined in `fields` */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(field => {
        if (field.type === FormFieldType.HIDDEN) {
          return (<input {...register("id")} type="hidden" value={Math.floor(Math.random() * (101 - 1)) + 1}></input>)
        } else if (field.type === FormFieldType.SELECT) {
          return (
            <div className="input-container">
              <label className="label-title">{field.label}:{" "}</label>
              <select {...register("gender", getErrors(field))}>
                {(field.value as string[]).map(value => {
                  return (
                    <option>{value}</option>
                  )
                })}
              </select>
              {(errors.gender) && <span className="alert">{errors.gender.message}</span>}
            </div>
          )
        } else if (field.type === FormFieldType.RADIO) {
          return (
            <div className="input-container">
              <label className="label-title">{field.label}:{" "}{(errors.contact) && <span className="alert">{errors.contact.message}</span>}<br></br></label>
              {(field.value as string[]).map(value => {
                return (
                  <div className="contact-option-container">
                    <span>
                      <input className="input-box" type={field.type} value={value} {...register("contact", getErrors(field))}></input>
                    </span>
                    <span className="contact-option">{value}</span>
                    <br></br>
                  </div>
                )
              })}
            </div>
          )
        } else if (field.type === FormFieldType.TEXTAREA) {
          return (
            <div className="input-container">
              <label className="label-title">{field.label}:{" "}</label><br></br>
              <textarea {...register("comments")} placeholder={field.placeholder || ""} rows={6} cols={50}></textarea>
              
            </div>
          )
        } else {
          return (
            <div className="input-container">
              <label className="label-title">{field.label}:{" "}</label>
              <input className="input-field" type={field.type} placeholder={field.placeholder || ""} 
                {...register(field.key as "name" || "email" || "phone" || "meeting_date" || "meeting_time" || "date_time" || "website" || "password" || "age" || "subscription", getErrors(field))}></input>
              {getErrorType(field.key) && <span className="alert">{getErrorType(field.key).message}</span>}
            </div>
          )
        }
      })}

      <div className="btn-container">
        <button className="submit-btn" type="submit">Submit</button>
        <button className="get-config-btn" type="button" onClick={onClick}>Get Form Config</button>
      </div>

    </form>
  );
};

export default FormBuilder;
