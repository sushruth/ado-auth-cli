class Logger {
  private _debugEnabled = false;

  enableDebug = () => {
    this._debugEnabled = true;
  };

  disableDebug = () => {
    this._debugEnabled = false;
  };

  debug = (message?: unknown, ...optionalParams: unknown[]) => {
    if (this._debugEnabled) {
      console.debug(message, ...optionalParams);
    }
  };
}

export const logger = new Logger();
