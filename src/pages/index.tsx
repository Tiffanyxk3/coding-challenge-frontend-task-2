import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { FormFieldType, FormField, FormFieldValue } from "@/models/form";
import { SubmitHandler } from "react-hook-form";
import React, { useState } from "react";

export default function Home() {
  const [formConfig, setFormConfig] = useState("");

  const fields: FormField[] = [
    {
      type: FormFieldType.TEXT,
      label: "Full Name",
      key: "name",
      placeholder: "Tiffany Zhang",
      errorMessages: {
        required: "Name is required.",
      },
      required: true,
    }, {
      type: FormFieldType.EMAIL,
      label: "Email Address",
      key: "email",
      placeholder: "tiffanyxkg@gmail.com",
      errorMessages: {
        required: "Email address is required.",
      },
      required: true,
    }, {
      type: FormFieldType.TEL,
      label: "Phone Number",
      key: "phone",
      placeholder: "4159176325",
      errorMessages: {
        required: "Phone number is required.",
        pattern: "Invalid phone number.",
      },
      required: true,
      pattern: /^[0-9]{10}$/,
    }, {
      type: FormFieldType.DATE,
      label: "Meeting Date",
      key: "meeting_date",
    }, {
      type: FormFieldType.TIME,
      label: "Meeting Time",
      key: "meeting_time",
    }, {
      type: FormFieldType.DATETIME,
      label: "Local Date & Time",
      key: "date_time",
    }, {
      type: FormFieldType.URL,
      label: "Personal Website",
      key: "website",
      placeholder: "https://www.linkedin.com/in/tiffanyxk/",
    }, {
      type: FormFieldType.PASSWORD,
      label: "Password",
      key: "password",
      errorMessages: {
        required: "Password is required.",
        minLength: "Password length should be at least 8.",
        maxLength: "Password length should be at most 12.",
      },
      required: true,
      minLength: 8,
      maxLength: 12,
    }, {
      type: FormFieldType.HIDDEN,
      label: "Submission ID",
      key: "id",
    }, {
      type: FormFieldType.NUMBER,
      label: "Age",
      key: "age",
      placeholder: "24",
      errorMessages: {
        required: "Age is required.",
        min: "You should be at least 18 years old.",
        max: "You should be at most 80 years old.",
      },
      required: true,
      min: 18,
      max: 80,
    }, {
      type: FormFieldType.SELECT,
      label: "Gender",
      key: "gender",
      value: ["Male", "Female", "Other"],
      errorMessages: {
        required: "Gender is required.",
      },
      required: true,
    }, {
      type: FormFieldType.CHECKBOX,
      label: "Subscribe to Newsletter",
      key: "subscription",
      value: ["Yes", "No"],
    }, {
      type: FormFieldType.RADIO,
      label: "Method of Contact",
      key: "contact",
      value: ["Email", "Phone", "Text"],
      errorMessages: {
        required: "Method of contact is required.",
      },
      required: true,
    }, {
      type: FormFieldType.TEXTAREA,
      label: "Comments",
      key: "comments",
    },
  ]; // TODO: Define form fields for each of the field types

  const formatJSON = (json: any) => {
    var formatted: string = "";
    for (var key in json) {
      formatted += "- " + key + ": " + json[key] + "\n";
    }
    return formatted;
  }

  const onSubmit:SubmitHandler<FormFieldValue> = async (data) => {
    console.log("== LOGGING FORM VALUES ==");
    console.log("Name: " + data.name);
    console.log("Email: " + data.email);
    console.log("Tel: " + data.phone);
    console.log("Meeting date: " + data.meeting_date);
    console.log("Meeting time: " + data.meeting_time);
    console.log("Local date & time: " + data.date_time);
    console.log("Website: " + data.website);
    console.log("Password: " + data.password);
    console.log("ID: " + data.id);
    console.log("Age: " + data.age);
    console.log("Gender: " + data.gender);
    console.log("Subscription: " + data.subscription);
    console.log("Method of contact: " + data.contact);
    console.log("Comments: " + data.comments);

    const response = await fetch("api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }; // TODO: Define onSubmit handler to log form values to console

  const onClick = async () => {
    const response = await fetch("api/hello", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
      const json = await response.json();
      if (json !== null) {
        const stringify = JSON.stringify(json);
        setFormConfig(json);
      }
    }
  };

  return (
    <div>
      <h1>Simple React Hook Form</h1>
      <FormBuilder fields={fields} onSubmit={onSubmit} onClick={onClick} />
      <pre className="form-config-container">{formatJSON(formConfig)}</pre>
    </div>
  );
}
