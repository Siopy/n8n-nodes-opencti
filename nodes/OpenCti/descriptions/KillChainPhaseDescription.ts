import { INodeProperties } from 'n8n-workflow';

export const killChainPhaseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a kill chain phase',
				action: 'Create a kill chain phase',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a kill chain phase',
				action: 'Delete a kill chain phase',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a kill chain phase by ID',
				action: 'Get a kill chain phase',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for kill chain phases',
				action: 'Search kill chain phases',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a kill chain phase',
				action: 'Update a kill chain phase',
			},
		],
		default: 'create',
	},
];

export const killChainPhaseFields: INodeProperties[] = [
	// ----------------------------------
	//         killChainPhase:create
	// ----------------------------------
	{
		displayName: 'Kill Chain Name',
		name: 'kill_chain_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the kill chain (e.g. lockheed-martin-cyber-kill-chain)',
	},
	{
		displayName: 'Phase Name',
		name: 'phase_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the phase in the kill chain',
	},
	{
		displayName: 'Order',
		name: 'x_opencti_order',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The order of the phase in the kill chain',
	},

	// ----------------------------------
	//         killChainPhase:get
	// ----------------------------------
	{
		displayName: 'Kill Chain Phase ID',
		name: 'killChainPhaseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         killChainPhase:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
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
				resource: ['killChainPhase'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         killChainPhase:update
	// ----------------------------------
	{
		displayName: 'Kill Chain Phase ID',
		name: 'killChainPhaseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
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
				resource: ['killChainPhase'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Kill Chain Name',
				name: 'kill_chain_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Order',
				name: 'x_opencti_order',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Phase Name',
				name: 'phase_name',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         killChainPhase:delete
	// ----------------------------------
	{
		displayName: 'Kill Chain Phase ID',
		name: 'killChainPhaseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['killChainPhase'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
