import { INodeProperties } from 'n8n-workflow';

export const positionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['position'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a position',
				action: 'Create a position',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a position',
				action: 'Delete a position',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a position by ID',
				action: 'Get a position',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for positions',
				action: 'Search positions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a position',
				action: 'Update a position',
			},
		],
		default: 'create',
	},
];

export const positionFields: INodeProperties[] = [
	// ----------------------------------
	//         position:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['position'],
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
				resource: ['position'],
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
	//         position:get
	// ----------------------------------
	{
		displayName: 'Position ID',
		name: 'positionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['position'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         position:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['position'],
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
				resource: ['position'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         position:update
	// ----------------------------------
	{
		displayName: 'Position ID',
		name: 'positionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['position'],
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
				resource: ['position'],
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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         position:delete
	// ----------------------------------
	{
		displayName: 'Position ID',
		name: 'positionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['position'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
