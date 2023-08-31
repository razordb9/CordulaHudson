import { z } from 'zod';
import type { Actions } from './$types';

const formSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email().min(1),
  textarea: z.string().trim().min(5)
});

export const actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        console.log(formData);
        
        const contact = {
            name: String(formData.get("fullName")),
            email: String(formData.get("email")),
            message: String(formData.get("message")),
        }

        const safeParse = formSchema.safeParse(contact);

        if (!safeParse.success) {
            console.log("Error", safeParse.error.issues);
        }
    }
  };