import { useState, useCallback, ReactNode, useEffect } from "react";
import * as serviceWorkerRegistration from "../ServiceWorkerRegistration";

export const useServiceWorker = () => {
  const [showReload, setShowReload] = useState(false);

  const onSWUpdate = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("onSWUpdate");
    setShowReload(true);
    // eslint-disable-next-line no-console
    console.log("setShowReload true");
  }, []);

  const reloadPage = useCallback(() => {
    setShowReload(false);
    window.location.reload();
  }, []);

  return {
    showReload,
    reloadPage,
    onSWUpdate,
  };
};

export const RegisterServiceWorker = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { onSWUpdate } = useServiceWorker();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("serviceWorkerRegistration.register", onSWUpdate);
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
    });
  }, [onSWUpdate]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
