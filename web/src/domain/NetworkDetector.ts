export type CancelWatch = () => void;

export abstract class NetworkDetector {
  public abstract isOnLine(): boolean;
  public abstract watchOnlineStatus(
    callback: (isOnLine: boolean) => void,
  ): CancelWatch;
}
