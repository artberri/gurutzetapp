import { useState, useCallback, ReactNode, useEffect } from "react";
import * as serviceWorkerRegistration from "../ServiceWorkerRegistration";

export const useServiceWorker = () => {
  const [showReload, setShowReload] = useState(false);

  const onSWUpdate = useCallback(() => {
    setShowReload(true);
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
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
    });
  }, [onSWUpdate]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
