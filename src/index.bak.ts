export interface IIgnoreLabels {
  [key: string]: any[]
}

export enum ILogLevel {
  info = 'info',
  warning = 'waring',
  error = 'error',
}

export interface LogObj { [key: string]: any };

interface LoggerSpecsProps {
  prefix?: string;
  showTime?: boolean;
  ignoreLabels?: IIgnoreLabels;
  level?: ILogLevel;
  /**
   * key of the data to show.
   * eg. 
   * const data = { method: 'test', data: { name: 'Bob', sex: 'male' } };
   * so we can config the keys as:
   *      const configLabelKeys = [
   *        'method',
   *        'data.name',
   *      ];
   * then, we will get two labels and print :
   *    [method: test] [data.name: Bob]
   */
  configLabelKeys?: string[];
  /**
   * is exact at milliseconds.
   */
  exactMilliseconds?: boolean;
}

const ERROR_STYLE = `
background: #fdf4f3;
color: #e4281d;
border: 1px solid #fad4d2;
padding: 2px 10px;
border-radius: 4px;
`;

/**
 * function includes:
 * 1. show current time.
 * 2. set log level, filter print log by level.
 * 3. filter by ignore label.
 * 4. config by key.
 * 5. colorful.
 * 6. report and report by level.
 */

interface ILogger {
  collapsed(logObj: LogObj, prefix?: string): void;
  collapsed(labels: LogObj, logObj: LogObj, prefix?: string): void;
  info(data: LogObj): void;
  info(data: LogObj, stringify: boolean): void;
}
export class Logger implements ILogger {
  private _prefix: string;

  private _showTime: boolean;

  private _ignoreLabels: IIgnoreLabels;

  private _level: ILogLevel;

  private _configLabelKeys: string[];

  private _exactMilliseconds: boolean;

  constructor(specs?: LoggerSpecsProps) {
    this._prefix = specs?.prefix ?? '';
    this._showTime = specs?.showTime ?? false;
    this._ignoreLabels = specs?.ignoreLabels ?? {};
    this._level = specs?.level ?? ILogLevel.info;

    this._configLabelKeys = specs?.configLabelKeys ?? [];
    this._exactMilliseconds = specs?.exactMilliseconds ?? false;
  }

  getLabels(data: LogObj) {
    if (this._configLabelKeys.length === 0) {
      return [];
    }

    const res: LogObj = {};
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

  collapsed(...args: any[]) {
    let labels: LogObj;
    let data: LogObj;
    let prefix: string | undefined;

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
        } else {
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
    console.groupCollapsed(`${this._prefix} |`, prefix ?? '', ...labelContents);

    if (data) {
      this._print(data);
    }
    console.groupEnd();
  }

  info(data: { [key: string]: any }, stringify?: boolean) {
    if (stringify) {
      this._printStr(JSON.stringify(data));
    } else {
      this._print(data);
    }
  }

  strout(content: string) {
    console.log(`%c${content}`, ERROR_STYLE);
  }

  error(content: string) {
    console.log(`%c${content}`, ERROR_STYLE);
  }

  _getValueFromNestKey(key: string, data: any) {
    const keyArr = key.split('.');

    let subData = data;
    for (let i = 0; i < keyArr.length; i++) {
      subData = subData?.[keyArr[i]];
      if (!subData) {
        break;
      }
    }
    return subData;
  }

  _checkIfIgnore(labels: { [key: string]: any }): boolean {
    const keys = Object.keys(this._ignoreLabels);
    if (keys.length === 0) {
      return false;
    }
    const target = keys.find((k) => labels[k] && this._ignoreLabels[k].includes(labels[k]));

    return Boolean(target);
  }

  _lableToArrayStr(logObj: { [key: string]: any }): string[] {
    const labels: string[] = [];
    Object.keys(logObj).forEach((key: string) => {
      labels.push(`[${key}:${logObj[key]}]`);
    });

    if (this._showTime) {
      labels.push(`[${getCurrentTime(this._exactMilliseconds)}]`);
    }

    return labels;
  }

  _colorfulItems(items: string[]): [string, string] {
    const styles = 'color: red;'.repeat(items.length);
    const contentStr = `%c${items.join('%c')}`;

    return [contentStr, styles];
  }

  _print(logObj: { [key: string]: any }) {
    Object.keys(logObj).forEach((key: string) => {
      console.log(`%c${key}`, 'font-weight: bold;', logObj[key]);
    });
  }

  _printStr(content: string) {
    console.log(`%c${content}`, 'font-weight: bold;');
  }

  end() {
    console.groupEnd();
  }
}

export const getCurrentTime = (isExactMilliseconds?: boolean) => {
  const date = new Date();
  return (
    `${date.getHours()}
    :${date.getMinutes()}
    :${date.getSeconds()}
    ${isExactMilliseconds ? `.${date.getMilliseconds()}` : ''}`
  );
};

export default Logger;
