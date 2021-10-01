// @generated
// Automatically generated. Don't change this file manually.

export type FileTId = string & { " __flavor"?: 'file' };

export default interface FileT {
  /** Primary key. Index: file_pkey */
  id: FileTId;

  filename: string;

  mimeType: string;

  customName: string | null;

  views: number;

  createdAt: Date;
}

export interface FileTInitializer {
  /** Primary key. Index: file_pkey */
  id: FileTId;

  filename: string;

  mimeType: string;

  customName?: string | null;

  /** Default value: 0 */
  views?: number;

  /** Default value: now() */
  createdAt?: Date;
}
