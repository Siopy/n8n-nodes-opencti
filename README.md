# n8n-nodes-opencti

Custom [n8n](https://n8n.io/) community node for [OpenCTI](https://www.opencti.io/), an open-source Cyber Threat Intelligence (CTI) platform.

This node communicates with OpenCTI's GraphQL API to manage threat intelligence data directly from your n8n workflows.

## Table of Contents

- [Installation](#installation)
- [Supported Resources](#supported-resources)
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
| **Attack Pattern** (MITRE ATT&CK) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Campaign** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **City** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Country** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Course of Action** (MITRE Mitigation) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **External Reference** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Incident** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Indicator** (STIX, YARA, Sigma, Snort...) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Individual** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Infrastructure** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Intrusion Set** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Kill Chain Phase** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Label** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Malware** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Marking Definition** (TLP, PAP) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Note / RFI** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Observable** (STIX Cyber Observable) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Observed Data** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Opinion** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Position** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Region** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Relationship** (STIX Core Relationship) | ✅ | ✅ | ✅ | - | ✅ |
| **Report** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Sector** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Sighting** (STIX Sighting Relationship) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **System** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Task** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Threat Actor** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Tool** (STIX Tool) | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Vulnerability** (CVSS, EPSS, CISA KEV) | ✅ | ✅ | ✅ | ✅ | ✅ |

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

## Credentials Setup

1. Open n8n in your browser (ex: `http://localhost:5678`)
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
│   ├── ci.yml                          # GitHub Actions CI (lint + build)
│   └── publish.yml                     # Publish to npm with provenance
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
│       ├── AttackPatternDescription.ts
│       ├── CampaignDescription.ts
│       ├── CityDescription.ts
│       ├── CountryDescription.ts
│       ├── CourseOfActionDescription.ts
│       ├── ExternalReferenceDescription.ts
│       ├── IncidentDescription.ts
│       ├── IndicatorDescription.ts
│       ├── IndividualDescription.ts
│       ├── InfrastructureDescription.ts
│       ├── IntrusionSetDescription.ts
│       ├── KillChainPhaseDescription.ts
│       ├── LabelDescription.ts
│       ├── MalwareDescription.ts
│       ├── MarkingDefinitionDescription.ts
│       ├── NoteDescription.ts
│       ├── ObservableDescription.ts
│       ├── ObservedDataDescription.ts
│       ├── OpinionDescription.ts
│       ├── PositionDescription.ts
│       ├── RegionDescription.ts
│       ├── RelationshipDescription.ts
│       ├── ReportDescription.ts
│       ├── SectorDescription.ts
│       ├── SightingDescription.ts
│       ├── SystemDescription.ts
│       ├── TaskDescription.ts
│       ├── ThreatActorDescription.ts
│       ├── ToolDescription.ts
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

### Attack Pattern

MITRE ATT&CK technique or sub-technique.

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `x_mitre_id`, `x_mitre_platforms`, `x_mitre_detection`, `killChainPhases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `x_mitre_id`, `x_mitre_platforms` |
| Delete | `id` | - |

### Campaign

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `first_seen`, `last_seen`, `objective`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `first_seen`, `last_seen`, `objective` |
| Delete | `id` | - |

### City

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `latitude`, `longitude`, `x_opencti_aliases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `latitude`, `longitude` |
| Delete | `id` | - |

### Country

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `latitude`, `longitude`, `x_opencti_aliases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `latitude`, `longitude` |
| Delete | `id` | - |

### Course of Action

MITRE ATT&CK mitigation.

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `x_mitre_id`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description` |
| Delete | `id` | - |

### External Reference

| Operation | Required | Optional |
|---|---|---|
| Create | `source_name` | `description`, `url`, `external_id`, `hash` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `source_name`, `description`, `url`, `external_id` |
| Delete | `id` | - |

### Incident

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `first_seen`, `last_seen`, `incident_type`, `severity`, `source`, `objective`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `first_seen`, `last_seen`, `severity` |
| Delete | `id` | - |

### Indicator

| Operation | Required | Optional |
|---|---|---|
| Create | `name`, `pattern`, `pattern_type` | `description`, `indicator_types`, `valid_from`, `valid_until`, `score`, `detection`, `main_observable_type`, `createObservables`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `pattern`, `score`, `detection`, `valid_from`, `valid_until`, `confidence` |
| Delete | `id` | - |

### Individual

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `x_opencti_firstname`, `x_opencti_lastname`, `x_opencti_reliability`, `contact_information`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `x_opencti_firstname`, `x_opencti_lastname`, `contact_information` |
| Delete | `id` | - |

### Infrastructure

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `infrastructure_types`, `first_seen`, `last_seen`, `killChainPhases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `first_seen`, `last_seen` |
| Delete | `id` | - |

### Intrusion Set

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `first_seen`, `last_seen`, `goals`, `resource_level`, `primary_motivation`, `secondary_motivations`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `first_seen`, `last_seen`, `primary_motivation` |
| Delete | `id` | - |

### Kill Chain Phase

| Operation | Required | Optional |
|---|---|---|
| Create | `kill_chain_name`, `phase_name` | `x_opencti_order` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `kill_chain_name`, `phase_name`, `x_opencti_order` |
| Delete | `id` | - |

### Label

| Operation | Required | Optional |
|---|---|---|
| Create | `value` | `color` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `value`, `color` |
| Delete | `id` | - |

### Malware

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `malware_types`, `is_family`, `first_seen`, `last_seen`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `is_family`, `first_seen`, `last_seen` |
| Delete | `id` | - |

### Marking Definition

TLP, PAP, or custom marking definitions.

| Operation | Required | Optional |
|---|---|---|
| Create | `definition_type`, `definition`, `x_opencti_order` | `x_opencti_color` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `definition`, `x_opencti_color`, `x_opencti_order` |
| Delete | `id` | - |

### Note (RFI)

| Operation | Required | Optional |
|---|---|---|
| Create | `content` | `abstract`, `authors`, `confidence`, `likelihood`, `note_types`, `createdBy`, `objectMarking`, `objectLabel`, `objects` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `abstract`, `content`, `likelihood` |
| Delete | `id` | - |

### Observable

STIX Cyber Observable object (IP address, domain, URL, file hash, etc.).

| Operation | Required | Optional |
|---|---|---|
| Create | `type`, `value` | `score`, `description`, `createdBy`, `createIndicator`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `observableTypes`, `limit`, `filterValue`, `orderBy` |
| Update | `id` | `description`, `score` |
| Delete | `id` | - |

### Observed Data

| Operation | Required | Optional |
|---|---|---|
| Create | `first_observed`, `last_observed`, `number_observed` | `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences`, `objects` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `first_observed`, `last_observed`, `number_observed` |
| Delete | `id` | - |

### Opinion

| Operation | Required | Optional |
|---|---|---|
| Create | `opinion` | `explanation`, `authors`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences`, `objects` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `opinion`, `explanation` |
| Delete | `id` | - |

### Position

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `latitude`, `longitude`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `latitude`, `longitude` |
| Delete | `id` | - |

### Region

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `x_opencti_aliases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description` |
| Delete | `id` | - |

### Relationship

| Operation | Required | Optional |
|---|---|---|
| Create | `relationship_type`, `fromId`, `toId` | `description`, `confidence`, `start_time`, `stop_time`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `fromOrToId`, `fromId`, `toId`, `relationship_type`, `limit` |
| Delete | `id` | - |

### Report

| Operation | Required | Optional |
|---|---|---|
| Create | `name`, `published` | `description`, `content`, `confidence`, `reliability`, `report_types`, `createdBy`, `objectMarking`, `objectLabel`, `objects`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit`, `orderBy`, `reportType` |
| Update | `id` | `name`, `description`, `content`, `confidence`, `published` |
| Delete | `id` | - |

### Sector

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `contact_information`, `x_opencti_aliases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `contact_information` |
| Delete | `id` | - |

### Sighting

STIX Sighting Relationship — represents the belief that an entity (indicator, malware, etc.) was seen in a specific context.

| Operation | Required | Optional |
|---|---|---|
| Create | `fromId`, `toId`, `attribute_count` | `description`, `first_seen`, `last_seen`, `confidence`, `x_opencti_negative`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `fromOrToId`, `fromId`, `toId`, `fromTypes`, `toTypes`, `limit` |
| Update | `id` | `description`, `first_seen`, `last_seen`, `attribute_count`, `confidence`, `x_opencti_negative` |
| Delete | `id` | - |

### System

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `contact_information`, `x_opencti_aliases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `contact_information` |
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

### Tool

STIX Tool object.

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `aliases`, `tool_types`, `tool_version`, `killChainPhases`, `confidence`, `createdBy`, `objectMarking`, `objectLabel`, `externalReferences` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `tool_version` |
| Delete | `id` | - |

### Vulnerability

| Operation | Required | Optional |
|---|---|---|
| Create | `name` | `description`, `cvss_base_score`, `cvss_base_severity`, `cvss_vector_string`, `cwe`, `cisa_kev`, `epss_score`, `epss_percentile`, `confidence`, `createdBy`, `objectMarking`, `objectLabel` |
| Get | `id` | - |
| Search | - | `searchTerm`, `limit` |
| Update | `id` | `name`, `description`, `cvss_base_score`, `cvss_base_severity` |
| Delete | `id` | - |

## License

[MIT](./LICENSE)
