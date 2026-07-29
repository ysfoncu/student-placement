import React, {useState, type FormEvent, type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import {useHcAuth} from '@site/src/contexts/HcAuthContext';
import styles from './styles.module.css';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Props = {
  /** Translation id for the form heading; lets callers customize the copy for their context. */
  titleId?: string;
  /** Default heading message, used with titleId. */
  titleMessage?: string;
};

export default function EmailSignInForm({
  titleId = 'homepage.welcome.form.title',
  titleMessage = 'Enter your email to continue',
}: Props): ReactNode {
  const {signIn} = useHcAuth();
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = value.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      setError(
        translate({
          id: 'homepage.welcome.form.invalidEmail',
          message: 'Please enter a valid email address.',
        }),
      );
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email);
    } catch (err) {
      setError(
        translate(
          {
            id: 'homepage.welcome.form.signInFailed',
            message: 'Sign-in failed: {message}',
          },
          {message: err instanceof Error ? err.message : String(err)},
        ),
      );
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.card}>
      <Heading as="h2">
        <Translate id={titleId}>{titleMessage}</Translate>
      </Heading>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={translate({
            id: 'homepage.welcome.form.placeholder',
            message: 'you@example.com',
          })}
          disabled={submitting}
          required
        />
        <button
          type="submit"
          className="button button--primary"
          disabled={submitting}>
          {submitting
            ? translate({
                id: 'homepage.welcome.form.buttonLoading',
                message: 'Signing in…',
              })
            : translate({
                id: 'homepage.welcome.form.button',
                message: 'Continue',
              })}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
