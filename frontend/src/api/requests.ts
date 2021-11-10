import {
  DeleteFileResponse,
  FileIdParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
  UpdateFileParams,
  UserIdParams,
  UsernameAndPasswordParams,
} from '@shared/api';
import { FileT, UserT } from '@shared/schema';
import { DELETE, GET, POST } from './methods';

export const fetchVisits = GET<number>('/visit');

export const login = (params: UsernameAndPasswordParams) =>
  POST<LoginResponse>('/login', { params });

export const fetchUser = GET<UserT>('/get-user');

export const register = (params: RegisterParams) =>
  POST<RegisterResponse>('/register', { params });

export const fetchFile = (params: FileIdParams) =>
  GET<FileT>('/get-file', { params });

export const fetchFiles = (params: UserIdParams) =>
  GET<FileT[]>('get-files', { params });

export const uploadFile = (
  payload: FormData,
  onUploadProgress: ((progressEvent: ProgressEvent) => void) | undefined
) => POST<FileT>('/upload', payload, { onUploadProgress });

export const deleteFile = ({ fileId }: { fileId: string }) =>
  DELETE<DeleteFileResponse>(`/delete-file?fileId=${fileId}`, {
    timeout: 1000, // TODO: Why 1000 timeout?
  });

export const updateFile = (params: UpdateFileParams) =>
  POST<DeleteFileResponse>('/update-file', params);
