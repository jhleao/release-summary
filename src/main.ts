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
    const getPrIds = extractPrIds(mergeCommits);
    const prData = await getPrData(getPrIds);
    const prDetails = extractPrDetails(prData, config);
    const summary = formatSummary(prDetails, config);

    core.setOutput('summary', summary);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
