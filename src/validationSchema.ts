import { z } from "zod"

export const formSchema = z
.object({
  phone: z
  .string()
  .min(1, {message: 'Поле является обязательным'}),
})

export const formWithOTP = z.object({
  phone: z
  .string()
  .min(1, {message: 'Поле является обязательным'}),
  code: z
  .string()
  .length(6, {message:'Код должен содержать 6 цифр'})
})

export type FormSchema= z.infer<typeof formWithOTP>