"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const format_summary_1 = require("./format-summary");
const get_merge_commits_1 = require("./util/get-merge-commits");
const extract_pr_ids_1 = require("./util/extract-pr-ids");
const extract_pr_details_1 = require("./util/extract-pr-details");
const get_pr_data_1 = require("./util/get-pr-data");
const config_1 = require("./config");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = (0, config_1.parseConfig)();
            const mergeCommits = yield (0, get_merge_commits_1.getMergeCommits)();
            const getPrIds = (0, extract_pr_ids_1.extractPrIds)(mergeCommits);
            const prData = yield (0, get_pr_data_1.getPrData)(getPrIds);
            const prDetails = (0, extract_pr_details_1.extractPrDetails)(prData, config);
            const summary = (0, format_summary_1.formatSummary)(prDetails, config);
            core.setOutput('summary', summary);
        }
        catch (error) {
            core.setFailed(`Action failed with error: ${error}`);
        }
    });
}
run();
