import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { logger } from 'redux-logger';
import userSlice from './userSlice';
//import {thunk} from 'redux-thunk';



const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({
  user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false }), thunk, logger]
})

export const persistor = persistStore(store)