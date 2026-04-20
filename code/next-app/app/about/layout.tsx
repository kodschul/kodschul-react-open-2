import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AboutPage",
  description: "This is the about page",
};

export default function AboutPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <h1>About Section</h1>
        {children}
      </body>
    </html>
  );
}
