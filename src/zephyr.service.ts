import { Axios } from 'axios';
import { ZephyrTestResult } from './zephyr.types';
import { ZephyrOptions } from './zephyr.types';
import ZephyrHeaderBuilder from './zephyr-header-builder';
import ZephyrZqlSearchRequest from './zephyr-zqlsearch-request';
import ZephyrExecutionUpdateRequest from './zephyr-execution-update-request';

export class ZephyrService {
  private readonly host: string;
  private readonly axios: Axios;
  private readonly accessKey: string;
  private readonly accountId: string;
  private readonly secretKey: string;

  constructor(options: ZephyrOptions) {
    if (!options.host) throw new Error('"host" option is missed. Please, provide it in the config');
    if (!options.accessKey) throw new Error('"accessKey" option is missed. Please, provide it in the config');
    if (!options.accountId) throw new Error('"accountId" option is missed. Please, provide it in the config');
    if (!options.secretKey) throw new Error('"secrectKey" option is missed. Please, provide it in the config');

    this.host = options.host;
    this.accessKey = options.accessKey;
    this.accountId = options.accountId;
    this.secretKey = options.secretKey;

    this.axios = new ZephyrHeaderBuilder(options, this.host, this.accessKey).build();
  }

  async createRun(items: ZephyrTestResult[]): Promise<void> {
    try {
      const ZqlSearch = new ZephyrZqlSearchRequest({
        accessKey: this.accessKey,
        accountId: this.accountId,
        secretKey: this.secretKey,
        host: this.host,
        axios: this.axios,
      });

      const ZqlUpdate = new ZephyrExecutionUpdateRequest({
        accessKey: this.accessKey,
        accountId: this.accountId,
        secretKey: this.secretKey,
        host: this.host,
        axios: this.axios,
      });

      for (const item of items) {
        const executions = await ZqlSearch.search(item.testCaseKey, item.status);

        if (executions.length === 0) {
          return;
        }

        const { id, cycleId, issueId, versionId, status, projectId } = executions[0] as Record<string, any>;

        const payload = {
          id,
          status,
          cycleId,
          issueId,
          versionId,
          projectId,
          comment: `Atualizado por automação [${new Date().toUTCString()}]`,
          assigneeType: 'currentUser',
        };

        await ZqlUpdate.update(payload);
      }
    } catch (error) {
      throw error;
    }
  }
}
