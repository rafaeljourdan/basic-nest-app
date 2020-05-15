import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as _ from 'lodash'

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput

  constructor(envFilePath = '.env') {
    this.envConfig = dotenv.parse(fs.readFileSync(envFilePath))
  }

  get(key: string): string {
    return _.get(this.envConfig, key)
  }
}
