import { INodeProperties } from 'n8n-workflow';

export const incidentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['incident'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an incident',
				action: 'Create an incident',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an incident',
				action: 'Delete an incident',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an incident by ID',
				action: 'Get an incident',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for incidents',
				action: 'Search incidents',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an incident',
				action: 'Update an incident',
			},
		],
		default: 'create',
	},
];

export const incidentFields: INodeProperties[] = [
	// ----------------------------------
	//         incident:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the incident (minimum 2 characters)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Aliases',
				name: 'aliases',
				type: 'string',
				default: '',
				description: 'Comma-separated list of aliases',
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
				displayName: 'First Seen',
				name: 'first_seen',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Incident Type',
				name: 'incident_type',
				type: 'string',
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
				displayName: 'Objective',
				name: 'objective',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'options',
				options: [
					{ name: 'Critical', value: 'critical' },
					{ name: 'High', value: 'high' },
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
				],
				default: 'medium',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         incident:get
	// ----------------------------------
	{
		displayName: 'Incident ID',
		name: 'incidentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         incident:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['incident'],
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
				resource: ['incident'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         incident:update
	// ----------------------------------
	{
		displayName: 'Incident ID',
		name: 'incidentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['incident'],
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
				resource: ['incident'],
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
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         incident:delete
	// ----------------------------------
	{
		displayName: 'Incident ID',
		name: 'incidentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
