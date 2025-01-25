export interface IUser {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  phoneNumber: string;
}

export interface UserForm {
  username: string;
  password: string;
  displayName?: string;
  phoneNumber?: string;
}

export interface UserRegister {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    },
    messages: string;
    name: string;
    _message: string;
  };
}

export interface GlobalError {
  error: string;
}

export interface IProduct {
  _id: string;
  user: string;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ICategory {
  _id: string;
  title: string;
}