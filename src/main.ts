import * as core from '@actions/core';
import { formatSummary } from './format-summary';
import { getMergeCommits } from './util/get-merge-commits';
import { extractPrIds } from './util/extract-pr-ids';
import { extractPrDetails } from './util/extract-pr-details';
import { getPrData } from './util/get-pr-data';
import { parseConfig } from './config';

async function run() {
  try {
    const config = parseConfig();

    const mergeCommits = await getMergeCommits();
    core.debug(`mergeCommits: ${JSON.stringify(mergeCommits)}`);
    const prIds = extractPrIds(mergeCommits);
    core.debug(`getPrIds: ${JSON.stringify(prIds)}`);
    const prData = await getPrData(prIds);
    core.debug(`getPrData: ${JSON.stringify(prData)}`);
    const prDetails = extractPrDetails(prData, config);
    core.debug(`getPrDetails: ${JSON.stringify(prDetails)}`);
    const summary = formatSummary(prDetails, config);
    core.debug(`summary: ${JSON.stringify(summary)}`);

    core.setOutput('summary', summary);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
