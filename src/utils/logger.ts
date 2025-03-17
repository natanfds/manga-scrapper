import fs from "fs";
import path from "path";
import { env } from "../config";

class Logger {
    private logFile: string | null;
    private logLevels: string[];

    constructor(logFile: string | null = null) {
        this.logFile = logFile ? path.resolve(logFile) : null;
        this.logLevels = ["info", "warn", "error", "debug"];
    }
    private log(level: string, message: string, data?: any) {
        if (!this.logLevels.includes(level)) {
            throw new Error(`Nível de log inválido: ${level}`);
        }

        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${
            data ? JSON.stringify(data, null, 2) : ""
        }`;

        console.log(logMessage);

        if (this.logFile) {
            fs.appendFileSync(this.logFile, logMessage + "\n", "utf8");
        }
    }

    public info(message: string, data?: any) {
        this.log("info", message, data);
    }

    public warn(message: string, data?: any) {
        this.log("warn", message, data);
    }

    public error(message: string, data?: any) {
        this.log("error", message, data);
    }

    public debug(message: string, data?: any) {
        this.log("debug", message, data);
    }
}

export const logger = new Logger(env.LOG_FILE);
