import { INodeProperties } from 'n8n-workflow';

export const countryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['country'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a country',
				action: 'Create a country',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a country',
				action: 'Delete a country',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a country by ID',
				action: 'Get a country',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for countries',
				action: 'Search countries',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a country',
				action: 'Update a country',
			},
		],
		default: 'create',
	},
];

export const countryFields: INodeProperties[] = [
	// ----------------------------------
	//         country:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['country'],
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
				resource: ['country'],
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
	//         country:get
	// ----------------------------------
	{
		displayName: 'Country ID',
		name: 'countryId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['country'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         country:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['country'],
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
				resource: ['country'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         country:update
	// ----------------------------------
	{
		displayName: 'Country ID',
		name: 'countryId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['country'],
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
				resource: ['country'],
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
	//         country:delete
	// ----------------------------------
	{
		displayName: 'Country ID',
		name: 'countryId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['country'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
