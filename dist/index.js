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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_function_decorator_1 = __importDefault(require("./decorator/log-function-decorator"));
const log_class_decorator_1 = __importDefault(require("./decorator/log-class-decorator"));
const logguy_1 = __importDefault(require("./logguy"));
__exportStar(require("./constant"), exports);
__exportStar(require("./interface"), exports);
const modules = {
    Logguy: logguy_1.default,
    LogFuncEnhance: log_function_decorator_1.default,
    LogClassEnhance: log_class_decorator_1.default,
};
exports.default = modules;
