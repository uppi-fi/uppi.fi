// @generated
// Automatically generated. Don't change this file manually.

import FileT, { FileTInitializer, FileTId } from './file';
import SiteStatisticsT, { SiteStatisticsTInitializer } from './site_statistics';

type Model =
  | FileT
  | SiteStatisticsT

interface ModelTypeMap {
  'file': FileT;
  'site_statistics': SiteStatisticsT;
}

type ModelId =
  | FileTId

interface ModelIdTypeMap {
  'file': FileTId;
}

type Initializer =
  | FileTInitializer
  | SiteStatisticsTInitializer

interface InitializerTypeMap {
  'file': FileTInitializer;
  'site_statistics': SiteStatisticsTInitializer;
}

export type {
  FileT, FileTInitializer, FileTId,
  SiteStatisticsT, SiteStatisticsTInitializer,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
