
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export default function useSocket() {
  const subscribe = (event, callback) => socket.on(event, callback);

  const publish = (event, callback) => socket.emit(event, callback);

  return [subscribe, publish];
}
