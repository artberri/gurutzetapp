/* eslint-disable no-console */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const OnlineStatusContext = createContext(true);

export const OnlineStatusProvider = ({
  children,
  online,
}: {
  children: ReactNode;
  online: boolean;
}) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(online);

  console.log("onlineStatus", onlineStatus);

  useEffect(() => {
    const setOffline = () => setOnlineStatus(false);
    const setOnline = () => setOnlineStatus(true);

    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      console.log("removeEventListener onlineStatus");
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

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
