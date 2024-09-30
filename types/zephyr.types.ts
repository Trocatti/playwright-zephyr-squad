import type { Axios, AxiosRequestConfig } from 'axios';

export enum ZephyrStatusEnum {
  Pass = 1,
  Fail = 2,
  InProgress = 3,
  Blocked = 4,
  NotExecuted = -1,
}

export type ZephyrStatus =
  | ZephyrStatusEnum.NotExecuted
  | ZephyrStatusEnum.Pass
  | ZephyrStatusEnum.Fail
  | ZephyrStatusEnum.Blocked
  | ZephyrStatusEnum.InProgress;

export interface ZephyrOptions extends AxiosRequestConfig {
  host: string;
  accountId: string;
  accessKey: string;
  secretKey: string;
  projectKey: string;
  environment?: string;
}

export type ZephyrOptionsRequest = {
  host: string;
  accountId: string;
  accessKey: string;
  secretKey: string;
  axios: Axios;
};

export type ZephyrTestResult = {
  testCaseKey: string;
  projectKey: string;
  status: ZephyrStatus;
  environment?: string;
  executionTime?: string;
  executionDate?: string;
};

export type ZephyrPayload = {
  id: number;
  cycleId: number;
  issueId: number;
  versionId: number;
  comment: string;
  assigneeType: string;
  status: string | Record<string, any>;
};
