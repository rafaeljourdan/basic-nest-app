import { parse } from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

const envFilePath = join(__dirname, '..', '..', '.env')
const envInfos = parse(readFileSync(envFilePath))

const config = { ...envInfos }

export default config
