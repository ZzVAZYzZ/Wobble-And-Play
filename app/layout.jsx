import Navbar from "../component/Nav/Navbar";
import Footer from "../component/Footer/Footer";
import { ProviderRedux } from "./GlobalRedux/provider";
import "./index.css"
import "../component/Nav/index.css"
import "../component/Footer/index.css"

export const metadata = {
  title: "Wobble&Play",
  description: "Wobble&Play, nơi bán đồ chơi em bé dưới 1 năm tuổi, có nhiều sản phẩm dễ thương, theo chủ đề con vật cho các bé lựa chọn",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
        <ProviderRedux >
          <Navbar />
          {children}
          <Footer />
        </ProviderRedux>
        
      </body>
    </html>
  );
}
