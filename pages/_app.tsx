import '../styles/globals.css';
import { AppProps } from 'next/app';
import 'modern-css-reset';
import '@fontsource/roboto';
// import '../styles/reset.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
