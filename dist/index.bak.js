"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTime = exports.Logger = exports.ILogLevel = void 0;
var ILogLevel;
(function (ILogLevel) {
    ILogLevel["info"] = "info";
    ILogLevel["warning"] = "waring";
    ILogLevel["error"] = "error";
})(ILogLevel = exports.ILogLevel || (exports.ILogLevel = {}));
;
const ERROR_STYLE = `
background: #fdf4f3;
color: #e4281d;
border: 1px solid #fad4d2;
padding: 2px 10px;
border-radius: 4px;
`;
class Logger {
    constructor(specs) {
        var _a, _b, _c, _d, _e, _f;
        this._prefix = (_a = specs === null || specs === void 0 ? void 0 : specs.prefix) !== null && _a !== void 0 ? _a : '';
        this._showTime = (_b = specs === null || specs === void 0 ? void 0 : specs.showTime) !== null && _b !== void 0 ? _b : false;
        this._ignoreLabels = (_c = specs === null || specs === void 0 ? void 0 : specs.ignoreLabels) !== null && _c !== void 0 ? _c : {};
        this._level = (_d = specs === null || specs === void 0 ? void 0 : specs.level) !== null && _d !== void 0 ? _d : ILogLevel.info;
        this._configLabelKeys = (_e = specs === null || specs === void 0 ? void 0 : specs.configLabelKeys) !== null && _e !== void 0 ? _e : [];
        this._exactMilliseconds = (_f = specs === null || specs === void 0 ? void 0 : specs.exactMilliseconds) !== null && _f !== void 0 ? _f : false;
    }
    getLabels(data) {
        if (this._configLabelKeys.length === 0) {
            return [];
        }
        const res = {};
        for (let i = 0; i < this._configLabelKeys.length; i++) {
            const label = this._configLabelKeys[i];
            const value = this._getValueFromNestKey(label, data);
            if (value === undefined) {
                continue;
            }
            res[label] = value;
        }
        return res;
    }
    collapsed(...args) {
        let labels;
        let data;
        let prefix;
        switch (args.length) {
            case 1:
                data = args[0];
                labels = this.getLabels(args);
                break;
            case 2:
                if (typeof args[1] === 'string') {
                    data = args[0];
                    labels = this.getLabels(args);
                    prefix = args[1];
                }
                else {
                    data = args[0];
                    labels = args[1];
                }
                break;
            case 3:
            default:
                labels = args[0];
                data = args[1];
                prefix = args[2];
                break;
        }
        if (this._checkIfIgnore(labels)) {
            return;
        }
        const labelContents = this._lableToArrayStr(labels);
        console.groupCollapsed(`${this._prefix} |`, prefix !== null && prefix !== void 0 ? prefix : '', ...labelContents);
        if (data) {
            this._print(data);
        }
        console.groupEnd();
    }
    info(data, stringify) {
        if (stringify) {
            this._printStr(JSON.stringify(data));
        }
        else {
            this._print(data);
        }
    }
    strout(content) {
        console.log(`%c${content}`, ERROR_STYLE);
    }
    error(content) {
        console.log(`%c${content}`, ERROR_STYLE);
    }
    _getValueFromNestKey(key, data) {
        const keyArr = key.split('.');
        let subData = data;
        for (let i = 0; i < keyArr.length; i++) {
            subData = subData === null || subData === void 0 ? void 0 : subData[keyArr[i]];
            if (!subData) {
                break;
            }
        }
        return subData;
    }
    _checkIfIgnore(labels) {
        const keys = Object.keys(this._ignoreLabels);
        if (keys.length === 0) {
            return false;
        }
        const target = keys.find((k) => labels[k] && this._ignoreLabels[k].includes(labels[k]));
        return Boolean(target);
    }
    _lableToArrayStr(logObj) {
        const labels = [];
        Object.keys(logObj).forEach((key) => {
            labels.push(`[${key}:${logObj[key]}]`);
        });
        if (this._showTime) {
            labels.push(`[${(0, exports.getCurrentTime)(this._exactMilliseconds)}]`);
        }
        return labels;
    }
    _colorfulItems(items) {
        const styles = 'color: red;'.repeat(items.length);
        const contentStr = `%c${items.join('%c')}`;
        return [contentStr, styles];
    }
    _print(logObj) {
        Object.keys(logObj).forEach((key) => {
            console.log(`%c${key}`, 'font-weight: bold;', logObj[key]);
        });
    }
    _printStr(content) {
        console.log(`%c${content}`, 'font-weight: bold;');
    }
    end() {
        console.groupEnd();
    }
}
exports.Logger = Logger;
const getCurrentTime = (isExactMilliseconds) => {
    const date = new Date();
    return (`${date.getHours()}
    :${date.getMinutes()}
    :${date.getSeconds()}
    ${isExactMilliseconds ? `.${date.getMilliseconds()}` : ''}`);
};
exports.getCurrentTime = getCurrentTime;
exports.default = Logger;
