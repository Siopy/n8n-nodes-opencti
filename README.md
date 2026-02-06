# n8n-nodes-opencti

Custom [n8n](https://n8n.io/) community node for [OpenCTI](https://www.opencti.io/), an open-source Cyber Threat Intelligence (CTI) platform.

This node communicates with OpenCTI's GraphQL API to manage threat intelligence data directly from your n8n workflows.

## Table of Contents

- [Installation](#installation)
- [Supported Resources](#supported-resources)
- [Prerequisites](#prerequisites)
- [Private Deployment (Docker)](#private-deployment-docker)
- [Credentials Setup](#credentials-setup)
- [Development](#development)
- [Usage Examples](#usage-examples)
- [Resource Reference](#resource-reference)

## Installation

### From n8n Community Nodes (recommended)

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-opencti`
5. Click **Install**

### From npm (manual)

```bash
cd ~/.n8n
npm install n8n-nodes-opencti
```

Then restart n8n.

## Supported Resources

| Resource | Create | Get | Search | Update | Delete |
|---|:---:|:---:|:---:|:---:|:---:|
| **Observable** (STIX Cyber Observable) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Report** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Note / RFI** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Task** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Threat Actor** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Label** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Indicator** (STIX, YARA, Sigma, Snort...) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Incident** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Malware** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Vulnerability** (CVSS, EPSS, CISA KEV) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Relationship** (STIX Core Relationship) | ✅ | ✅ | ✅ | - | ✅ |

### Supported Observable Types

IPv4, IPv6, Domain Name, URL, Email Address, Hostname, File, MAC Address, User Account, Software, Process, Network Traffic, Windows Registry Key, X509 Certificate, Autonomous System, Cryptocurrency Wallet, Cryptographic Key, Phone Number, Bank Account, Credential, Tracking Number, Text, User Agent, Media Content, Mutex.

### Supported Relationship Types

| Type | Description |
|---|---|
| `object` | Add an object to a container (Report, Note, etc.) |
| `related-to` | Generic relationship between two entities |
| `uses` | An actor/malware uses a tool/technique |
| `targets` | Targeting of an entity (sector, country, organization) |
| `indicates` | An indicator signals a threat |
| `attributed-to` | Attribution of activity to an actor |
| `exploits` | Exploitation of a vulnerability |
| `mitigates` | Mitigation measure |
| `delivers` / `drops` | Malware delivery/drop |
| `communicates-with` | Network communication |
| `based-on` / `derived-from` | Derivation relationship |
| `located-at` | Geographic location |
| `variant-of` / `part-of` | Structural relationships |

## Prerequisites

- **n8n** >= 1.0 (Docker or standalone)
- **OpenCTI** >= 5.x with an account that has an API key
- **Node.js** >= 18 (for development only)

## Private Deployment (Docker)

### 1. Clone and build the project

```bash
git clone <repo-url>
cd n8n-opencti-node
npm install
npm run build
```

### 2. Configure docker-compose.yml

```yaml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_LOG_LEVEL=info
      - N8N_TEMPLATES_ENABLED=true
      - N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true
      - N8N_CUSTOM_EXTENSIONS=/home/node/custom-nodes/n8n-nodes-opencti
    volumes:
      - n8n_data:/home/node/.n8n
      - /path/to/n8n-opencti-node:/home/node/custom-nodes/n8n-nodes-opencti
    extra_hosts:
      - "host.docker.internal:host-gateway"

volumes:
  n8n_data:
```

> **Important**: `N8N_CUSTOM_EXTENSIONS` must point to the path **inside the container** (the volume mount destination), not the local host path.

### 3. Start or restart n8n

```bash
docker compose up -d

# Or if already running:
docker compose restart n8n
```

### 4. Verify the node is loaded

```bash
# Check startup logs
docker logs n8n --tail 50

# The "OpenCTI" node should appear in the n8n node panel
```

### Iterative development workflow

After each code change:

```bash
npm run build && docker compose restart n8n
```

### Alternative deployment: install into the n8n volume

If you don't want to mount an additional volume:

```bash
# Copy the built project into the container
docker cp /path/to/n8n-opencti-node n8n:/tmp/n8n-nodes-opencti

# Install into n8n's custom directory
docker exec -u root n8n sh -c "
  mkdir -p /home/node/.n8n/custom &&
  cd /home/node/.n8n/custom &&
  npm install /tmp/n8n-nodes-opencti
"

# Restart
docker compose restart n8n
```

## Credentials Setup

1. Open n8n in your browser (`http://localhost:5678`)
2. Go to **Credentials > New Credential**
3. Search for **OpenCTI API**
4. Fill in the fields:

| Field | Description | Example |
|---|---|---|
| **API URL** | Base URL of your OpenCTI instance (without trailing `/`) | `https://opencti.example.com` |
| **API Key** | API key (OpenCTI > Profile > API access) | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

5. Click **Test** to verify the connection
6. Save

> **Note**: API data access permissions correspond to the rights of the account associated with the API key.

## Development

### Project Structure

```
n8n-nodes-opencti/
├── .github/workflows/
│   └── ci.yml                          # GitHub Actions CI/CD
├── .vscode/
│   └── launch.json                     # VSCode debugger config
├── credentials/
│   └── OpenCtiApi.credentials.ts       # Credentials (auth + connection test)
├── nodes/OpenCti/
│   ├── OpenCti.node.ts                 # Main node with execute()
│   ├── OpenCti.node.json               # Codex metadata
│   ├── opencti.svg                     # Official OpenCTI icon
│   ├── GenericFunctions.ts             # Helpers: GraphQL requests, filters, dates
│   └── descriptions/                   # UI descriptions per resource
│       ├── ObservableDescription.ts
│       ├── ReportDescription.ts
│       ├── NoteDescription.ts
│       ├── TaskDescription.ts
│       ├── ThreatActorDescription.ts
│       ├── LabelDescription.ts
│       ├── RelationshipDescription.ts
│       ├── IndicatorDescription.ts
│       ├── IncidentDescription.ts
│       ├── MalwareDescription.ts
│       ├── VulnerabilityDescription.ts
│       └── index.ts
├── .prettierrc.js                      # Prettier config
├── eslint.config.mjs                   # ESLint config
├── package.json
├── tsconfig.json
├── CHANGELOG.md
├── LICENSE
└── README.md
```

### Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run build` | Build project with n8n-node CLI |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Lint and auto-fix issues |
| `npm run dev` | Development mode with n8n-node CLI |
| `npm run release` | Publish to npm |

### Architecture

This node uses the **programmatic style** (with an `execute()` method) because OpenCTI exposes a GraphQL API, which is incompatible with n8n's declarative style (designed for REST APIs).

Each API call is a `POST /graphql` request with a `query` and `variables`. The `openCtiApiRequest()` helper in `GenericFunctions.ts` centralizes authentication and error handling.

**OpenCTI update patterns**:
- **Nested**: `entityEdit(id).fieldPatch(input)` - Report, Note, Observable, ThreatActor, Label, Incident, Malware, Vulnerability, Relationship
- **Flat**: `entityFieldPatch(id, input)` - Task, Indicator

## Usage Examples

### Create an observable and add it to a report

```
1. OpenCTI > Observable > Create
   - Type: IPv4 Address
   - Value: 192.168.1.1
   - Score: 80
   - Labels: <label ID>

2. OpenCTI > Relationship > Create
   - Type: Object (Add to Container)
   - From: <report ID>
   - To: <observable ID from step 1>
```

### Search for threat actors and their techniques

```
1. OpenCTI > Threat Actor > Search
   - Search Term: APT28

2. OpenCTI > Relationship > Search
   - From Entity ID: <threat actor ID>
   - Relationship Type: uses
```

### Automated alert enrichment workflow

```
1. Webhook Trigger (receive SIEM alert)
2. OpenCTI > Incident > Create (from alert data)
3. OpenCTI > Observable > Create (extracted IOCs)
4. OpenCTI > Relationship > Create (link Incident <-> Observable)
5. OpenCTI > Indicator > Create (detection pattern)
6. OpenCTI > Observable > Search (CTI enrichment)
```

### Create a report with linked objects

```
1. OpenCTI > Report > Create
   - Name: "Phishing Campaign Q1 2026"
   - Published: 2026-03-15
   - Report Type: threat-report
   - Objects: <IDs of observables, indicators, threat actors>
```

## Resource Reference

### Observable

STIX Cyber Observable object (IP address, domain, URL, file hash, etc.).

| Operation | Required | Optional |
|---|---|---|
| Create | `type`, `value` | `score`, `description`, `createdBy`, `createIndicator`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `observableTypes`, `limit`, `filterValue`, `orderBy` |
| Update | `id` | `description`, `score` |
| Delete | `id` | - |

### Report

| Operation | Required | Optional |
|---|---|---|
| Create | `name`, `published` | `description`, `content`, `confidence`, `reliability`, `report_types`, `createdBy`, `objectMarking`, `objectLabel`, `objects`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit`, `orderBy`, `reportType` |
| Update | `id` | `name`, `description`, `content`, `confidence`, `published` |
| Delete | `id` | - |

### Note (RFI)

| Operation | Required | Optional |
|---|---|---|
| Create | `content` | `abstract`, `authors`, `confidence`, `likelihood`, `note_types`, `createdBy`, `objectMarking`, `objectLabel`, `objects` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `abstract`, `content`, `likelihood` |
| Delete | `id` | - |

### Task

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `due_date`, `assignees`, `createdBy`, `objectMarking`, `objectLabel`, `objects` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `due_date` |
| Delete | `id` | - |

### Threat Actor

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `threat_actor_types`, `first_seen`, `last_seen`, `sophistication`, `resource_level`, `primary_motivation`, `roles`, `goals`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `aliases`, `first_seen`, `last_seen`, `primary_motivation`, `sophistication` |
| Delete | `id` | - |

### Label

| Operation | Required | Optional |
|---|---|---|
| Create | `value` | `color` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `value`, `color` |
| Delete | `id` | - |

### Indicator

| Operation | Required | Optional |
|---|---|---|
| Create | `name`, `pattern`, `pattern_type` | `description`, `indicator_types`, `valid_from`, `valid_until`, `score`, `detection`, `main_observable_type`, `createObservables`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `pattern`, `score`, `detection`, `valid_from`, `valid_until`, `confidence` |
| Delete | `id` | - |

### Incident

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `first_seen`, `last_seen`, `incident_type`, `severity`, `source`, `objective`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `first_seen`, `last_seen`, `severity` |
| Delete | `id` | - |

### Malware

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `malware_types`, `is_family`, `first_seen`, `last_seen`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `is_family`, `first_seen`, `last_seen` |
| Delete | `id` | - |

### Vulnerability

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `cvss_base_score`, `cvss_base_severity`, `cvss_vector_string`, `cwe`, `cisa_kev`, `epss_score`, `epss_percentile`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `cvss_base_score`, `cvss_base_severity` |
| Delete | `id` | - |

### Relationship

| Operation | Required | Optional |
|---|---|---|
| Create | `relationship_type`, `fromId`, `toId` | `description`, `confidence`, `start_time`, `stop_time`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `fromOrToId`, `fromId`, `toId`, `relationship_type`, `limit` |
| Delete | `id` | - |

## License

[MIT](./LICENSE)
