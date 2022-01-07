/* eslint-disable quotes */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagas from '../Dashboard/Saga';
import MetricsReducer from './Reducers/Reducer';

const reducer = combineReducers({
    MetricsData:MetricsReducer
});
export type IState = ReturnType<typeof reducer>;

export default () => {
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(reducer, composeEnhancers(middlewares));
    sagaMiddleware.run(sagas);
    return store;
};
