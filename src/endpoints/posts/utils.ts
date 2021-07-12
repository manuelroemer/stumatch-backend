import { object, SchemaOf, string } from 'yup';

export interface PostRequestBody {
  id?: string;
  title: string;
  content: string;
  category: string;
}

export const postValidationSchema: SchemaOf<PostRequestBody> = object({
  id: string().uuid(),
  title: string().required(),
  content: string().required(),
  category: string().required(),
}).defined();
