import "./globals.css";

export const metadata = {
  title: "Dribble clone",
  description: "Dribble clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
