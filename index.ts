export interface IIgnoreLabels {
  [key: string]: any[]
}

interface LoggerSpecsProps {
  prefix?: string;
  showTime?: boolean;
  ignoreLabels?: IIgnoreLabels;
}

const ERROR_STYLE = `
background: #fdf4f3;
color: #e4281d;
border: 1px solid #fad4d2;
padding: 2px 10px;
border-radius: 4px;
`;

export class Logger {
  private _prefix: string = '';

  private _showTime: boolean = true;

  private _ignoreLabels: IIgnoreLabels = {};

  constructor(specs?: LoggerSpecsProps) {
    this._prefix = specs?.prefix ?? '';
    this._showTime = specs?.showTime ?? false;
    this._ignoreLabels = specs?.ignoreLabels ?? {};
  }

  collapsed(labels: { [key: string]: any }, logObj?: { [key: string]: any }, prefix?: string) {
    if (this._checkIfIgnore(labels)) {
      return;
    }

    const labelContents = this._lableToArrayStr(labels);
    console.groupCollapsed(`${this._prefix} |`, prefix ?? '', ...labelContents);

    if (logObj) {
      this._print(logObj);
    }
    console.groupEnd();
  }

  info(logObj: { [key: string]: any }) {
    this._print(logObj);
  }

  strout(content: string) {
    console.log(`%c${content}`, ERROR_STYLE);
  }

  error(content: string) {
    console.log(`%c${content}`, ERROR_STYLE);
  }

  _checkIfIgnore(labels: { [key: string]: any }) {
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
      labels.push(`[${new Date()}]`);
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

  end() {
    console.groupEnd();
  }
}

export default Logger;
