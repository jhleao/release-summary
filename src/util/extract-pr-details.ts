import { RawPr, Config, ParsedPr } from '../types';

export const extractPrDetails = (
  prs: Record<string, RawPr>,
  config: Config
): Record<string, ParsedPr> => {
  const result = {} as Record<string, ParsedPr>;

  const buildPattern = (start: string, end?: string) => {
    if (!end) return new RegExp(`${start}\\s*([\\s\\S]*)$`);
    else return new RegExp(`${start}\\s*([\\s\\S]*?)${end}`);
  };

  const patterns = {} as Record<string, RegExp>;
  for (let i = 0; i < config.sections.length; i++) {
    const section = config.sections[i];
    const nextSection = config.sections[i + 1];
    const from = section.from;
    const to = section.to ?? nextSection?.from ?? null;
    patterns[section.title] = buildPattern(
      from.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'),
      to?.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
    );
  }

  for (const prId in prs) {
    const pr = prs[prId];
    const title = pr.title;
    const description = pr.body ?? '';

    const details = { title } as ParsedPr;

    for (const key in patterns) {
      const sectionContent =
        description.match(patterns[key])?.[1]?.trim() || null;
      const shouldIgnore = config.ignore_containing.some((i) =>
        sectionContent?.includes(i)
      );
      details[key] = !sectionContent || shouldIgnore ? null : sectionContent;
    }

    result[prId] = details;
  }

  return result;
};
