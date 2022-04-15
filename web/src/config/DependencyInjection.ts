import { ContainerBuilder } from "diod";
import { Storage } from "../infrastructure/Storage";
import { LocalStorage } from "../infrastructure/LocalStorage";
import { ActivityRepository } from "../domain/ActivityRepository";
import { StorageActivityRepository } from "../infrastructure/StorageActivityRepository";
import { SentryTracer } from "../infrastructure/SentryTracer";
import { Tracer } from "../domain/Tracer";
import { DataFetcher } from "../domain/DataFetcher";
import { ContentfulDataFetcher } from "../infrastructure/ContentfulDataFetcher";
import { Syncronizer } from "../domain/Syncronizer";
import { CategoryRepository } from "../domain/CategoryRepository";
import { StorageCategoryRepository } from "../infrastructure/StorageCategoryRepository";
import { VenueRepository } from "../domain/VenueRepository";
import { StorageVenueRepository } from "../infrastructure/StorageVenueRepository";

const builder = new ContainerBuilder();

builder.register(Storage).use(LocalStorage).asSingleton();
builder.register(Tracer).use(SentryTracer).asSingleton();
builder
  .register(ActivityRepository)
  .use(StorageActivityRepository)
  .withDependencies([Storage])
  .asSingleton();
builder
  .register(CategoryRepository)
  .use(StorageCategoryRepository)
  .withDependencies([Storage])
  .asSingleton();
builder
  .register(VenueRepository)
  .use(StorageVenueRepository)
  .withDependencies([Storage])
  .asSingleton();
builder
  .register(DataFetcher)
  .use(ContentfulDataFetcher)
  .withDependencies([Storage])
  .asSingleton();
builder
  .registerAndUse(Syncronizer)
  .withDependencies([
    DataFetcher,
    ActivityRepository,
    CategoryRepository,
    VenueRepository,
  ])
  .asSingleton();

export const container = builder.build();
