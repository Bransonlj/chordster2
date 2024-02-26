export type LoginFields = {
  usernameOrEmail: string;
  password: string;
}

type UsernameLoginFields = {
  email?: never;
  username: string;
  password: string;
}

type emailLoginFields = {
  email: string;
  username?: never;
  password: string;
}

export type ValidatedLoginFields = UsernameLoginFields | emailLoginFields;