
/// <reference types="vite/client" />

interface Window {
  initializeDiroWidget: (
    container: HTMLElement | null,
    options: {
      targetUrl: string;
      allowRedirection: boolean;
      openWith: string;
      containerStyles: {
        backgroundColor: string;
        padding: string;
        borderRadius: string;
        width: string;
      };
    }
  ) => void;
}
