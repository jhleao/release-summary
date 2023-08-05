"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPrDetails = void 0;
const extractPrDetails = (prs, config) => {
    var _a, _b, _c, _d, _e;
    const result = {};
    const buildPattern = (start, end) => {
        if (!end)
            return new RegExp(`${start}\\s*([\\s\\S]*)$`);
        else
            return new RegExp(`${start}\\s*([\\s\\S]*?)${end}`);
    };
    const patterns = {};
    for (let i = 0; i < config.sections.length; i++) {
        const section = config.sections[i];
        const nextSection = config.sections[i + 1];
        const from = section.from;
        const to = (_b = (_a = section.to) !== null && _a !== void 0 ? _a : nextSection === null || nextSection === void 0 ? void 0 : nextSection.from) !== null && _b !== void 0 ? _b : null;
        patterns[section.title] = buildPattern(from.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'), to === null || to === void 0 ? void 0 : to.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'));
    }
    for (const prId in prs) {
        const pr = prs[prId];
        const title = pr.title;
        const description = (_c = pr.body) !== null && _c !== void 0 ? _c : '';
        const details = { title };
        for (const key in patterns) {
            const sectionContent = ((_e = (_d = description.match(patterns[key])) === null || _d === void 0 ? void 0 : _d[1]) === null || _e === void 0 ? void 0 : _e.trim()) || null;
            const shouldIgnore = config.ignore_containing.some((i) => sectionContent === null || sectionContent === void 0 ? void 0 : sectionContent.includes(i));
            details[key] = !sectionContent || shouldIgnore ? null : sectionContent;
        }
        result[prId] = details;
    }
    return result;
};
exports.extractPrDetails = extractPrDetails;
