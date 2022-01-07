import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', {
    reconnect: true,
});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
          forwardSubscription: (operation) => subscriptionClient.request(operation),
      }),
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
