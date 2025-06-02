import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  weight: '400',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blark's Blog",
  description: "Blog by Blark to help you take your black and white photography to the next level",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <div className="footer">
          <div className="footer-content">
        <div className="box left">
          <span>Jiti LLC © 2025</span>
          <div className="app-section">
            <span>Our Apps</span>
            <a className="single-app" href="https://litur.app" target="_blank">
              <img className="single-app-icon" src="/blog/assets/litur.png" />
              <div className="single-app-parent">
                <span className="single-app-name">Litur</span>
                <span className="single-app-desc">Color picker & library app<br /> for iOS and macOS</span>
              </div>
            </a>
            <a className="single-app" href="https://getviso.app" target="_blank">
              <img className="single-app-icon" src="/blog/assets/viso.png" />
              <div className="single-app-parent">
                <span className="single-app-name">Viso</span>
                <span className="single-app-desc">Beautiful minimal image viewer<br /> for macOS</span>
              </div>
            </a>
          </div>
        </div>
        <div className="box middle">
          <h1 className="h1-tag">
            Get Blark
          </h1>
          <span className="trial">With a free 1 week trial</span>
          <a href="https://apps.apple.com/us/app/blark-pro-black-white-camera/id6742157071" className="free">Download from
            the AppStore</a>
            <img src="/blog/assets/phone.png" />
        </div>
        <div className="box right">
          <a className="hfeatures" href="https://blark.app/#features" target="_blank">Features</a>
          <a className="hpricing"
            href="https://drive.google.com/drive/folders/1BQr_MKV7GN0_zk0lbsPT2e1w9_C5m5wC?usp=drive_link"
            target="_blank">Press Kit</a>
          <a href="mailto:blark@jiti.io" target="_blank">Support</a>
          <a href="https://blark.app/terms" target="_blank">Terms Of Service</a>
          <a href="https://blark.app/privacy/" target="_blank">Privacy Policy</a>
        </div>
      </div>
        </div>
      </body>

    </html>
  );
}
