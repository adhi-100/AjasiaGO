import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'AjasiaGO | Everything You Want. One GO.',
  description: 'AjasiaGO - India’s modern multi-category shopping platform. Discover electronics, fashion, lifestyle, beauty and home essentials with fast doorstep delivery and verified reviews.',
  openGraph: {
    title: 'AjasiaGO | Everything You Want. One GO.',
    description: 'AjasiaGO - India’s modern multi-category shopping platform. Discover electronics, fashion, lifestyle, beauty and home essentials with fast doorstep delivery.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AjasiaGO | Everything You Want. One GO.',
    description: 'Discover electronics, fashion, home and beauty with fast delivery and authentic customer reviews on AjasiaGO.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
