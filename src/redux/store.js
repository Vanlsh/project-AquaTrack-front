import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { waterReducer } from "./water/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "refreshToken"],
};

const waterPersistConfig = {
  key: "water",
  storage,
  whitelist: [],
};


const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWaterReducer = persistReducer(waterPersistConfig, waterReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    water: persistedWaterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
