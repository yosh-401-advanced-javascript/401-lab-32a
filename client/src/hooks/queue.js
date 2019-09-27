import Q from '@nmq/q/client';

const useQ = (q) => {
  const queue = new Q(q);

  const subscribe = (q, event, callback) => queue.subscribe(event, (payload) => callback(payload));

  const publish = (q, event, message) => Q.publish(q, event, message);

  return [publish, subscribe];
};


export default useQ;
