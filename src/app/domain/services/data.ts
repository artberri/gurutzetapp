import { ExternalData } from '../types';

export abstract class IData {
    public async abstract retrieveData(): Promise<ExternalData | undefined>;
    public async abstract retrieveDataLocally(): Promise<ExternalData | undefined>;
}
