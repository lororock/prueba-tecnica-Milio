export interface User {
    gender: string;
    email: string;
    phone: string;
    cell: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  }