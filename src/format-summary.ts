import { ParsedPr, Config } from './types';

export function formatSummary(
  prs: Record<string, ParsedPr>,
  config: Config
): string {
  let summaryText = '';

  const crlfToLf = (str: string) => str.replace(/\r\n/g, '\n');

  for (const section of config.sections) {
    const sectionKey = section.title;
    const title = section.title;
    let isEmpty = true;
    if (summaryText) summaryText += '\n';
    let sectionContent = `${title}\n\n`;

    for (const prKey in prs) {
      const content = crlfToLf(prs[prKey][sectionKey] ?? '');
      const title = crlfToLf(prs[prKey].title ?? '');
      const isCondensed = section.style === 'condensed';
      if (!isEmpty) sectionContent += '\n';
      if (!isEmpty && !isCondensed) sectionContent += '\n';

      if (isCondensed) sectionContent += `- ${content || title} (#${prKey})`;
      else if (!content) continue;
      else sectionContent += `${title} (#${prKey}):\n\n${content}`;

      isEmpty = false;
    }

    if (isEmpty) sectionContent += '> Empty\n';
    sectionContent += '\n';

    summaryText += sectionContent;
  }

  return summaryText;
}
