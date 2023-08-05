"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSummary = void 0;
function formatSummary(prs, config) {
    var _a, _b;
    let summaryText = '';
    const crlfToLf = (str) => str.replace(/\r\n/g, '\n');
    for (const section of config.sections) {
        const sectionKey = section.title;
        const title = section.title;
        let isEmpty = true;
        if (summaryText)
            summaryText += '\n';
        let sectionContent = `${title}\n\n`;
        for (const prKey in prs) {
            const content = crlfToLf((_a = prs[prKey][sectionKey]) !== null && _a !== void 0 ? _a : '');
            const title = crlfToLf((_b = prs[prKey].title) !== null && _b !== void 0 ? _b : '');
            const isCondensed = section.style === 'condensed';
            if (!isEmpty)
                sectionContent += '\n';
            if (!isEmpty && !isCondensed)
                sectionContent += '\n';
            if (isCondensed)
                sectionContent += `- ${content || title} (#${prKey})`;
            else if (!content)
                continue;
            else
                sectionContent += `${title} (#${prKey}):\n\n${content}`;
            isEmpty = false;
        }
        if (isEmpty)
            sectionContent += '> Empty\n';
        sectionContent += '\n';
        summaryText += sectionContent;
    }
    return summaryText;
}
exports.formatSummary = formatSummary;
