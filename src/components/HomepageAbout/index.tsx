import React, {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function HomepageAbout(): ReactNode {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <Heading as="h2">
          <Translate id="homepage.about.title">
            What is Student Placement?
          </Translate>
        </Heading>
        <p>
          <Translate id="homepage.about.description">
            Student Placement helps universities and colleges coordinate
            practical placements for their students — from setting up
            studies and programs, to requesting and approving quotas with
            partner organizations. Coordinators can distribute students,
            collect their preferences, and track everything through
            invoicing, placement, and capacity reports.
          </Translate>
        </p>
      </div>
    </section>
  );
}
