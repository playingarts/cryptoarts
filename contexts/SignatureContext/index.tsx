import { useMetaMask } from "metamask-react";
import {
  createContext,
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
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

  // Use empty array while loading from localStorage
  const signatures = storedSigs ?? [];

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
    if (storedSigs !== undefined) {
      setSignatures((prev) => prev.map((sig) => ({ ...sig, signing: false })));
    }
  }, [storedSigs !== undefined]);

  // Request signature when account changes
  useEffect(() => {
    if (storedSigs !== undefined) {
      askSig();
    }
  }, [account, storedSigs !== undefined]);

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
