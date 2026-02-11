import { INodeProperties } from 'n8n-workflow';

export const markingDefinitionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a marking definition',
				action: 'Create a marking definition',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a marking definition',
				action: 'Delete a marking definition',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a marking definition by ID',
				action: 'Get a marking definition',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for marking definitions',
				action: 'Search marking definitions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a marking definition',
				action: 'Update a marking definition',
			},
		],
		default: 'create',
	},
];

export const markingDefinitionFields: INodeProperties[] = [
	// ----------------------------------
	//         markingDefinition:create
	// ----------------------------------
	{
		displayName: 'Definition Type',
		name: 'definition_type',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The type of the marking definition (e.g. TLP, PAP)',
	},
	{
		displayName: 'Definition',
		name: 'definition',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The definition value (e.g. TLP:WHITE)',
	},
	{
		displayName: 'Order',
		name: 'x_opencti_order',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The order of the marking definition',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'x_opencti_color',
				type: 'color',
				default: '',
				description: 'The color associated with the marking definition',
			},
		],
	},

	// ----------------------------------
	//         markingDefinition:get
	// ----------------------------------
	{
		displayName: 'Marking Definition ID',
		name: 'markingDefinitionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         markingDefinition:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
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
				resource: ['markingDefinition'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         markingDefinition:update
	// ----------------------------------
	{
		displayName: 'Marking Definition ID',
		name: 'markingDefinitionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
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
				resource: ['markingDefinition'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'x_opencti_color',
				type: 'color',
				default: '',
			},
			{
				displayName: 'Definition',
				name: 'definition',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Order',
				name: 'x_opencti_order',
				type: 'number',
				default: 0,
			},
		],
	},

	// ----------------------------------
	//         markingDefinition:delete
	// ----------------------------------
	{
		displayName: 'Marking Definition ID',
		name: 'markingDefinitionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['markingDefinition'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
