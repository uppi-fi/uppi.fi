import { FileT, UserT } from './schema';

export enum ApiMessage {
  Ok = 'ok',
  MissingFields = 'missing fields',
  UserExists = 'user already exists',
  InvalidCredentials = 'invalid credentials',
  NotFound = 'not found',
  PgError = 'pg error',
}

export interface UsernameAndPasswordParams {
  username: string;
  password: string;
}

export interface UserIdParams {
  userId: string;
}

export interface FileIdParams {
  fileId: string;
}

export type LoginResponse =
  | {
      message: ApiMessage.InvalidCredentials;
    }
  | {
      message: ApiMessage.Ok;
      user: UserT;
      token: string;
    };

export type RegisterResponse =
  | {
      message: ApiMessage.MissingFields | ApiMessage.UserExists;
    }
  | {
      message: ApiMessage.Ok;
      user: UserT;
      token: string;
    };

export type DownloadResponse = void | {
  message: ApiMessage.NotFound;
};

export type UpdateFileParams = Pick<FileT, 'id'> &
  Partial<Pick<FileT, 'customName' | 'filename' | 'viewCount'>>;

export type UserResponse = UserT | null;

export type DeleteFileResponse = {
  message: ApiMessage.NotFound | ApiMessage.PgError | ApiMessage.Ok;
};
