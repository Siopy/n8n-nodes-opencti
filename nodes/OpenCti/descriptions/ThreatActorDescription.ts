import { INodeProperties } from 'n8n-workflow';

export const threatActorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['threatActor'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a threat actor',
				action: 'Create a threat actor',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a threat actor',
				action: 'Delete a threat actor',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a threat actor by ID',
				action: 'Get a threat actor',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for threat actors',
				action: 'Search threat actors',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a threat actor',
				action: 'Update a threat actor',
			},
		],
		default: 'create',
	},
];

export const threatActorFields: INodeProperties[] = [
	// ----------------------------------
	//         threatActor:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['threatActor'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the threat actor (minimum 2 characters)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['threatActor'],
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
				displayName: 'Goals',
				name: 'goals',
				type: 'string',
				default: '',
				description: 'Comma-separated list of goals',
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
				type: 'options',
				options: [
					{ name: 'Accidental', value: 'accidental' },
					{ name: 'Coercion', value: 'coercion' },
					{ name: 'Dominance', value: 'dominance' },
					{ name: 'Ideology', value: 'ideology' },
					{ name: 'Notoriety', value: 'notoriety' },
					{ name: 'Organizational Gain', value: 'organizational-gain' },
					{ name: 'Personal Gain', value: 'personal-gain' },
					{ name: 'Personal Satisfaction', value: 'personal-satisfaction' },
					{ name: 'Revenge', value: 'revenge' },
					{ name: 'Unpredictable', value: 'unpredictable' },
				],
				default: 'personal-gain',
			},
			{
				displayName: 'Resource Level',
				name: 'resource_level',
				type: 'options',
				options: [
					{ name: 'Club', value: 'club' },
					{ name: 'Contest', value: 'contest' },
					{ name: 'Government', value: 'government' },
					{ name: 'Individual', value: 'individual' },
					{ name: 'Organization', value: 'organization' },
					{ name: 'Team', value: 'team' },
				],
				default: 'organization',
			},
			{
				displayName: 'Roles',
				name: 'roles',
				type: 'string',
				default: '',
				description: 'Comma-separated roles (e.g. agent, director, sponsor)',
			},
			{
				displayName: 'Sophistication',
				name: 'sophistication',
				type: 'options',
				options: [
					{ name: 'Advanced', value: 'advanced' },
					{ name: 'Expert', value: 'expert' },
					{ name: 'Innovative', value: 'innovative' },
					{ name: 'Intermediate', value: 'intermediate' },
					{ name: 'Minimal', value: 'minimal' },
					{ name: 'None', value: 'none' },
					{ name: 'Strategic', value: 'strategic' },
				],
				default: 'intermediate',
			},
			{
				displayName: 'Threat Actor Types',
				name: 'threat_actor_types',
				type: 'string',
				default: '',
				description: 'Comma-separated types (e.g. nation-state, criminal, hacktivist)',
			},
		],
	},

	// ----------------------------------
	//         threatActor:get
	// ----------------------------------
	{
		displayName: 'Threat Actor ID',
		name: 'threatActorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['threatActor'],
				operation: ['get'],
			},
		},
		default: '',
	},

	// ----------------------------------
	//         threatActor:search
	// ----------------------------------
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['threatActor'],
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
				resource: ['threatActor'],
				operation: ['search'],
			},
		},
		default: 50,
		typeOptions: { minValue: 1, maxValue: 500 },
	},

	// ----------------------------------
	//         threatActor:update
	// ----------------------------------
	{
		displayName: 'Threat Actor ID',
		name: 'threatActorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['threatActor'],
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
				resource: ['threatActor'],
				operation: ['update'],
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
			{
				displayName: 'Sophistication',
				name: 'sophistication',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         threatActor:delete
	// ----------------------------------
	{
		displayName: 'Threat Actor ID',
		name: 'threatActorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['threatActor'],
				operation: ['delete'],
			},
		},
		default: '',
	},
];
