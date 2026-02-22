import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Use IIFE format instead of ES modules to avoid MIME type issues
        format: 'iife',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Exclude development tools in production
    sourcemap: mode === 'development',
    minify: mode === 'production',
  },
  define: {
    // Disable React DevTools in production
    __REACT_DEVTOOLS_GLOBAL_HOOK__: mode === 'development' ? '({ isDisabled: true })' : undefined,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
