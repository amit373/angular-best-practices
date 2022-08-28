export interface IApiDef {
  method: string;
  api: any;
  noNeedAuthToken?: boolean;
}

export interface IApiInput {
  id?: string;
}

export const enum IMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
