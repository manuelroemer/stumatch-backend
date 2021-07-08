import { object, SchemaOf, string, number } from 'yup';

export interface PostRequestBody {
  id?: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  category: string;
}

export const postValidationSchema: SchemaOf<PostRequestBody> = object({
  id: string().uuid(),
  title: string().required(),
  content: string().required(),
  likes: number().default(0),
  comments: number().default(0),
  category: string().required(),
}).defined();
