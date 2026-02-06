import {
	IExecuteFunctions,
	IDataObject,
	NodeApiError,
} from 'n8n-workflow';

/**
 * Execute a GraphQL query/mutation against the OpenCTI API.
 */
export async function openCtiApiRequest(
	this: IExecuteFunctions,
	query: string,
	variables: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('openCtiApi');
	const apiUrl = credentials.apiUrl as string;

	const options = {
		method: 'POST' as const,
		url: `${apiUrl.replace(/\/$/, '')}/graphql`,
		body: {
			query,
			variables,
		},
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${credentials.apiKey}`,
		},
		json: true,
	};

	const response = await this.helpers.httpRequest(options);

	if (response.errors && response.errors.length > 0) {
		const errorMessages = response.errors.map(
			(e: IDataObject) => (e.message as string) || 'Unknown GraphQL error',
		);
		throw new NodeApiError(this.getNode(), {} as never, {
			message: `OpenCTI API Error: ${errorMessages.join('; ')}`,
		});
	}

	return response.data as IDataObject;
}

/**
 * Build a FilterGroup for OpenCTI queries.
 */
export function buildFilterGroup(
	filters: Array<{ key: string; values: string[]; operator?: string }>,
	mode: string = 'and',
): IDataObject {
	return {
		mode,
		filters: filters.map((f) => ({
			key: [f.key],
			values: f.values,
			operator: f.operator || 'eq',
			mode: 'or',
		})),
		filterGroups: [],
	};
}

/**
 * Build a list of EditInput objects for fieldPatch mutations.
 */
const DATE_FIELDS = new Set([
	'published', 'due_date', 'first_seen', 'last_seen',
	'start_time', 'stop_time', 'valid_from', 'valid_until',
	'created', 'modified',
]);

export function buildEditInputs(
	fields: IDataObject,
): Array<{ key: string; value: unknown[] }> {
	const inputs: Array<{ key: string; value: unknown[] }> = [];
	for (const [key, value] of Object.entries(fields)) {
		if (value !== undefined && value !== null && value !== '') {
			const normalized = DATE_FIELDS.has(key) && typeof value === 'string'
				? toIsoDate(value)
				: value;
			inputs.push({
				key,
				value: Array.isArray(normalized) ? normalized : [normalized],
			});
		}
	}
	return inputs;
}

/**
 * Ensure a date string is in full ISO 8601 format with timezone.
 * n8n date pickers return "2026-02-05T00:00:00" without the Z suffix,
 * but OpenCTI's GraphQL DateTime scalar requires it.
 */
export function toIsoDate(value: string): string {
	if (!value) return value;
	const s = value.trim();
	// Already has timezone info
	if (s.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(s)) return s;
	return s + 'Z';
}

/**
 * Parse a comma-separated string into an array, trimming whitespace.
 */
export function splitCommaSeparated(value: string): string[] {
	if (!value || !value.trim()) return [];
	return value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
}
