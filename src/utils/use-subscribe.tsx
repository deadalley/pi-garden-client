import { useEffect } from 'react';

import { SocketService } from '../services/socket.service';
import { useAppDispatch } from '../store.hooks';

export function useSubscribe<T>(entity: string, dispatchFn: Function): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    SocketService.on(entity, (data: T) => {
      dispatch(dispatchFn(data));
    });
  }, []);
}
