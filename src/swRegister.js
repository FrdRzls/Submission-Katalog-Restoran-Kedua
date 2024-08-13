import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.bundle.js');
    try {
      await wb.register();
      console.log('Service worker registered.');
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  } else {
    console.log('Service Worker not supported in this browser.');
  }
};

export default swRegister;
