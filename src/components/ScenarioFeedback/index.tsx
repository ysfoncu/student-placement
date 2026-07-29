import React, {useEffect, useState, type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import {useHcAuth} from '@site/src/contexts/HcAuthContext';
import EmailSignInForm from '@site/src/components/EmailSignInForm';
import {track, submitFeedback, getProgress} from '@site/src/utils/hcApi';
import styles from './styles.module.css';

function formatDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
}

function SignedInWidget({
  email,
  scenarioId,
}: {
  email: string;
  scenarioId: string;
}): ReactNode {
  const [useful, setUseful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    track(email, scenarioId, 'viewed').catch(() => {});

    let cancelled = false;
    getProgress(email)
      .then((data) => {
        if (cancelled) return;
        const existing = data.feedback?.find(
          (f) => f.scenario_id === scenarioId,
        );
        if (existing) {
          setUseful(existing.useful);
          setComment(existing.comment || '');
          setStatus(
            translate(
              {
                id: 'scenarioFeedback.submittedAt',
                message: 'Submitted {when} — you can update it.',
              },
              {when: formatDate(existing.updated_at)},
            ),
          );
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [email, scenarioId]);

  async function handleSubmit() {
    if (useful === null) return;
    setSubmitting(true);
    setStatus(translate({id: 'scenarioFeedback.saving', message: 'Saving…'}));
    try {
      await submitFeedback(email, scenarioId, useful, comment);
      setStatus(
        translate({
          id: 'scenarioFeedback.saved',
          message: '✓ Thanks! Scenario marked as completed.',
        }),
      );
    } catch (err) {
      setStatus(
        translate(
          {
            id: 'scenarioFeedback.saveFailed',
            message: 'Could not save: {message}',
          },
          {message: err instanceof Error ? err.message : String(err)},
        ),
      );
    }
    setSubmitting(false);
  }

  return (
    <div className={styles.widget}>
      <Heading as="h3">
        <Translate id="scenarioFeedback.title">
          Finish this scenario
        </Translate>
      </Heading>
      <p className={styles.question}>
        <Translate id="scenarioFeedback.question">
          Was this scenario useful?
        </Translate>
      </p>
      <div className={styles.choices}>
        <button
          type="button"
          className={`${styles.choice} ${
            useful === true ? styles.choiceSelected : ''
          }`}
          onClick={() => setUseful(true)}>
          {translate({id: 'scenarioFeedback.yes', message: '👍 Yes'})}
        </button>
        <button
          type="button"
          className={`${styles.choice} ${
            useful === false ? styles.choiceSelected : ''
          }`}
          onClick={() => setUseful(false)}>
          {translate({id: 'scenarioFeedback.no', message: '👎 No'})}
        </button>
      </div>
      <textarea
        className={styles.comment}
        rows={3}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={translate({
          id: 'scenarioFeedback.commentPlaceholder',
          message: 'Optional comment — what worked, what was unclear?',
        })}
      />
      <div className={styles.actions}>
        <button
          type="button"
          className="button button--primary"
          disabled={useful === null || submitting}
          onClick={handleSubmit}>
          {translate({
            id: 'scenarioFeedback.submit',
            message: 'Submit feedback',
          })}
        </button>
        <span className={styles.status}>{status}</span>
      </div>
    </div>
  );
}

export default function ScenarioFeedback({
  scenarioId,
}: {
  scenarioId: string;
}): ReactNode {
  const {ready, email} = useHcAuth();

  if (!ready) {
    return null;
  }

  if (!email) {
    return (
      <div className={styles.widget}>
        <EmailSignInForm
          titleId="scenarioFeedback.form.title"
          titleMessage="Enter your email to add your comment"
        />
      </div>
    );
  }

  return <SignedInWidget email={email} scenarioId={scenarioId} />;
}
