import React from 'react';
import './App.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import EOGMetrics from './Dashboard/EOGMetrics';
import { Provider } from 'react-redux';
import createStore from './Redux/Store';

const store = createStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Wrapper>
        <Header />
        <EOGMetrics />
      </Wrapper>
      </Provider>
    </div>
  );
}

export default App;
