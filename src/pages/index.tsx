import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageValues from '@site/src/components/HomepageValues';
import HomepageAbout from '@site/src/components/HomepageAbout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.header.headline">
            Practice placement, organized from start to finish.
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <strong>
            <Translate id="homepage.header.leadHighlight">
              From the first student to the final report.
            </Translate>
          </strong>{' '}
          <Translate id="homepage.header.lead">
            Students, placement sites, priorities, plans and costs in one
            overview. Nothing rests on one person.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/TS-00-dashboard">
            <Translate id="homepage.header.tutorialsButton">
              Tutorials
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate(
        {
          id: 'homepage.layout.title',
          message: 'Practice placement, organized',
        },
      )}
      description={translate({
        id: 'homepage.layout.description',
        message:
          'Students, placement sites, priorities, plans and costs in one overview — from the first student to the final report.',
      })}>
      <HomepageHeader />
      <main>
        <HomepageAbout />
        <HomepageValues />
      </main>
    </Layout>
  );
}
