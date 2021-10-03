// @generated
// Automatically generated. Don't change this file manually.

import FileT, { FileTId, FileTInitializer } from './files';
import SiteStatisticT, { SiteStatisticTInitializer } from './site_statistics';
import UserT, { UserTId, UserTInitializer } from './users';

type Model =
  | FileT
  | SiteStatisticT
  | UserT

interface ModelTypeMap {
  'files': FileT;
  'site_statistics': SiteStatisticT;
  'users': UserT;
}

type ModelId =
  | FileTId
  | UserTId

interface ModelIdTypeMap {
  'files': FileTId;
  'users': UserTId;
}

type Initializer =
  | FileTInitializer
  | SiteStatisticTInitializer
  | UserTInitializer

interface InitializerTypeMap {
  'files': FileTInitializer;
  'site_statistics': SiteStatisticTInitializer;
  'users': UserTInitializer;
}

export type {
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
