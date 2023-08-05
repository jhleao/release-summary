import { octokit } from '../octokit';
import * as github from '@actions/github';
import { RawPr } from '../types';

export const getPrData = async (
  prIds: string[]
): Promise<Record<string, RawPr>> => {
  const prs = {} as Record<string, RawPr>;
  const { owner, repo } = github.context.repo;

  for (const prId of prIds) {
    const { data: pr_data } = await octokit.pulls.get({
      owner,
      repo,
      pull_number: Number(prId),
    });

    const title = pr_data.title;
    const body = pr_data.body ?? '';

    prs[prId] = { title, body };
  }

  return prs;
};
