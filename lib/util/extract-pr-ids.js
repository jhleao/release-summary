"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPrIds = void 0;
const extractPrIds = (commitMessages) => {
    const prIds = [];
    for (const message of commitMessages) {
        const pr_id_match = message.match(/#(\d+)/);
        if (!pr_id_match)
            continue;
        prIds.push(pr_id_match[1]);
    }
    return prIds;
};
exports.extractPrIds = extractPrIds;
