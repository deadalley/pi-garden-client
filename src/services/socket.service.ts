import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

export class SocketService {
  static socket: any;

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

    console.log('Socket initialized. Attempting connect...');
    SocketService.socket = io.sails.connect();

    SocketService.socket.on('connect', () => {
      console.log('Socket connected.');
    });
  };
}
