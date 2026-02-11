import { INodeProperties } from 'n8n-workflow';

export const observedDataOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['observedData'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an observed data',
				action: 'Create an observed data',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an observed data',
				action: 'Delete an observed data',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an observed data by ID',
				action: 'Get an observed data',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for observed data',
				action: 'Search observed data',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an observed data',
				action: 'Update an observed data',
			},
		],
		default: 'create',
	},
];

export const observedDataFields: INodeProperties[] = [
	// ----------------------------------
	//         observedData:create
	// ----------------------------------
	{
		displayName: 'First Observed',
		name: 'first_observed',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['observedData'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The beginning of the time window during which the data was observed',
	},
	{
		displayName: 'Last Observed',
		name: 'last_observed',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['observedData'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The end of the time window during which the data was observed',
	},
	{
		displayName: 'Number Observed',
		name: 'number_observed',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['observedData'],
				operation: ['create'],
			},
		},
		default: 1,
		description: 'The number of times the data was observed',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['observedData'],
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
				displayName: 'Created By (Identity ID)',
				name: 'createdBy',
				type: 'string',
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
				displayName: 'Objects (IDs)',
				name: 'objects',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of STIX objects contained in this observed data',
			},
		],
	},

	// ----------------------------------
	//         observedData:get
	// ----------------------------------
	{
		displayName: 'Observed Data ID',
		name: 'observedDataId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['observedData'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         observedData:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['observedData'],
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
				resource: ['observedData'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         observedData:update
	// ----------------------------------
	{
		displayName: 'Observed Data ID',
		name: 'observedDataId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['observedData'],
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
				resource: ['observedData'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'First Observed',
				name: 'first_observed',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Last Observed',
				name: 'last_observed',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Number Observed',
				name: 'number_observed',
				type: 'number',
				default: 1,
			},
		],
	},

	// ----------------------------------
	//         observedData:delete
	// ----------------------------------
	{
		displayName: 'Observed Data ID',
		name: 'observedDataId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['observedData'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
