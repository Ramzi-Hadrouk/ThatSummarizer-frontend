// types/log-type.enum.ts
export enum LogType {
    Information = 'Information',
    Error = 'Error',
    Warning = 'Warning',
    Debug = 'Debug',
    Success = 'Success'
  }
  
  // types/print-options.interface.ts
  export interface PrintOptions<T = any> {
    location: string;
    type: LogType;
    mss?: string;
    data?: T;
    development_only?: boolean;
  }
  
  // utils/logger.ts
  interface LoggerConfig {
    logLevel: LogType[];
    prettyPrint: boolean;
    showEnvironment: boolean;
  }
  
  const defaultConfig: LoggerConfig = {
    logLevel: [LogType.Information, LogType.Error, LogType.Warning, LogType.Debug, LogType.Success],
    prettyPrint: true,
    showEnvironment: true,
  };
  
  let config: LoggerConfig = { ...defaultConfig };
  
  export function configureLogger(overrides: Partial<LoggerConfig>) {
    config = { ...config, ...overrides };
  }
  
  export function print<T = any>(options: PrintOptions<T>) {
    const {
      location,
      type,
      mss,
      data,
      development_only = true,
    } = options;
  
    // Environment check
    const isProduction = process.env.NODE_ENV === 'production';
    if (development_only && isProduction) return;
  
    // Log level check
    if (!config.logLevel.includes(type)) return;
  
    // Determine console method
    const consoleMethod = {
      [LogType.Error]: console.error,
      [LogType.Warning]: console.warn,
      [LogType.Information]: console.info,
      [LogType.Debug]: console.debug,
      [LogType.Success]: console.log,
    }[type];
  
    // Formatting
    const envPrefix = config.showEnvironment ? `[${isProduction ? 'PROD' : 'DEV'}] ` : '';
    const header = `◼◼◼◼ ▶️▶️[${location}] ▶️▶️ ${type} :`;
    const message = mss ? `\n Message: ${mss}` : '';
    
    // Data formatting
    const formattedData = config.prettyPrint && typeof data === 'object' 
      ? JSON.stringify(data, null, 2) 
      : data;
  
    // Construct log output
    console.log(`\n \n◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ \n${envPrefix}`)
    consoleMethod(`${header}`);
    if (message) consoleMethod(message);
    if (data !== undefined) consoleMethod(`\n Data:`, formattedData);
    console.log(`◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼  \n \n`)
  }
  
  // Usage examples:
  
  // print({
  //   location: 'summary-route',
  //   type: LogType.Error,
  //   mss: 'Failed to process request',
  //   data: { error: 'Timeout' },
  // });

  //print({location: 'summary-route',type:LogType.Information ,mss: 'received data:',data:requestData});
  
  // Configure logger (optional)
  // configureLogger({
  //   logLevel: [LogType.Error, LogType.Warning], // Only log errors and warnings
  //   prettyPrint: false
  // });