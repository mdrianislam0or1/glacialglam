import { UserRegistration } from './user.interface';
import UserRegistrationModel from './user.model';

const createUserIntoDB = async (payload: UserRegistration) => {
  const result = await UserRegistrationModel.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
