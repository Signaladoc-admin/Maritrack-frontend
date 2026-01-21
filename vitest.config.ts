import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './shared/lib/test-setup.ts', // Note: removed src/
		alias: {
			'@': path.resolve(__dirname, './'), // Points to root
		},
	},
})
