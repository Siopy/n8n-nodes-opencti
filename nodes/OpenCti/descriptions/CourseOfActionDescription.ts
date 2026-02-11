import { INodeProperties } from 'n8n-workflow';

export const courseOfActionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['courseOfAction'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a course of action',
				action: 'Create a course of action',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a course of action',
				action: 'Delete a course of action',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a course of action by ID',
				action: 'Get a course of action',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for courses of action',
				action: 'Search courses of action',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a course of action',
				action: 'Update a course of action',
			},
		],
		default: 'create',
	},
];

export const courseOfActionFields: INodeProperties[] = [
	// ----------------------------------
	//         courseOfAction:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseOfAction'],
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
				resource: ['courseOfAction'],
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
				displayName: 'MITRE ATT&CK ID',
				name: 'x_mitre_id',
				type: 'string',
				default: '',
				description: 'MITRE ATT&CK mitigation ID (e.g. M1036)',
			},
		],
	},

	// ----------------------------------
	//         courseOfAction:get
	// ----------------------------------
	{
		displayName: 'Course of Action ID',
		name: 'courseOfActionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseOfAction'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         courseOfAction:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['courseOfAction'],
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
				resource: ['courseOfAction'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         courseOfAction:update
	// ----------------------------------
	{
		displayName: 'Course of Action ID',
		name: 'courseOfActionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseOfAction'],
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
				resource: ['courseOfAction'],
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
		],
	},

	// ----------------------------------
	//         courseOfAction:delete
	// ----------------------------------
	{
		displayName: 'Course of Action ID',
		name: 'courseOfActionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseOfAction'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
