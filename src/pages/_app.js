import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Navbar from "@/components/Header/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
