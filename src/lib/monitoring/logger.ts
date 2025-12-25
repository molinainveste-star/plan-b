/**
 * Structured Logging System
 * 
 * Sistema de logs estruturados com níveis e contexto.
 * Persiste logs críticos no Supabase para análise.
 */

import { supabaseAdmin } from "@/lib/supabase/admin";

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface LogContext {
    action?: string;
    userId?: string;
    slug?: string;
    duration?: number;
    metadata?: Record<string, unknown>;
}

export interface LogEntry {
    level: LogLevel;
    message: string;
    context: LogContext;
    timestamp: string;
    error?: {
        name: string;
        message: string;
        stack?: string;
    };
}

// Log levels que são persistidos no banco
const PERSIST_LEVELS: LogLevel[] = ['error', 'critical'];

// Buffer para batch insert
const logBuffer: LogEntry[] = [];
let flushTimeout: NodeJS.Timeout | null = null;
const FLUSH_INTERVAL_MS = 5000; // 5 segundos
const MAX_BUFFER_SIZE = 50;

/**
 * Formata erro para serialização
 */
function serializeError(error: unknown): LogEntry['error'] | undefined {
    if (!error) return undefined;
    
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }
    
    return {
        name: 'Unknown',
        message: String(error),
    };
}

/**
 * Console output com formatação
 */
function consoleOutput(entry: LogEntry): void {
    const prefix = `[${entry.level.toUpperCase()}]`;
    const contextStr = entry.context.action ? ` [${entry.context.action}]` : '';
    const message = `${prefix}${contextStr} ${entry.message}`;
    
    switch (entry.level) {
        case 'debug':
            console.debug(message, entry.context.metadata || '');
            break;
        case 'info':
            console.info(message, entry.context.metadata || '');
            break;
        case 'warn':
            console.warn(message, entry.context.metadata || '');
            break;
        case 'error':
        case 'critical':
            console.error(message, entry.error || entry.context.metadata || '');
            break;
    }
}

/**
 * Persiste logs no Supabase (batch)
 */
async function flushLogs(): Promise<void> {
    if (logBuffer.length === 0) return;
    
    const logsToFlush = [...logBuffer];
    logBuffer.length = 0;
    
    try {
        const rows = logsToFlush.map(entry => ({
            level: entry.level,
            message: entry.message,
            context: entry.context,
            error_data: entry.error,
            created_at: entry.timestamp,
        }));
        
        await supabaseAdmin.from('error_logs').insert(rows);
    } catch (err) {
        // Fallback: log para console se falhar persistência
        console.error('[LOGGER] Failed to persist logs:', err);
        logsToFlush.forEach(entry => {
            console.error('[BUFFERED]', JSON.stringify(entry));
        });
    }
}

/**
 * Agenda flush dos logs
 */
function scheduleFlush(): void {
    if (flushTimeout) return;
    
    flushTimeout = setTimeout(async () => {
        flushTimeout = null;
        await flushLogs();
    }, FLUSH_INTERVAL_MS);
}

/**
 * Core logging function
 */
function log(
    level: LogLevel,
    message: string,
    context: LogContext = {},
    error?: unknown
): void {
    const entry: LogEntry = {
        level,
        message,
        context,
        timestamp: new Date().toISOString(),
        error: serializeError(error),
    };
    
    // Sempre output no console
    consoleOutput(entry);
    
    // Persiste se nível crítico
    if (PERSIST_LEVELS.includes(level)) {
        logBuffer.push(entry);
        
        if (logBuffer.length >= MAX_BUFFER_SIZE) {
            flushLogs();
        } else {
            scheduleFlush();
        }
    }
}

/**
 * Logger API
 */
export const logger = {
    debug: (message: string, context?: LogContext) => log('debug', message, context),
    info: (message: string, context?: LogContext) => log('info', message, context),
    warn: (message: string, context?: LogContext) => log('warn', message, context),
    error: (message: string, error?: unknown, context?: LogContext) => log('error', message, context, error),
    critical: (message: string, error?: unknown, context?: LogContext) => log('critical', message, context, error),
    
    /**
     * Timer para medir duração de operações
     */
    timer: (action: string) => {
        const start = Date.now();
        return {
            end: (message?: string) => {
                const duration = Date.now() - start;
                log('info', message || `${action} completed`, { action, duration });
                return duration;
            },
            error: (error: unknown, message?: string) => {
                const duration = Date.now() - start;
                log('error', message || `${action} failed`, { action, duration }, error);
                return duration;
            },
        };
    },
    
    /**
     * Force flush (útil antes de shutdown)
     */
    flush: flushLogs,
};

/**
 * Helper para criar logger com contexto fixo
 */
export function createLogger(baseContext: LogContext) {
    return {
        debug: (message: string, context?: LogContext) => 
            logger.debug(message, { ...baseContext, ...context }),
        info: (message: string, context?: LogContext) => 
            logger.info(message, { ...baseContext, ...context }),
        warn: (message: string, context?: LogContext) => 
            logger.warn(message, { ...baseContext, ...context }),
        error: (message: string, error?: unknown, context?: LogContext) => 
            logger.error(message, error, { ...baseContext, ...context }),
        critical: (message: string, error?: unknown, context?: LogContext) => 
            logger.critical(message, error, { ...baseContext, ...context }),
        timer: (action: string) => logger.timer(action),
    };
}

export default logger;


