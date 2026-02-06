import { INodeProperties } from 'n8n-workflow';

export const labelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['label'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a label',
				action: 'Create a label',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a label',
				action: 'Delete a label',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a label by ID',
				action: 'Get a label',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for labels',
				action: 'Search labels',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a label',
				action: 'Update a label',
			},
		],
		default: 'create',
	},
];

export const labelFields: INodeProperties[] = [
	// ----------------------------------
	//         label:create
	// ----------------------------------
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The label text value',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#ffffff',
				description: 'Hex color for the label',
			},
		],
	},

	// ----------------------------------
	//         label:get
	// ----------------------------------
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         label:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['label'],
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
				resource: ['label'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         label:update
	// ----------------------------------
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
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
				resource: ['label'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#ffffff',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         label:delete
	// ----------------------------------
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
