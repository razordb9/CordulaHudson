import { z } from 'zod';
import type { Actions } from './$types';

import nodemailer from 'nodemailer';

const str = new RegExp(/^[^0-9]*$/);


const formSchema = z.object({
  Fullname: z.string({
    required_error: "Nachname ist ein Pflichtfeld",
    }).regex(str, "Mir eagl").min(6,{ message: "Geben Sie mindesten 6 Zeichen ein" }),
  Email: z.string().trim().email({ message: "Email Adresse ist ungültig"}),
  Message: z.string().trim().min(10, { message: "Geben sie mindestens 10 Zeichen ein"}).max(1024, {
    message: "Nachricht zu lange"
  })
});

type hugo = {
    success: boolean,
    zodErrors: {}
}
export const actions = {
    submit: async ({request}) => {
        const formData = await request.formData();
        console.log("submit run", formData);
        
        //google app password dbrpilvkmqnmduzi
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: 'thomas.zaussnig@gmail.com',
              pass: 'dbrpilvkmqnmduzi'
            }
        });

        async function send() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Kontakt Formular 🎄" <thomas.zaussnig@gmail.com>', // sender address
                to: String(formData.get("email")), // list of receivers
                subject: "Kontakt anfrage von " + String(formData.get("fullName")), // Subject line
                text: String(formData.get("message")), // plain text body
                html: String(formData.get("message")), // html body
            });
            console.log("Message sent: %s", info.messageId);
        }

        let data:hugo = {
            success: false,
            zodErrors: {}
        }

        const contact = {
            Fullname: String(formData.get("fullName")),
            Email: String(formData.get("email")),
            Message: String(formData.get("message")),
        }

        const safeParse = formSchema.safeParse(contact);
        
        if (!safeParse.success) {
            let errors = safeParse.error.issues;
            data.zodErrors = safeParse.error.format();
        } else {
            data.success = true;
            send().catch(console.error);
        }
        console.log(data);
        return data;
    }
  };