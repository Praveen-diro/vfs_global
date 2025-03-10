
/// <reference types="vite/client" />

interface Window {
  initializeDiroWidget: (
    container: HTMLElement | null,
    options: {
      targetUrl: string;
      allowRedirection: boolean;
      buttonText: string;
      openWith: string;
      containerStyles: {
        backgroundColor: string;
        padding: string;
        borderRadius: string;
      };
      buttonStyles: {
        fontSize: string;
        borderRadius: string;
        width: string;
      };
    }
  ) => void;
}
