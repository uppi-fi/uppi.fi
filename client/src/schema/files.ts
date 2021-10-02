// @generated
// Automatically generated. Don't change this file manually.

import { UserTId } from './users';

export type FileTId = string & { " __flavor"?: 'files' };

export default interface FileT {
  /** Primary key. Index: files_pkey */
  id: FileTId;

  filename: string;

  mimeType: string;

  customName: string | null;

  viewCount: number;

  createdAt: Date;

  userId: UserTId;
}

export interface FileTInitializer {
  /** Primary key. Index: files_pkey */
  id: FileTId;

  filename: string;

  mimeType: string;

  customName?: string | null;

  /** Default value: 0 */
  viewCount?: number;

  /** Default value: now() */
  createdAt?: Date;

  userId: UserTId;
}
