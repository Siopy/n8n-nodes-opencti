import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OpenCtiApi implements ICredentialType {
	name = 'openCtiApi';
	displayName = 'OpenCTI API';
	documentationUrl = 'https://docs.opencti.io/latest/reference/api/';
	icon = { light: 'file:../nodes/OpenCti/opencti.svg', dark: 'file:../nodes/OpenCti/opencti.svg' } as const;

	properties: INodeProperties[] = [
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-opencti-instance.com',
			description: 'The base URL of your OpenCTI instance (without trailing slash)',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your OpenCTI API key (found in Profile > API access)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl}}',
			url: '/graphql',
			method: 'POST',
			body: {
				query: '{ about { version } }',
			},
		},
	};
}
