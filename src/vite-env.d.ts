/// <reference types="vite/client" />

declare module 'virtual:github-stars' {
  const stars: Record<string, number>;
  export default stars;
}
