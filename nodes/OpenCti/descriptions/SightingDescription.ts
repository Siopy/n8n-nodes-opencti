import { INodeProperties } from 'n8n-workflow';

export const sightingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sighting'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a sighting relationship',
				action: 'Create a sighting',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a sighting',
				action: 'Delete a sighting',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a sighting by ID',
				action: 'Get a sighting',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for sightings',
				action: 'Search sightings',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a sighting',
				action: 'Update a sighting',
			},
		],
		default: 'create',
	},
];

export const sightingFields: INodeProperties[] = [
	// ----------------------------------
	//         sighting:create
	// ----------------------------------
	{
		displayName: 'From Entity ID',
		name: 'fromId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sighting'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Source entity ID (typically the indicator/observable that was sighted)',
	},
	{
		displayName: 'To Entity ID',
		name: 'toId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sighting'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Target entity ID (where it was sighted, typically an organization/system)',
	},
	{
		displayName: 'Attribute Count',
		name: 'attribute_count',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['sighting'],
				operation: ['create'],
			},
		},
		default: 1,
		description: 'Number of times the entity was sighted',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sighting'],
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
				displayName: 'First Seen',
				name: 'first_seen',
				type: 'dateTime',
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
			{
				displayName: 'Negative Sighting',
				name: 'x_opencti_negative',
				type: 'boolean',
				default: false,
				description: 'Whether this is a negative/false positive sighting',
			},
		],
	},

	// ----------------------------------
	//         sighting:get
	// ----------------------------------
	{
		displayName: 'Sighting ID',
		name: 'sightingId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sighting'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         sighting:search
	// ----------------------------------
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Search Criteria',
		default: {},
		displayOptions: {
			show: {
				resource: ['sighting'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Entity ID (From or To)',
				name: 'fromOrToId',
				type: 'string',
				default: '',
				description: 'Filter by entity appearing on either side of the sighting',
			},
			{
				displayName: 'From Entity ID',
				name: 'fromId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'From Types',
				name: 'fromTypes',
				type: 'string',
				default: '',
				description: 'Comma-separated source entity types',
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
			{
				displayName: 'To Types',
				name: 'toTypes',
				type: 'string',
				default: '',
				description: 'Comma-separated target entity types',
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
				resource: ['sighting'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         sighting:update
	// ----------------------------------
	{
		displayName: 'Sighting ID',
		name: 'sightingId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sighting'],
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
				resource: ['sighting'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Attribute Count',
				name: 'attribute_count',
				type: 'number',
				default: 1,
			},
			{
				displayName: 'Confidence',
				name: 'confidence',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
			},
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
				displayName: 'Negative Sighting',
				name: 'x_opencti_negative',
				type: 'boolean',
				default: false,
				description: 'Whether this is a negative/false positive sighting',
			},
		],
	},

	// ----------------------------------
	//         sighting:delete
	// ----------------------------------
	{
		displayName: 'Sighting ID',
		name: 'sightingId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sighting'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
