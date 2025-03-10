import React, { useState } from "react";
import VfsLogo from "../components/VfsLogo";
import UrnForm from "../components/UrnForm";
import FaqAccordion from "../components/FaqAccordion";
import WidgetCapture from "./widgetCapture";
import logo from "../../logo.png";

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [urn, setUrn] = useState("");

  const handleUrnSubmit = (submittedUrn: string) => {
    // Save URN to storage
    sessionStorage.setItem("userUrn", submittedUrn);
    setUrn(submittedUrn);
    setShowWidget(true);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <img src={logo} alt="VFS Logo" className="w-30 h-12" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <h1 className="font-semibold text-gray-800 mb-4 text-xl">
              Bank account verification for seamless Visa processing in Malta
            </h1>

            <p className="text-gray-600 mb-6">
              To ensure a seamless Visa processing experience and reduce the risk of financial discrepancies, VFS Global requires
              applicants to verify their bank account statement. This step guarantees timely and accurate financial transactions
              related to your Visa application.
            </p>

            <p className="text-gray-600 mb-6">
              VFS Global partners with{" "}
              <a href="#" className="text-vfs-lightblue hover:underline">
                DIRO
              </a>{" "}
              for this process, the leading provider of bank verification solutions trusted by F500 and Tier 1 global banks. Visit
              DIRO{" "}
              <a href="#" className="text-vfs-lightblue hover:underline">
                Trust Center
              </a>
              .
            </p>

            <p className="text-gray-600 mb-4">
              Learn more about DIRO's{" "}
              <a href="#" className="text-vfs-lightblue hover:underline">
                bank
              </a>{" "}
              verification solutions.
            </p>

            <div className="mb-6">
              <a href="#" className="text-vfs-lightblue hover:underline mr-4">
                Terms of Use
              </a>
              <a href="#" className="text-vfs-lightblue hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-md p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
              {!showWidget ? (
                <>
                  <h2 className="font-medium text-gray-800 mb-4 text-lg">Enter your URN</h2>
                  <p className="text-gray-600 mb-4 text-base">
                    Please enter your Unique Reference Number (URN) to proceed with the verification process.
                  </p>
                  <UrnForm onSubmit={handleUrnSubmit} />
                </>
              ) : (
                <>
                  <h2 className="font-medium text-gray-800 mb-4 text-lg">Select your provider</h2>
                  <p className="text-gray-600 mb-4 text-base">
                    Please select your country and enter your provider to proceed with the verification process.
                  </p>
                  <div className="flex flex-col align-center gap-4">
                    <WidgetCapture urn={urn} />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="h-[calc(100vh-200px)]">
            <div className="h-full overflow-y-auto">
              <div className="pr-4">
                <FaqAccordion />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
