import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface DiroWidgetConfig {
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

declare global {
  interface Window {
    initializeDiroWidget: (container: HTMLElement, config: DiroWidgetConfig) => void;
  }
}

interface UrnFormProps {
  onSubmit: (urn: string) => void;
}

const UrnForm: React.FC<UrnFormProps> = ({ onSubmit }) => {
  const [urn, setUrn] = useState("");
  const [showWidget, setShowWidget] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    if (showWidget && !widgetLoaded) {
      const loadWidget = async () => {
        try {
          // First load the CSS if not already loaded
          if (!document.querySelector('link[href="https://capturev2.diro.io/directlink-staging/stylesSelectLink.css"]')) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://capturev2.diro.io/directlink-staging/stylesSelectLink.css";
            document.head.appendChild(link);
          }

          // Then load the script if not already loaded
          if (!document.querySelector('script[src="https://capturev2.diro.io/directlink/diroWidgetSelectLinkProd.js"]')) {
            const script = document.createElement("script");
            script.src = "https://capturev2.diro.io/directlink/diroWidgetSelectLinkProd.js";
            script.async = true;

            // Create a promise to handle script loading
            const scriptLoaded = new Promise((resolve, reject) => {
              script.onload = resolve;
              script.onerror = () => reject(new Error("Failed to load DIRO widget script"));
            });

            // Append script to body
            document.body.appendChild(script);

            // Wait for script to load
            await scriptLoaded;
          }

          // Allow time for script initialization
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Initialize widget
          initializeDiroWidget();
          setWidgetLoaded(true);
        } catch (error) {
          console.error("Error loading DIRO widget:", error);
          toast({
            title: "Widget Error",
            description: "Failed to load verification widget. Please try again.",
            variant: "destructive",
          });
          setShowWidget(false);
        }
      };

      loadWidget();
    }
  }, [showWidget]);

  const initializeDiroWidget = () => {
    const container = document.getElementById("diro-widget-container");
    if (window.initializeDiroWidget && container) {
      try {
        window.initializeDiroWidget(container, {
          targetUrl: "https://verification.diro.io/?buttonid=O.c117bd44-8cfa-42df-99df-c4ad2ba6c6f5-48sB&trackid=",
          allowRedirection: false, // Prevent any redirections
          buttonText: "Start verification",
          openWith: "",
          containerStyles: {
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "10px",
          },
          buttonStyles: {
            fontSize: "16px",
            borderRadius: "12px",
            width: "300px",
          },
        });
      } catch (error) {
        console.error("Error initializing DIRO widget:", error);
        toast({
          title: "Widget Error",
          description: "Error initializing verification widget. Please try again.",
          variant: "destructive",
        });
        setShowWidget(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urn.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URN",
        variant: "destructive",
      });
      return;
    }

    onSubmit(urn);
  };

  if (showWidget) {
    return (
      <div className="w-full">
        <div
          id="diro-widget-container"
          className="w-full"
          style={{ minHeight: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {!widgetLoaded && (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-gray-600">Loading verification widget...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col w-full gap-3">
          <input
            type="text"
            placeholder="Enter your URN"
            value={urn}
            onChange={(e) => setUrn(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-vfs-blue"
            required
          />
          <button
            type="submit"
            className="w-full bg-vfs-blue text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-medium text-base"
          >
            Verify Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrnForm;
