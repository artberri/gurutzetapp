import { map } from "fluture";
import { ActivityRepository } from "./ActivityRepository";
import { Data, DataFetcher } from "./DataFetcher";

const sync =
  ({ activityRepository }: { activityRepository: ActivityRepository }) =>
  (data: Data) => {
    const { modified } = data;
    const { activities } = modified;

    activityRepository.save(activities);
  };

export class Syncronizer {
  public constructor(
    private readonly fetcher: DataFetcher,
    private readonly activityRepository: ActivityRepository
  ) {}

  public sync() {
    return map(sync({ activityRepository: this.activityRepository }))(
      this.fetcher.fetch()
    );
  }
}
