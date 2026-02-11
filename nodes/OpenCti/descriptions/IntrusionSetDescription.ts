import { INodeProperties } from 'n8n-workflow';

export const intrusionSetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['intrusionSet'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an intrusion set',
				action: 'Create an intrusion set',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an intrusion set',
				action: 'Delete an intrusion set',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an intrusion set by ID',
				action: 'Get an intrusion set',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for intrusion sets',
				action: 'Search intrusion sets',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an intrusion set',
				action: 'Update an intrusion set',
			},
		],
		default: 'create',
	},
];

export const intrusionSetFields: INodeProperties[] = [
	// ----------------------------------
	//         intrusionSet:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['intrusionSet'],
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
				resource: ['intrusionSet'],
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
				displayName: 'Goals',
				name: 'goals',
				type: 'string',
				default: '',
				description: 'Comma-separated goals',
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
				displayName: 'Primary Motivation',
				name: 'primary_motivation',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Resource Level',
				name: 'resource_level',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Secondary Motivations',
				name: 'secondary_motivations',
				type: 'string',
				default: '',
				description: 'Comma-separated secondary motivations',
			},
		],
	},

	// ----------------------------------
	//         intrusionSet:get
	// ----------------------------------
	{
		displayName: 'Intrusion Set ID',
		name: 'intrusionSetId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['intrusionSet'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         intrusionSet:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['intrusionSet'],
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
				resource: ['intrusionSet'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         intrusionSet:update
	// ----------------------------------
	{
		displayName: 'Intrusion Set ID',
		name: 'intrusionSetId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['intrusionSet'],
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
				resource: ['intrusionSet'],
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
				displayName: 'Primary Motivation',
				name: 'primary_motivation',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         intrusionSet:delete
	// ----------------------------------
	{
		displayName: 'Intrusion Set ID',
		name: 'intrusionSetId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['intrusionSet'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
