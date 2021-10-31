// @generated
// Automatically generated. Don't change this file manually.

export type UserTId = string & { " __flavor"?: 'users' };

export default interface UserT {
  /** Primary key. Index: users_pkey */
  userId: UserTId;

  /** Index: users_telegram_user_id_key */
  telegramUserId: string | null;

  createdAt: Date;

  username: string;

  password: string;
}

export interface UserTInitializer {
  /** Primary key. Index: users_pkey */
  userId: UserTId;

  /** Index: users_telegram_user_id_key */
  telegramUserId?: string | null;

  /** Default value: now() */
  createdAt?: Date;

  /** Default value: ''::character varying */
  username?: string;

  /** Default value: ''::character varying */
  password?: string;
}
