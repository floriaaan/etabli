declare global {
  interface Window {
    __TAURI__: any;
  }
}

window.__TAURI__ = window.__TAURI__ || {};
