import * as dotenv from 'dotenv'
import * as fs from 'fs'

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput

  constructor(envFilePath: string = '.env') {
    this.envConfig = dotenv.parse(fs.readFileSync(envFilePath))
  }

  get(key: string): string {
    return this.envConfig[key]
  }
}
