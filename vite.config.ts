import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH ?? "/",
    server: {
      host: "0.0.0.0",
      port: 3000,
      https: {
        cert: "./localhost.crt",
        key: "./localhost.key"
      } 
    }
  }
})
