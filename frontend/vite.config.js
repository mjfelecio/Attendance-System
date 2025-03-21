import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000" // makes it so that anything with an api endpoint gets prefixed with this target
      }
    }
  }
})
