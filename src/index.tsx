import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { BrowserRouter } from "react-router-dom";

dayjs.locale("ru-ru");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider
          locale={ruRU}
          theme={{
            token: {
              colorPrimary: "rgb(137, 175, 176)",
              colorError: "#c5776b",
              fontFamily:
                '"Source Code Pro", monospace',
              colorTextBase: "rgb(60, 60, 60)",
              fontSize: 16,
            },
          }}>
          <App />
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
