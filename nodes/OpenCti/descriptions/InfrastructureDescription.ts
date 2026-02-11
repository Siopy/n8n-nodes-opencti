import { INodeProperties } from 'n8n-workflow';

export const infrastructureOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['infrastructure'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an infrastructure',
				action: 'Create an infrastructure',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an infrastructure',
				action: 'Delete an infrastructure',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an infrastructure by ID',
				action: 'Get an infrastructure',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for infrastructures',
				action: 'Search infrastructures',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an infrastructure',
				action: 'Update an infrastructure',
			},
		],
		default: 'create',
	},
];

export const infrastructureFields: INodeProperties[] = [
	// ----------------------------------
	//         infrastructure:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['infrastructure'],
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
				resource: ['infrastructure'],
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
				displayName: 'First Seen',
				name: 'first_seen',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Infrastructure Types',
				name: 'infrastructure_types',
				type: 'string',
				default: '',
				description: 'Comma-separated infrastructure types',
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
				displayName: 'Last Seen',
				name: 'last_seen',
				type: 'dateTime',
				default: '',
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
	//         infrastructure:get
	// ----------------------------------
	{
		displayName: 'Infrastructure ID',
		name: 'infrastructureId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['infrastructure'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         infrastructure:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['infrastructure'],
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
				resource: ['infrastructure'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         infrastructure:update
	// ----------------------------------
	{
		displayName: 'Infrastructure ID',
		name: 'infrastructureId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['infrastructure'],
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
				resource: ['infrastructure'],
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
				displayName: 'First Seen',
				name: 'first_seen',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Last Seen',
				name: 'last_seen',
				type: 'dateTime',
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
	//         infrastructure:delete
	// ----------------------------------
	{
		displayName: 'Infrastructure ID',
		name: 'infrastructureId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['infrastructure'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
