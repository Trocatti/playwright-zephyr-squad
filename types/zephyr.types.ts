import type { AxiosRequestConfig } from 'axios';

export interface ZephyrOptions extends AxiosRequestConfig {
  host: string;
  user?: string;
  password?: string;
  authorizationToken?: string;
  authorizationTokenPrefix?: string;
  projectKey: string;
  environment?: string;
  queryString?: Record<string, string>;
  relativePath?: string;
}

export type ZephyrStatus = 'Pass' | 'Fail' | 'Blocked' | 'Not Executed' | 'In Progress';

export type ZephyrTestResult = {
  testCaseKey: string;
  status: ZephyrStatus;
  environment?: string;
  executionTime?: string;
  executionDate?: string;
};
