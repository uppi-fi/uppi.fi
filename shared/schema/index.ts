// @generated
// Automatically generated. Don't change this file manually.

import AccessKeyT, { AccessKeyTInitializer, AccessKeyTId } from './access_keys';
import FileT, { FileTInitializer, FileTId } from './files';
import SiteStatisticT, { SiteStatisticTInitializer } from './site_statistics';
import UserT, { UserTInitializer, UserTId } from './users';

type Model =
  | AccessKeyT
  | FileT
  | SiteStatisticT
  | UserT

interface ModelTypeMap {
  'access_keys': AccessKeyT;
  'files': FileT;
  'site_statistics': SiteStatisticT;
  'users': UserT;
}

type ModelId =
  | AccessKeyTId
  | FileTId
  | UserTId

interface ModelIdTypeMap {
  'access_keys': AccessKeyTId;
  'files': FileTId;
  'users': UserTId;
}

type Initializer =
  | AccessKeyTInitializer
  | FileTInitializer
  | SiteStatisticTInitializer
  | UserTInitializer

interface InitializerTypeMap {
  'access_keys': AccessKeyTInitializer;
  'files': FileTInitializer;
  'site_statistics': SiteStatisticTInitializer;
  'users': UserTInitializer;
}

export type {
  AccessKeyT, AccessKeyTInitializer, AccessKeyTId,
  FileT, FileTInitializer, FileTId,
  SiteStatisticT, SiteStatisticTInitializer,
  UserT, UserTInitializer, UserTId,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
