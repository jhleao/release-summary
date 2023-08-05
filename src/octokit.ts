import * as core from '@actions/core';
import * as github from '@actions/github';

const token = core.getInput('token', { required: true });
export const octokit = github.getOctokit(token).rest;
