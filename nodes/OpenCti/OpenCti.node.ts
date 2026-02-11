import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	openCtiApiRequest,
	buildEditInputs,
	splitCommaSeparated,
	buildFilterGroup,
	toIsoDate,
} from './GenericFunctions';

import {
	observableOperations, observableFields,
	reportOperations, reportFields,
	noteOperations, noteFields,
	taskOperations, taskFields,
	threatActorOperations, threatActorFields,
	labelOperations, labelFields,
	relationshipOperations, relationshipFields,
	indicatorOperations, indicatorFields,
	incidentOperations, incidentFields,
	malwareOperations, malwareFields,
	vulnerabilityOperations, vulnerabilityFields,
	sightingOperations, sightingFields,
	attackPatternOperations, attackPatternFields,
	campaignOperations, campaignFields,
	intrusionSetOperations, intrusionSetFields,
	toolOperations, toolFields,
	infrastructureOperations, infrastructureFields,
	courseOfActionOperations, courseOfActionFields,
	sectorOperations, sectorFields,
	countryOperations, countryFields,
	cityOperations, cityFields,
	regionOperations, regionFields,
	positionOperations, positionFields,
	individualOperations, individualFields,
	systemOperations, systemFields,
	observedDataOperations, observedDataFields,
	opinionOperations, opinionFields,
	externalReferenceOperations, externalReferenceFields,
	markingDefinitionOperations, markingDefinitionFields,
	killChainPhaseOperations, killChainPhaseFields,
} from './descriptions';

export class OpenCti implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OpenCTI',
		name: 'openCti',
		icon: 'file:opencti.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the OpenCTI Cyber Threat Intelligence platform',
		defaults: {
			name: 'OpenCTI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'openCtiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Attack Pattern', value: 'attackPattern' },
					{ name: 'Campaign', value: 'campaign' },
					{ name: 'City', value: 'city' },
					{ name: 'Country', value: 'country' },
					{ name: 'Course of Action', value: 'courseOfAction' },
					{ name: 'External Reference', value: 'externalReference' },
					{ name: 'Incident', value: 'incident' },
					{ name: 'Indicator', value: 'indicator' },
					{ name: 'Individual', value: 'individual' },
					{ name: 'Infrastructure', value: 'infrastructure' },
					{ name: 'Intrusion Set', value: 'intrusionSet' },
					{ name: 'Kill Chain Phase', value: 'killChainPhase' },
					{ name: 'Label', value: 'label' },
					{ name: 'Malware', value: 'malware' },
					{ name: 'Marking Definition', value: 'markingDefinition' },
					{ name: 'Note (RFI)', value: 'note' },
					{ name: 'Observable', value: 'observable' },
					{ name: 'Observed Data', value: 'observedData' },
					{ name: 'Opinion', value: 'opinion' },
					{ name: 'Position', value: 'position' },
					{ name: 'Region', value: 'region' },
					{ name: 'Relationship', value: 'relationship' },
					{ name: 'Report', value: 'report' },
					{ name: 'Sector', value: 'sector' },
					{ name: 'Sighting', value: 'sighting' },
					{ name: 'System', value: 'system' },
					{ name: 'Task', value: 'task' },
					{ name: 'Threat Actor', value: 'threatActor' },
					{ name: 'Tool', value: 'tool' },
					{ name: 'Vulnerability', value: 'vulnerability' },
				],
				default: 'observable',
			},
			// Operations
			...observableOperations,
			...reportOperations,
			...noteOperations,
			...taskOperations,
			...threatActorOperations,
			...labelOperations,
			...relationshipOperations,
			...indicatorOperations,
			...incidentOperations,
			...malwareOperations,
			...vulnerabilityOperations,
			...sightingOperations,
			...attackPatternOperations,
			...campaignOperations,
			...intrusionSetOperations,
			...toolOperations,
			...infrastructureOperations,
			...courseOfActionOperations,
			...sectorOperations,
			...countryOperations,
			...cityOperations,
			...regionOperations,
			...positionOperations,
			...individualOperations,
			...systemOperations,
			...observedDataOperations,
			...opinionOperations,
			...externalReferenceOperations,
			...markingDefinitionOperations,
			...killChainPhaseOperations,
			// Fields
			...observableFields,
			...reportFields,
			...noteFields,
			...taskFields,
			...threatActorFields,
			...labelFields,
			...relationshipFields,
			...indicatorFields,
			...incidentFields,
			...malwareFields,
			...vulnerabilityFields,
			...sightingFields,
			...attackPatternFields,
			...campaignFields,
			...intrusionSetFields,
			...toolFields,
			...infrastructureFields,
			...courseOfActionFields,
			...sectorFields,
			...countryFields,
			...cityFields,
			...regionFields,
			...positionFields,
			...individualFields,
			...systemFields,
			...observedDataFields,
			...opinionFields,
			...externalReferenceFields,
			...markingDefinitionFields,
			...killChainPhaseFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject = {};

				// ============================================================
				//                      OBSERVABLE
				// ============================================================
				if (resource === 'observable') {
					if (operation === 'create') {
						responseData = await executeObservableCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeObservableGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeObservableSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeObservableUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeObservableDelete.call(this, i);
					}
				}

				// ============================================================
				//                      REPORT
				// ============================================================
				else if (resource === 'report') {
					if (operation === 'create') {
						responseData = await executeReportCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeReportGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeReportSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeReportUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeReportDelete.call(this, i);
					}
				}

				// ============================================================
				//                      NOTE (RFI)
				// ============================================================
				else if (resource === 'note') {
					if (operation === 'create') {
						responseData = await executeNoteCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeNoteGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeNoteSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeNoteUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeNoteDelete.call(this, i);
					}
				}

				// ============================================================
				//                      TASK
				// ============================================================
				else if (resource === 'task') {
					if (operation === 'create') {
						responseData = await executeTaskCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeTaskGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeTaskSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeTaskUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeTaskDelete.call(this, i);
					}
				}

				// ============================================================
				//                      THREAT ACTOR
				// ============================================================
				else if (resource === 'threatActor') {
					if (operation === 'create') {
						responseData = await executeThreatActorCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeThreatActorGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeThreatActorSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeThreatActorUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeThreatActorDelete.call(this, i);
					}
				}

				// ============================================================
				//                      LABEL
				// ============================================================
				else if (resource === 'label') {
					if (operation === 'create') {
						responseData = await executeLabelCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeLabelGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeLabelSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeLabelUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeLabelDelete.call(this, i);
					}
				}

				// ============================================================
				//                      RELATIONSHIP
				// ============================================================
				else if (resource === 'relationship') {
					if (operation === 'create') {
						responseData = await executeRelationshipCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeRelationshipGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeRelationshipSearch.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeRelationshipDelete.call(this, i);
					}
				}

				// ============================================================
				//                      SIGHTING
				// ============================================================
				else if (resource === 'sighting') {
					if (operation === 'create') {
						responseData = await executeSightingCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeSightingGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeSightingSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeSightingUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeSightingDelete.call(this, i);
					}
				}

				// ============================================================
				//                      INDICATOR
				// ============================================================
				else if (resource === 'indicator') {
					if (operation === 'create') {
						responseData = await executeIndicatorCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeIndicatorGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeIndicatorSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeIndicatorUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeIndicatorDelete.call(this, i);
					}
				}

				// ============================================================
				//                      INCIDENT
				// ============================================================
				else if (resource === 'incident') {
					if (operation === 'create') {
						responseData = await executeIncidentCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeIncidentGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeIncidentSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeIncidentUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeIncidentDelete.call(this, i);
					}
				}

				// ============================================================
				//                      MALWARE
				// ============================================================
				else if (resource === 'malware') {
					if (operation === 'create') {
						responseData = await executeMalwareCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeMalwareGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeMalwareSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeMalwareUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeMalwareDelete.call(this, i);
					}
				}

				// ============================================================
				//                      VULNERABILITY
				// ============================================================
				else if (resource === 'vulnerability') {
					if (operation === 'create') {
						responseData = await executeVulnerabilityCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeVulnerabilityGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeVulnerabilitySearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeVulnerabilityUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeVulnerabilityDelete.call(this, i);
					}
				}

				// ============================================================
				//                      ATTACK PATTERN
				// ============================================================
				else if (resource === 'attackPattern') {
					if (operation === 'create') {
						responseData = await executeAttackPatternCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeAttackPatternGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeAttackPatternSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeAttackPatternUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeAttackPatternDelete.call(this, i);
					}
				}

				// ============================================================
				//                      CAMPAIGN
				// ============================================================
				else if (resource === 'campaign') {
					if (operation === 'create') {
						responseData = await executeCampaignCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeCampaignGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeCampaignSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeCampaignUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeCampaignDelete.call(this, i);
					}
				}

				// ============================================================
				//                      INTRUSION SET
				// ============================================================
				else if (resource === 'intrusionSet') {
					if (operation === 'create') {
						responseData = await executeIntrusionSetCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeIntrusionSetGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeIntrusionSetSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeIntrusionSetUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeIntrusionSetDelete.call(this, i);
					}
				}

				// ============================================================
				//                      TOOL
				// ============================================================
				else if (resource === 'tool') {
					if (operation === 'create') {
						responseData = await executeToolCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeToolGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeToolSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeToolUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeToolDelete.call(this, i);
					}
				}

				// ============================================================
				//                      INFRASTRUCTURE
				// ============================================================
				else if (resource === 'infrastructure') {
					if (operation === 'create') {
						responseData = await executeInfrastructureCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeInfrastructureGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeInfrastructureSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeInfrastructureUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeInfrastructureDelete.call(this, i);
					}
				}

				// ============================================================
				//                      COURSE OF ACTION
				// ============================================================
				else if (resource === 'courseOfAction') {
					if (operation === 'create') {
						responseData = await executeCourseOfActionCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeCourseOfActionGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeCourseOfActionSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeCourseOfActionUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeCourseOfActionDelete.call(this, i);
					}
				}

				// ============================================================
				//                      SECTOR
				// ============================================================
				else if (resource === 'sector') {
					if (operation === 'create') {
						responseData = await executeSectorCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeSectorGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeSectorSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeSectorUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeSectorDelete.call(this, i);
					}
				}

				// ============================================================
				//                      COUNTRY
				// ============================================================
				else if (resource === 'country') {
					if (operation === 'create') {
						responseData = await executeCountryCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeCountryGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeCountrySearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeCountryUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeCountryDelete.call(this, i);
					}
				}

				// ============================================================
				//                      CITY
				// ============================================================
				else if (resource === 'city') {
					if (operation === 'create') {
						responseData = await executeCityCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeCityGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeCitySearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeCityUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeCityDelete.call(this, i);
					}
				}

				// ============================================================
				//                      REGION
				// ============================================================
				else if (resource === 'region') {
					if (operation === 'create') {
						responseData = await executeRegionCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeRegionGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeRegionSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeRegionUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeRegionDelete.call(this, i);
					}
				}

				// ============================================================
				//                      POSITION
				// ============================================================
				else if (resource === 'position') {
					if (operation === 'create') {
						responseData = await executePositionCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executePositionGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executePositionSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executePositionUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executePositionDelete.call(this, i);
					}
				}

				// ============================================================
				//                      INDIVIDUAL
				// ============================================================
				else if (resource === 'individual') {
					if (operation === 'create') {
						responseData = await executeIndividualCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeIndividualGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeIndividualSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeIndividualUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeIndividualDelete.call(this, i);
					}
				}

				// ============================================================
				//                      SYSTEM
				// ============================================================
				else if (resource === 'system') {
					if (operation === 'create') {
						responseData = await executeSystemCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeSystemGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeSystemSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeSystemUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeSystemDelete.call(this, i);
					}
				}

				// ============================================================
				//                      OBSERVED DATA
				// ============================================================
				else if (resource === 'observedData') {
					if (operation === 'create') {
						responseData = await executeObservedDataCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeObservedDataGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeObservedDataSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeObservedDataUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeObservedDataDelete.call(this, i);
					}
				}

				// ============================================================
				//                      OPINION
				// ============================================================
				else if (resource === 'opinion') {
					if (operation === 'create') {
						responseData = await executeOpinionCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeOpinionGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeOpinionSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeOpinionUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeOpinionDelete.call(this, i);
					}
				}

				// ============================================================
				//                      EXTERNAL REFERENCE
				// ============================================================
				else if (resource === 'externalReference') {
					if (operation === 'create') {
						responseData = await executeExternalReferenceCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeExternalReferenceGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeExternalReferenceSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeExternalReferenceUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeExternalReferenceDelete.call(this, i);
					}
				}

				// ============================================================
				//                      MARKING DEFINITION
				// ============================================================
				else if (resource === 'markingDefinition') {
					if (operation === 'create') {
						responseData = await executeMarkingDefinitionCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeMarkingDefinitionGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeMarkingDefinitionSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeMarkingDefinitionUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeMarkingDefinitionDelete.call(this, i);
					}
				}

				// ============================================================
				//                      KILL CHAIN PHASE
				// ============================================================
				else if (resource === 'killChainPhase') {
					if (operation === 'create') {
						responseData = await executeKillChainPhaseCreate.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeKillChainPhaseGet.call(this, i);
					} else if (operation === 'search') {
						responseData = await executeKillChainPhaseSearch.call(this, i);
					} else if (operation === 'update') {
						responseData = await executeKillChainPhaseUpdate.call(this, i);
					} else if (operation === 'delete') {
						responseData = await executeKillChainPhaseDelete.call(this, i);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

// ============================================================
// OBSERVABLE operations
// ============================================================

async function executeObservableCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const observableType = this.getNodeParameter('observableType', i) as string;
	const observableValue = this.getNodeParameter('observableValue', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	// Map observable type to the correct GraphQL input field name
	const typeToInputField: Record<string, string> = {
		'Autonomous-System': 'AutonomousSystem',
		'Bank-Account': 'BankAccount',
		'Credential': 'Credential',
		'Cryptocurrency-Wallet': 'CryptocurrencyWallet',
		'Cryptographic-Key': 'CryptographicKey',
		'Directory': 'Directory',
		'Domain-Name': 'DomainName',
		'Email-Addr': 'EmailAddr',
		'Email-Message': 'EmailMessage',
		'StixFile': 'StixFile',
		'Hostname': 'Hostname',
		'IPv4-Addr': 'IPv4Addr',
		'IPv6-Addr': 'IPv6Addr',
		'Mac-Addr': 'MacAddr',
		'Media-Content': 'MediaContent',
		'Mutex': 'Mutex',
		'Network-Traffic': 'NetworkTraffic',
		'Phone-Number': 'PhoneNumber',
		'Process': 'Process',
		'Software': 'Software',
		'Text': 'Text',
		'Tracking-Number': 'TrackingNumber',
		'Url': 'Url',
		'User-Account': 'UserAccount',
		'User-Agent': 'UserAgent',
		'Windows-Registry-Key': 'WindowsRegistryKey',
		'X509-Certificate': 'X509Certificate',
	};

	const inputField = typeToInputField[observableType] || observableType;

	// Build type-specific input: most simple types use { value: "..." }
	const simpleValueTypes = [
		'DomainName', 'EmailAddr', 'IPv4Addr', 'IPv6Addr', 'MacAddr',
		'Url', 'Hostname', 'Text', 'UserAgent', 'CryptocurrencyWallet',
		'CryptographicKey', 'PhoneNumber', 'Credential', 'TrackingNumber',
		'BankAccount', 'MediaContent', 'Mutex',
	];

	let typeSpecificInput: IDataObject;
	if (simpleValueTypes.includes(inputField)) {
		typeSpecificInput = { value: observableValue };
	} else if (inputField === 'AutonomousSystem') {
		typeSpecificInput = { number: parseInt(observableValue, 10) };
	} else if (inputField === 'StixFile') {
		typeSpecificInput = { name: observableValue };
	} else if (inputField === 'Software') {
		typeSpecificInput = { name: observableValue };
	} else if (inputField === 'Directory') {
		typeSpecificInput = { path: observableValue };
	} else if (inputField === 'Process') {
		typeSpecificInput = { pid: parseInt(observableValue, 10) };
	} else if (inputField === 'UserAccount') {
		typeSpecificInput = { account_login: observableValue };
	} else if (inputField === 'WindowsRegistryKey') {
		typeSpecificInput = { key: observableValue };
	} else if (inputField === 'EmailMessage') {
		typeSpecificInput = { subject: observableValue, is_multipart: false };
	} else if (inputField === 'NetworkTraffic') {
		typeSpecificInput = { dst_port: parseInt(observableValue, 10), is_active: false };
	} else if (inputField === 'X509Certificate') {
		typeSpecificInput = { subject: observableValue };
	} else {
		typeSpecificInput = { value: observableValue };
	}

	const variables: IDataObject = {
		type: observableType,
		[inputField]: typeSpecificInput,
	};

	if (additionalFields.x_opencti_score !== undefined) variables.x_opencti_score = additionalFields.x_opencti_score;
	if (additionalFields.x_opencti_description) variables.x_opencti_description = additionalFields.x_opencti_description;
	if (additionalFields.createdBy) variables.createdBy = additionalFields.createdBy;
	if (additionalFields.createIndicator) variables.createIndicator = additionalFields.createIndicator;
	if (additionalFields.objectMarking) variables.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) variables.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) variables.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation StixCyberObservableAdd(
			$type: String!
			$${inputField}: ${inputField}AddInput
			$x_opencti_score: Int
			$x_opencti_description: String
			$createdBy: String
			$createIndicator: Boolean
			$objectMarking: [String]
			$objectLabel: [String]
			$externalReferences: [String]
		) {
			stixCyberObservableAdd(
				type: $type
				${inputField}: $${inputField}
				x_opencti_score: $x_opencti_score
				x_opencti_description: $x_opencti_description
				createdBy: $createdBy
				createIndicator: $createIndicator
				objectMarking: $objectMarking
				objectLabel: $objectLabel
				externalReferences: $externalReferences
			) {
				id
				standard_id
				entity_type
				observable_value
				x_opencti_score
				x_opencti_description
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.stixCyberObservableAdd as IDataObject;
}

async function executeObservableGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observableId', i) as string;
	const query = `
		query StixCyberObservable($id: String!) {
			stixCyberObservable(id: $id) {
				id
				standard_id
				entity_type
				observable_value
				x_opencti_score
				x_opencti_description
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				indicators { edges { node { id name pattern } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.stixCyberObservable as IDataObject;
}

async function executeObservableSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const observableTypes = this.getNodeParameter('observableTypes', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const searchOptions = this.getNodeParameter('searchOptions', i) as IDataObject;

	const variables: IDataObject = {
		first: limit,
		search: searchTerm || undefined,
		orderBy: (searchOptions.orderBy as string) || 'created_at',
		orderMode: (searchOptions.orderMode as string) || 'desc',
	};

	if (observableTypes) {
		variables.types = splitCommaSeparated(observableTypes);
	}

	if (searchOptions.filterValue) {
		variables.filters = buildFilterGroup([
			{ key: 'observable_value', values: [searchOptions.filterValue as string] },
		]);
	}

	const query = `
		query StixCyberObservables(
			$first: Int
			$search: String
			$types: [String]
			$orderBy: StixCyberObservablesOrdering
			$orderMode: OrderingMode
			$filters: FilterGroup
		) {
			stixCyberObservables(
				first: $first
				search: $search
				types: $types
				orderBy: $orderBy
				orderMode: $orderMode
				filters: $filters
			) {
				edges {
					node {
						id
						standard_id
						entity_type
						observable_value
						x_opencti_score
						x_opencti_description
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.stixCyberObservables as IDataObject;
}

async function executeObservableUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observableId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return await executeObservableGet.call(this, i);
	}

	const query = `
		mutation StixCyberObservableEdit($id: ID!, $input: [EditInput]!) {
			stixCyberObservableEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					entity_type
					observable_value
					x_opencti_score
					x_opencti_description
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.stixCyberObservableEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeObservableDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observableId', i) as string;
	const query = `
		mutation StixCyberObservableEdit($id: ID!) {
			stixCyberObservableEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// REPORT operations
// ============================================================

async function executeReportCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const published = this.getNodeParameter('published', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name, published: toIsoDate(published) };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.content) input.content = additionalFields.content;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_reliability) input.x_opencti_reliability = additionalFields.x_opencti_reliability;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.report_types) input.report_types = splitCommaSeparated(additionalFields.report_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation ReportAdd($input: ReportAddInput!) {
			reportAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				content
				published
				report_types
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.reportAdd as IDataObject;
}

async function executeReportGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('reportId', i) as string;
	const query = `
		query Report($id: String!) {
			report(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				content
				published
				report_types
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.report as IDataObject;
}

async function executeReportSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const searchOptions = this.getNodeParameter('searchOptions', i) as IDataObject;

	const variables: IDataObject = {
		first: limit,
		search: searchTerm || undefined,
		orderBy: (searchOptions.orderBy as string) || 'created_at',
		orderMode: (searchOptions.orderMode as string) || 'desc',
	};

	if (searchOptions.reportType) {
		variables.filters = buildFilterGroup([
			{ key: 'report_types', values: [searchOptions.reportType as string] },
		]);
	}

	const query = `
		query Reports($first: Int, $search: String, $orderBy: ReportsOrdering, $orderMode: OrderingMode, $filters: FilterGroup) {
			reports(first: $first, search: $search, orderBy: $orderBy, orderMode: $orderMode, filters: $filters) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						published
						report_types
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.reports as IDataObject;
}

async function executeReportUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('reportId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation ReportEdit($id: ID!, $input: [EditInput]!) {
			reportEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					content
					published
					confidence
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.reportEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeReportDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('reportId', i) as string;
	const query = `
		mutation ReportEdit($id: ID!) {
			reportEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// NOTE (RFI) operations
// ============================================================

async function executeNoteCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const content = this.getNodeParameter('content', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { content };

	if (additionalFields.attribute_abstract) input.attribute_abstract = additionalFields.attribute_abstract;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.likelihood !== undefined) input.likelihood = additionalFields.likelihood;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.authors) input.authors = splitCommaSeparated(additionalFields.authors as string);
	if (additionalFields.note_types) input.note_types = splitCommaSeparated(additionalFields.note_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);

	const query = `
		mutation NoteAdd($input: NoteAddInput!) {
			noteAdd(input: $input) {
				id
				standard_id
				entity_type
				attribute_abstract
				content
				authors
				note_types
				likelihood
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.noteAdd as IDataObject;
}

async function executeNoteGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('noteId', i) as string;
	const query = `
		query Note($id: String!) {
			note(id: $id) {
				id
				standard_id
				entity_type
				attribute_abstract
				content
				authors
				note_types
				likelihood
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.note as IDataObject;
}

async function executeNoteSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Notes($first: Int, $search: String) {
			notes(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						attribute_abstract
						content
						authors
						note_types
						likelihood
						confidence
						created_at
						createdBy { id name }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.notes as IDataObject;
}

async function executeNoteUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('noteId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation NoteEdit($id: ID!, $input: [EditInput]!) {
			noteEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					attribute_abstract
					content
					likelihood
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.noteEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeNoteDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('noteId', i) as string;
	const query = `
		mutation NoteEdit($id: ID!) {
			noteEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// TASK operations
// ============================================================

async function executeTaskCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.due_date) input.due_date = toIsoDate(additionalFields.due_date as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectAssignee) input.objectAssignee = splitCommaSeparated(additionalFields.objectAssignee as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);

	const query = `
		mutation TaskAdd($input: TaskAddInput!) {
			taskAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				due_date
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objectAssignee { id name }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.taskAdd as IDataObject;
}

async function executeTaskGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('taskId', i) as string;
	const query = `
		query Task($id: String!) {
			task(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				due_date
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				objectAssignee { id name }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.task as IDataObject;
}

async function executeTaskSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Tasks($first: Int, $search: String) {
			tasks(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						due_date
						created_at
						createdBy { id name }
						objectLabel { id value color }
						objectAssignee { id name }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.tasks as IDataObject;
}

async function executeTaskUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('taskId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation TaskFieldPatch($id: ID!, $input: [EditInput!]!) {
			taskFieldPatch(id: $id, input: $input) {
				id
				standard_id
				name
				description
				due_date
				updated_at
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return data.taskFieldPatch as IDataObject;
}

async function executeTaskDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('taskId', i) as string;
	const query = `
		mutation TaskDelete($id: ID!) {
			taskDelete(id: $id)
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// THREAT ACTOR operations
// ============================================================

async function executeThreatActorCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.sophistication) input.sophistication = additionalFields.sophistication;
	if (additionalFields.resource_level) input.resource_level = additionalFields.resource_level;
	if (additionalFields.primary_motivation) input.primary_motivation = additionalFields.primary_motivation;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.threat_actor_types) input.threat_actor_types = splitCommaSeparated(additionalFields.threat_actor_types as string);
	if (additionalFields.roles) input.roles = splitCommaSeparated(additionalFields.roles as string);
	if (additionalFields.goals) input.goals = splitCommaSeparated(additionalFields.goals as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation ThreatActorGroupAdd($input: ThreatActorGroupAddInput!) {
			threatActorGroupAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				threat_actor_types
				first_seen
				last_seen
				sophistication
				resource_level
				primary_motivation
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.threatActorGroupAdd as IDataObject;
}

async function executeThreatActorGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('threatActorId', i) as string;
	const query = `
		query ThreatActorGroup($id: String!) {
			threatActorGroup(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				threat_actor_types
				first_seen
				last_seen
				roles
				goals
				sophistication
				resource_level
				primary_motivation
				secondary_motivations
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.threatActorGroup as IDataObject;
}

async function executeThreatActorSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query ThreatActorsGroup($first: Int, $search: String) {
			threatActorsGroup(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						aliases
						threat_actor_types
						first_seen
						last_seen
						sophistication
						resource_level
						primary_motivation
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.threatActorsGroup as IDataObject;
}

async function executeThreatActorUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('threatActorId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

	// Handle aliases specially - convert comma-separated to array
	if (updateFields.aliases && typeof updateFields.aliases === 'string') {
		updateFields.aliases = splitCommaSeparated(updateFields.aliases) as unknown as string;
	}

	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation ThreatActorGroupEdit($id: ID!, $input: [EditInput]!) {
			threatActorGroupEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					aliases
					first_seen
					last_seen
					sophistication
					primary_motivation
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.threatActorGroupEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeThreatActorDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('threatActorId', i) as string;
	const query = `
		mutation ThreatActorGroupEdit($id: ID!) {
			threatActorGroupEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// LABEL operations
// ============================================================

async function executeLabelCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const value = this.getNodeParameter('value', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { value };
	if (additionalFields.color) input.color = additionalFields.color;

	const query = `
		mutation LabelAdd($input: LabelAddInput!) {
			labelAdd(input: $input) {
				id
				standard_id
				entity_type
				value
				color
				created_at
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.labelAdd as IDataObject;
}

async function executeLabelGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('labelId', i) as string;
	const query = `
		query Label($id: String!) {
			label(id: $id) {
				id
				standard_id
				entity_type
				value
				color
				created_at
				updated_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.label as IDataObject;
}

async function executeLabelSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Labels($first: Int, $search: String) {
			labels(first: $first, search: $search, orderBy: value, orderMode: asc) {
				edges {
					node {
						id
						standard_id
						entity_type
						value
						color
						created_at
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.labels as IDataObject;
}

async function executeLabelUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('labelId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation LabelEdit($id: ID!, $input: [EditInput]!) {
			labelEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					value
					color
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.labelEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeLabelDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('labelId', i) as string;
	const query = `
		mutation LabelEdit($id: ID!) {
			labelEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// RELATIONSHIP operations
// ============================================================

async function executeRelationshipCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const relationshipType = this.getNodeParameter('relationshipType', i) as string;
	const fromId = this.getNodeParameter('fromId', i) as string;
	const toId = this.getNodeParameter('toId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	// For "object" relationship type, use stixRefRelationshipAdd instead (adding to containers)
	if (relationshipType === 'object') {
		const refInput: IDataObject = {
			fromId,
			toId,
			relationship_type: 'object',
		};

		const query = `
			mutation StixRefRelationshipAdd($input: StixRefRelationshipAddInput!) {
				stixRefRelationshipAdd(input: $input) {
					id
					standard_id
					entity_type
					relationship_type
					created_at
					from { ... on BasicObject { id entity_type } }
					to { ... on BasicObject { id entity_type } }
				}
			}
		`;

		const data = await openCtiApiRequest.call(this, query, { input: refInput });
		return data.stixRefRelationshipAdd as IDataObject;
	}

	const input: IDataObject = {
		fromId,
		toId,
		relationship_type: relationshipType,
	};

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.start_time) input.start_time = toIsoDate(additionalFields.start_time as string);
	if (additionalFields.stop_time) input.stop_time = toIsoDate(additionalFields.stop_time as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation StixCoreRelationshipAdd($input: StixCoreRelationshipAddInput!) {
			stixCoreRelationshipAdd(input: $input) {
				id
				standard_id
				entity_type
				relationship_type
				description
				confidence
				start_time
				stop_time
				created_at
				from { ... on BasicObject { id entity_type } }
				to { ... on BasicObject { id entity_type } }
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.stixCoreRelationshipAdd as IDataObject;
}

async function executeRelationshipGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('relationshipId', i) as string;
	const query = `
		query StixCoreRelationship($id: String!) {
			stixCoreRelationship(id: $id) {
				id
				standard_id
				entity_type
				relationship_type
				description
				confidence
				start_time
				stop_time
				created_at
				updated_at
				from { ... on BasicObject { id entity_type } }
				to { ... on BasicObject { id entity_type } }
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.stixCoreRelationship as IDataObject;
}

async function executeRelationshipSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const limit = this.getNodeParameter('limit', i) as number;
	const searchOptions = this.getNodeParameter('searchOptions', i) as IDataObject;

	const variables: IDataObject = { first: limit };

	if (searchOptions.search) variables.search = searchOptions.search;
	if (searchOptions.fromOrToId) variables.fromOrToId = [searchOptions.fromOrToId as string];
	if (searchOptions.fromId) variables.fromId = [searchOptions.fromId as string];
	if (searchOptions.toId) variables.toId = [searchOptions.toId as string];
	if (searchOptions.relationship_type) variables.relationship_type = splitCommaSeparated(searchOptions.relationship_type as string);

	const query = `
		query StixCoreRelationships(
			$first: Int
			$search: String
			$fromOrToId: [String]
			$fromId: [String]
			$toId: [String]
			$relationship_type: [String]
		) {
			stixCoreRelationships(
				first: $first
				search: $search
				fromOrToId: $fromOrToId
				fromId: $fromId
				toId: $toId
				relationship_type: $relationship_type
				orderBy: created_at
				orderMode: desc
			) {
				edges {
					node {
						id
						standard_id
						entity_type
						relationship_type
						description
						confidence
						start_time
						stop_time
						created_at
						from { ... on BasicObject { id entity_type } }
						to { ... on BasicObject { id entity_type } }
						createdBy { id name }
						objectMarking { id definition }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.stixCoreRelationships as IDataObject;
}

async function executeRelationshipDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('relationshipId', i) as string;
	const query = `
		mutation StixCoreRelationshipEdit($id: ID!) {
			stixCoreRelationshipEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// INDICATOR operations
// ============================================================

async function executeIndicatorCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const pattern = this.getNodeParameter('pattern', i) as string;
	const pattern_type = this.getNodeParameter('pattern_type', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name, pattern, pattern_type };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_score !== undefined) input.x_opencti_score = additionalFields.x_opencti_score;
	if (additionalFields.x_opencti_detection !== undefined) input.x_opencti_detection = additionalFields.x_opencti_detection;
	if (additionalFields.x_opencti_main_observable_type) input.x_opencti_main_observable_type = additionalFields.x_opencti_main_observable_type;
	if (additionalFields.valid_from) input.valid_from = toIsoDate(additionalFields.valid_from as string);
	if (additionalFields.valid_until) input.valid_until = toIsoDate(additionalFields.valid_until as string);
	if (additionalFields.createObservables !== undefined) input.createObservables = additionalFields.createObservables;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.indicator_types) input.indicator_types = splitCommaSeparated(additionalFields.indicator_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation IndicatorAdd($input: IndicatorAddInput!) {
			indicatorAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				pattern
				pattern_type
				indicator_types
				valid_from
				valid_until
				x_opencti_score
				x_opencti_detection
				x_opencti_main_observable_type
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.indicatorAdd as IDataObject;
}

async function executeIndicatorGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('indicatorId', i) as string;
	const query = `
		query Indicator($id: String!) {
			indicator(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				pattern
				pattern_type
				indicator_types
				valid_from
				valid_until
				x_opencti_score
				x_opencti_detection
				x_opencti_main_observable_type
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
				observables(first: 50) { edges { node { id entity_type observable_value } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.indicator as IDataObject;
}

async function executeIndicatorSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Indicators($first: Int, $search: String) {
			indicators(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						pattern
						pattern_type
						indicator_types
						valid_from
						valid_until
						x_opencti_score
						x_opencti_detection
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.indicators as IDataObject;
}

async function executeIndicatorUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('indicatorId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation IndicatorFieldPatch($id: ID!, $input: [EditInput!]!) {
			indicatorFieldPatch(id: $id, input: $input) {
				id
				standard_id
				name
				description
				pattern
				x_opencti_score
				x_opencti_detection
				valid_from
				valid_until
				confidence
				updated_at
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return data.indicatorFieldPatch as IDataObject;
}

async function executeIndicatorDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('indicatorId', i) as string;
	const query = `
		mutation IndicatorDelete($id: ID!) {
			indicatorDelete(id: $id)
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// INCIDENT operations
// ============================================================

async function executeIncidentCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.objective) input.objective = additionalFields.objective;
	if (additionalFields.incident_type) input.incident_type = additionalFields.incident_type;
	if (additionalFields.severity) input.severity = additionalFields.severity;
	if (additionalFields.source) input.source = additionalFields.source;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation IncidentAdd($input: IncidentAddInput!) {
			incidentAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				first_seen
				last_seen
				objective
				incident_type
				severity
				source
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.incidentAdd as IDataObject;
}

async function executeIncidentGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('incidentId', i) as string;
	const query = `
		query Incident($id: String!) {
			incident(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				first_seen
				last_seen
				objective
				incident_type
				severity
				source
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.incident as IDataObject;
}

async function executeIncidentSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Incidents($first: Int, $search: String) {
			incidents(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						aliases
						first_seen
						last_seen
						incident_type
						severity
						source
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.incidents as IDataObject;
}

async function executeIncidentUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('incidentId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation IncidentEdit($id: ID!, $input: [EditInput]!) {
			incidentEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					first_seen
					last_seen
					severity
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.incidentEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeIncidentDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('incidentId', i) as string;
	const query = `
		mutation IncidentEdit($id: ID!) {
			incidentEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// MALWARE operations
// ============================================================

async function executeMalwareCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.is_family !== undefined) input.is_family = additionalFields.is_family;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.malware_types) input.malware_types = splitCommaSeparated(additionalFields.malware_types as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation MalwareAdd($input: MalwareAddInput!) {
			malwareAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				malware_types
				is_family
				first_seen
				last_seen
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.malwareAdd as IDataObject;
}

async function executeMalwareGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('malwareId', i) as string;
	const query = `
		query Malware($id: String!) {
			malware(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				aliases
				malware_types
				is_family
				first_seen
				last_seen
				architecture_execution_envs
				implementation_languages
				capabilities
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.malware as IDataObject;
}

async function executeMalwareSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Malwares($first: Int, $search: String) {
			malwares(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						aliases
						malware_types
						is_family
						first_seen
						last_seen
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.malwares as IDataObject;
}

async function executeMalwareUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('malwareId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation MalwareEdit($id: ID!, $input: [EditInput]!) {
			malwareEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					is_family
					first_seen
					last_seen
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.malwareEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeMalwareDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('malwareId', i) as string;
	const query = `
		mutation MalwareEdit($id: ID!) {
			malwareEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// VULNERABILITY operations
// ============================================================

async function executeVulnerabilityCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_cvss_base_score !== undefined) input.x_opencti_cvss_base_score = additionalFields.x_opencti_cvss_base_score;
	if (additionalFields.x_opencti_cvss_base_severity) input.x_opencti_cvss_base_severity = additionalFields.x_opencti_cvss_base_severity;
	if (additionalFields.x_opencti_cvss_vector_string) input.x_opencti_cvss_vector_string = additionalFields.x_opencti_cvss_vector_string;
	if (additionalFields.x_opencti_cisa_kev !== undefined) input.x_opencti_cisa_kev = additionalFields.x_opencti_cisa_kev;
	if (additionalFields.x_opencti_epss_score !== undefined) input.x_opencti_epss_score = additionalFields.x_opencti_epss_score;
	if (additionalFields.x_opencti_epss_percentile !== undefined) input.x_opencti_epss_percentile = additionalFields.x_opencti_epss_percentile;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.x_opencti_cwe) input.x_opencti_cwe = splitCommaSeparated(additionalFields.x_opencti_cwe as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);

	const query = `
		mutation VulnerabilityAdd($input: VulnerabilityAddInput!) {
			vulnerabilityAdd(input: $input) {
				id
				standard_id
				entity_type
				name
				description
				x_opencti_cvss_base_score
				x_opencti_cvss_base_severity
				x_opencti_cvss_vector_string
				x_opencti_cisa_kev
				x_opencti_epss_score
				x_opencti_epss_percentile
				confidence
				created_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.vulnerabilityAdd as IDataObject;
}

async function executeVulnerabilityGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('vulnerabilityId', i) as string;
	const query = `
		query Vulnerability($id: String!) {
			vulnerability(id: $id) {
				id
				standard_id
				entity_type
				name
				description
				x_opencti_aliases
				x_opencti_cvss_base_score
				x_opencti_cvss_base_severity
				x_opencti_cvss_vector_string
				x_opencti_cisa_kev
				x_opencti_epss_score
				x_opencti_epss_percentile
				x_opencti_cwe
				confidence
				created_at
				updated_at
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.vulnerability as IDataObject;
}

async function executeVulnerabilitySearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;

	const query = `
		query Vulnerabilities($first: Int, $search: String) {
			vulnerabilities(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges {
					node {
						id
						standard_id
						entity_type
						name
						description
						x_opencti_cvss_base_score
						x_opencti_cvss_base_severity
						x_opencti_cisa_kev
						x_opencti_epss_score
						confidence
						created_at
						createdBy { id name }
						objectMarking { id definition }
						objectLabel { id value color }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.vulnerabilities as IDataObject;
}

async function executeVulnerabilityUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('vulnerabilityId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation VulnerabilityEdit($id: ID!, $input: [EditInput]!) {
			vulnerabilityEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					name
					description
					x_opencti_cvss_base_score
					x_opencti_cvss_base_severity
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.vulnerabilityEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeVulnerabilityDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('vulnerabilityId', i) as string;
	const query = `
		mutation VulnerabilityEdit($id: ID!) {
			vulnerabilityEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// SIGHTING operations
// ============================================================

async function executeSightingCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const fromId = this.getNodeParameter('fromId', i) as string;
	const toId = this.getNodeParameter('toId', i) as string;
	const attribute_count = this.getNodeParameter('attribute_count', i) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { fromId, toId, attribute_count };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_negative !== undefined) input.x_opencti_negative = additionalFields.x_opencti_negative;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation StixSightingRelationshipAdd($input: StixSightingRelationshipAddInput!) {
			stixSightingRelationshipAdd(input: $input) {
				id
				standard_id
				entity_type
				description
				first_seen
				last_seen
				attribute_count
				x_opencti_negative
				confidence
				created_at
				updated_at
				from { ... on BasicObject { id entity_type } }
				to { ... on BasicObject { id entity_type } }
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { input });
	return data.stixSightingRelationshipAdd as IDataObject;
}

async function executeSightingGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('sightingId', i) as string;
	const query = `
		query StixSightingRelationship($id: String!) {
			stixSightingRelationship(id: $id) {
				id
				standard_id
				entity_type
				description
				first_seen
				last_seen
				attribute_count
				x_opencti_negative
				confidence
				created_at
				updated_at
				from { ... on BasicObject { id entity_type } }
				to { ... on BasicObject { id entity_type } }
				createdBy { id name }
				objectMarking { id definition }
				objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.stixSightingRelationship as IDataObject;
}

async function executeSightingSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const limit = this.getNodeParameter('limit', i) as number;
	const searchOptions = this.getNodeParameter('searchOptions', i) as IDataObject;

	const variables: IDataObject = {
		first: limit,
		orderBy: 'created_at',
		orderMode: 'desc',
	};

	if (searchOptions.search) variables.search = searchOptions.search;
	if (searchOptions.fromOrToId) variables.fromOrToId = searchOptions.fromOrToId;
	if (searchOptions.fromId) variables.fromId = searchOptions.fromId;
	if (searchOptions.toId) variables.toId = searchOptions.toId;
	if (searchOptions.fromTypes) variables.fromTypes = splitCommaSeparated(searchOptions.fromTypes as string);
	if (searchOptions.toTypes) variables.toTypes = splitCommaSeparated(searchOptions.toTypes as string);

	const query = `
		query StixSightingRelationships(
			$first: Int
			$search: String
			$fromOrToId: String
			$fromId: StixRef
			$toId: StixRef
			$fromTypes: [String]
			$toTypes: [String]
			$orderBy: StixSightingRelationshipsOrdering
			$orderMode: OrderingMode
		) {
			stixSightingRelationships(
				first: $first
				search: $search
				fromOrToId: $fromOrToId
				fromId: $fromId
				toId: $toId
				fromTypes: $fromTypes
				toTypes: $toTypes
				orderBy: $orderBy
				orderMode: $orderMode
			) {
				edges {
					node {
						id
						standard_id
						entity_type
						description
						first_seen
						last_seen
						attribute_count
						x_opencti_negative
						confidence
						created_at
						from { ... on BasicObject { id entity_type } }
						to { ... on BasicObject { id entity_type } }
						createdBy { id name }
						objectMarking { id definition }
					}
				}
				pageInfo { globalCount }
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, variables);
	return data.stixSightingRelationships as IDataObject;
}

async function executeSightingUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('sightingId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);

	if (editInputs.length === 0) {
		return { id, message: 'No fields to update' };
	}

	const query = `
		mutation StixSightingRelationshipEdit($id: ID!, $input: [EditInput]!) {
			stixSightingRelationshipEdit(id: $id) {
				fieldPatch(input: $input) {
					id
					standard_id
					description
					first_seen
					last_seen
					attribute_count
					x_opencti_negative
					confidence
					updated_at
				}
			}
		}
	`;

	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.stixSightingRelationshipEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeSightingDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('sightingId', i) as string;
	const query = `
		mutation StixSightingRelationshipEdit($id: ID!) {
			stixSightingRelationshipEdit(id: $id) {
				delete
			}
		}
	`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// ATTACK PATTERN operations
// ============================================================

async function executeAttackPatternCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_mitre_id) input.x_mitre_id = additionalFields.x_mitre_id;
	if (additionalFields.x_mitre_detection) input.x_mitre_detection = additionalFields.x_mitre_detection;
	if (additionalFields.x_mitre_platforms) input.x_mitre_platforms = splitCommaSeparated(additionalFields.x_mitre_platforms as string);
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.killChainPhases) input.killChainPhases = splitCommaSeparated(additionalFields.killChainPhases as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation AttackPatternAdd($input: AttackPatternAddInput!) {
			attackPatternAdd(input: $input) {
				id standard_id entity_type name description aliases x_mitre_id x_mitre_platforms confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.attackPatternAdd as IDataObject;
}

async function executeAttackPatternGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('attackPatternId', i) as string;
	const query = `
		query AttackPattern($id: String!) {
			attackPattern(id: $id) {
				id standard_id entity_type name description aliases x_mitre_id x_mitre_platforms x_mitre_detection confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
				killChainPhases { id kill_chain_name phase_name }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.attackPattern as IDataObject;
}

async function executeAttackPatternSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query AttackPatterns($first: Int, $search: String) {
			attackPatterns(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description aliases x_mitre_id confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.attackPatterns as IDataObject;
}

async function executeAttackPatternUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('attackPatternId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation AttackPatternEdit($id: ID!, $input: [EditInput]!) {
			attackPatternEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description x_mitre_id updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.attackPatternEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeAttackPatternDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('attackPatternId', i) as string;
	const query = `mutation AttackPatternEdit($id: ID!) { attackPatternEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// CAMPAIGN operations
// ============================================================

async function executeCampaignCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.objective) input.objective = additionalFields.objective;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation CampaignAdd($input: CampaignAddInput!) {
			campaignAdd(input: $input) {
				id standard_id entity_type name description aliases first_seen last_seen objective confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.campaignAdd as IDataObject;
}

async function executeCampaignGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('campaignId', i) as string;
	const query = `
		query Campaign($id: String!) {
			campaign(id: $id) {
				id standard_id entity_type name description aliases first_seen last_seen objective confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.campaign as IDataObject;
}

async function executeCampaignSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Campaigns($first: Int, $search: String) {
			campaigns(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description aliases first_seen last_seen confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.campaigns as IDataObject;
}

async function executeCampaignUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('campaignId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation CampaignEdit($id: ID!, $input: [EditInput]!) {
			campaignEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description first_seen last_seen objective updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.campaignEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeCampaignDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('campaignId', i) as string;
	const query = `mutation CampaignEdit($id: ID!) { campaignEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// INTRUSION SET operations
// ============================================================

async function executeIntrusionSetCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.primary_motivation) input.primary_motivation = additionalFields.primary_motivation;
	if (additionalFields.resource_level) input.resource_level = additionalFields.resource_level;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.goals) input.goals = splitCommaSeparated(additionalFields.goals as string);
	if (additionalFields.secondary_motivations) input.secondary_motivations = splitCommaSeparated(additionalFields.secondary_motivations as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation IntrusionSetAdd($input: IntrusionSetAddInput!) {
			intrusionSetAdd(input: $input) {
				id standard_id entity_type name description aliases first_seen last_seen goals resource_level primary_motivation confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.intrusionSetAdd as IDataObject;
}

async function executeIntrusionSetGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('intrusionSetId', i) as string;
	const query = `
		query IntrusionSet($id: String!) {
			intrusionSet(id: $id) {
				id standard_id entity_type name description aliases first_seen last_seen goals resource_level primary_motivation secondary_motivations confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.intrusionSet as IDataObject;
}

async function executeIntrusionSetSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query IntrusionSets($first: Int, $search: String) {
			intrusionSets(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description aliases first_seen last_seen primary_motivation confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.intrusionSets as IDataObject;
}

async function executeIntrusionSetUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('intrusionSetId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation IntrusionSetEdit($id: ID!, $input: [EditInput]!) {
			intrusionSetEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description first_seen last_seen primary_motivation updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.intrusionSetEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeIntrusionSetDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('intrusionSetId', i) as string;
	const query = `mutation IntrusionSetEdit($id: ID!) { intrusionSetEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// TOOL operations
// ============================================================

async function executeToolCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.tool_version) input.tool_version = additionalFields.tool_version;
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.tool_types) input.tool_types = splitCommaSeparated(additionalFields.tool_types as string);
	if (additionalFields.killChainPhases) input.killChainPhases = splitCommaSeparated(additionalFields.killChainPhases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation ToolAdd($input: ToolAddInput!) {
			toolAdd(input: $input) {
				id standard_id entity_type name description aliases tool_types tool_version confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.toolAdd as IDataObject;
}

async function executeToolGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('toolId', i) as string;
	const query = `
		query Tool($id: String!) {
			tool(id: $id) {
				id standard_id entity_type name description aliases tool_types tool_version confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
				killChainPhases { id kill_chain_name phase_name }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.tool as IDataObject;
}

async function executeToolSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Tools($first: Int, $search: String) {
			tools(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description aliases tool_types tool_version confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.tools as IDataObject;
}

async function executeToolUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('toolId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation ToolEdit($id: ID!, $input: [EditInput]!) {
			toolEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description tool_version updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.toolEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeToolDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('toolId', i) as string;
	const query = `mutation ToolEdit($id: ID!) { toolEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// INFRASTRUCTURE operations
// ============================================================

async function executeInfrastructureCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.first_seen) input.first_seen = toIsoDate(additionalFields.first_seen as string);
	if (additionalFields.last_seen) input.last_seen = toIsoDate(additionalFields.last_seen as string);
	if (additionalFields.aliases) input.aliases = splitCommaSeparated(additionalFields.aliases as string);
	if (additionalFields.infrastructure_types) input.infrastructure_types = splitCommaSeparated(additionalFields.infrastructure_types as string);
	if (additionalFields.killChainPhases) input.killChainPhases = splitCommaSeparated(additionalFields.killChainPhases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation InfrastructureAdd($input: InfrastructureAddInput!) {
			infrastructureAdd(input: $input) {
				id standard_id entity_type name description aliases infrastructure_types first_seen last_seen confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.infrastructureAdd as IDataObject;
}

async function executeInfrastructureGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('infrastructureId', i) as string;
	const query = `
		query Infrastructure($id: String!) {
			infrastructure(id: $id) {
				id standard_id entity_type name description aliases infrastructure_types first_seen last_seen confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
				killChainPhases { id kill_chain_name phase_name }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.infrastructure as IDataObject;
}

async function executeInfrastructureSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Infrastructures($first: Int, $search: String) {
			infrastructures(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description aliases infrastructure_types first_seen last_seen confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.infrastructures as IDataObject;
}

async function executeInfrastructureUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('infrastructureId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation InfrastructureEdit($id: ID!, $input: [EditInput]!) {
			infrastructureEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description first_seen last_seen updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.infrastructureEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeInfrastructureDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('infrastructureId', i) as string;
	const query = `mutation InfrastructureEdit($id: ID!) { infrastructureEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// COURSE OF ACTION operations
// ============================================================

async function executeCourseOfActionCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_mitre_id) input.x_mitre_id = additionalFields.x_mitre_id;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation CourseOfActionAdd($input: CourseOfActionAddInput!) {
			courseOfActionAdd(input: $input) {
				id standard_id entity_type name description x_mitre_id confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.courseOfActionAdd as IDataObject;
}

async function executeCourseOfActionGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('courseOfActionId', i) as string;
	const query = `
		query CourseOfAction($id: String!) {
			courseOfAction(id: $id) {
				id standard_id entity_type name description x_mitre_id x_opencti_aliases confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.courseOfAction as IDataObject;
}

async function executeCourseOfActionSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query CoursesOfAction($first: Int, $search: String) {
			coursesOfAction(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description x_mitre_id confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.coursesOfAction as IDataObject;
}

async function executeCourseOfActionUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('courseOfActionId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation CourseOfActionEdit($id: ID!, $input: [EditInput]!) {
			courseOfActionEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.courseOfActionEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeCourseOfActionDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('courseOfActionId', i) as string;
	const query = `mutation CourseOfActionEdit($id: ID!) { courseOfActionEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// SECTOR operations
// ============================================================

async function executeSectorCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.contact_information) input.contact_information = additionalFields.contact_information;
	if (additionalFields.x_opencti_aliases) input.x_opencti_aliases = splitCommaSeparated(additionalFields.x_opencti_aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation SectorAdd($input: SectorAddInput!) {
			sectorAdd(input: $input) {
				id standard_id entity_type name description contact_information confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.sectorAdd as IDataObject;
}

async function executeSectorGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('sectorId', i) as string;
	const query = `
		query Sector($id: String!) {
			sector(id: $id) {
				id standard_id entity_type name description contact_information x_opencti_aliases confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.sector as IDataObject;
}

async function executeSectorSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Sectors($first: Int, $search: String) {
			sectors(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.sectors as IDataObject;
}

async function executeSectorUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('sectorId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation SectorEdit($id: ID!, $input: [EditInput]!) {
			sectorEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description contact_information updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.sectorEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeSectorDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('sectorId', i) as string;
	const query = `mutation SectorEdit($id: ID!) { sectorEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// COUNTRY operations
// ============================================================

async function executeCountryCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.latitude !== undefined) input.latitude = additionalFields.latitude;
	if (additionalFields.longitude !== undefined) input.longitude = additionalFields.longitude;
	if (additionalFields.x_opencti_aliases) input.x_opencti_aliases = splitCommaSeparated(additionalFields.x_opencti_aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation CountryAdd($input: CountryAddInput!) {
			countryAdd(input: $input) {
				id standard_id entity_type name description latitude longitude confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.countryAdd as IDataObject;
}

async function executeCountryGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('countryId', i) as string;
	const query = `
		query Country($id: String!) {
			country(id: $id) {
				id standard_id entity_type name description latitude longitude x_opencti_aliases confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.country as IDataObject;
}

async function executeCountrySearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Countries($first: Int, $search: String) {
			countries(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description latitude longitude confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.countries as IDataObject;
}

async function executeCountryUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('countryId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation CountryEdit($id: ID!, $input: [EditInput]!) {
			countryEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.countryEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeCountryDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('countryId', i) as string;
	const query = `mutation CountryEdit($id: ID!) { countryEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// CITY operations
// ============================================================

async function executeCityCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.latitude !== undefined) input.latitude = additionalFields.latitude;
	if (additionalFields.longitude !== undefined) input.longitude = additionalFields.longitude;
	if (additionalFields.x_opencti_aliases) input.x_opencti_aliases = splitCommaSeparated(additionalFields.x_opencti_aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation CityAdd($input: CityAddInput!) {
			cityAdd(input: $input) {
				id standard_id entity_type name description latitude longitude confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.cityAdd as IDataObject;
}

async function executeCityGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('cityId', i) as string;
	const query = `
		query City($id: String!) {
			city(id: $id) {
				id standard_id entity_type name description latitude longitude x_opencti_aliases confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.city as IDataObject;
}

async function executeCitySearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Cities($first: Int, $search: String) {
			cities(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description latitude longitude confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.cities as IDataObject;
}

async function executeCityUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('cityId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation CityEdit($id: ID!, $input: [EditInput]!) {
			cityEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.cityEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeCityDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('cityId', i) as string;
	const query = `mutation CityEdit($id: ID!) { cityEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// REGION operations
// ============================================================

async function executeRegionCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.x_opencti_aliases) input.x_opencti_aliases = splitCommaSeparated(additionalFields.x_opencti_aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation RegionAdd($input: RegionAddInput!) {
			regionAdd(input: $input) {
				id standard_id entity_type name description confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.regionAdd as IDataObject;
}

async function executeRegionGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('regionId', i) as string;
	const query = `
		query Region($id: String!) {
			region(id: $id) {
				id standard_id entity_type name description x_opencti_aliases confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.region as IDataObject;
}

async function executeRegionSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Regions($first: Int, $search: String) {
			regions(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.regions as IDataObject;
}

async function executeRegionUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('regionId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation RegionEdit($id: ID!, $input: [EditInput]!) {
			regionEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.regionEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeRegionDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('regionId', i) as string;
	const query = `mutation RegionEdit($id: ID!) { regionEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// POSITION operations
// ============================================================

async function executePositionCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.latitude !== undefined) input.latitude = additionalFields.latitude;
	if (additionalFields.longitude !== undefined) input.longitude = additionalFields.longitude;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation PositionAdd($input: PositionAddInput!) {
			positionAdd(input: $input) {
				id standard_id entity_type name description latitude longitude confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.positionAdd as IDataObject;
}

async function executePositionGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('positionId', i) as string;
	const query = `
		query Position($id: String!) {
			position(id: $id) {
				id standard_id entity_type name description latitude longitude confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.position as IDataObject;
}

async function executePositionSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Positions($first: Int, $search: String) {
			positions(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type name description latitude longitude confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.positions as IDataObject;
}

async function executePositionUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('positionId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation PositionEdit($id: ID!, $input: [EditInput]!) {
			positionEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description latitude longitude updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.positionEdit as IDataObject).fieldPatch as IDataObject;
}

async function executePositionDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('positionId', i) as string;
	const query = `mutation PositionEdit($id: ID!) { positionEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// INDIVIDUAL operations
// ============================================================

async function executeIndividualCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.contact_information) input.contact_information = additionalFields.contact_information;
	if (additionalFields.x_opencti_firstname) input.x_opencti_firstname = additionalFields.x_opencti_firstname;
	if (additionalFields.x_opencti_lastname) input.x_opencti_lastname = additionalFields.x_opencti_lastname;
	if (additionalFields.x_opencti_reliability) input.x_opencti_reliability = additionalFields.x_opencti_reliability;
	if (additionalFields.x_opencti_aliases) input.x_opencti_aliases = splitCommaSeparated(additionalFields.x_opencti_aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation IndividualAdd($input: IndividualAddInput!) {
			individualAdd(input: $input) {
				id standard_id entity_type name description contact_information x_opencti_firstname x_opencti_lastname x_opencti_reliability confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.individualAdd as IDataObject;
}

async function executeIndividualGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('individualId', i) as string;
	const query = `
		query Individual($id: String!) {
			individual(id: $id) {
				id standard_id entity_type name description contact_information x_opencti_firstname x_opencti_lastname x_opencti_aliases x_opencti_reliability confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.individual as IDataObject;
}

async function executeIndividualSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Individuals($first: Int, $search: String) {
			individuals(first: $first, search: $search, orderBy: created, orderMode: desc) {
				edges { node { id standard_id entity_type name description confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.individuals as IDataObject;
}

async function executeIndividualUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('individualId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation IndividualEdit($id: ID!, $input: [EditInput]!) {
			individualEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description contact_information x_opencti_firstname x_opencti_lastname updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.individualEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeIndividualDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('individualId', i) as string;
	const query = `mutation IndividualEdit($id: ID!) { individualEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// SYSTEM operations
// ============================================================

async function executeSystemCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const name = this.getNodeParameter('name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.contact_information) input.contact_information = additionalFields.contact_information;
	if (additionalFields.x_opencti_aliases) input.x_opencti_aliases = splitCommaSeparated(additionalFields.x_opencti_aliases as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation SystemAdd($input: SystemAddInput!) {
			systemAdd(input: $input) {
				id standard_id entity_type name description contact_information confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.systemAdd as IDataObject;
}

async function executeSystemGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('systemId', i) as string;
	const query = `
		query System($id: String!) {
			system(id: $id) {
				id standard_id entity_type name description contact_information x_opencti_aliases confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.system as IDataObject;
}

async function executeSystemSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Systems($first: Int, $search: String) {
			systems(first: $first, search: $search, orderBy: created, orderMode: desc) {
				edges { node { id standard_id entity_type name description confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.systems as IDataObject;
}

async function executeSystemUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('systemId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation SystemEdit($id: ID!, $input: [EditInput]!) {
			systemEdit(id: $id) { fieldPatch(input: $input) { id standard_id name description contact_information updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.systemEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeSystemDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('systemId', i) as string;
	const query = `mutation SystemEdit($id: ID!) { systemEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// OBSERVED DATA operations
// ============================================================

async function executeObservedDataCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const first_observed = this.getNodeParameter('first_observed', i) as string;
	const last_observed = this.getNodeParameter('last_observed', i) as string;
	const number_observed = this.getNodeParameter('number_observed', i) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = {
		first_observed: toIsoDate(first_observed),
		last_observed: toIsoDate(last_observed),
		number_observed,
		objects: [],
	};

	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation ObservedDataAdd($input: ObservedDataAddInput!) {
			observedDataAdd(input: $input) {
				id standard_id entity_type first_observed last_observed number_observed confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.observedDataAdd as IDataObject;
}

async function executeObservedDataGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observedDataId', i) as string;
	const query = `
		query ObservedData($id: String!) {
			observedData(id: $id) {
				id standard_id entity_type first_observed last_observed number_observed confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.observedData as IDataObject;
}

async function executeObservedDataSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query ObservedDatas($first: Int, $search: String) {
			observedDatas(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type first_observed last_observed number_observed confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.observedDatas as IDataObject;
}

async function executeObservedDataUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observedDataId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation ObservedDataEdit($id: ID!, $input: [EditInput]!) {
			observedDataEdit(id: $id) { fieldPatch(input: $input) { id standard_id first_observed last_observed number_observed updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.observedDataEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeObservedDataDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('observedDataId', i) as string;
	const query = `mutation ObservedDataEdit($id: ID!) { observedDataEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// OPINION operations
// ============================================================

async function executeOpinionCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const opinion = this.getNodeParameter('opinion', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { opinion };

	if (additionalFields.explanation) input.explanation = additionalFields.explanation;
	if (additionalFields.confidence !== undefined) input.confidence = additionalFields.confidence;
	if (additionalFields.authors) input.authors = splitCommaSeparated(additionalFields.authors as string);
	if (additionalFields.objects) input.objects = splitCommaSeparated(additionalFields.objects as string);
	if (additionalFields.createdBy) input.createdBy = additionalFields.createdBy;
	if (additionalFields.objectMarking) input.objectMarking = splitCommaSeparated(additionalFields.objectMarking as string);
	if (additionalFields.objectLabel) input.objectLabel = splitCommaSeparated(additionalFields.objectLabel as string);
	if (additionalFields.externalReferences) input.externalReferences = splitCommaSeparated(additionalFields.externalReferences as string);

	const query = `
		mutation OpinionAdd($input: OpinionAddInput!) {
			opinionAdd(input: $input) {
				id standard_id entity_type opinion explanation authors confidence created_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.opinionAdd as IDataObject;
}

async function executeOpinionGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('opinionId', i) as string;
	const query = `
		query Opinion($id: String!) {
			opinion(id: $id) {
				id standard_id entity_type opinion explanation authors confidence created_at updated_at
				createdBy { id name } objectMarking { id definition } objectLabel { id value color }
				objects(first: 100) { edges { node { ... on BasicObject { id entity_type } } } }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.opinion as IDataObject;
}

async function executeOpinionSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query Opinions($first: Int, $search: String) {
			opinions(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type opinion explanation authors confidence created_at createdBy { id name } objectLabel { id value color } } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.opinions as IDataObject;
}

async function executeOpinionUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('opinionId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation OpinionEdit($id: ID!, $input: [EditInput]!) {
			opinionEdit(id: $id) { fieldPatch(input: $input) { id standard_id opinion explanation updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.opinionEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeOpinionDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('opinionId', i) as string;
	const query = `mutation OpinionEdit($id: ID!) { opinionEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// EXTERNAL REFERENCE operations
// ============================================================

async function executeExternalReferenceCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const source_name = this.getNodeParameter('source_name', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { source_name };

	if (additionalFields.description) input.description = additionalFields.description;
	if (additionalFields.url) input.url = additionalFields.url;
	if (additionalFields.hash) input.hash = additionalFields.hash;
	if (additionalFields.external_id) input.external_id = additionalFields.external_id;

	const query = `
		mutation ExternalReferenceAdd($input: ExternalReferenceAddInput!) {
			externalReferenceAdd(input: $input) {
				id standard_id entity_type source_name description url hash external_id created_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.externalReferenceAdd as IDataObject;
}

async function executeExternalReferenceGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('externalReferenceId', i) as string;
	const query = `
		query ExternalReference($id: String!) {
			externalReference(id: $id) {
				id standard_id entity_type source_name description url hash external_id created_at updated_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.externalReference as IDataObject;
}

async function executeExternalReferenceSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query ExternalReferences($first: Int, $search: String) {
			externalReferences(first: $first, search: $search, orderBy: created_at, orderMode: desc) {
				edges { node { id standard_id entity_type source_name description url external_id created_at } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.externalReferences as IDataObject;
}

async function executeExternalReferenceUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('externalReferenceId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation ExternalReferenceEdit($id: ID!, $input: [EditInput]!) {
			externalReferenceEdit(id: $id) { fieldPatch(input: $input) { id standard_id source_name description url external_id updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.externalReferenceEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeExternalReferenceDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('externalReferenceId', i) as string;
	const query = `mutation ExternalReferenceEdit($id: ID!) { externalReferenceEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// MARKING DEFINITION operations
// ============================================================

async function executeMarkingDefinitionCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const definition_type = this.getNodeParameter('definition_type', i) as string;
	const definition = this.getNodeParameter('definition', i) as string;
	const x_opencti_order = this.getNodeParameter('x_opencti_order', i) as number;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const input: IDataObject = { definition_type, definition, x_opencti_order };

	if (additionalFields.x_opencti_color) input.x_opencti_color = additionalFields.x_opencti_color;

	const query = `
		mutation MarkingDefinitionAdd($input: MarkingDefinitionAddInput!) {
			markingDefinitionAdd(input: $input) {
				id standard_id entity_type definition_type definition x_opencti_order x_opencti_color created_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.markingDefinitionAdd as IDataObject;
}

async function executeMarkingDefinitionGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('markingDefinitionId', i) as string;
	const query = `
		query MarkingDefinition($id: String!) {
			markingDefinition(id: $id) {
				id standard_id entity_type definition_type definition x_opencti_order x_opencti_color created_at updated_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.markingDefinition as IDataObject;
}

async function executeMarkingDefinitionSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query MarkingDefinitions($first: Int, $search: String) {
			markingDefinitions(first: $first, search: $search, orderBy: definition, orderMode: asc) {
				edges { node { id standard_id entity_type definition_type definition x_opencti_order x_opencti_color created_at } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.markingDefinitions as IDataObject;
}

async function executeMarkingDefinitionUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('markingDefinitionId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation MarkingDefinitionEdit($id: ID!, $input: [EditInput]!) {
			markingDefinitionEdit(id: $id) { fieldPatch(input: $input) { id standard_id definition x_opencti_order x_opencti_color updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.markingDefinitionEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeMarkingDefinitionDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('markingDefinitionId', i) as string;
	const query = `mutation MarkingDefinitionEdit($id: ID!) { markingDefinitionEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}

// ============================================================
// KILL CHAIN PHASE operations
// ============================================================

async function executeKillChainPhaseCreate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const kill_chain_name = this.getNodeParameter('kill_chain_name', i) as string;
	const phase_name = this.getNodeParameter('phase_name', i) as string;
	const x_opencti_order = this.getNodeParameter('x_opencti_order', i) as number;

	const input: IDataObject = { kill_chain_name, phase_name, x_opencti_order };

	const query = `
		mutation KillChainPhaseAdd($input: KillChainPhaseAddInput!) {
			killChainPhaseAdd(input: $input) {
				id standard_id entity_type kill_chain_name phase_name x_opencti_order created_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { input });
	return data.killChainPhaseAdd as IDataObject;
}

async function executeKillChainPhaseGet(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('killChainPhaseId', i) as string;
	const query = `
		query KillChainPhase($id: String!) {
			killChainPhase(id: $id) {
				id standard_id entity_type kill_chain_name phase_name x_opencti_order created_at updated_at
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id });
	return data.killChainPhase as IDataObject;
}

async function executeKillChainPhaseSearch(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const searchTerm = this.getNodeParameter('searchTerm', i) as string;
	const limit = this.getNodeParameter('limit', i) as number;
	const query = `
		query KillChainPhases($first: Int, $search: String) {
			killChainPhases(first: $first, search: $search, orderBy: x_opencti_order, orderMode: asc) {
				edges { node { id standard_id entity_type kill_chain_name phase_name x_opencti_order created_at } }
				pageInfo { globalCount }
			}
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { first: limit, search: searchTerm || undefined });
	return data.killChainPhases as IDataObject;
}

async function executeKillChainPhaseUpdate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('killChainPhaseId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const editInputs = buildEditInputs(updateFields);
	if (editInputs.length === 0) return { id, message: 'No fields to update' };
	const query = `
		mutation KillChainPhaseEdit($id: ID!, $input: [EditInput]!) {
			killChainPhaseEdit(id: $id) { fieldPatch(input: $input) { id standard_id kill_chain_name phase_name x_opencti_order updated_at } }
		}
	`;
	const data = await openCtiApiRequest.call(this, query, { id, input: editInputs });
	return (data.killChainPhaseEdit as IDataObject).fieldPatch as IDataObject;
}

async function executeKillChainPhaseDelete(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const id = this.getNodeParameter('killChainPhaseId', i) as string;
	const query = `mutation KillChainPhaseEdit($id: ID!) { killChainPhaseEdit(id: $id) { delete } }`;
	await openCtiApiRequest.call(this, query, { id });
	return { deleted: true, id };
}
