import { INodeProperties } from 'n8n-workflow';

export const reportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['report'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a report',
				action: 'Create a report',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a report',
				action: 'Delete a report',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a report by ID',
				action: 'Get a report',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for reports',
				action: 'Search reports',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a report',
				action: 'Update a report',
			},
		],
		default: 'create',
	},
];

export const reportFields: INodeProperties[] = [
	// ----------------------------------
	//         report:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the report (minimum 2 characters)',
	},
	{
		displayName: 'Published Date',
		name: 'published',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Publication date of the report',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['report'],
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
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				description: 'Full content/body of the report',
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
				displayName: 'Objects (IDs)',
				name: 'objects',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of STIX objects contained in this report',
			},
			{
				displayName: 'Reliability',
				name: 'x_opencti_reliability',
				type: 'options',
				options: [
					{ name: 'A - Completely Reliable', value: 'A - Completely reliable' },
					{ name: 'B - Usually Reliable', value: 'B - Usually reliable' },
					{ name: 'C - Fairly Reliable', value: 'C - Fairly reliable' },
					{ name: 'D - Not Usually Reliable', value: 'D - Not usually reliable' },
					{ name: 'E - Unreliable', value: 'E - Unreliable' },
					{ name: 'F - Reliability Cannot Be Judged', value: 'F - Reliability cannot be judged' },
				],
				default: 'A - Completely reliable',
			},
			{
				displayName: 'Report Types',
				name: 'report_types',
				type: 'string',
				default: '',
				description: 'Comma-separated report types (e.g. threat-report, internal-report)',
			},
		],
	},

	// ----------------------------------
	//         report:get
	// ----------------------------------
	{
		displayName: 'Report ID',
		name: 'reportId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         report:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Full-text search in report names and descriptions',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'created_at' },
					{ name: 'Name', value: 'name' },
					{ name: 'Published', value: 'published' },
					{ name: 'Updated At', value: 'updated_at' },
				],
				default: 'created_at',
			},
			{
				displayName: 'Order Mode',
				name: 'orderMode',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
			},
			{
				displayName: 'Report Type',
				name: 'reportType',
				type: 'string',
				default: '',
				description: 'Filter by report type',
			},
		],
	},

	// ----------------------------------
	//         report:update
	// ----------------------------------
	{
		displayName: 'Report ID',
		name: 'reportId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
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
				resource: ['report'],
				operation: ['update'],
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
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: { rows: 5 },
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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Published Date',
				name: 'published',
				type: 'dateTime',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         report:delete
	// ----------------------------------
	{
		displayName: 'Report ID',
		name: 'reportId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
