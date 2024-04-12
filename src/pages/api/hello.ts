// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { FormFieldType, FormFieldValue } from "@/models/form";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {name, email, phone, meeting_date, meeting_time, date_time, website, password, id, age, gender, subscription, contact, comments}: FormFieldValue = req.body;
    console.log("== RECEIVED FORM DATA IN API HANDLER ==");
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Tel: " + phone);
    console.log("Meeting date: " + meeting_date);
    console.log("Meeting time: " + meeting_time);
    console.log("Local date & time: " + date_time);
    console.log("Website: " + website);
    console.log("Password: " + password);
    console.log("ID: " + id);
    console.log("Age: " + age);
    console.log("Gender: " + gender);
    console.log("Subscription: " + subscription);
    console.log("Method of contact: " + contact);
    console.log("Comments: " + comments);

  } else {
    // this could be optimized by avoiding hardcoding
    const config = {
      Name: FormFieldType.TEXT,
      Email: FormFieldType.EMAIL,
      Phone: FormFieldType.TEL,
      Meeting_Date: FormFieldType.DATE,
      Meeting_Time: FormFieldType.TIME,
      Local_Date_Time: FormFieldType.DATETIME,
      Website: FormFieldType.URL,
      Password: FormFieldType.PASSWORD,
      Age: FormFieldType.NUMBER,
      Gender: FormFieldType.SELECT,
      Subscription: FormFieldType.CHECKBOX,
      Contact_Method: FormFieldType.RADIO,
      Comments: FormFieldType.TEXTAREA,
    }

    return res.status(200).json(config);
  }
}
