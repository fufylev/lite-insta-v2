import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Persistor } from 'redux-persist/es/types';
import { authReducer } from './auth/reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const middlewares = [thunkMiddleware, logger];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    persistedReducer,
    composeWithDevTools(middleWareEnhancer),
  );
  // @ts-ignore
  let persistor: Persistor = persistStore<Store>(store);

  return { store, persistor };
}
