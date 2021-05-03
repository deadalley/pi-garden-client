import { useEffect, useState, useCallback } from 'react';

export const useLoadAsync = (fn: () => Promise<any>) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [value, setValue] = useState();
  const [done, setDone] = useState(false);

  const refetch = useCallback(() => setShouldRefetch(!shouldRefetch), [
    setShouldRefetch,
    shouldRefetch,
  ]);

  useEffect(() => {
    Promise.resolve()
      .then(() => setDone(false))
      .then(() => fn())
      .then((res) => setValue(res))
      .then(() => setDone(true));
  }, [shouldRefetch]);

  return [value, done, refetch];
};
