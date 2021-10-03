// @generated
// Automatically generated. Don't change this file manually.

import FileT, { FileTInitializer, FileTId } from './files';
import SiteStatisticT, { SiteStatisticTInitializer } from './site_statistics';
import SiteStatistics2T, { SiteStatistics2TInitializer } from './site_statistics2';
import UserT, { UserTInitializer, UserTId } from './users';

type Model =
  | FileT
  | SiteStatisticT
  | SiteStatistics2T
  | UserT

interface ModelTypeMap {
  'files': FileT;
  'site_statistics': SiteStatisticT;
  'site_statistics2': SiteStatistics2T;
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
  | SiteStatistics2TInitializer
  | UserTInitializer

interface InitializerTypeMap {
  'files': FileTInitializer;
  'site_statistics': SiteStatisticTInitializer;
  'site_statistics2': SiteStatistics2TInitializer;
  'users': UserTInitializer;
}

export type {
  FileT, FileTInitializer, FileTId,
  SiteStatisticT, SiteStatisticTInitializer,
  SiteStatistics2T, SiteStatistics2TInitializer,
  UserT, UserTInitializer, UserTId,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
