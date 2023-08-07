"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

export function Providers(props) {
  const { children } = props;
  return <Provider store={store}><PersistGate persistor={persistor}>{children}</PersistGate></Provider>;
}
