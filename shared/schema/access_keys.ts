// @generated
// Automatically generated. Don't change this file manually.

export type AccessKeyTId = string & { " __flavor"?: 'access_keys' };

export default interface AccessKeyT {
  /** Primary key. Index: access_keys_pkey */
  accessKey: AccessKeyTId;

  useCount: number;
}

export interface AccessKeyTInitializer {
  /** Primary key. Index: access_keys_pkey */
  accessKey: AccessKeyTId;

  /** Default value: 0 */
  useCount?: number;
}
