import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        rooms: resolve(import.meta.dirname, 'rooms.html'),
        apply: resolve(import.meta.dirname, 'apply.html'),
        reserve: resolve(import.meta.dirname, 'reserve.html'),
        confirmation: resolve(import.meta.dirname, 'confirmation.html'),
        reservationConfirmation: resolve(
          import.meta.dirname,
          'reservation-confirmation.html'
        ),
      },
    },
  },
});
