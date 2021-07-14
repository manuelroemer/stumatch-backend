import { Router } from 'express';
import { object, SchemaOf, string } from 'yup';
import { ContactRequestModel } from '../../db/models/contactRequest';
import { UserModel } from '../../db/models/user';
import { apiResult } from '../../dtos/apiResults';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

interface ContactRequestBody {
  id?: string;
  name: string;
  email: string;
  type: string;
  message: string;
}
const schema: SchemaOf<ContactRequestBody> = object({
  id: string().uuid(),
  name: string().required(),
  email: string()
    .required()
    .matches(/^\S+@\S+/)
    .max(320),
  type: string().oneOf(['role', 'featureBug', 'other']).required(),
  message: string().required(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as ContactRequestBody;
  const user = await UserModel.findOne({ email: body.email });
  const contactRequest = new ContactRequestModel({
    _id: body.id,
    name: body.name,
    email: body.email,
    type: body.type,
    message: body.message,
    userId: user?.id,
  });
  await contactRequest.save();
  return res.status(201).json(apiResult(contactRequest.toObject()));
});

export default Router().post('/api/v1/contactRequests', validateRequestBody(schema), handler);
