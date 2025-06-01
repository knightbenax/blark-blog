import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
<div class="footer-content">
        <div class="box left">
          <span>Jiti LLC © 2025</span>
          <div class="app-section">
            <span>Our Apps</span>
            <a class="single-app" href="https://litur.app" target="_blank">
              <img class="single-app-icon" src="assets/litur.png" />
              <div class="single-app-parent">
                <span class="single-app-name">Litur</span>
                <span class="single-app-desc">Color picker & library app<br /> for iOS and macOS</span>
              </div>
            </a>
            <a class="single-app" href="https://getviso.app" target="_blank">
              <img class="single-app-icon" src="assets/viso.png" />
              <div class="single-app-parent">
                <span class="single-app-name">Viso</span>
                <span class="single-app-desc">Beautiful minimal image viewer<br /> for macOS</span>
              </div>
            </a>
          </div>
        </div>
        <div class="box middle">
          <h1 class="h1-tag">
            Get Blark
          </h1>
          <span class="trial">With a free 1 week trial</span>
          <a href="https://apps.apple.com/us/app/blark-pro-black-white-camera/id6742157071" class="free">Download from
            the AppStore</a>
            <img src="assets/phone.png" />
        </div>
        <div class="box right">
          <a class="hfeatures" href="https://blark.app/#features" target="_blank">Features</a>
          <a class="hpricing"
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
