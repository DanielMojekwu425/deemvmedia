/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import PortfolioScreen from './components/PortfolioScreen';
import ContactScreen from './components/ContactScreen';
import { Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const renderActiveScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen setScreen={setScreen} />;
      case 'about':
        return <AboutScreen />;
      case 'portfolio':
        return <PortfolioScreen setScreen={setScreen} />;
      case 'contact':
        return <ContactScreen />;
      default:
        return <HomeScreen setScreen={setScreen} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/bgimage.jpeg')] bg-cover bg-center bg-fixed text-white font-sans selection:bg-sky-500/20 selection:text-sky-300 antialiased overflow-x-hidden">
      {/* Global dark atmosphere overlay to preserve contrast and typography readability */}
      <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-[2px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header element with navigation coordinates */}
        <Header currentScreen={screen} setScreen={setScreen} />

        {/* Main Dynamic Viewport */}
        <main className="flex-grow">
          {renderActiveScreen()}
        </main>

        {/* Persistent Brand Footer */}
        <Footer setScreen={setScreen} />
      </div>
    </div>
  );
}

