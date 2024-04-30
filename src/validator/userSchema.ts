import vine from "@vinejs/vine";

export const signupSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(15).confirmed(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(15),
});
