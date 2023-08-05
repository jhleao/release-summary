import * as core from '@actions/core';
import * as github from '@actions/github';
import { octokit } from '../octokit';

export const getMergeCommits = async (): Promise<string[]> => {
  const { owner, repo } = github.context.repo;
  const base = core.getInput('base');
  const head = core.getInput('head');

  const {
    data: { commits },
  } = await octokit.repos.compareCommits({
    owner,
    repo,
    base,
    head,
  });

  const merge_commits = commits
    .map((c) => c.commit.message)
    .filter((msg) => msg.startsWith('Merge pull request'));

  return merge_commits;
};
