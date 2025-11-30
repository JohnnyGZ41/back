import {BaseResource} from '../../shared/infrastructure/base-resource';
import {BaseResponse} from '../../shared/infrastructure/base-response';


/**
 * Resource interface for sign-in operations.
 * Represents the data returned after a successful sign-in, including authentication token.
 */
export interface SignInResource extends BaseResource {
  id: number;
  email: string;
  token: string;
}

/**
 * Response interface for sign-in API calls.
 * Extends BaseResponse and SignInResource.
 */
export interface SignInResponse extends BaseResponse, SignInResource {}
