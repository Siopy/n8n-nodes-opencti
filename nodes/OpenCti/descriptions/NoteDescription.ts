import { INodeProperties } from 'n8n-workflow';

export const noteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['note'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a note (RFI)',
				action: 'Create a note',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a note',
				action: 'Delete a note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a note by ID',
				action: 'Get a note',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for notes',
				action: 'Search notes',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a note',
				action: 'Update a note',
			},
		],
		default: 'create',
	},
];

export const noteFields: INodeProperties[] = [
	// ----------------------------------
	//         note:create
	// ----------------------------------
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: { rows: 5 },
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Content of the note/RFI (minimum 2 characters)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Abstract',
				name: 'attribute_abstract',
				type: 'string',
				default: '',
				description: 'Brief abstract/summary of the note',
			},
			{
				displayName: 'Authors',
				name: 'authors',
				type: 'string',
				default: '',
				description: 'Comma-separated author names',
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
				displayName: 'Labels (IDs)',
				name: 'objectLabel',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of labels',
			},
			{
				displayName: 'Likelihood',
				name: 'likelihood',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
				description: 'Likelihood score (0-100)',
			},
			{
				displayName: 'Marking Definitions (IDs)',
				name: 'objectMarking',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of marking definitions',
			},
			{
				displayName: 'Note Types',
				name: 'note_types',
				type: 'string',
				default: '',
				description: 'Comma-separated note types (e.g. assessment, internal)',
			},
			{
				displayName: 'Objects (IDs)',
				name: 'objects',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of related STIX objects',
			},
		],
	},

	// ----------------------------------
	//         note:get
	// ----------------------------------
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         note:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['note'],
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
				resource: ['note'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         note:update
	// ----------------------------------
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
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
				resource: ['note'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Abstract',
				name: 'attribute_abstract',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
			},
			{
				displayName: 'Likelihood',
				name: 'likelihood',
				type: 'number',
				default: 50,
				typeOptions: { minValue: 0, maxValue: 100 },
			},
		],
	},

	// ----------------------------------
	//         note:delete
	// ----------------------------------
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
