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

  const pathnameOf = (url?: string) => url?.split('?')[0];

  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const pathname = pathnameOf(req.url);
    if (pathname === '/resume' || pathname === '/resume/') {
      res.statusCode = 302;
      res.setHeader('Location', '/resume.pdf');
      res.end();
      return;
    }
    if (pathname === '/resume.pdf') {
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
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), resumePdfPlugin()],
});
