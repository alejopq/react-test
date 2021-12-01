import { errors } from "shared/utils/constants";

export const arrayValidator = (content: string) => {
  let data: any;
  try {
    data = JSON.parse(content);
  } catch (error) {
    throw new Error(errors.INVALID_FILE);
  }
  if (!Array.isArray(data)) {
    throw new Error(errors.NOT_ARRAY);
  }
  if (data.length === 0) {
    throw new Error(errors.EMPTY_ARRAY);
  }
  return true;
};
