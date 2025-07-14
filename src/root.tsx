import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import './global.css';

export default component$(() => {
  useVisibleTask$(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Handle PWA install prompt
    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install prompt
      const installPrompt = document.createElement('div');
      installPrompt.className = 'pwa-install-prompt';
      installPrompt.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">Cài đặt CarRental</p>
            <p class="text-sm opacity-90">Truy cập nhanh từ màn hình chính</p>
          </div>
          <div class="flex space-x-2">
            <button id="install-pwa" class="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">
              Cài đặt
            </button>
            <button id="dismiss-prompt" class="text-white opacity-70 hover:opacity-100">
              ✕
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(installPrompt);
      
      // Handle install button click
      document.getElementById('install-pwa')?.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
          document.body.removeChild(installPrompt);
        });
      });
      
      // Handle dismiss button click
      document.getElementById('dismiss-prompt')?.addEventListener('click', () => {
        document.body.removeChild(installPrompt);
      });
    });
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="CarRental" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CarRental" />
        <meta name="description" content="Dịch vụ cho thuê xe trực tuyến với giao diện hiện đại và trải nghiệm người dùng tốt nhất" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167x167.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        <title>CarRental - Dịch vụ cho thuê xe</title>
        <RouterHead />
      </head>
      <body lang="vi">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
