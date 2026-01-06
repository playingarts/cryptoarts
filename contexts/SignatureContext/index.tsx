"use client";

import { useMetaMask } from "metamask-react";
import {
  createContext,
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type StoredSignature = {
  account?: string;
  signature?: string;
  signing?: boolean;
};

interface Props {
  storedSigs: StoredSignature[];
  askSig: () => void;
  getSig: () => StoredSignature | undefined;
  removeSig: () => void;
}

export const SignatureContext = createContext({} as Props);

export const useSignature = () => {
  return useContext(SignatureContext);
};

export const SignatureProvider: FC<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const { ethereum, account } = useMetaMask();

  const [storedSigs, setSignatures] = useLocalStorage<StoredSignature[]>(
    "signatures",
    []
  );

  // Memoize signatures to prevent dependency array changes on every render
  const signatures = useMemo(() => storedSigs ?? [], [storedSigs]);

  // Track if localStorage has loaded
  const isLoaded = storedSigs !== undefined;

  const getSig = useCallback(() => {
    try {
      return signatures.find((sig) => sig.account === account);
    } catch {
      setSignatures([]);
      return undefined;
    }
  }, [signatures, account, setSignatures]);

  const removeSig = useCallback(() => {
    setSignatures((prev) => [...prev.filter((sig) => sig.account !== account)]);
  }, [setSignatures, account]);

  const askSig = useCallback(() => {
    const currentSig = signatures.find((sig) => sig.account === account);
    if (
      !account ||
      (currentSig && (currentSig.signature || currentSig.signing))
    ) {
      return;
    }

    setSignatures((prev) => [
      ...prev.filter((sig) => sig.account !== account),
      { account, signing: true },
    ]);

    ethereum
      .request({
        method: "personal_sign",
        params: [process.env.NEXT_PUBLIC_SIGNATURE_MESSAGE, account],
      })
      .then((signature: string) =>
        setSignatures((prev) => [
          ...prev.filter((sig) => sig.account !== account),
          {
            signature,
            signing: false,
            account,
          },
        ])
      )
      .catch(() =>
        setSignatures((prev) => [
          ...prev.filter((sig) => sig.account !== account),
          { account, signing: false },
        ])
      );
  }, [account, ethereum, signatures, setSignatures]);

  // Reset signing state on mount
  useEffect(() => {
    if (isLoaded) {
      setSignatures((prev) => prev.map((sig) => ({ ...sig, signing: false })));
    }
    // Only run once when localStorage loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Request signature when account changes
  useEffect(() => {
    if (isLoaded) {
      askSig();
    }
    // Only run when account changes or when loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isLoaded]);

  return (
    <SignatureContext.Provider
      value={{
        storedSigs: signatures,
        getSig,
        askSig,
        removeSig,
      }}
    >
      {children}
    </SignatureContext.Provider>
  );
};
