import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import "../stylesSelectLink.css";

// Define types for the widget instance
interface WidgetInstance {
  update: (data: any) => void;
  destroy?: () => void;
}

// Define types for the widget initialization options
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

// Extend Window interface to include our widget initialization function
declare global {
  interface Window {
    initializeDiroWidget: (container: HTMLElement, options: WidgetOptions) => void;
  }
}

// Define ref methods type
interface WidgetRefMethods {
  updateWidget: (data: any) => void;
  reinitialize: () => void;
}

interface WidgetCaptureProps {
  urn?: string;
}

export const WidgetDemo = forwardRef<WidgetRefMethods, WidgetCaptureProps>(({ urn }, ref) => {
  const [containerKey, setContainerKey] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetInstance = useRef<WidgetInstance | null>(null);
  const [isWidgetLoaded, setIsWidgetLoaded] = useState<boolean>(false);
  const hasInitialized = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    updateWidget: (data: any) => {
      if (widgetInstance.current) {
        widgetInstance.current.update(data);
      }
    },
    reinitialize: () => {
      cleanup();
      setContainerKey((prev) => prev + 1);
      hasInitialized.current = false;
      setTimeout(() => {
        initializeWidgetProcess();
      }, 100);
    },
  }));

  const cleanup = (): void => {
    if (widgetInstance.current && widgetInstance.current.destroy) {
      try {
        widgetInstance.current.destroy();
      } catch (e) {
        console.error("Error destroying widget:", e);
      }
      widgetInstance.current = null;
      setIsWidgetLoaded(false);
    }
  };

  useEffect(() => {
    return cleanup;
  }, []);

  const initializeWidgetProcess = (): (() => void) | void => {
    if (hasInitialized.current) return;

    if (typeof window.initializeDiroWidget === "function") {
      initializeWidget();
      hasInitialized.current = true;
    } else {
      const checkInterval = setInterval(() => {
        if (typeof window.initializeDiroWidget === "function") {
          initializeWidget();
          hasInitialized.current = true;
          clearInterval(checkInterval);
        }
      }, 200);

      setTimeout(() => clearInterval(checkInterval), 10000);

      return () => clearInterval(checkInterval);
    }
  };

  useEffect(() => {
    const timer = setTimeout(initializeWidgetProcess, 300);
    return () => clearTimeout(timer);
  }, [containerKey]);

  const initializeWidget = (): void => {
    if (!containerRef.current || widgetInstance.current) return;

    try {
      const widgetContainer = document.createElement("div");
      widgetContainer.id = `diro-widget-inner-${containerKey}`;

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(widgetContainer);
      }

      const targetUrl = urn
        ? `https://verification.diro.io/?buttonid=O.c117bd44-8cfa-42df-99df-c4ad2ba6c6f5-48sB&trackid=${urn}`
        : "https://verification.diro.io/?buttonid=O.c117bd44-8cfa-42df-99df-c4ad2ba6c6f5-48sB&trackid=";

      window.initializeDiroWidget(widgetContainer, {
        targetUrl,

        buttonText: "Start verification",
        allowRedirection: true,
        openWith: "sametab",
        containerStyles: {
          backgroundColor: "#f0f0f0",
          padding: "40px",
          borderRadius: "8px",
        },
        buttonStyles: {
          fontSize: "14px",
          borderRadius: "8px",
          width: "300px",
        },
      });

      // Create a minimal instance since the function doesn't return one
      widgetInstance.current = {
        update: () => {},
        destroy: () => {
          if (widgetContainer.parentNode) {
            widgetContainer.parentNode.removeChild(widgetContainer);
          }
        },
      };

      setIsWidgetLoaded(true);
    } catch (error) {
      console.error("Error initializing Diro widget:", error);
      hasInitialized.current = false;
    }
  };

  return (
    <React.Fragment>
      {!isWidgetLoaded && <div className="widget-loading">Loading Diro widget...</div>}

      <div className="w-full">
        <div
          key={`diro-container-${containerKey}`}
          className="diro-widget"
          id={`diro-widget-container-${containerKey}`}
          ref={containerRef}
          style={{ display: isWidgetLoaded ? "block" : "none" }}
        />
      </div>
    </React.Fragment>
  );
});

export default WidgetDemo;
