import pino, { BaseLogger, LoggerOptions} from 'pino';

export interface ILogger {
    Info: (msg: string | object) => void;
    Error: (msg: string | object) => void;
    Warning: (msg: string | object) => void;
    Fatal: (msg: string | object) => void;
}

class Logger {
    private logger: BaseLogger;
    private options: LoggerOptions;

    constructor (level: 'info' | 'warning' |'error' = 'info') {
        this.options = {
            enabled: true,
            level,
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: true
                }
            } 
        };

        this.logger = pino(this.options);
    }

    public Info(msg: string | object) {
        this.logger.info(msg);
    }

    public Warning(msg: string | object) {
        this.logger.warn(msg);
    }

    public Error(msg: string | object) {
        this.logger.error(msg);
    }

    public Fatal(msg: string | object) {
        this.logger.fatal(msg);
    }
}

export default new Logger();