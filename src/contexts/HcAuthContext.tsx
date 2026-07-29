import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {login as apiLogin} from '@site/src/utils/hcApi';

const EMAIL_KEY = 'hc:email';

type HcAuthContextValue = {
  /** Whether the client-side localStorage read has completed. */
  ready: boolean;
  /** The signed-in email, or null if anonymous. */
  email: string | null;
  /** Submits the email to the backend and marks the visitor as signed in. */
  signIn: (email: string) => Promise<void>;
  /** Clears the signed-in state (identification only, no server call needed). */
  signOut: () => void;
};

const HcAuthContext = createContext<HcAuthContextValue | undefined>(undefined);

export function HcAuthProvider({children}: {children: ReactNode}): ReactNode {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem(EMAIL_KEY));
    setReady(true);
  }, []);

  const signIn = useCallback(async (newEmail: string) => {
    await apiLogin(newEmail);
    localStorage.setItem(EMAIL_KEY, newEmail);
    setEmail(newEmail);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(EMAIL_KEY);
    setEmail(null);
  }, []);

  const value = useMemo(
    () => ({ready, email, signIn, signOut}),
    [ready, email, signIn, signOut],
  );

  return <HcAuthContext.Provider value={value}>{children}</HcAuthContext.Provider>;
}

export function useHcAuth(): HcAuthContextValue {
  const context = useContext(HcAuthContext);
  if (!context) {
    throw new Error('useHcAuth must be used within a HcAuthProvider');
  }
  return context;
}
