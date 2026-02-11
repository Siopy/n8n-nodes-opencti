import { INodeProperties } from 'n8n-workflow';

export const opinionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['opinion'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an opinion',
				action: 'Create an opinion',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an opinion',
				action: 'Delete an opinion',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an opinion by ID',
				action: 'Get an opinion',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for opinions',
				action: 'Search opinions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an opinion',
				action: 'Update an opinion',
			},
		],
		default: 'create',
	},
];

export const opinionFields: INodeProperties[] = [
	// ----------------------------------
	//         opinion:create
	// ----------------------------------
	{
		displayName: 'Opinion',
		name: 'opinion',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opinion'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The opinion value',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opinion'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Authors',
				name: 'authors',
				type: 'string',
				default: '',
				description: 'Comma-separated author names',
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
				displayName: 'Explanation',
				name: 'explanation',
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
			{
				displayName: 'Objects (IDs)',
				name: 'objects',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of STIX objects related to this opinion',
			},
		],
	},

	// ----------------------------------
	//         opinion:get
	// ----------------------------------
	{
		displayName: 'Opinion ID',
		name: 'opinionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opinion'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         opinion:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['opinion'],
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
				resource: ['opinion'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         opinion:update
	// ----------------------------------
	{
		displayName: 'Opinion ID',
		name: 'opinionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opinion'],
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
				resource: ['opinion'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Explanation',
				name: 'explanation',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
			},
			{
				displayName: 'Opinion',
				name: 'opinion',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         opinion:delete
	// ----------------------------------
	{
		displayName: 'Opinion ID',
		name: 'opinionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['opinion'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
