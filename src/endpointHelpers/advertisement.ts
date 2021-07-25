import { UserModel } from '../db/models/user';
import { FacultyModel } from '../db/models/faculty';
import { Advertisement } from '../db/models/advertisement';

export interface AdvertisementPostBody {
  id?: string;
  authorId: string;
  title: string;
  shortDescription: string;
  content: string;
  facultyId?: string;
  studyProgramId?: string;
  startDate: Date;
  endDate: Date;
  advertisementImageBlob: string;
}

export async function getEnrichedAdvertisementDto(advertisement: Advertisement) {
  const author = await UserModel.findById(advertisement.authorId);
  const faculty = await FacultyModel.findById(advertisement.facultyId);

  return {
    ...advertisement,
    author,
    faculty,
  };
}
