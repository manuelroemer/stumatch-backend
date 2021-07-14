import { object, SchemaOf, string } from 'yup';

export interface CommentRequestBody {
  content: string;
}

export const commentValidationSchema: SchemaOf<CommentRequestBody> = object({
  content: string().required(),
}).defined();
