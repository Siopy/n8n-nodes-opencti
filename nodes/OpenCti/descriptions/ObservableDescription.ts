import { INodeProperties } from 'n8n-workflow';

export const observableOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['observable'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a STIX Cyber Observable',
				action: 'Create an observable',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an observable',
				action: 'Delete an observable',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an observable by ID',
				action: 'Get an observable',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for observables',
				action: 'Search observables',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an observable',
				action: 'Update an observable',
			},
		],
		default: 'create',
	},
];

export const observableFields: INodeProperties[] = [
	// ----------------------------------
	//         observable:create
	// ----------------------------------
	{
		displayName: 'Observable Type',
		name: 'observableType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Autonomous System', value: 'Autonomous-System' },
			{ name: 'Bank Account', value: 'Bank-Account' },
			{ name: 'Credential', value: 'Credential' },
			{ name: 'Cryptocurrency Wallet', value: 'Cryptocurrency-Wallet' },
			{ name: 'Cryptographic Key', value: 'Cryptographic-Key' },
			{ name: 'Directory', value: 'Directory' },
			{ name: 'Domain Name', value: 'Domain-Name' },
			{ name: 'Email Address', value: 'Email-Addr' },
			{ name: 'Email Message', value: 'Email-Message' },
			{ name: 'File', value: 'StixFile' },
			{ name: 'Hostname', value: 'Hostname' },
			{ name: 'IPv4 Address', value: 'IPv4-Addr' },
			{ name: 'IPv6 Address', value: 'IPv6-Addr' },
			{ name: 'MAC Address', value: 'Mac-Addr' },
			{ name: 'Media Content', value: 'Media-Content' },
			{ name: 'Mutex', value: 'Mutex' },
			{ name: 'Network Traffic', value: 'Network-Traffic' },
			{ name: 'Phone Number', value: 'Phone-Number' },
			{ name: 'Process', value: 'Process' },
			{ name: 'Software', value: 'Software' },
			{ name: 'Text', value: 'Text' },
			{ name: 'Tracking Number', value: 'Tracking-Number' },
			{ name: 'URL', value: 'Url' },
			{ name: 'User Account', value: 'User-Account' },
			{ name: 'User Agent', value: 'User-Agent' },
			{ name: 'Windows Registry Key', value: 'Windows-Registry-Key' },
			{ name: 'X509 Certificate', value: 'X509-Certificate' },
		],
		default: 'IPv4-Addr',
		description: 'The type of observable to create',
	},
	{
		displayName: 'Value',
		name: 'observableValue',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The main value of the observable (e.g. IP address, domain, URL, email)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Create Indicator',
				name: 'createIndicator',
				type: 'boolean',
				default: false,
				description: 'Whether to also create an indicator from this observable',
			},
			{
				displayName: 'Created By (Identity ID)',
				name: 'createdBy',
				type: 'string',
				default: '',
				description: 'ID of the Identity that created this observable',
			},
			{
				displayName: 'Description',
				name: 'x_opencti_description',
				type: 'string',
				default: '',
				description: 'Description of the observable',
			},
			{
				displayName: 'External References (IDs)',
				name: 'externalReferences',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of external references',
			},
			{
				displayName: 'Labels (IDs)',
				name: 'objectLabel',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of labels to apply',
			},
			{
				displayName: 'Marking Definitions (IDs)',
				name: 'objectMarking',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of marking definitions (TLP)',
			},
			{
				displayName: 'Score',
				name: 'x_opencti_score',
				type: 'number',
				default: 50,
				description: 'Score from 0 to 100',
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
			},
		],
	},

	// ----------------------------------
	//         observable:get
	// ----------------------------------
	{
		displayName: 'Observable ID',
		name: 'observableId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the observable to retrieve',
	},

	// ----------------------------------
	//         observable:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Full-text search across observable values',
	},
	{
		displayName: 'Observable Types',
		name: 'observableTypes',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Comma-separated list of types to filter (e.g. IPv4-Addr,Domain-Name)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['search'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
	},
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Filter by Value',
				name: 'filterValue',
				type: 'string',
				default: '',
				description: 'Exact match on observable_value field',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Entity Type', value: 'entity_type' },
					{ name: 'Observable Value', value: 'observable_value' },
					{ name: 'Updated At', value: 'updated_at' },
				],
				default: 'created_at',
			},
			{
				displayName: 'Order Mode',
				name: 'orderMode',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
			},
		],
	},

	// ----------------------------------
	//         observable:update
	// ----------------------------------
	{
		displayName: 'Observable ID',
		name: 'observableId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the observable to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'x_opencti_description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Score',
				name: 'x_opencti_score',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
			},
		],
	},

	// ----------------------------------
	//         observable:delete
	// ----------------------------------
	{
		displayName: 'Observable ID',
		name: 'observableId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['observable'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the observable to delete',
	},
];
