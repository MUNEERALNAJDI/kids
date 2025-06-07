export const metadata = {
  title: 'Kids Task Tracker',
  description: 'Manage kids tasks and points',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
