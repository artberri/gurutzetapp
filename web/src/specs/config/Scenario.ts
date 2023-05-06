import { Container, ContainerBuilder } from "diod"
import { resolve } from "fluture"
import { mock } from "jest-mock-extended"
import { registerDomainDependencies } from "../../config/DependencyInjection"
import { Activity } from "../../domain/Activity"
import { ActivityStorage } from "../../domain/ActivityStorage"
import { Category } from "../../domain/Category"
import { CategoryStorage } from "../../domain/CategoryStorage"
import { DataFetcher } from "../../domain/DataFetcher"
import { NetworkDetector } from "../../domain/NetworkDetector"
import { Storage } from "../../domain/Storage"
import { Tracer } from "../../domain/Tracer"
import { Venue } from "../../domain/Venue"
import { VenueStorage } from "../../domain/VenueStorage"
import { InMemoryStorage } from "../infrastructure/InMemoryStorage"
import { buildActivities } from "./ActivityBuilder"
import { buildCategories } from "./CategoryBuilder"
import { buildVenues } from "./VenueBuilder"

export type Data = {
	activities: Activity[]
	categories: Category[]
	venues: Venue[]
}

const days = [
	new Date("2022-05-06"),
	new Date("2022-05-07"),
	new Date("2022-05-08"),
	new Date("2022-05-13"),
	new Date("2022-05-14"),
	new Date("2022-05-15"),
]

export class Scenario {
	public readonly container: Container

	private readonly tracer = mock<Tracer>()

	private readonly dataFetcher = mock<DataFetcher>()

	private readonly networkDetector = mock<NetworkDetector>()

	public readonly initialData = Scenario.buildDemoData()

	private constructor() {
		this.dataFetcher.fetch.mockReturnValue(
			resolve({
				modified: {
					activities: this.initialData.activities,
					categories: this.initialData.categories,
					venues: this.initialData.venues,
				},
				removed: {
					activities: [],
					categories: [],
					venues: [],
				},
			})
		)
		this.setOnline()
		const builder = new ContainerBuilder()

		builder.register(Storage).use(InMemoryStorage).asSingleton()
		builder.register(Tracer).useInstance(this.tracer)
		builder.register(DataFetcher).useInstance(this.dataFetcher)
		builder.register(NetworkDetector).useInstance(this.networkDetector)

		this.container = registerDomainDependencies(builder).build()
	}

	public setOffline(): Scenario {
		this.networkDetector.isOnLine.mockReturnValue(false)
		return this
	}

	public setOnline(): Scenario {
		this.networkDetector.isOnLine.mockReturnValue(true)
		return this
	}

	public fetchEmptyData(): Scenario {
		this.dataFetcher.fetch.mockReturnValue(
			resolve({
				modified: {
					activities: [],
					categories: [],
					venues: [],
				},
				removed: {
					activities: [],
					categories: [],
					venues: [],
				},
			})
		)
		return this
	}

	public withStoredData(data: Data): Scenario {
		const activityStorage = this.container.get(ActivityStorage)
		activityStorage.save(data.activities)
		const categoryStorage = this.container.get(CategoryStorage)
		categoryStorage.save(data.categories)
		const venueStorage = this.container.get(VenueStorage)
		venueStorage.save(data.venues)
		return this
	}

	public static default(): Scenario {
		return new Scenario()
	}

	public static buildDemoData(): Data {
		const categories = buildCategories([
			"Kids",
			"Music",
			"Gastronomy",
			"Shows",
			"People",
			"Championships",
		])
		const venues = buildVenues(20)
		const activities = buildActivities({
			amount: 100,
			days,
			venues,
			categories,
		})

		return {
			activities,
			categories,
			venues,
		}
	}
}
