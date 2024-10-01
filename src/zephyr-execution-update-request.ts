import { Axios } from 'axios';
import { inspect } from 'util';
import { bold, green } from 'picocolors';
import { isAxiosError } from './utils/axios-wrapper.utils';
import { ZephyrOptionsRequest, ZephyrPayload } from './types/zephyr.types';
import { GenerateToken } from './generate-token';

const HTTP_METHOD = 'PUT';
const RELATIVE_PATH = '/public/rest/api/1.0/execution';

class ZephyrExecutionUpdateRequest {
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

  async update(payload: ZephyrPayload): Promise<string> {
    const relativePath = `${RELATIVE_PATH}/${payload.id}`;

    const authorizationToken = new GenerateToken({
      accessKey: this.accessKey,
      accountId: this.accountId,
      secrectKey: this.secretKey,
      httpMethod: HTTP_METHOD,
      relativePath: relativePath,
    }).generate();

    const URL = `${this.host}/${relativePath}`;

    try {
      const response = await this.axios.put(
        URL,
        { ...payload },
        {
          headers: {
            Authorization: `JWT ${authorizationToken}`,
          },
        },
      );

      if (response.status !== 200) throw new Error(`${response.status} - Failed to create test cycle`);

      const {
        data: { issueKey },
      } = response;

      console.log(`${bold(green(`✅ Test cycle ${issueKey} has been created`))}`);
      console.log(`${bold(green('👇 Check out the test result'))}`);
      console.log(`🔗 ${this.host}/secure/Tests.jspa#/testPlayer/${issueKey}`);

      return response.data.issueKey;
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

export default ZephyrExecutionUpdateRequest;
