import "./globals.css";

export const metadata = {
  title: "Modern Microservices App",
  description: "Next.js microservices dashboard"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
