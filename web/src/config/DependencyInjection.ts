import { ContainerBuilder } from "diod";
import { Storage } from "../infrastructure/Storage";
import { LocalStorage } from "../infrastructure/LocalStorage";
import { ActivityRepository } from "../domain/ActivityRepository";
import { StorageActivityRepository } from "../infrastructure/StorageActivityRepository";
import { SentryTracer } from "../infrastructure/SentryTracer";
import { Tracer } from "../domain/Tracer";

const builder = new ContainerBuilder();

builder.register(Storage).use(LocalStorage).asSingleton();
builder.register(Tracer).use(SentryTracer).asSingleton();
builder
  .register(ActivityRepository)
  .use(StorageActivityRepository)
  .withDependencies([Storage])
  .asSingleton();

export const container = builder.build();
