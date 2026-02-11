import { INodeProperties } from 'n8n-workflow';

export const sectorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sector'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a sector',
				action: 'Create a sector',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a sector',
				action: 'Delete a sector',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a sector by ID',
				action: 'Get a sector',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for sectors',
				action: 'Search sectors',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a sector',
				action: 'Update a sector',
			},
		],
		default: 'create',
	},
];

export const sectorFields: INodeProperties[] = [
	// ----------------------------------
	//         sector:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sector'],
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
				resource: ['sector'],
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
				displayName: 'Contact Information',
				name: 'contact_information',
				type: 'string',
				default: '',
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
	//         sector:get
	// ----------------------------------
	{
		displayName: 'Sector ID',
		name: 'sectorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sector'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         sector:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sector'],
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
				resource: ['sector'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         sector:update
	// ----------------------------------
	{
		displayName: 'Sector ID',
		name: 'sectorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sector'],
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
				resource: ['sector'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Contact Information',
				name: 'contact_information',
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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         sector:delete
	// ----------------------------------
	{
		displayName: 'Sector ID',
		name: 'sectorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sector'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
