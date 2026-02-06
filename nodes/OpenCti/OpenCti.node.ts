import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	openCtiApiRequest,
	buildEditInputs,
	splitCommaSeparated,
	buildFilterGroup,
	toIsoDate,
} from './GenericFunctions';

import {
	observableOperations, observableFields,
	reportOperations, reportFields,
	noteOperations, noteFields,
	taskOperations, taskFields,
	threatActorOperations, threatActorFields,
	labelOperations, labelFields,
	relationshipOperations, relationshipFields,
	indicatorOperations, indicatorFields,
	incidentOperations, incidentFields,
	malwareOperations, malwareFields,
	vulnerabilityOperations, vulnerabilityFields,
} from './descriptions';

export class OpenCti implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OpenCTI',
		name: 'openCti',
		icon: 'file:opencti.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the OpenCTI Cyber Threat Intelligence platform',
		defaults: {
			name: 'OpenCTI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'openCtiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Incident', value: 'incident' },
					{ name: 'Indicator', value: 'indicator' },
					{ name: 'Label', value: 'label' },
					{ name: 'Malware', value: 'malware' },
					{ name: 'Note (RFI)', value: 'note' },
					{ name: 'Observable', value: 'observable' },
					{ name: 'Relationship', value: 'relationship' },
					{ name: 'Report', value: 'report' },
					{ name: 'Task', value: 'task' },
					{ name: 'Threat Actor', value: 'threatActor' },
					{ name: 'Vulnerability', value: 'vulnerability' },
				],
				default: 'observable',
			},
			// Operations
			...observableOperations,
			...reportOperations,
			...noteOperations,
			...taskOperations,
			...threatActorOperations,
			...labelOperations,
			...relationshipOperations,
			...indicatorOperations,
			...incidentOperations,
			...malwareOperations,
			...vulnerabilityOperations,
			// Fields
			...observableFields,
			...reportFields,
			...noteFields,
			...taskFields,
			...threatActorFields,
			...labelFields,
			...relationshipFields,
			...indicatorFields,
			...incidentFields,
			...malwareFields,
			...vulnerabilityFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject = {};

				// ============================================================
				//                      OBSERVABLE
				// ============================================================
				if (resource === 'observable') {
					if (operation === 'create') {
						responseData = await executeObservableCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeObservableGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeObservableSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeObservableUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeObservableDelete.call(this, i);
					}
				}

				// ============================================================
				//                      REPORT
				// ============================================================
				else if (resource === 'report') {
					if (operation === 'create') {
						responseData = await executeReportCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeReportGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeReportSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeReportUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeReportDelete.call(this, i);
					}
				}

				// ============================================================
				//                      NOTE (RFI)
				// ============================================================
				else if (resource === 'note') {
					if (operation === 'create') {
						responseData = await executeNoteCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeNoteGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeNoteSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeNoteUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeNoteDelete.call(this, i);
					}
				}

				// ============================================================
				//                      TASK
				// ============================================================
				else if (resource === 'task') {
					if (operation === 'create') {
						responseData = await executeTaskCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeTaskGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeTaskSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeTaskUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeTaskDelete.call(this, i);
					}
				}

				// ============================================================
				//                      THREAT ACTOR
				// ============================================================
				else if (resource === 'threatActor') {
					if (operation === 'create') {
						responseData = await executeThreatActorCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeThreatActorGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeThreatActorSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeThreatActorUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeThreatActorDelete.call(this, i);
					}
				}

				// ============================================================
				//                      LABEL
				// ============================================================
				else if (resource === 'label') {
					if (operation === 'create') {
						responseData = await executeLabelCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeLabelGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeLabelSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeLabelUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeLabelDelete.call(this, i);
					}
				}

				// ============================================================
				//                      RELATIONSHIP
				// ============================================================
				else if (resource === 'relationship') {
					if (operation === 'create') {
						responseData = await executeRelationshipCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeRelationshipGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeRelationshipSearch.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeRelationshipDelete.call(this, i);
					}
				}

				// ============================================================
				//                      INDICATOR
				// ============================================================
				else if (resource === 'indicator') {
					if (operation === 'create') {
						responseData = await executeIndicatorCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeIndicatorGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeIndicatorSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeIndicatorUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeIndicatorDelete.call(this, i);
					}
				}

				// ============================================================
				//                      INCIDENT
				// ============================================================
				else if (resource === 'incident') {
					if (operation === 'create') {
						responseData = await executeIncidentCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeIncidentGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeIncidentSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeIncidentUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeIncidentDelete.call(this, i);
					}
				}

				// ============================================================
				//                      MALWARE
				// ============================================================
				else if (resource === 'malware') {
					if (operation === 'create') {
						responseData = await executeMalwareCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeMalwareGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeMalwareSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeMalwareUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeMalwareDelete.call(this, i);
					}
				}

				// ============================================================
				//                      VULNERABILITY
				// ============================================================
				else if (resource === 'vulnerability') {
					if (operation === 'create') {
						responseData = await executeVulnerabilityCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeVulnerabilityGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeVulnerabilitySearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeVulnerabilityUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeVulnerabilityDelete.call(this, i);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

// ============================================================
// OBSERVABLE operations
// ============================================================

async function executeObservableCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const observableType = this.getNodeParameter('observableType', i) as string;
	const observableValue = this.getNodeParameter('observableValue', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	// Map observable type to the correct GraphQL input field name
	const typeToInputField: Record<string, string> = {
		'Autonomous-System': 'AutonomousSystem',
		'Bank-Account': 'BankAccount',
		'Credential': 'Credential',
		'Cryptocurrency-Wallet': 'CryptocurrencyWallet',
		'Cryptographic-Key': 'CryptographicKey',
		'Directory': 'Directory',
		'Domain-Name': 'DomainName',
		'Email-Addr': 'EmailAddr',
		'Email-Message': 'EmailMessage',
		'StixFile': 'StixFile',
		'Hostname': 'Hostname',
		'IPv4-Addr': 'IPv4Addr',
		'IPv6-Addr': 'IPv6Addr',
		'Mac-Addr': 'MacAddr',
		'Media-Content': 'MediaContent',
		'Mutex': 'Mutex',
		'Network-Traffic': 'NetworkTraffic',
		'Phone-Number': 'PhoneNumber',
		'Process': 'Process',
		'Software': 'Software',
		'Text': 'Text',
		'Tracking-Number': 'TrackingNumber',
		'Url': 'Url',
		'User-Account': 'UserAccount',
		'User-Agent': 'UserAgent',
		'Windows-Registry-Key': 'WindowsRegistryKey',
		'X509-Certificate': 'X509Certificate',
	};

	const inputField = typeToInputField[observableType] || observableType;

	// Build type-specific input: most simple types use { value: "..." }
	const simpleValueTypes = [
		'DomainName', 'EmailAddr', 'IPv4Addr', 'IPv6Addr', 'MacAddr',
		'Url', 'Hostname', 'Text', 'UserAgent', 'CryptocurrencyWallet',
		'CryptographicKey', 'PhoneNumber', 'Credential', 'TrackingNumber',
		'BankAccount', 'MediaContent', 'Mutex',
	];

	let typeSpecificInput: IDataObject;
	if (simpleValueTypes.includes(inputField)) {
		typeSpecificInput = { value: observableValue };
	} else if (inputField === 'AutonomousSystem') {
		typeSpecificInput = { number: parseInt(observableValue, 10) };
	} else if (inputField === 'StixFile') {
		typeSpecificInput = { name: observableValue };
	} else if (inputField === 'Software') {
		typeSpecificInput = { name: observableValue };
	} else if (inputField === 'Directory') {
		typeSpecificInput = { path: observableValue };
	} else if (inputField === 'Process') {
		typeSpecificInput = { pid: parseInt(observableValue, 10) };
	} else if (inputField === 'UserAccount') {
		typeSpecificInput = { account_login: observableValue };
	} else if (inputField === 'WindowsRegistryKey') {
		typeSpecificInput = { key: observableValue };
	} else if (inputField === 'EmailMessage') {
		typeSpecificInput = { subject: observableValue, is_multipart: false };
	} else if (inputField === 'NetworkTraffic') {
		typeSpecificInput = { dst_port: parseInt(observableValue, 10), is_active: false };
	} else if (inputField === 'X509Certificate') {
		typeSpecificInput = { subject: observableValue };
	} else {
		typeSpecificInput = { value: observableValue };
	}

	const variables: IDataObject = {
		type: observableType,
		[inputField]: typeSpecificInput,
	};

	if (additionalFields.x_opencti_score !== undefined) variables.x_opencti_score = additionalFields.x_opencti_score;
	if (additionalFields.x_opencti_description) variables.x_opencti_description = additionalFields.x_opencti_description;
	if (additionalFields.createdBy) variables.createdBy = additionalFields.createdBy;
	if (additionalFields.createIndicator) variables.createIndicator = additionalFields.createIndicator;
	if (additionalFields.objectMarking) variables.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) variables.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) variables.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation StixCyberObservableAdd(
			$type: String!
			${inputField}: ${inputField}AddInput
			$x_opencti_score: Int
			$x_opencti_description: String
			$createdBy: String
			$createIndicator: Boolean
			$objectMarking: [String]
			$objectLabel: [String]
			$externalReferences: [String]
		) {
			stixCyberObservableAdd(
				type: $type
				${inputField}: $${inputField}
				x_opencti_score: $x_opencti_score
				x_opencti_description: $x_opencti_description
				createdBy: $createdBy
				createIndicator: $createIndicator
				objectMarking: $objectMarking
				objectLabel: $objectLabel
				externalReferences: $externalReferences
			) {
				id
				standard_id
				entity_type
				observable_value
				x_opencti_score
				x_opencti_description
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.stixCyberObservableAdd as IDataObject;
}

async function executeObservableGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observableId', i) as string;
	const query = `
		query StixCyberObservable($id: String!) {
			stixCyberObservable(id: $id) {
				id
				standard_id
				entity_type
				observable_value
				x_opencti_score
				x_opencti_description
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				indicators { edges { node { id name pattern } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.stixCyberObservable as IDataObject;
}

async function executeObservableSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const observableTypes = this.getNodeParameter('observableTypes', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const searchOptions = this.getNodeParameter('searchOptions', i) as IDataObject;

	const variables: IDataObject = {
		first: limit,
		search: searchTerm || undefined,
		orderBy: (searchOptions.orderBy as string) || 'created_at',
		orderMode: (searchOptions.orderMode as string) || 'desc',
	};

	if (observableTypes) {
		variables.types = splitCommaSeparated(observableTypes);
	}

	if (searchOptions.filterValue) {
		variables.filters = buildFilterGroup([
			{ key: 'observable_value', values: [searchOptions.filterValue as string] },
		]);
	}

	const query = `
		query StixCyberObservables(
			$first: Int
			$search: String
			$types: [String]
			$orderBy: StixCyberObservablesOrdering
			$orderMode: OrderingMode
			$filters: FilterGroup
		) {
			stixCyberObservables(
				first: $first
				search: $search
				types: $types
				orderBy: $orderBy
				orderMode: $orderMode
				filters: $filters
			) {
				edges {
					node {
						id
						standard_id
						entity_type
						observable_value
						x_opencti_score
						x_opencti_description
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.stixCyberObservables as IDataObject;
}

async function executeObservableUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observableId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return await executeObservableGet.call(this, i);
	}

	const query = `
		mutation StixCyberObservableEdit($id: ID!, $input: [EditInput]!) {
			stixCyberObservableEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					entity_type
					observable_value
					x_opencti_score
					x_opencti_description
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.stixCyberObservableEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeObservableDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observableId', i) as string;
	const query = `
		mutation StixCyberObservableEdit($id: ID!) {
			stixCyberObservableEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// REPORT operations
// ============================================================

async function executeReportCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const published = this.getNodeParameter('published', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name, published: toIsoDate(published) };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.content) input.content = additionalFields.content;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_reliability) input.x_opencti_reliability = additionalFields.x_opencti_reliability;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.report_types) input.report_types = splitCommaSeparated(additionalFields.report_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation ReportAdd($input: ReportAddInput!) {
			reportAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				content
				published
				report_types
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.reportAdd as IDataObject;
}

async function executeReportGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('reportId', i) as string;
	const query = `
		query Report($id: String!) {
			report(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				content
				published
				report_types
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.report as IDataObject;
}

async function executeReportSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const searchOptions = this.getNodeParameter('searchOptions', i) as IDataObject;

	const variables: IDataObject = {
		first: limit,
		search: searchTerm || undefined,
		orderBy: (searchOptions.orderBy as string) || 'created_at',
		orderMode: (searchOptions.orderMode as string) || 'desc',
	};

	if (searchOptions.reportType) {
		variables.filters = buildFilterGroup([
			{ key: 'report_types', values: [searchOptions.reportType as string] },
		]);
	}

	const query = `
		query Reports($first: Int, $search: String, $orderBy: ReportsOrdering, $orderMode: OrderingMode, $filters: FilterGroup) {
			reports(first: $first, search: $search, orderBy: $orderBy, orderMode: $orderMode, filters: $filters) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						published
						report_types
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.reports as IDataObject;
}

async function executeReportUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('reportId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation ReportEdit($id: ID!, $input: [EditInput]!) {
			reportEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					content
					published
					confidence
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.reportEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeReportDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('reportId', i) as string;
	const query = `
		mutation ReportEdit($id: ID!) {
			reportEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// NOTE (RFI) operations
// ============================================================

async function executeNoteCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const content = this.getNodeParameter('content', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { content };

	if (additionalFields.attribute_abstract) input.attribute_abstract = additionalFields.attribute_abstract;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.likelihood !== undefined) input.likelihood = additionalFields.likelihood;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.authors) input.authors = splitCommaSeparated(additionalFields.authors as string);
	if (additionalFields.note_types) input.note_types = splitCommaSeparated(additionalFields.note_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);

	const query = `
		mutation NoteAdd($input: NoteAddInput!) {
			noteAdd(input: $input) {
				id
				standard_id
				entity_type
				attribute_abstract
				content
				authors
				note_types
				likelihood
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.noteAdd as IDataObject;
}

async function executeNoteGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('noteId', i) as string;
	const query = `
		query Note($id: String!) {
			note(id: $id) {
				id
				standard_id
				entity_type
				attribute_abstract
				content
				authors
				note_types
				likelihood
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.note as IDataObject;
}

async function executeNoteSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Notes($first: Int, $search: String) {
			notes(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						attribute_abstract
						content
						authors
						note_types
						likelihood
						confidence
						created_at
						createdBy { id name }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.notes as IDataObject;
}

async function executeNoteUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('noteId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation NoteEdit($id: ID!, $input: [EditInput]!) {
			noteEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					attribute_abstract
					content
					likelihood
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.noteEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeNoteDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('noteId', i) as string;
	const query = `
		mutation NoteEdit($id: ID!) {
			noteEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// TASK operations
// ============================================================

async function executeTaskCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.due_date) input.due_date = toIsoDate(additionalFields.due_date as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectAssignee) input.objectAssignee = splitCommaSeparated(additionalFields.objectAssignee as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);

	const query = `
		mutation TaskAdd($input: TaskAddInput!) {
			taskAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				due_date
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objectAssignee { id name }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.taskAdd as IDataObject;
}

async function executeTaskGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('taskId', i) as string;
	const query = `
		query Task($id: String!) {
			task(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				due_date
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objectAssignee { id name }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.task as IDataObject;
}

async function executeTaskSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Tasks($first: Int, $search: String) {
			tasks(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						due_date
						created_at
						createdBy { id name }
						objectLabel { id value color }
						objectAssignee { id name }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.tasks as IDataObject;
}

async function executeTaskUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('taskId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation TaskFieldPatch($id: ID!, $input: [EditInput!]!) {
			taskFieldPatch(id: $id, input: $input) {
				id
				standard_id
				name
				description
				due_date
				updated_at
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return data.taskFieldPatch as IDataObject;
}

async function executeTaskDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('taskId', i) as string;
	const query = `
		mutation TaskDelete($id: ID!) {
			taskDelete(id: $id)
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// THREAT ACTOR operations
// ============================================================

async function executeThreatActorCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.sophistication) input.sophistication = additionalFields.sophistication;
	if (additionalFields.resource_level) input.resource_level = additionalFields.resource_level;
	if (additionalFields.primary_motivation) input.primary_motivation = additionalFields.primary_motivation;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.threat_actor_types) input.threat_actor_types = splitCommaSeparated(additionalFields.threat_actor_types as string);
	if (additionalFields.roles) input.roles = splitCommaSeparated(additionalFields.roles as string);
	if (additionalFields.goals) input.goals = splitCommaSeparated(additionalFields.goals as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation ThreatActorGroupAdd($input: ThreatActorGroupAddInput!) {
			threatActorGroupAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				threat_actor_types
				first_seen
				last_seen
				sophistication
				resource_level
				primary_motivation
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.threatActorGroupAdd as IDataObject;
}

async function executeThreatActorGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('threatActorId', i) as string;
	const query = `
		query ThreatActorGroup($id: String!) {
			threatActorGroup(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				threat_actor_types
				first_seen
				last_seen
				roles
				goals
				sophistication
				resource_level
				primary_motivation
				secondary_motivations
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.threatActorGroup as IDataObject;
}

async function executeThreatActorSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query ThreatActorsGroup($first: Int, $search: String) {
			threatActorsGroup(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						aliases
						threat_actor_types
						first_seen
						last_seen
						sophistication
						resource_level
						primary_motivation
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.threatActorsGroup as IDataObject;
}

async function executeThreatActorUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('threatActorId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

	// Handle aliases specially - convert comma-separated to array
	if (updateFields.aliases && typeof updateFields.aliases === 'string') {
		updateFields.aliases = splitCommaSeparated(updateFields.aliases) as unknown as string;
	}

	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation ThreatActorGroupEdit($id: ID!, $input: [EditInput]!) {
			threatActorGroupEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					aliases
					first_seen
					last_seen
					sophistication
					primary_motivation
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.threatActorGroupEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeThreatActorDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('threatActorId', i) as string;
	const query = `
		mutation ThreatActorGroupEdit($id: ID!) {
			threatActorGroupEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// LABEL operations
// ============================================================

async function executeLabelCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const value = this.getNodeParameter('value', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { value };
	if (additionalFields.color) input.color = additionalFields.color;

	const query = `
		mutation LabelAdd($input: LabelAddInput!) {
			labelAdd(input: $input) {
				id
				standard_id
				entity_type
				value
				color
				created_at
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.labelAdd as IDataObject;
}

async function executeLabelGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('labelId', i) as string;
	const query = `
		query Label($id: String!) {
			label(id: $id) {
				id
				standard_id
				entity_type
				value
				color
				created_at
				updated_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.label as IDataObject;
}

async function executeLabelSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Labels($first: Int, $search: String) {
			labels(first: $first, search: $search, orderBy: value, orderMode: asc) {
				edges {
					node {
						id
						standard_id
						entity_type
						value
						color
						created_at
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.labels as IDataObject;
}

async function executeLabelUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('labelId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation LabelEdit($id: ID!, $input: [EditInput]!) {
			labelEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					value
					color
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.labelEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeLabelDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('labelId', i) as string;
	const query = `
		mutation LabelEdit($id: ID!) {
			labelEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// RELATIONSHIP operations
// ============================================================

async function executeRelationshipCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const relationshipType = this.getNodeParameter('relationshipType', i) as string;
	const fromId = this.getNodeParameter('fromId', i) as string;
	const toId = this.getNodeParameter('toId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	// For "object" relationship type, use stixRefRelationshipAdd instead (adding to containers)
	if (relationshipType === 'object') {
		const refInput: IDataObject = {
			fromId,
			toId,
			relationship_type: 'object',
		};

		const query = `
			mutation StixRefRelationshipAdd($input: StixRefRelationshipAddInput!) {
				stixRefRelationshipAdd(input: $input) {
					id
					standard_id
					entity_type
					relationship_type
					created_at
					from { ... on BasicObject { id entity_type } }
					to { ... on BasicObject { id entity_type } }
				}
			}
		`;

		const data = await openCtiApiRequest.call(this, query, { input: refInput });
		return data.stixRefRelationshipAdd as IDataObject;
	}

	const input: IDataObject = {
		fromId,
		toId,
		relationship_type: relationshipType,
	};

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.start_time) input.start_time = toIsoDate(additionalFields.start_time as string);
	if (additionalFields.stop_time) input.stop_time = toIsoDate(additionalFields.stop_time as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation StixCoreRelationshipAdd($input: StixCoreRelationshipAddInput!) {
			stixCoreRelationshipAdd(input: $input) {
				id
				standard_id
				entity_type
				relationship_type
				description
				confidence
				start_time
				stop_time
				created_at
				from { ... on BasicObject { id entity_type } }
				to { ... on BasicObject { id entity_type } }
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.stixCoreRelationshipAdd as IDataObject;
}

async function executeRelationshipGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('relationshipId', i) as string;
	const query = `
		query StixCoreRelationship($id: String!) {
			stixCoreRelationship(id: $id) {
				id
				standard_id
				entity_type
				relationship_type
				description
				confidence
				start_time
				stop_time
				created_at
				updated_at
				from { ... on BasicObject { id entity_type } }
				to { ... on BasicObject { id entity_type } }
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.stixCoreRelationship as IDataObject;
}

async function executeRelationshipSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const limit = this.getNodeParameter('limit', i) as number;
	const searchOptions = this.getNodeParameter('searchOptions', i) as IDataObject;

	const variables: IDataObject = { first: limit };

	if (searchOptions.search) variables.search = searchOptions.search;
	if (searchOptions.fromOrToId) variables.fromOrToId = [searchOptions.fromOrToId as string];
	if (searchOptions.fromId) variables.fromId = [searchOptions.fromId as string];
	if (searchOptions.toId) variables.toId = [searchOptions.toId as string];
	if (searchOptions.relationship_type) variables.relationship_type = splitCommaSeparated(searchOptions.relationship_type as string);

	const query = `
		query StixCoreRelationships(
			$first: Int
			$search: String
			$fromOrToId: [String]
			$fromId: [String]
			$toId: [String]
			$relationship_type: [String]
		) {
			stixCoreRelationships(
				first: $first
				search: $search
				fromOrToId: $fromOrToId
				fromId: $fromId
				toId: $toId
				relationship_type: $relationship_type
				orderBy: created_at
				orderMode: desc
			) {
				edges {
					node {
						id
						standard_id
						entity_type
						relationship_type
						description
						confidence
						start_time
						stop_time
						created_at
						from { ... on BasicObject { id entity_type } }
						to { ... on BasicObject { id entity_type } }
						createdBy { id name }
						objectMarking { id definition }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.stixCoreRelationships as IDataObject;
}

async function executeRelationshipDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('relationshipId', i) as string;
	const query = `
		mutation StixCoreRelationshipEdit($id: ID!) {
			stixCoreRelationshipEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// INDICATOR operations
// ============================================================

async function executeIndicatorCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const pattern = this.getNodeParameter('pattern', i) as string;
	const pattern_type = this.getNodeParameter('pattern_type', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name, pattern, pattern_type };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_score !== undefined) input.x_opencti_score = additionalFields.x_opencti_score;
	if (additionalFields.x_opencti_detection !== undefined) input.x_opencti_detection = additionalFields.x_opencti_detection;
	if (additionalFields.x_opencti_main_observable_type) input.x_opencti_main_observable_type = additionalFields.x_opencti_main_observable_type;
	if (additionalFields.valid_from) input.valid_from = toIsoDate(additionalFields.valid_from as string);
	if (additionalFields.valid_until) input.valid_until = toIsoDate(additionalFields.valid_until as string);
	if (additionalFields.createObservables !== undefined) input.createObservables = additionalFields.createObservables;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.indicator_types) input.indicator_types = splitCommaSeparated(additionalFields.indicator_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation IndicatorAdd($input: IndicatorAddInput!) {
			indicatorAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				pattern
				pattern_type
				indicator_types
				valid_from
				valid_until
				x_opencti_score
				x_opencti_detection
				x_opencti_main_observable_type
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.indicatorAdd as IDataObject;
}

async function executeIndicatorGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('indicatorId', i) as string;
	const query = `
		query Indicator($id: String!) {
			indicator(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				pattern
				pattern_type
				indicator_types
				valid_from
				valid_until
				x_opencti_score
				x_opencti_detection
				x_opencti_main_observable_type
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				observables(first: 50) { edges { node { id entity_type observable_value } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.indicator as IDataObject;
}

async function executeIndicatorSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Indicators($first: Int, $search: String) {
			indicators(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						pattern
						pattern_type
						indicator_types
						valid_from
						valid_until
						x_opencti_score
						x_opencti_detection
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.indicators as IDataObject;
}

async function executeIndicatorUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('indicatorId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation IndicatorFieldPatch($id: ID!, $input: [EditInput!]!) {
			indicatorFieldPatch(id: $id, input: $input) {
				id
				standard_id
				name
				description
				pattern
				x_opencti_score
				x_opencti_detection
				valid_from
				valid_until
				confidence
				updated_at
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return data.indicatorFieldPatch as IDataObject;
}

async function executeIndicatorDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('indicatorId', i) as string;
	const query = `
		mutation IndicatorDelete($id: ID!) {
			indicatorDelete(id: $id)
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// INCIDENT operations
// ============================================================

async function executeIncidentCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.objective) input.objective = additionalFields.objective;
	if (additionalFields.incident_type) input.incident_type = additionalFields.incident_type;
	if (additionalFields.severity) input.severity = additionalFields.severity;
	if (additionalFields.source) input.source = additionalFields.source;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation IncidentAdd($input: IncidentAddInput!) {
			incidentAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				first_seen
				last_seen
				objective
				incident_type
				severity
				source
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.incidentAdd as IDataObject;
}

async function executeIncidentGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('incidentId', i) as string;
	const query = `
		query Incident($id: String!) {
			incident(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				first_seen
				last_seen
				objective
				incident_type
				severity
				source
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.incident as IDataObject;
}

async function executeIncidentSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Incidents($first: Int, $search: String) {
			incidents(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						aliases
						first_seen
						last_seen
						incident_type
						severity
						source
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.incidents as IDataObject;
}

async function executeIncidentUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('incidentId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation IncidentEdit($id: ID!, $input: [EditInput]!) {
			incidentEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					first_seen
					last_seen
					severity
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.incidentEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeIncidentDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('incidentId', i) as string;
	const query = `
		mutation IncidentEdit($id: ID!) {
			incidentEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// MALWARE operations
// ============================================================

async function executeMalwareCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.is_family !== undefined) input.is_family = additionalFields.is_family;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.malware_types) input.malware_types = splitCommaSeparated(additionalFields.malware_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation MalwareAdd($input: MalwareAddInput!) {
			malwareAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				malware_types
				is_family
				first_seen
				last_seen
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.malwareAdd as IDataObject;
}

async function executeMalwareGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('malwareId', i) as string;
	const query = `
		query Malware($id: String!) {
			malware(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				malware_types
				is_family
				first_seen
				last_seen
				architecture_execution_envs
				implementation_languages
				capabilities
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.malware as IDataObject;
}

async function executeMalwareSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Malwares($first: Int, $search: String) {
			malwares(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						aliases
						malware_types
						is_family
						first_seen
						last_seen
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.malwares as IDataObject;
}

async function executeMalwareUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('malwareId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation MalwareEdit($id: ID!, $input: [EditInput]!) {
			malwareEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					is_family
					first_seen
					last_seen
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.malwareEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeMalwareDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('malwareId', i) as string;
	const query = `
		mutation MalwareEdit($id: ID!) {
			malwareEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// VULNERABILITY operations
// ============================================================

async function executeVulnerabilityCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_cvss_base_score !== undefined) input.x_opencti_cvss_base_score = additionalFields.x_opencti_cvss_base_score;
	if (additionalFields.x_opencti_cvss_base_severity) input.x_opencti_cvss_base_severity = additionalFields.x_opencti_cvss_base_severity;
	if (additionalFields.x_opencti_cvss_vector_string) input.x_opencti_cvss_vector_string = additionalFields.x_opencti_cvss_vector_string;
	if (additionalFields.x_opencti_cisa_kev !== undefined) input.x_opencti_cisa_kev = additionalFields.x_opencti_cisa_kev;
	if (additionalFields.x_opencti_epss_score !== undefined) input.x_opencti_epss_score = additionalFields.x_opencti_epss_score;
	if (additionalFields.x_opencti_epss_percentile !== undefined) input.x_opencti_epss_percentile = additionalFields.x_opencti_epss_percentile;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.x_opencti_cwe) input.x_opencti_cwe = splitCommaSeparated(additionalFields.x_opencti_cwe as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation VulnerabilityAdd($input: VulnerabilityAddInput!) {
			vulnerabilityAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				x_opencti_cvss_base_score
				x_opencti_cvss_base_severity
				x_opencti_cvss_vector_string
				x_opencti_cisa_kev
				x_opencti_epss_score
				x_opencti_epss_percentile
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.vulnerabilityAdd as IDataObject;
}

async function executeVulnerabilityGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('vulnerabilityId', i) as string;
	const query = `
		query Vulnerability($id: String!) {
			vulnerability(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				x_opencti_aliases
				x_opencti_cvss_base_score
				x_opencti_cvss_base_severity
				x_opencti_cvss_vector_string
				x_opencti_cisa_kev
				x_opencti_epss_score
				x_opencti_epss_percentile
				x_opencti_cwe
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.vulnerability as IDataObject;
}

async function executeVulnerabilitySearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Vulnerabilities($first: Int, $search: String) {
			vulnerabilities(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						x_opencti_cvss_base_score
						x_opencti_cvss_base_severity
						x_opencti_cisa_kev
						x_opencti_epss_score
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.vulnerabilities as IDataObject;
}

async function executeVulnerabilityUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('vulnerabilityId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation VulnerabilityEdit($id: ID!, $input: [EditInput]!) {
			vulnerabilityEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					x_opencti_cvss_base_score
					x_opencti_cvss_base_severity
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.vulnerabilityEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeVulnerabilityDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('vulnerabilityId', i) as string;
	const query = `
		mutation VulnerabilityEdit($id: ID!) {
			vulnerabilityEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}
