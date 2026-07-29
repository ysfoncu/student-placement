// Ported from the source help center's docs/javascripts/config.js + app.js.
// Same backend, same endpoints: API Gateway -> Lambda "umeo-help-tracking-api" -> DynamoDB.
const API_BASE_URL = 'https://mwkwaveovl.execute-api.eu-north-1.amazonaws.com';

type ApiOptions = {
  method?: string;
  body?: unknown;
};

async function api(path: string, opts: ApiOptions = {}): Promise<any> {
  const res = await fetch(API_BASE_URL + path, {
    method: opts.method ?? 'GET',
    headers: opts.body ? {'content-type': 'application/json'} : undefined,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `API error (${res.status})`);
  }
  return data;
}

export function login(email: string): Promise<{ok: true; email: string}> {
  return api('/login', {method: 'POST', body: {email}});
}

export function track(
  email: string,
  scenarioId: string,
  status: 'viewed' | 'completed',
): Promise<any> {
  return api('/track', {
    method: 'POST',
    body: {email, scenario_id: scenarioId, status},
  });
}

export function submitFeedback(
  email: string,
  scenarioId: string,
  useful: boolean,
  comment: string,
): Promise<any> {
  return api('/feedback', {
    method: 'POST',
    body: {email, scenario_id: scenarioId, useful, comment},
  });
}

export type FeedbackEntry = {
  scenario_id: string;
  useful: boolean;
  comment: string;
  updated_at: string;
};

export type ProgressResponse = {
  progress: Array<{
    scenario_id: string;
    status: string;
    first_viewed_at?: string;
    completed_at?: string;
  }>;
  feedback: FeedbackEntry[];
};

export function getProgress(email: string): Promise<ProgressResponse> {
  return api(`/progress?email=${encodeURIComponent(email)}`);
}

// /admin/results is ported in a later migration step, once an admin page exists
// in this project.
