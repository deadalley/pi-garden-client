import { useEffect, useState } from 'react';

import { SocketService } from '../services/socket.service';

export function useSubscribe<T>(entity: string): T | undefined {
  const [data, setData] = useState<T>();

  useEffect(() => {
    SocketService.on(entity, (data: T) => {
      setData(data);
    });
  }, []);

  return data;
}
