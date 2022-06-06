import { useMetaMask } from "metamask-react";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import store from "store";

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

export const SignatureProvider: FC = ({ children }) => {
  const { ethereum, account } = useMetaMask();

  const [storedSigs, setSignatures] = useState(
    store.get("signatures", []) as StoredSignature[]
  );

  const getSig = useCallback(() => {
    try {
      return storedSigs.find((sig) => sig.account === account);
    } catch (e) {
      setSignatures([]);
    }
  }, [storedSigs, account]);

  const removeSig = useCallback(() => {
    setSignatures((prev) => [...prev.filter((sig) => sig.account !== account)]);
  }, [setSignatures, account]);

  const askSig = () => {
    const currentSig = getSig();
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
  };

  useEffect(() => {
    askSig();
  }, [account]);

  useEffect(() => {
    store.set("signatures", storedSigs);
  }, [storedSigs]);

  return (
    <SignatureContext.Provider
      value={{
        storedSigs,
        getSig,
        askSig,
        removeSig,
      }}
    >
      {children}
    </SignatureContext.Provider>
  );
};
