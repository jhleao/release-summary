export const extractPrIds = (commitMessages: string[]): string[] => {
  const prIds = [] as string[];

  for (const message of commitMessages) {
    const pr_id_match = message.match(/#(\d+)/);
    if (!pr_id_match) continue;
    prIds.push(pr_id_match[1]);
  }

  return prIds;
};
