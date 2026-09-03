# App Workflow — Praksis Student Placement (sp.mosoinpraxis.com)

Reconstructed from the 17 test-scenario walkthroughs in `docs/`. Core loop, run once per term per programme:

## 0. Setup (once, in Settings)
Define **Studies → Programs → Emner**, add **Study Admins**, connect **Praksis Places** (hospitals/clinics/kommune) to the org, pick **Dashboard** widgets.

## 1. Capacity planning (Quota Request)
- **PK** requests quota from a praksis place: 3-step wizard — place/dates/study/program → distribute quota across entities in the org tree → submit. Status: **Pending**.
- **SK** (or PK on their behalf) reviews and **approves**, optionally lowering the amount per entity. Status: **Approved**.
- List is searchable/filterable by period, study/program, praksis place, status.

## 2. Create the placement
**Student Placement** → pick an **approved quota request with capacity** → its place/programme/emne/dates lock onto a new placement → **Import students** (Excel, or auto-fetch from FS/Ladok).

## 3. Optional student input (before assignment)
Two independent mechanisms feed information into the assignment step:
- **First publish** (opt-in workflow step, Settings → Workflows): emails imported students a link to submit their preferred place + a message → lands in the students table as a **Custom Request**.
- **Priorities**: a separate, term/programme-wide list — students submit special-circumstance reasons (medical, childcare…) for point-weighted priority; PK reviews each request and **Approves/Rejects**, then **Publishes decisions** once the deadline passes.

## 4. Distribute students
PK assigns each imported student to a praksis-place unit — three equivalent ways: per-student "Add praksis place", per-unit "Quick assign", or drag-and-drop on the **Placement Network Diagram**. Quota counts (confirmed/available/assigned) update live. When every student has a place → **Publish assignments** (locks them, notifies the praksis places).

## 5. Reports (ongoing, any time)
- **Invoicing** — one line per assigned student, cost = weeks × weekly rate, tracks invoice no. + paid status.
- **Student report** — per-student placement & priority-request history.
- **Placement report** — per-placement quota consumption (requested/approved/consumed/available).
- **Capacity report** — per-quota-request consumption vs. the placements drawing on it.

## Roles
| Role | Does |
|---|---|
| **PK** — Placement Coordinator | Setup, requests quota, creates placements, assigns students, publishes, reports |
| **SK** — Student Coordinator (at the praksis place) | Approves/adjusts quota requests |
| **Student** | Receives email invites, submits place preference and/or priority request |
