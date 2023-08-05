import { it, expect } from '@jest/globals';
import { ParsedPr, Config } from '../src/types';
import { formatSummary } from '../src/format-summary';

const TEST_SCHEMA: Config = {
  sections: [
    { title: 'SS1', style: 'condensed', from: 'D1', to: 'D2' },
    { title: 'SS2', style: 'multiline', from: 'D2' },
    { title: 'SS3', style: 'multiline', from: 'D3' },
  ],
  ignore_containing: ['ignore_me'],
};

it('correctly formats summary', async () => {
  const prData: Record<string, ParsedPr> = {
    '1': {
      title: 'PR1',
      SS1: 'SS1_DATA',
      SS2: 'SS2_DATA',
    },
    '2': {
      title: 'PR2',
      SS1: 'SS3_DATA',
      SS2: 'SS4_DATA',
    },
  };

  const EXPECTED = `SS1

- SS1_DATA (#1)
- SS3_DATA (#2)

SS2

PR1 (#1):

SS2_DATA

PR2 (#2):

SS4_DATA

SS3

> Empty

`;

  const summary = formatSummary(prData, TEST_SCHEMA);

  expect(summary).toEqual(EXPECTED);
});
