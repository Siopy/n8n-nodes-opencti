import { INodeProperties } from 'n8n-workflow';

export const regionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['region'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a region',
				action: 'Create a region',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a region',
				action: 'Delete a region',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a region by ID',
				action: 'Get a region',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for regions',
				action: 'Search regions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a region',
				action: 'Update a region',
			},
		],
		default: 'create',
	},
];

export const regionFields: INodeProperties[] = [
	// ----------------------------------
	//         region:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['region'],
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
				resource: ['region'],
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
				displayName: 'Marking Definitions (IDs)',
				name: 'objectMarking',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of marking definitions',
			},
		],
	},

	// ----------------------------------
	//         region:get
	// ----------------------------------
	{
		displayName: 'Region ID',
		name: 'regionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['region'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         region:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['region'],
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
				resource: ['region'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         region:update
	// ----------------------------------
	{
		displayName: 'Region ID',
		name: 'regionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['region'],
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
				resource: ['region'],
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
	//         region:delete
	// ----------------------------------
	{
		displayName: 'Region ID',
		name: 'regionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['region'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
