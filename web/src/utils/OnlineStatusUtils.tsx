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
    const popstate = () => {
      // eslint-disable-next-line no-alert
      alert("You message");
    };

    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);
    window.addEventListener("popstate", popstate);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
      window.removeEventListener("popstate", popstate);
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
