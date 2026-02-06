import { INodeProperties } from 'n8n-workflow';

export const relationshipOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['relationship'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a relationship between two entities',
				action: 'Create a relationship',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a relationship',
				action: 'Delete a relationship',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a relationship by ID',
				action: 'Get a relationship',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for relationships',
				action: 'Search relationships',
			},
		],
		default: 'create',
	},
];

export const relationshipFields: INodeProperties[] = [
	// ----------------------------------
	//         relationship:create
	// ----------------------------------
	{
		displayName: 'Relationship Type',
		name: 'relationshipType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Attributed To', value: 'attributed-to' },
			{ name: 'Based On', value: 'based-on' },
			{ name: 'Communicates With', value: 'communicates-with' },
			{ name: 'Compromises', value: 'compromises' },
			{ name: 'Consists Of', value: 'consists-of' },
			{ name: 'Controls', value: 'controls' },
			{ name: 'Delivers', value: 'delivers' },
			{ name: 'Derived From', value: 'derived-from' },
			{ name: 'Drops', value: 'drops' },
			{ name: 'Exfiltrates Over', value: 'exfiltrates-over' },
			{ name: 'Exploits', value: 'exploits' },
			{ name: 'Has', value: 'has' },
			{ name: 'Hosts', value: 'hosts' },
			{ name: 'Impersonates', value: 'impersonates' },
			{ name: 'Indicates', value: 'indicates' },
			{ name: 'Located At', value: 'located-at' },
			{ name: 'Mitigates', value: 'mitigates' },
			{ name: 'Object (Add to Container)', value: 'object' },
			{ name: 'Originates From', value: 'originates-from' },
			{ name: 'Part Of', value: 'part-of' },
			{ name: 'Related To', value: 'related-to' },
			{ name: 'Remediates', value: 'remediates' },
			{ name: 'Targets', value: 'targets' },
			{ name: 'Uses', value: 'uses' },
			{ name: 'Variant Of', value: 'variant-of' },
		],
		default: 'related-to',
		description: 'Type of STIX relationship',
	},
	{
		displayName: 'From Entity ID',
		name: 'fromId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Source entity ID',
	},
	{
		displayName: 'To Entity ID',
		name: 'toId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Target entity ID',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['relationship'],
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
				displayName: 'Start Time',
				name: 'start_time',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Stop Time',
				name: 'stop_time',
				type: 'dateTime',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         relationship:get
	// ----------------------------------
	{
		displayName: 'Relationship ID',
		name: 'relationshipId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         relationship:search
	// ----------------------------------
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Search Criteria',
		default: {},
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Entity ID (From or To)',
				name: 'fromOrToId',
				type: 'string',
				default: '',
				description: 'Filter by entity appearing on either side of the relationship',
			},
			{
				displayName: 'From Entity ID',
				name: 'fromId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Relationship Type',
				name: 'relationship_type',
				type: 'string',
				default: '',
				description: 'Comma-separated relationship types (e.g. uses,targets)',
			},
			{
				displayName: 'Search Term',
				name: 'search',
				type: 'string',
				default: '',
			},
			{
				displayName: 'To Entity ID',
				name: 'toId',
				type: 'string',
				default: '',
			},
		],
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         relationship:delete
	// ----------------------------------
	{
		displayName: 'Relationship ID',
		name: 'relationshipId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
