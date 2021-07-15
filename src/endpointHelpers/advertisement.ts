import { UserModel } from '../db/models/user';
import { object, SchemaOf, string } from 'yup';
import { Advertisement } from '../db/models/advertisement';

export interface AdvertisementRequestBody {
  id?: string;
  title: string;
  content: string;
  status: string;
}

export const advertisementValidationSchema: SchemaOf<AdvertisementRequestBody> = object({
  id: string().uuid(),
  title: string().required(),
  content: string().required(),
  status: string().required(),
}).defined();

export async function getEnrichedAdvertisementDto(advertisement: Advertisement) {
  const author = await UserModel.findById(advertisement.userId);

  return {
    ...advertisement,
    author,
  };
}
