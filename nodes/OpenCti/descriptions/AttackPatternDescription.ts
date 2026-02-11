import { INodeProperties } from 'n8n-workflow';

export const attackPatternOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['attackPattern'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an attack pattern',
				action: 'Create an attack pattern',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an attack pattern',
				action: 'Delete an attack pattern',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an attack pattern by ID',
				action: 'Get an attack pattern',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for attack patterns',
				action: 'Search attack patterns',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an attack pattern',
				action: 'Update an attack pattern',
			},
		],
		default: 'create',
	},
];

export const attackPatternFields: INodeProperties[] = [
	// ----------------------------------
	//         attackPattern:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['create'],
			},
		},
		default: '',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Aliases',
				name: 'aliases',
				type: 'string',
				default: '',
				description: 'Comma-separated aliases',
			},
			{
				displayName: 'Confidence',
				name: 'confidence',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
			},
			{
				displayName: 'Created By (Identity ID)',
				name: 'createdBy',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
			},
			{
				displayName: 'External References (IDs)',
				name: 'externalReferences',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of external references',
			},
			{
				displayName: 'Kill Chain Phases (IDs)',
				name: 'killChainPhases',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of kill chain phases',
			},
			{
				displayName: 'Labels (IDs)',
				name: 'objectLabel',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of labels',
			},
			{
				displayName: 'Marking Definitions (IDs)',
				name: 'objectMarking',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of marking definitions',
			},
			{
				displayName: 'MITRE ATT&CK ID',
				name: 'x_mitre_id',
				type: 'string',
				default: '',
				description: 'MITRE ATT&CK technique ID (e.g. T1059)',
			},
			{
				displayName: 'MITRE Detection',
				name: 'x_mitre_detection',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
			},
			{
				displayName: 'MITRE Platforms',
				name: 'x_mitre_platforms',
				type: 'string',
				default: '',
				description: 'Comma-separated platforms (e.g. Windows,Linux)',
			},
		],
	},

	// ----------------------------------
	//         attackPattern:get
	// ----------------------------------
	{
		displayName: 'Attack Pattern ID',
		name: 'attackPatternId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         attackPattern:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['search'],
			},
		},
		default: '',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         attackPattern:update
	// ----------------------------------
	{
		displayName: 'Attack Pattern ID',
		name: 'attackPatternId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['update'],
			},
		},
		default: '',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
			},
			{
				displayName: 'MITRE ATT&CK ID',
				name: 'x_mitre_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         attackPattern:delete
	// ----------------------------------
	{
		displayName: 'Attack Pattern ID',
		name: 'attackPatternId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attackPattern'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
