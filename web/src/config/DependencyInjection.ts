import { ContainerBuilder } from "diod";
import { ActivityStorage } from "../domain/ActivityStorage";
import { CategoryStorage } from "../domain/CategoryStorage";
import { DataFetcher } from "../domain/DataFetcher";
import { FavoriteStorage } from "../domain/FavoriteStorage";
import { NetworkDetector } from "../domain/NetworkDetector";
import { Storage } from "../domain/Storage";
import { Syncronizer } from "../domain/Syncronizer";
import { Tracer } from "../domain/Tracer";
import { VenueStorage } from "../domain/VenueStorage";
import { BrowserNetworkDetector } from "../infrastructure/BrowserNetworkDetector";
import { ContentfulDataFetcher } from "../infrastructure/ContentfulDataFetcher";
import { LocalStorage } from "../infrastructure/LocalStorage";
import { SentryTracer } from "../infrastructure/SentryTracer";

export const registerDomainDependencies = (
	builder: ContainerBuilder,
): ContainerBuilder => {
	builder
		.registerAndUse(ActivityStorage)
		.withDependencies([Storage])
		.asSingleton();
	builder
		.registerAndUse(CategoryStorage)
		.withDependencies([Storage])
		.asSingleton();
	builder
		.registerAndUse(VenueStorage)
		.withDependencies([Storage])
		.asSingleton();
	builder
		.registerAndUse(FavoriteStorage)
		.withDependencies([Storage])
		.asSingleton();
	builder
		.registerAndUse(Syncronizer)
		.withDependencies([
			DataFetcher,
			ActivityStorage,
			CategoryStorage,
			VenueStorage,
		])
		.asSingleton();

	return builder;
};

const builder = new ContainerBuilder();

builder.register(Storage).use(LocalStorage).asSingleton();
builder.register(Tracer).use(SentryTracer).asSingleton();
builder
	.register(DataFetcher)
	.use(ContentfulDataFetcher)
	.withDependencies([Storage])
	.asSingleton();
builder.register(NetworkDetector).use(BrowserNetworkDetector).asSingleton();

export const container = registerDomainDependencies(builder).build();
