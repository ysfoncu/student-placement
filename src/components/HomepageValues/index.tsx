import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type ValueItem = {
  emoji: string;
  titleId: string;
  titleMessage: string;
  descriptionId: string;
  descriptionMessage: string;
};

const VALUES: ValueItem[] = [
  {
    emoji: '📸',
    titleId: 'homepage.values.screenshots.title',
    titleMessage: 'Real screenshots, every step',
    descriptionId: 'homepage.values.screenshots.description',
    descriptionMessage:
      "Each scenario shows you the exact screens you'll see in the app, so nothing is left to guesswork.",
  },
  {
    emoji: '📊',
    titleId: 'homepage.values.progress.title',
    titleMessage: 'Track your progress',
    descriptionId: 'homepage.values.progress.description',
    descriptionMessage:
      'Your email identifies your progress across every scenario — no password or account needed.',
  },
  {
    emoji: '💬',
    titleId: 'homepage.values.feedback.title',
    titleMessage: 'Your feedback shapes it',
    descriptionId: 'homepage.values.feedback.description',
    descriptionMessage:
      'Tell us what worked at the end of each scenario — submitting feedback marks it as completed.',
  },
];

function Value({emoji, titleId, titleMessage, descriptionId, descriptionMessage}: ValueItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <span className={styles.valueEmoji}>{emoji}</span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate id={titleId}>{titleMessage}</Translate>
        </Heading>
        <p>
          <Translate id={descriptionId}>{descriptionMessage}</Translate>
        </p>
      </div>
    </div>
  );
}

export default function HomepageValues(): ReactNode {
  return (
    <section className={styles.values}>
      <div className="container">
        <div className="row">
          {VALUES.map((value) => (
            <Value key={value.titleId} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}
