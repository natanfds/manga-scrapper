declare namespace NodeJS {
  interface ProcessEnv {
    BROWSER_PATH: string;
    NODE_ENV: 'development' | 'production' | 'test';
    DOWNLOAD_PATH: string;
    LOG_FILE: string;
  }
}