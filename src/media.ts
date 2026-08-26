export function isGifSrc(src: string) {
  return /\.gif(?:$|[?#])/i.test(src);
}

export function isVideoSrc(src: string) {
  return /\.(mp4|webm|ogg)(?:$|[?#])/i.test(src);
}

export function isImageSrc(src: string) {
  return /\.(gif|png|jpe?g|webp|avif|svg)(?:$|[?#])/i.test(src);
}

export function youtubeEmbedId(src: string): string | null {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] || null;
    }
    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const fromQuery = url.searchParams.get('v');
      if (fromQuery) return fromQuery;
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'live') {
        return parts[1] || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function projectCardBackground(
  src?: string
): { kind: 'image' | 'video'; src: string } | undefined {
  if (!src) return undefined;
  if (isVideoSrc(src)) return { kind: 'video', src };
  if (isImageSrc(src) && !/\/rootex\.png$/i.test(src)) return { kind: 'image', src };
  const videoId = youtubeEmbedId(src);
  if (videoId) return { kind: 'image', src: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` };
  return undefined;
}
