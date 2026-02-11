import { INodeProperties } from 'n8n-workflow';

export const individualOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['individual'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an individual',
				action: 'Create an individual',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an individual',
				action: 'Delete an individual',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an individual by ID',
				action: 'Get an individual',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for individuals',
				action: 'Search individuals',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an individual',
				action: 'Update an individual',
			},
		],
		default: 'create',
	},
];

export const individualFields: INodeProperties[] = [
	// ----------------------------------
	//         individual:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['individual'],
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
				resource: ['individual'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Aliases',
				name: 'x_opencti_aliases',
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
				displayName: 'Contact Information',
				name: 'contact_information',
				type: 'string',
				default: '',
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
				displayName: 'First Name',
				name: 'x_opencti_firstname',
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
				displayName: 'Last Name',
				name: 'x_opencti_lastname',
				type: 'string',
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
				displayName: 'Reliability',
				name: 'x_opencti_reliability',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         individual:get
	// ----------------------------------
	{
		displayName: 'Individual ID',
		name: 'individualId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['individual'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         individual:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['individual'],
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
				resource: ['individual'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         individual:update
	// ----------------------------------
	{
		displayName: 'Individual ID',
		name: 'individualId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['individual'],
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
				resource: ['individual'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Contact Information',
				name: 'contact_information',
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
				displayName: 'First Name',
				name: 'x_opencti_firstname',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'x_opencti_lastname',
				type: 'string',
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
	//         individual:delete
	// ----------------------------------
	{
		displayName: 'Individual ID',
		name: 'individualId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['individual'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
