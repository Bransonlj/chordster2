import { LoginFields, ValidatedLoginFields } from "../../interfaces/login/index.js";
import { StringInterface } from "../../interfaces/stringInterface/index.js";
import { UserCreateDTO } from "../../interfaces/user/createDTO.js";
import { User } from "../../interfaces/user/object.js";
import { UserUpdateDTO } from "../../interfaces/user/updateDTO.js";
import CRUDParser from "../crudParser.interface.js";
import validator from 'validator';

class AuthParser
  implements CRUDParser<UserCreateDTO, UserUpdateDTO, User> {

    static ErrorMessages = {
      email: "Invalid email",
      username: "Invalid username",
      password: "Invalid password",
      id: "Invalid ID",
    }

    public parseCreateInput(input: StringInterface<UserCreateDTO>): UserCreateDTO {
      if (!input.email) throw new Error(AuthParser.ErrorMessages.email);
      if (!input.username) throw new Error(AuthParser.ErrorMessages.username);
      if (!input.password) throw new Error(AuthParser.ErrorMessages.password);

      // TODO check password strength, email formatting
      if (!validator.isEmail(input.email)) throw new Error(AuthParser.ErrorMessages.email);

      return {
        email: input.email,
        username: input.username,
        password: input.password,
      }

    }

    public parseFindByIdInput(id: string): string {
      if (!id) throw new Error(AuthParser.ErrorMessages.id);

      return id;
    }

    public parseUpdateInput(input: Partial<StringInterface<UserUpdateDTO>>): Partial<UserUpdateDTO> {
      if (input.email && !validator.isEmail(input.email)) {
        throw new Error(AuthParser.ErrorMessages.email);
      }
      if (input.password) {
        // TODO check password strength
      }


      const parsedInput: Partial<UserUpdateDTO> = {};
      parsedInput.email = input.email;
      parsedInput.username = input.username;
      parsedInput.currentPassword = input.currentPassword;
      parsedInput.password = input.password;

      return parsedInput;
    }

    public parseLoginInput(input: StringInterface<LoginFields>): ValidatedLoginFields {
      if (!input.usernameOrEmail) throw new Error(AuthParser.ErrorMessages.username);
      if (!input.password) throw new Error(AuthParser.ErrorMessages.password);

      let validatedFields: ValidatedLoginFields;

      if (validator.isEmail(input.usernameOrEmail)) {
        validatedFields = {
          email: input.usernameOrEmail,
          password: input.password,
        };
      } else {
        validatedFields = {
          username: input.usernameOrEmail,
          password: input.password,
        };
      }

      return validatedFields;
    }
  }

export default AuthParser;
