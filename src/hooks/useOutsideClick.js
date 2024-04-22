import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenAtCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener('click', handleClick, listenAtCapturing);

      return () => document.removeEventListener('click', handleClick, true);
    },
    [handler, listenAtCapturing]
  );

  return ref;
}
