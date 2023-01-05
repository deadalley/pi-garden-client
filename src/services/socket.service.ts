import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

export class SocketService {
  static socket: any;
  static io: any;

  static initialize = () => {
    console.log('Initializing socket...');
    let io;
    if ((socketIOClient as any).sails) {
      io = socketIOClient as any;
    } else {
      console.log('Creating a new socket.io instance...');
      io = sailsIOClient(socketIOClient);
      io.sails.url = 'http://192.168.0.91:1337';
      io.sails.autoConnect = true;
      io.sails.environment = 'production';
    }

    SocketService.io = io;

    console.log('Socket initialized.');
  };

  static connect = () => {
    return new Promise<void>((resolve, reject) => {
      if (!SocketService.io) reject('Socket must be initialized before connecting.');

      console.log('Attempting to connect...');
      SocketService.socket = SocketService.io.sails.connect();
      SocketService.socket.on('connect', () => {
        console.log('Socket connected.');
        resolve();
      });
    });
  };

  static get(url: string, cb: (data: any, jwt: any) => void) {
    if (!SocketService.io) throw new Error('Socket must be initialized before fetching resource.');
    return SocketService.io.socket.get(url, cb);
  }
  static on(url: string, cb: (data: any, jwt: any) => void) {
    if (!SocketService.io) throw new Error('Socket must be initialized before fetching resource.');
    return SocketService.io.socket.on(url, cb);
  }
}
