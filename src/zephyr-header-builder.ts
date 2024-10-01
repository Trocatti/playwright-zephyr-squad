import axios from 'axios';
import { ZephyrOptions } from './types/zephyr.types';

class ZephyrHeaderBuilder {
  private readonly options: ZephyrOptions;
  private readonly url: string;
  private readonly accessKey: string;
  constructor(options: ZephyrOptions, url: string, accessKey: string) {
    this.options = options;
    this.url = url;
    this.accessKey = accessKey;
  }

  build() {
    return axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
        zapiAccessKey: this.accessKey,
      },
      ...this.options,
    });
  }
}

export default ZephyrHeaderBuilder;
