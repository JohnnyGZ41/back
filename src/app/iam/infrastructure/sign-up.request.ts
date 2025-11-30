
/**
 * Request interface for sign-up API calls in the infrastructure layer of the IAM bounded context.
 * Contains the necessary data to register a new user.
 */
export interface SignUpRequest {
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  name: string;
  phoneNumber: string;
}

