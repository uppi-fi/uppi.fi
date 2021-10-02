// @generated
// Automatically generated. Don't change this file manually.

import FileT, { FileTInitializer, FileTId } from './file';
import SiteStatisticT, { SiteStatisticTInitializer } from './site_statistic';

type Model =
  | FileT
  | SiteStatisticT

interface ModelTypeMap {
  'file': FileT;
  'site_statistic': SiteStatisticT;
}

type ModelId =
  | FileTId

interface ModelIdTypeMap {
  'file': FileTId;
}

type Initializer =
  | FileTInitializer
  | SiteStatisticTInitializer

interface InitializerTypeMap {
  'file': FileTInitializer;
  'site_statistic': SiteStatisticTInitializer;
}

export type {
  FileT, FileTInitializer, FileTId,
  SiteStatisticT, SiteStatisticTInitializer,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
