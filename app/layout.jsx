
export const metadata = {
  title: 'Kids Tracker',
  description: 'Track kids tasks and behavior',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
