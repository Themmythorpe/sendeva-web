import "../src/styles/globals.css";
import "../src/styles/nprogress.css";
import { CacheProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "../redux/store";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "theme";
import { theme } from "../src/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { RTL } from "components/rtl";
import { ToastContainer } from "react-hot-toast";
import { getServerSideProps } from "./index";
import { SettingsConsumer, SettingsProvider } from "contexts/settings-context";
import "../src/language/i18n";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import nProgress from "nprogress";
import Router from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useScrollRestoration from "api-manage/hooks/custom-hooks/useSCrollRestoration";
import ErrorBoundary from "../src/components/ErrorBoundary";
import Script from "next/script";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
export const currentVersion = process.env.NEXT_PUBLIC_SITE_VERSION;
const clientSideEmotionCache = createEmotionCache();
const persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    configData,
  } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const { t } = useTranslation();

  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion");

    if (storedVersion !== currentVersion) {
      localStorage.clear(); // Clear local storage
      localStorage.setItem("appVersion", currentVersion); // Update stored version
    }
  }, []);
  useScrollRestoration();
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={theme}>
                <RTL direction={value?.settings?.direction}>
                  <CssBaseline />
                  <ToastContainer />
                  {/* <DynamicFavicon configData={configData}/> */}
                  {/* <Head>
                                                <title>{t('Loading...')}</title>
                                            </Head> */}
                  {getLayout(<Component {...pageProps} />)}
                </RTL>
              </ThemeProvider>
            </CacheProvider>
          </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
export { getServerSideProps };
