import mongoose, { Schema } from 'mongoose';
import { UserRegistration } from './user.interface';

export type RegisteredUser = UserRegistration & mongoose.Document;

const userRegistrationSchema = new Schema<RegisteredUser>({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'] },
  status: { type: String, enum: ['active', 'inactive'] },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
});

const UserRegistrationModel = mongoose.model<RegisteredUser>(
  'UserRegistration',
  userRegistrationSchema,
);

export default UserRegistrationModel;
