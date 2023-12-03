export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type UserRegistration = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  password: string;
  phoneNumber: string;
  shippingAddress: Address;
};
