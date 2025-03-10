import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
type FaqItemProps = {
  question: string;
  answer: React.ReactNode;
};
const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button className="flex w-full justify-between items-center py-3 sm:py-4 text-left" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="font-medium text-gray-800 text-sm sm:text-base">{question}</h3>
        {isOpen ? (
          <Minus className="h-4 w-4 sm:h-5 sm:w-5 text-vfs-blue" />
        ) : (
          <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-vfs-blue" />
        )}
      </button>
      {isOpen && <div className="pb-3 sm:pb-4 text-gray-600">{answer}</div>}
    </div>
  );
};
const FaqAccordion = () => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-gray-800 mb-4 sm:mb-6 text-lg sm:text-xl">Frequently asked questions</h2>
      <div className="space-y-2">
        <FaqItem
          question="What information will be shared?"
          answer={
            <ul className="text-gray-600 space-y-2">
              <li className="text-xs sm:text-sm flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>Your bank statement will only be shared with VFS Global with your consent in each session.</span>
              </li>
            </ul>
          }
        />
        <FaqItem
          question="How does my password remain private?"
          answer={
            <p>
              <ul className="text-gray-600 space-y-2">
                <li className="text-xs sm:text-sm flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>
                    The entire verification session provides an end-to-end encryption and remains private. In other words, you
                    will not share your password or login credentials with DIRO or VFS Global.
                  </span>
                </li>
                <li className="text-xs sm:text-sm flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Most banks use one time passwords (OTP) with multi-layer security.</span>
                </li>
                <li className="text-xs sm:text-sm flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>
                    Most banks use two-factor authentication (2FA) or multi-factor authentication (MFA). The second factor is
                    sometimes offline, or on a separate device, such as a smartphone for high security and to eliminate fraud.
                  </span>
                </li>
                <li className="text-xs sm:text-sm flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>
                    Since you will not do a transaction, only verify bank, your transaction password will never be asked for in
                    the verification session.
                  </span>
                </li>
                <li className="text-xs sm:text-sm flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>
                    Visit DIRO to learn more about{" "}
                    <a href="https://diro.io/user-privacy/" className="text-vfs-lightblue hover:underline">
                      user privacy
                    </a>
                  </span>
                </li>
              </ul>
            </p>
          }
        />
        <FaqItem
          question="Why should I trust DIRO?"
          answer={
            <ul className="text-gray-600 space-y-2">
              <li className="text-xs sm:text-sm flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>
                  DIRO is trusted by F500 and Tier 1 global banks in consumer and enterprise verifications across 195 countries.
                  Its solution is used to verify bank account ownership, and other documents to eliminate fraud, email spoofing,
                  and impersonation issues.
                </span>
              </li>
              <li className="text-xs sm:text-sm flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>
                  Visit DIRO to learn more about{" "}
                  <a href="https://diro.io/products/bank-account-verification/" className="text-vfs-lightblue hover:underline">
                    bank account verification
                  </a>
                </span>
              </li>
            </ul>
          }
        />
        <FaqItem
          question="How DIRO creates a new global standard?"
          answer={
            <ul className="text-gray-600 space-y-2">
              <li className="text-xs sm:text-sm flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>
                  DIRO's solution eliminates the possibility of document fraud, email spoofing, and impersonation issues.
                </span>
              </li>
              <li className="text-xs sm:text-sm flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>
                  DIRO's ephemeral architecture of each session does not permit, or make possible, any storage of passwords or
                  other login credentials. This makes the solution particularly applicable to bank account verification and proof
                  of address in consumer and enterprise onboarding to eliminate fraud.
                </span>
              </li>
              <li className="text-xs sm:text-sm flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>
                  DIRO's verification of bank statements provides verification of selected source data directly from the bank
                  without the possibility of tampering.
                </span>
              </li>
              <li className="text-xs sm:text-sm flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>
                  KYC (Know Your Customer) is mostly a manual process with uploads of simple PDFs which is open to tampering,
                  fake, and stolen data. This can lead to fraud and money laundering.
                </span>
              </li>
            </ul>
          }
        />
      </div>
    </div>
  );
};
export default FaqAccordion;
