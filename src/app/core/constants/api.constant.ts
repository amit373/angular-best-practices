import { IApiDef, IMethod } from '../interfaces';

export const apiPathConstants = {
  LOGIN: 'login',
  GET_USERS: 'users',
};

export class APIEndPoint {
  public static LOGIN: IApiDef = {
    method: IMethod.POST,
    api: () => apiPathConstants.LOGIN,
  };

  public static GET_USERS: IApiDef = {
    method: IMethod.GET,
    api: () => apiPathConstants.GET_USERS,
  };
}
