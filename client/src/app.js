import React, { useState, useEffect } from 'react';

import useQ from './hooks/queue';
import useForm from './hooks/form';
import useSocket from './hooks/socket';

// Connect outside of the render cycle ...

const App = (props) => {
  function handlePublish(values) {
    // eslint-disable-next-line no-use-before-define
    queuePublish('deeds', 'work', values);
    // eslint-disable-next-line no-use-before-define
    socketPublish('words', values);
  }

  const [values, handleChange, handleSubmit] = useForm(handlePublish);
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});
  const [socketSubscribe, socketPublish] = useSocket();
  const [queueSubscribe, queuePublish] = useQ('deeds');

  useEffect(() => {
    queueSubscribe('work', (message) => {
      setQueueMessage(message);
    });
    socketSubscribe('incoming', (message) => {
      setSocketMessage(message);
    });
  }, []);

  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={handleSubmit}>
        <input name='firstName' placeholder="First Name" onChange={handleChange} />
        <input name='lastName' placeholder="Last Name" onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
};

export default App;
