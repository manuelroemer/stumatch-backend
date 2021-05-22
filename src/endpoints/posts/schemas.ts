import { object, SchemaOf, string } from 'yup';

export interface PostRequestBody {
  id?: string;
  content: string;
}

export const postValidationSchema: SchemaOf<PostRequestBody> = object({
  id: string().uuid(),
  content: string().required(),
}).defined();
