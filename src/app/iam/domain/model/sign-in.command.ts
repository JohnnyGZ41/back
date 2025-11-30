
/**
 * Command object for user sign-in operations in the domain layer of the IAM bounded context.
 * Contains the email and password for authentication.
 */
export class SignInCommand {
  private _email: string;
  private _password: string;

  /**
   * Creates a new SignInCommand instance.
   * @param resource An object containing email and password.
   */
  constructor(resource: {email: string, password: string}) {
    this._email = resource.email;
    this._password = resource.password;
  }

  /**
   * Gets the email for sign-in.
   * @returns The email.
   */
  get email(): string {
    return this._email;
  }

  /**
   * Sets the email for sign-in.
   * @param value The email.
   */
  set email(value: string) {
    this._email = value;
  }

  /**
   * Gets the password for sign-in.
   * @returns The password.
   */
  get password(): string {
    return this._password;
  }

  /**
   * Sets the password for sign-in.
   * @param value The password.
   */
  set password(value: string) {
    this._password = value;
  }
}

