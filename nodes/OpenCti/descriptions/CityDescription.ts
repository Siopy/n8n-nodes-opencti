import { INodeProperties } from 'n8n-workflow';

export const cityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['city'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a city',
				action: 'Create a city',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a city',
				action: 'Delete a city',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a city by ID',
				action: 'Get a city',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for cities',
				action: 'Search cities',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a city',
				action: 'Update a city',
			},
		],
		default: 'create',
	},
];

export const cityFields: INodeProperties[] = [
	// ----------------------------------
	//         city:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['city'],
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
				resource: ['city'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Aliases',
				name: 'x_opencti_aliases',
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
				displayName: 'Labels (IDs)',
				name: 'objectLabel',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of labels',
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Marking Definitions (IDs)',
				name: 'objectMarking',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of marking definitions',
			},
		],
	},

	// ----------------------------------
	//         city:get
	// ----------------------------------
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['city'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         city:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['city'],
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
				resource: ['city'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         city:update
	// ----------------------------------
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['city'],
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
				resource: ['city'],
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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         city:delete
	// ----------------------------------
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['city'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
