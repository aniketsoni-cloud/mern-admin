import React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";

import App from "./App";

import "./index.css";

// Redux Store
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

// Start MSW in development mode (optional - only if you want to use mocks)
// To enable mocks, set REACT_APP_USE_MOCKS=true in your .env file
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCKS === 'true') {
  const { worker } = require('./mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
  }).then(() => {
    console.log('🔶 MSW Mock Service Worker started');
  });
}

// Rendering App
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
