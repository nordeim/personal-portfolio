/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob: (pattern: string | string[], options?: Record<string, unknown>) => Record<string, unknown>;
}

declare module '*.css' {
  const content: string;
  export default content;
}
