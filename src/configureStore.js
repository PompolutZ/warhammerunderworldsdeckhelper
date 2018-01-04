import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { loadState, saveState } from './utils/localStorage';
import { throttle } from 'lodash';
import appReducers from './reducers/index'

const loggerMiddleware = createLogger();

const configureStore = () => {
    const persistedStore = loadState();
    const store = createStore(
        appReducers, 
        persistedStore,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(
            loggerMiddleware
        ));
    
    console.log(store.getState());
    
    const unsdub = store.subscribe(throttle(() => {
      saveState(store.getState());
      console.log(store.getState());
    }, 1000));
    
    return store;
}

export default configureStore;
