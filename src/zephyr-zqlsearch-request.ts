import { Axios } from 'axios';
import { inspect } from 'util';
import { isAxiosError } from './../utils/axios-wrapper.utils';
import { ZephyrOptionsRequest } from '../types/zephyr.types';
import { GenerateToken } from './generate-token';

const HTTP_METHOD = 'POST';
const RELATIVE_PATH = '/public/rest/api/1.0/zql/search';

export type ZephyrCycleSummary = { execution: Record<string, any> };

class ZephyrZqlSearchRequest {
  private readonly accessKey: string;
  private readonly accountId: string;
  private readonly secretKey: string;
  private readonly host: string;
  private readonly axios: Axios;

  constructor(options: ZephyrOptionsRequest) {
    this.accessKey = options.accessKey;
    this.accountId = options.accountId;
    this.secretKey = options.secretKey;
    this.host = options.host;
    this.axios = options.axios;
  }

  async search(testCaseKey: string, status: number | string): Promise<ZephyrCycleSummary[]> {
    const authorizationToken = new GenerateToken({
      accessKey: this.accessKey,
      accountId: this.accountId,
      secrectKey: this.secretKey,
      httpMethod: HTTP_METHOD,
      relativePath: RELATIVE_PATH,
    }).generate();

    const URL = `${this.host}${RELATIVE_PATH}`;

    try {
      const response = await this.axios.post(
        URL,
        {
          maxRecords: 20,
          offset: 0,
          zqlQuery: `executionStatus = \"UNEXECUTED\" AND issue = \"${testCaseKey}\"`,
        },
        {
          headers: {
            Authorization: `JWT ${authorizationToken}`,
          },
        },
      );

      if (response.status !== 200) throw new Error(`${response.status} - Failed to create test cycle`);

      const { searchObjectList } = response.data;

      if (searchObjectList.length === 0) {
        throw new Error('No open executions found for task.');
      }

      return searchObjectList.map((item: ZephyrCycleSummary) => {
        return {
          ...item.execution,
          status: {
            id: status,
          },
        };
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(`Config: ${inspect(error.config)}`);

        if (error.response) {
          throw new Error(
            `\nStatus: ${error.response.status} \nHeaders: ${inspect(error.response.headers)} \nData: ${inspect(error.response.data)}`,
          );
        } else if (error.request) {
          throw new Error(`The request was made but no response was received. \n Error: ${inspect(error.toJSON())}`);
        } else {
          throw new Error(`Something happened in setting up the request that triggered an Error\n : ${inspect(error.message)}`);
        }
      }

      throw new Error(`\nUnknown error: ${error}`);
    }
  }
}

export default ZephyrZqlSearchRequest;
