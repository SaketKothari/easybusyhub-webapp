import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import "../styles/custom.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import StorageService from "../services/StorageService";
import { hydrate } from "../slices/basketSlice";
import { useEffect } from "react";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    store.subscribe(() => {
      StorageService.set("basket", JSON.stringify(store.getState().basket));
    });

    const basketData = StorageService.get("basket");
    const basket = basketData ? JSON.parse(basketData) : { items: [] };
    store.dispatch(hydrate(basket));
  });

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
