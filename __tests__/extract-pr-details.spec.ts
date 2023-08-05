import { it, expect } from '@jest/globals';
import { ParsedPr, Config, RawPr } from '../src/types';
import { extractPrDetails } from '../src/util/extract-pr-details';

const TEST_SCHEMA: Config = {
  sections: [
    { title: 'SS1', style: 'condensed', from: 'D1', to: 'D2' },
    { title: 'SS2', style: 'multiline', from: 'D2' },
    { title: 'SS3', style: 'multiline', from: 'D3' },
  ],
  ignore_containing: ['ignore_me'],
};

it('correctly formats summary', async () => {
  const prData: Record<string, RawPr> = {
    '1': {
      title: 'PR1',
      body: 'D1\nThis is D1 from PR1\n\nD2\nThis is D2 from PR1\n\nD3\nignore_me',
    },
    '2': {
      title: 'PR2',
      body: 'D1\nThis is D1 from PR2\n\nD2\nnignore_me\n\nD3\nignore_me',
    },
    '3': {
      title: 'PR3',
      body: 'D1\nThis is D1 from PR3\n\nD2\nThis is D2 from PR3\n\nD3\nThis is D3 from PR3',
    },
  };

  const EXPECTED: Record<string, ParsedPr> = {
    '1': {
      title: 'PR1',
      SS1: 'This is D1 from PR1',
      SS2: 'This is D2 from PR1',
      SS3: null,
    },
    '2': {
      title: 'PR2',
      SS1: 'This is D1 from PR2',
      SS2: null,
      SS3: null,
    },
    '3': {
      title: 'PR3',
      SS1: 'This is D1 from PR3',
      SS2: 'This is D2 from PR3',
      SS3: 'This is D3 from PR3',
    },
  };

  const summary = extractPrDetails(prData, TEST_SCHEMA);

  expect(summary).toEqual(EXPECTED);
});
