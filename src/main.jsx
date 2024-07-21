import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "modern-normalize";
import { PersistGate } from "redux-persist/integration/react";
import App from "./components/App.jsx";
import { ModalProvider } from "./context/ModalProvider.jsx";
import { persistor, store } from "./redux/store.js";
import { injectStore } from "./axios.js";
import "./index.css";
import "./i18n/index.js";
import { TourProvider } from '@reactour/tour'
import { disableBody, enableBody, steps, styles } from './onboarding/steps.jsx'

injectStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ModalProvider>
            <TourProvider steps={steps} afterOpen={disableBody} beforeClose={enableBody} styles={styles}>
              <App />
            </TourProvider>  
          </ModalProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
