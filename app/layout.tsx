import type {Metadata} from 'next';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Oria | Morning Rituals, Redefined by Nature',
  description: 'Sophisticated, organic, whole-food breakfast nutrition powered by ancient millets and natural clean-label proteins. Reclaim your mornings.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}


