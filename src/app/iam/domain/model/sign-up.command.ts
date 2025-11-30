import {AccountType} from './account-type';

/**
 * Command object for user sign-up operations in the domain layer of the IAM bounded context.
 * Contains the email and password for registration.
 */
export class SignUpCommand {
  private _email: string;
  private _password: string;
  private _isActive: boolean;
  private _role: string;
  private _name: string;
  private _phoneNumber: string;

  /**
   * Creates a new SignUpCommand instance.
   * @param resource An object containing email and password.
   */
  constructor(resource: {
    email: string,
    password: string,
    isActive: boolean,
    role: string,
    name: string,
    phoneNumber: string,}) {

    this._email = resource.email;
    this._password = resource.password;
    this._isActive = resource.isActive;
    this._role = resource.role;
    this._name = resource.name;
    this._phoneNumber = resource.phoneNumber;
  }

  /**
   * Gets the email for sign-up.
   * @returns The email.
   */
  get email(): string {
    return this._email;
  }

  /**
   * Sets the email for sign-up.
   * @param value The email.
   */
  set email(value: string) {
    this._email = value;
  }

  /**
   * Gets the password for sign-up.
   * @returns The password.
   */
  get password(): string {
    return this._password;
  }

  /**
   * Sets the password for sign-up.
   * @param value The password.
   */
  set password(value: string) {
    this._password = value;
  }


  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(value: boolean) {
    this._isActive = value;
  }


  get role(): string {
    return this._role;
  }
  set role(value: string) {
    this._role  = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }


  get phoneNumber(): string {
    return this._phoneNumber;
  }
  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }


}

