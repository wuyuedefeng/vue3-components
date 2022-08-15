import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    lib: {
			entry: resolve(__dirname, 'packages/index.ts'),
			name: 'Vue3Components',
			formats: ['es', 'cjs', 'umd', 'iife'],
			fileName: 'vue3-components',
		},
		rollupOptions: {
			external: ['vue'], // 确保外部化处理那些你不想打包进库的依赖
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
  }
})
