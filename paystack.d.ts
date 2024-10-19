// @types/paystack.d.ts
declare global {
    interface Window {
      PaystackPop: {
        setup: (options: {
          key: string;
          email: string;
          amount: number;
          currency?: string;
          callback: (response: { reference: string }) => void;
          onClose: () => void;
        }) => {
          openIframe: () => void;
        };
      };
    }
  }
  
  export {};
  