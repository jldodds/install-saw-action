import * as core from '@actions/core'
import * as ts from '@actions/tool-cache'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

//    core.setOutput('time', new Date().toTimeString())
    
    const sawPath = await ts.downloadTool('https://s3-us-west-2.amazonaws.com/s2n-public-test-dependencies/saw-0.4.0.99-2019-12-10-Ubuntu14.04-64.tar.gz')
    const extractedFolder = await ts.extractTar(sawPath, 'saw')
    core.debug(extractedFolder)  
    core.setOutput('sawPath',extractedFolder)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
