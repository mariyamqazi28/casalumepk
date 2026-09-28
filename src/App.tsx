import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CollectionsView } from './components/CollectionsView';
import { ScentLayeringMixer } from './components/ScentLayeringMixer';
import { AboutView } from './components/AboutView';
import { CartDrawer } from './components/CartDrawer';
import { OrderModal } from './components/OrderModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { CartProvider, useCart } from './context/CartContext';
import { Product } from './types';

const MainContent: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('home');
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const { quickViewProduct, setQuickViewProduct } = useCart();

  const handleNavigate = (view: string) => {
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#171513] flex flex-col font-sans">
      {/* 1. Windows/Luxury Splash Screen with Perfume Bottle Wireframe */}
      <SplashScreen onFinish={() => setIsAppReady(true)} />

      {/* 2. Transparent Floating Glassmorphism Navbar */}
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      {/* 3. Main Multi-Page View Routing */}
      <main className="flex-1 w-full">
        {activeView === 'home' && (
          <HomeView
            isReady={isAppReady}
            onQuickView={(p: Product) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'collections' && (
          <CollectionsView onQuickView={(p: Product) => setQuickViewProduct(p)} />
        )}

        {activeView === 'mixer' && (
          <div className="pt-20 sm:pt-28 pb-16 min-h-[calc(100vh-80px)]">
            <ScentLayeringMixer onQuickView={(p: Product) => setQuickViewProduct(p)} />
          </div>
        )}

        {activeView === 'about' && (
          <AboutView />
        )}
      </main>

      {/* 4. Slide-Out Interactive Checkout Panel (Cart/Order Drawer) */}
      <CartDrawer />

      {/* 5. Order Confirmation Modal with Checkmark & Full Receipt */}
      <OrderModal />

      {/* 6. Quick View Olfactory Pyramid Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* 7. Modern Luxury Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
