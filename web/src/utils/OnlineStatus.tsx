import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const OnlineStatusContext = createContext(true);

export const OnlineStatusProvider = ({ children }: { children: ReactNode }) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

  useEffect(() => {
    const offline = () => setOnlineStatus(false);
    const online = () => setOnlineStatus(true);

    window.addEventListener("offline", offline);
    window.addEventListener("online", online);

    return () => {
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", online);
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
