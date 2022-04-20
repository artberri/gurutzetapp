import { useState, useCallback, ReactNode, useEffect } from "react";
import * as serviceWorkerRegistration from "../ServiceWorkerRegistration";

const noop = () => {};

export const useServiceWorker = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const [showReload, setShowReload] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(() => noop);

  const onSWUpdate = useCallback((registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  }, []);

  const reloadPage = useCallback(() => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload();
  }, [waitingWorker]);

  return {
    showReload,
    waitingWorker,
    reloadPage,
    onSWUpdate,
    forceUpdate,
    setForceUpdate,
  };
};

export const RegisterServiceWorker = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { onSWUpdate, setForceUpdate } = useServiceWorker();

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
      setForceUpdate,
    });
  }, [onSWUpdate, setForceUpdate]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
