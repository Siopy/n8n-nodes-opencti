import { INodeProperties } from 'n8n-workflow';

export const indicatorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['indicator'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an indicator',
				action: 'Create an indicator',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an indicator',
				action: 'Delete an indicator',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an indicator by ID',
				action: 'Get an indicator',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for indicators',
				action: 'Search indicators',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an indicator',
				action: 'Update an indicator',
			},
		],
		default: 'create',
	},
];

export const indicatorFields: INodeProperties[] = [
	// ----------------------------------
	//         indicator:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['indicator'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the indicator (minimum 2 characters)',
	},
	{
		displayName: 'Pattern',
		name: 'pattern',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['indicator'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The detection pattern (e.g. [ipv4-addr:value = \'1.2.3.4\'])',
	},
	{
		displayName: 'Pattern Type',
		name: 'pattern_type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['indicator'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'EQL', value: 'eql' },
			{ name: 'PCRE', value: 'pcre' },
			{ name: 'Sigma', value: 'sigma' },
			{ name: 'Snort', value: 'snort' },
			{ name: 'SPL', value: 'spl' },
			{ name: 'STIX', value: 'stix' },
			{ name: 'YARA', value: 'yara' },
		],
		default: 'stix',
		description: 'The pattern language used',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['indicator'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Confidence',
				name: 'confidence',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
			},
			{
				displayName: 'Create Observables',
				name: 'createObservables',
				type: 'boolean',
				default: false,
				description: 'Whether to automatically create linked observables',
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
				displayName: 'Detection',
				name: 'x_opencti_detection',
				type: 'boolean',
				default: false,
				description: 'Whether this indicator is used for detection',
			},
			{
				displayName: 'Indicator Types',
				name: 'indicator_types',
				type: 'string',
				default: '',
				description: 'Comma-separated types (e.g. malicious-activity, anomalous-activity)',
			},
			{
				displayName: 'Labels (IDs)',
				name: 'objectLabel',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of labels',
			},
			{
				displayName: 'Main Observable Type',
				name: 'x_opencti_main_observable_type',
				type: 'string',
				default: '',
				description: 'Main observable type (e.g. IPv4-Addr, Domain-Name)',
			},
			{
				displayName: 'Marking Definitions (IDs)',
				name: 'objectMarking',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of marking definitions',
			},
			{
				displayName: 'Score',
				name: 'x_opencti_score',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
			},
			{
				displayName: 'Valid From',
				name: 'valid_from',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Valid Until',
				name: 'valid_until',
				type: 'dateTime',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         indicator:get
	// ----------------------------------
	{
		displayName: 'Indicator ID',
		name: 'indicatorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['indicator'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         indicator:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['indicator'],
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
				resource: ['indicator'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         indicator:update
	// ----------------------------------
	{
		displayName: 'Indicator ID',
		name: 'indicatorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['indicator'],
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
				resource: ['indicator'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Confidence',
				name: 'confidence',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
			},
			{
				displayName: 'Detection',
				name: 'x_opencti_detection',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Pattern',
				name: 'pattern',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Score',
				name: 'x_opencti_score',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
			},
			{
				displayName: 'Valid From',
				name: 'valid_from',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Valid Until',
				name: 'valid_until',
				type: 'dateTime',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         indicator:delete
	// ----------------------------------
	{
		displayName: 'Indicator ID',
		name: 'indicatorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['indicator'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
