import joiBase from "joi";
import date from "@joi/date";
const joi = joiBase.extend(date);

export const pollSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.date().format("YYYY-MM-DD HH:mm").allow("")
});