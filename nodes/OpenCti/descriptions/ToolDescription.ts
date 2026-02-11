import { INodeProperties } from 'n8n-workflow';

export const toolOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tool'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a tool',
				action: 'Create a tool',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a tool',
				action: 'Delete a tool',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a tool by ID',
				action: 'Get a tool',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for tools',
				action: 'Search tools',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a tool',
				action: 'Update a tool',
			},
		],
		default: 'create',
	},
];

export const toolFields: INodeProperties[] = [
	// ----------------------------------
	//         tool:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tool'],
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
				resource: ['tool'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Aliases',
				name: 'aliases',
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
				displayName: 'Kill Chain Phases (IDs)',
				name: 'killChainPhases',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of kill chain phases',
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
				displayName: 'Tool Types',
				name: 'tool_types',
				type: 'string',
				default: '',
				description: 'Comma-separated tool types',
			},
			{
				displayName: 'Tool Version',
				name: 'tool_version',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         tool:get
	// ----------------------------------
	{
		displayName: 'Tool ID',
		name: 'toolId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tool'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         tool:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tool'],
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
				resource: ['tool'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         tool:update
	// ----------------------------------
	{
		displayName: 'Tool ID',
		name: 'toolId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tool'],
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
				resource: ['tool'],
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
			{
				displayName: 'Tool Version',
				name: 'tool_version',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         tool:delete
	// ----------------------------------
	{
		displayName: 'Tool ID',
		name: 'toolId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tool'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
