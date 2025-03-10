interface WidgetOptions {
  targetUrl: string;
  buttonText: string;
  allowRedirection: boolean;
  openWith: string;
  containerStyles: {
    backgroundColor: string;
    padding: string;
    borderRadius: string;
    width: string;
    maxWidth: string;
  };
  buttonStyles: {
    fontSize: string;
    borderRadius: string;
    width: string;
    maxWidth: string;
    padding: string;
  };
  containerClassName?: string;
  buttonClassName?: string;
}

declare global {
  interface Window {
    initializeDiroWidget: (container: HTMLElement, options: WidgetOptions) => void;
  }
}

export {};
