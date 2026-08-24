import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { defineConfig, type Plugin } from 'vite';

const resumePdf = path.resolve(__dirname, 'public/assets/Twarit_Waikar_Resume.pdf');

function resumePdfPlugin(): Plugin {
  const sendPdf = (res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Twarit_Waikar_Resume.pdf"');
    fs.createReadStream(resumePdf).pipe(res);
  };

  const isResumePath = (url?: string) => {
    const pathname = url?.split('?')[0];
    return pathname === '/resume' || pathname === '/resume/';
  };

  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (isResumePath(req.url)) {
      sendPdf(res);
      return;
    }
    next();
  };

  return {
    name: 'resume-pdf',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(resumePdf) || !fs.existsSync(dist)) return;
      fs.copyFileSync(resumePdf, path.join(dist, 'resume.pdf'));
      fs.copyFileSync(resumePdf, path.join(dist, 'resume'));
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), resumePdfPlugin()],
});
