import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { NetworkDetector } from "../domain/NetworkDetector";
import { useService } from "./ServiceUtils";

const OnlineStatusContext = createContext(true);

export const OnlineStatusProvider = ({ children }: { children: ReactNode }) => {
  const networkDetector = useService(NetworkDetector);
  const [onlineStatus, setOnlineStatus] = useState<boolean>(() =>
    networkDetector.isOnLine(),
  );

  useEffect(
    () => networkDetector.watchOnlineStatus(setOnlineStatus),
    [networkDetector],
  );

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext);
  return store;
};
