import { useState, useEffect } from 'react';

export function useSharedState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(key) : null;

    const handleMessage = (event) => {
      setState(event.data);
    };

    if (channel) {
      channel.onmessage = handleMessage;
    }

    return () => {
      if (channel) channel.close();
    };
  }, [key]);

  const setSharedState = (newValue) => {
    setState(newValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      const channel = new BroadcastChannel(key);
      channel.postMessage(newValue);
      channel.close();
    } catch (e) {}
  };

  return [state, setSharedState];
}
