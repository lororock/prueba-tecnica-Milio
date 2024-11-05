export interface User {
  results: UserDetails[];
  info: Info;
}

export interface UserDetails {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DateOfBirth;
  registered: Registration;
  phone: string;
  cell: string;
  id: Identification;
  picture: Picture;
  nat: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Street {
  number: number;
  name: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface DateOfBirth {
  date: string;
  age: number;
}

interface Registration {
  date: string;
  age: number;
}

interface Identification {
  name: string;
  value: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}