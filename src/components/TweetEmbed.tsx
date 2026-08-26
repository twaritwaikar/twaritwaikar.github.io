import React, { useEffect, useRef, useState } from 'react';

interface TwitterWidgets {
  createTweet: (
    id: string,
    element: HTMLElement,
    options?: {
      theme?: 'light' | 'dark';
      dnt?: boolean;
      align?: 'left' | 'center' | 'right';
      conversation?: 'none' | 'all';
    }
  ) => Promise<HTMLElement | undefined>;
}

interface TwitterSDK {
  widgets: TwitterWidgets;
  ready: (callback: (twttr: TwitterSDK) => void) => void;
}

const SCRIPT_ID = 'twitter-wjs';
const SCRIPT_SRC = 'https://platform.twitter.com/widgets.js';

let widgetsPromise: Promise<TwitterWidgets> | null = null;

function getTwitter(): TwitterSDK | undefined {
  return (window as Window & { twttr?: TwitterSDK }).twttr;
}

function loadTwitterWidgets(): Promise<TwitterWidgets> {
  const existingSdk = getTwitter();
  if (existingSdk?.widgets) return Promise.resolve(existingSdk.widgets);
  if (widgetsPromise) return widgetsPromise;

  widgetsPromise = new Promise((resolve, reject) => {
    const succeed = () => {
      const sdk = getTwitter();
      if (sdk?.widgets) {
        resolve(sdk.widgets);
        return;
      }
      if (sdk?.ready) {
        sdk.ready((readySdk) => {
          if (readySdk?.widgets) resolve(readySdk.widgets);
          else reject(new Error('Twitter widgets unavailable'));
        });
        return;
      }
      reject(new Error('Twitter widgets unavailable'));
    };

    const fail = () => {
      widgetsPromise = null;
      reject(new Error('Failed to load Twitter widgets'));
    };

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (getTwitter()?.widgets) {
        succeed();
        return;
      }
      existing.addEventListener('load', succeed, { once: true });
      existing.addEventListener('error', fail, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = succeed;
    script.onerror = fail;
    document.body.appendChild(script);
  });

  return widgetsPromise;
}

export function tweetIdFromUrl(src: string): string | null {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, '');
    if (
      host !== 'twitter.com' &&
      host !== 'x.com' &&
      host !== 'mobile.twitter.com' &&
      host !== 'mobile.x.com'
    ) {
      return null;
    }
    const parts = url.pathname.split('/').filter(Boolean);
    const statusIdx = parts.findIndex((part) => part === 'status');
    if (statusIdx === -1) return null;
    return parts[statusIdx + 1]?.match(/^\d+/)?.[0] ?? null;
  } catch {
    return null;
  }
}

export function TweetEmbed({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const tweetId = tweetIdFromUrl(url);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    tweetId ? 'loading' : 'error'
  );

  useEffect(() => {
    if (!tweetId) return;
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    const mount = document.createElement('div');
    el.appendChild(mount);

    loadTwitterWidgets()
      .then((widgets) => {
        if (cancelled) return undefined;
        return widgets.createTweet(tweetId, mount, {
          theme: 'dark',
          dnt: true,
          align: 'center',
          conversation: 'none',
        });
      })
      .then((node) => {
        if (cancelled) return;
        setStatus(node ? 'ready' : 'error');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
      mount.remove();
    };
  }, [tweetId]);

  if (!tweetId || status === 'error') {
    return (
      <p className={className ?? 'my-3'}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:opacity-80"
        >
          View post on X
        </a>
      </p>
    );
  }

  return (
    <div className={`flex justify-center ${className ?? 'my-3'}`}>
      <div ref={containerRef} className="w-full max-w-[550px] min-h-[120px]" />
    </div>
  );
}
