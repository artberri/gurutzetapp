import { map } from "fluture";
import { ActivityRepository } from "./ActivityRepository";
import { CategoryRepository } from "./CategoryRepository";
import { Data, DataFetcher } from "./DataFetcher";
import { VenueRepository } from "./VenueRepository";

const sync =
  ({
    activityRepository,
    categoryRepository,
    venueRepository,
  }: {
    activityRepository: ActivityRepository;
    categoryRepository: CategoryRepository;
    venueRepository: VenueRepository;
  }) =>
  (data: Data) => {
    const { modified, removed } = data;
    const { activities, categories, venues } = modified;
    const {
      activities: removedActivities,
      categories: removedCategories,
      venues: removedVenues,
    } = removed;

    activityRepository.remove(removedActivities);
    activityRepository.save(activities);
    categoryRepository.remove(removedCategories);
    categoryRepository.save(categories);
    venueRepository.remove(removedVenues);
    venueRepository.save(venues);
  };

export class Syncronizer {
  public constructor(
    private readonly fetcher: DataFetcher,
    private readonly activityRepository: ActivityRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly venueRepository: VenueRepository,
  ) {}

  public sync() {
    return map(
      sync({
        activityRepository: this.activityRepository,
        categoryRepository: this.categoryRepository,
        venueRepository: this.venueRepository,
      }),
    )(this.fetcher.fetch());
  }
}
