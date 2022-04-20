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

  useEffect(() => {
    const setOffline = () => setOnlineStatus(false);
    const setOnline = () => setOnlineStatus(true);

    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
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
