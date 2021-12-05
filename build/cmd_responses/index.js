"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tracking_1 = __importDefault(require("./tracking"));
var allowedsites_1 = __importDefault(require("./allowedsites"));
exports.default = {
    tracking: tracking_1.default,
    allowedsites: allowedsites_1.default,
};
