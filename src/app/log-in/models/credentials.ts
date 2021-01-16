import { sha3_512 } from 'js-sha3';

export class Credentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = sha3_512(password);
  }
}
