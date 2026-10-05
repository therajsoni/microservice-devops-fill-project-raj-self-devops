export const metadata = {
  title: "DevOps E-Commerce",
  description: "DevOps practice project"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
