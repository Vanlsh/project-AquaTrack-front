import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
// import { waterReducer } from "./water/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

// const waterPersistConfig = {
//   key: "water",
//   storage,
//   whitelist: [],
// };

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// const persistedWaterReducer = persistReducer(waterPersistConfig, waterReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // water: persistedWaterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
