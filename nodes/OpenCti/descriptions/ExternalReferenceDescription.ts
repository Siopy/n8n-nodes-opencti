import { INodeProperties } from 'n8n-workflow';

export const externalReferenceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['externalReference'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an external reference',
				action: 'Create an external reference',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an external reference',
				action: 'Delete an external reference',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an external reference by ID',
				action: 'Get an external reference',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for external references',
				action: 'Search external references',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an external reference',
				action: 'Update an external reference',
			},
		],
		default: 'create',
	},
];

export const externalReferenceFields: INodeProperties[] = [
	// ----------------------------------
	//         externalReference:create
	// ----------------------------------
	{
		displayName: 'Source Name',
		name: 'source_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalReference'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the external reference source',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['externalReference'],
				operation: ['create'],
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
				displayName: 'External ID',
				name: 'external_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Hash',
				name: 'hash',
				type: 'string',
				default: '',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         externalReference:get
	// ----------------------------------
	{
		displayName: 'External Reference ID',
		name: 'externalReferenceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalReference'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         externalReference:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['externalReference'],
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
				resource: ['externalReference'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         externalReference:update
	// ----------------------------------
	{
		displayName: 'External Reference ID',
		name: 'externalReferenceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalReference'],
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
				resource: ['externalReference'],
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
				displayName: 'External ID',
				name: 'external_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source Name',
				name: 'source_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         externalReference:delete
	// ----------------------------------
	{
		displayName: 'External Reference ID',
		name: 'externalReferenceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalReference'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
