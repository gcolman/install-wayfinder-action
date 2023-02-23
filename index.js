const core = require('@actions/core');
const github = require('@actions/github');
const tc = require('@actions/tool-cache');


async function run() {

  try {

    const wf = await tc.downloadTool('https://storage.googleapis.com/wayfinder-releases/v1.6.10/wf-cli-linux-amd64.tar.gz');
    const wfBin = await tc.extractTar(wf, '/bin');

    const wfPath = await tc.cacheDir(wfBin, 'wf', '1.16.10');
    core.addPath(wfPath);
    await exec.exec('wf version');   
  
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
