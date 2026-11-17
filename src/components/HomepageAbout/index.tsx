import React, {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Msg = {id: string; message: string};

const OVERVIEW: Msg[] = [
  {id: 'homepage.about.overview.unplaced', message: 'Who still needs a placement, per course'},
  {id: 'homepage.about.overview.capacity', message: 'What each unit can take, per period'},
  {id: 'homepage.about.overview.decisions', message: 'Priority decisions, with reasons'},
  {id: 'homepage.about.overview.plan', message: 'The plan: supervisor, weeks and cost'},
];

type Question = {num: string; title: Msg; body: Msg; audience: Msg};

const QUESTIONS: Question[] = [
  {
    num: '01',
    title: {
      id: 'homepage.questions.q1.title',
      message: 'Who still needs a placement — and where do places run out?',
    },
    body: {
      id: 'homepage.questions.q1.body',
      message:
        'Waiting students per course, set against what each unit has said it can take. The gap is visible while there is still time to ask a student coordinator for more places.',
    },
    audience: {
      id: 'homepage.questions.q1.audience',
      message: 'The programme lead gets the answer without having to chase it',
    },
  },
  {
    num: '02',
    title: {
      id: 'homepage.questions.q2.title',
      message: 'A student coordinator cuts places. What now?',
    },
    body: {
      id: 'homepage.questions.q2.body',
      message:
        'Lower the number of places and see “Over by N” with the students placed there. Take them off, place them where there is room, and undo a wrong placement. It warns, but never blocks.',
    },
    audience: {
      id: 'homepage.questions.q2.audience',
      message: 'For the placement coordinator, on the day it happens',
    },
  },
  {
    num: '03',
    title: {
      id: 'homepage.questions.q3.title',
      message: 'Why did this student get that placement?',
    },
    body: {
      id: 'homepage.questions.q3.body',
      message:
        'Open the request, the points, the decision and the reason — not an inbox. A rejection cannot be saved without a reason, and decisions are published together.',
    },
    audience: {
      id: 'homepage.questions.q3.audience',
      message: 'The answer does not depend on who is in the office',
    },
  },
];

type Step = {label: Msg; title: Msg; body: Msg};

const STEPS: Step[] = [
  {
    label: {id: 'homepage.steps.setup.label', message: 'Set up'},
    title: {id: 'homepage.steps.setup.title', message: 'Define once'},
    body: {
      id: 'homepage.steps.setup.body',
      message:
        'Studies, programmes and courses. Units state places per programme, course and period; contacts and requirements live on the unit.',
    },
  },
  {
    label: {id: 'homepage.steps.prioritize.label', message: 'Prioritize'},
    title: {id: 'homepage.steps.prioritize.title', message: 'Decide openly'},
    body: {
      id: 'homepage.steps.prioritize.body',
      message:
        'One list per course with notice, deadline and message. Requests have reasons, points and documents; decisions are published together.',
    },
  },
  {
    label: {id: 'homepage.steps.place.label', message: 'Place'},
    title: {id: 'homepage.steps.place.title', message: 'Build the plan'},
    body: {
      id: 'homepage.steps.place.body',
      message:
        'Choose units and places; place manually or “Top N by points”; name a supervisor from the unit’s own contacts.',
    },
  },
  {
    label: {id: 'homepage.steps.publish.label', message: 'Publish'},
    title: {id: 'homepage.steps.publish.title', message: 'Units first'},
    body: {
      id: 'homepage.steps.publish.body',
      message:
        'Publish to the units, then to the students. That locks the plan and records the step; Edit opens it again.',
    },
  },
  {
    label: {id: 'homepage.steps.report.label', message: 'Report'},
    title: {id: 'homepage.steps.report.title', message: 'Same plan'},
    body: {
      id: 'homepage.steps.report.body',
      message:
        'Capacity, placement and an invoicing basis, all drawn from the work already done.',
    },
  },
];

const T = ({id, message}: Msg) => <Translate id={id}>{message}</Translate>;

export default function HomepageAbout(): ReactNode {
  return (
    <>
      <section className={styles.problem}>
        <div className={styles.problemGrid}>
          <p className={styles.problemText}>
            <Translate id="homepage.about.problem">
              Health education programmes place students in hospitals and
              municipal services using spreadsheets, email and one
              coordinator’s memory. That works until the placement
              coordinator is ill, a student coordinator cuts places the week
              before the start, or a student asks why a fellow student got
              the placement. This is the working overview for those three
              situations.
            </Translate>
          </p>
          <aside className={styles.overviewCard}>
            <div className={styles.eyebrowLight}>
              <Translate id="homepage.about.overview.title">
                One overview holds
              </Translate>
            </div>
            <ul>
              {OVERVIEW.map((m) => (
                <li key={m.id}>
                  <T {...m} />
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <Translate id="homepage.questions.title">
              Three questions it answers
            </Translate>
          </div>
          <ol className={styles.questions}>
            {QUESTIONS.map((q) => (
              <li key={q.num} className={styles.question}>
                <span className={styles.qNum}>{q.num}</span>
                <div>
                  <Heading as="h3" className={styles.qTitle}>
                    <T {...q.title} />
                  </Heading>
                  <p className={styles.qBody}>
                    <T {...q.body} />
                  </p>
                  <div className={styles.qAudience}>
                    <T {...q.audience} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <Translate id="homepage.steps.title">
              One semester, one overview
            </Translate>
          </div>
          <div className={styles.steps}>
            {STEPS.map((s) => (
              <div key={s.label.id} className={styles.step}>
                <div className={styles.stepLabel}>
                  <T {...s.label} />
                </div>
                <Heading as="h3" className={styles.stepTitle}>
                  <T {...s.title} />
                </Heading>
                <p>
                  <T {...s.body} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.pilot}>
            <div>
              <Heading as="h2" className={styles.pilotTitle}>
                <Translate id="homepage.pilot.title">
                  Start with one programme, one semester.
                </Translate>
              </Heading>
              <p>
                <Translate id="homepage.pilot.body">
                  Keep the spreadsheet alongside. We set it up together with
                  you and measure together: unplaced students one month
                  before the start, time to a finished plan, corrected lists
                  sent to student coordinators. No numbers are promised in
                  advance.
                </Translate>
              </p>
            </div>
            <div className={styles.pilotContact}>
              <Heading as="h3">
                <Translate id="homepage.pilot.contact.title">
                  Talk to MOSO.AS
                </Translate>
              </Heading>
              <p>
                <Translate id="homepage.pilot.contact.body">
                  Pilot for one programme and one semester. Sign in with
                  Feide, SWAMID or email.
                </Translate>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
