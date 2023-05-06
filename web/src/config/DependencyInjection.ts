import { ContainerBuilder } from "diod"
import { Storage } from "../domain/Storage"
import { LocalStorage } from "../infrastructure/LocalStorage"
import { ActivityStorage } from "../domain/ActivityStorage"
import { SentryTracer } from "../infrastructure/SentryTracer"
import { Tracer } from "../domain/Tracer"
import { DataFetcher } from "../domain/DataFetcher"
import { ContentfulDataFetcher } from "../infrastructure/ContentfulDataFetcher"
import { Syncronizer } from "../domain/Syncronizer"
import { VenueStorage } from "../domain/VenueStorage"
import { FavoriteStorage } from "../domain/FavoriteStorage"
import { CategoryStorage } from "../domain/CategoryStorage"
import { NetworkDetector } from "../domain/NetworkDetector"
import { BrowserNetworkDetector } from "../infrastructure/BrowserNetworkDetector"

export const registerDomainDependencies = (
	builder: ContainerBuilder
): ContainerBuilder => {
	builder
		.registerAndUse(ActivityStorage)
		.withDependencies([Storage])
		.asSingleton()
	builder
		.registerAndUse(CategoryStorage)
		.withDependencies([Storage])
		.asSingleton()
	builder.registerAndUse(VenueStorage).withDependencies([Storage]).asSingleton()
	builder
		.registerAndUse(FavoriteStorage)
		.withDependencies([Storage])
		.asSingleton()
	builder
		.registerAndUse(Syncronizer)
		.withDependencies([
			DataFetcher,
			ActivityStorage,
			CategoryStorage,
			VenueStorage,
		])
		.asSingleton()

	return builder
}

const builder = new ContainerBuilder()

builder.register(Storage).use(LocalStorage).asSingleton()
builder.register(Tracer).use(SentryTracer).asSingleton()
builder
	.register(DataFetcher)
	.use(ContentfulDataFetcher)
	.withDependencies([Storage])
	.asSingleton()
builder.register(NetworkDetector).use(BrowserNetworkDetector).asSingleton()

export const container = registerDomainDependencies(builder).build()
