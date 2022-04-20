import { useState, useCallback, ReactNode, useEffect } from "react";
import * as serviceWorkerRegistration from "../ServiceWorkerRegistration";

export const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const [showReload, setShowReload] = useState(false);

  const onSWUpdate = useCallback((registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  }, []);

  const reloadPage = useCallback(() => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload();
  }, [waitingWorker]);

  return { showReload, waitingWorker, reloadPage, onSWUpdate };
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
