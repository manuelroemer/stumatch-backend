import { object, SchemaOf, string } from 'yup';

export interface LikeRequestBody {
  postId: string;
}

export const likeValidationSchema: SchemaOf<LikeRequestBody> = object({
  postId: string().required(),
}).defined();
