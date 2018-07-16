export class UserAuthModel {
  username: string;
  password: string;

  constructor(init?: Partial<UserAuthModel>) {
    Object.assign(this, init);
  }
}
