'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useMount from '@/hooks/useMount';

import Alert from './Alert';
import { Alert as AlertType } from './Alert.type';
import { AlertObserver, AlertSubject } from './AlertSubject';

const AlertContainer = () => {
  const [Alerts, setAlerts] = useState<AlertType[]>([]);

  const Alert_LIMIT = 1;
  const Alert_DURATION = 3000;

  const isMounted = useMount();

  useEffect(() => {
    const alertSubject = AlertSubject.getInstance();

    const handleNewAlert: AlertObserver = ({ id, message, handleClick }) => {
      if (id === -1 && message === '') {
        setAlerts([]);
        return;
      }

      const alertId = id || Date.now();
      const newAlert = {
        id: alertId,
        message,
        handleClick,
      };

      setAlerts((prev) => {
        if (prev.length >= Alert_LIMIT) return [...prev.slice(1), newAlert];
        return [...prev, newAlert];
      });

      setTimeout(() => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
      }, Alert_DURATION);
    };

    alertSubject.subscribe(handleNewAlert);

    return () => {
      alertSubject.unsubscribe(handleNewAlert);
    };
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div className='pointer-events-none fixed bottom-[30px] left-1/2 z-[60] flex w-full -translate-x-1/2 items-center'>
      {Alerts.slice()
        .reverse()
        .map(({ id, message, handleClick }) => (
          <Alert
            key={id}
            id={id}
            message={message}
            handleClick={handleClick}
            onClose={() => setAlerts((prev) => prev.filter((alert) => alert.id !== id))}
          />
        ))}
    </div>,
    document.getElementById('alert-root') || document.body,
  );
};

export default AlertContainer;
