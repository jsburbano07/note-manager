import { INotify } from "../interfaces/ui.interface";

export const NOTIFY_CONTANTS = {
    error: (message: string): INotify => ({
        title: 'Error',
        content: message,
        severity: 'error'
    }),
    warning: (message: string): INotify => ({
        title: 'Warning',
        content: message,
        severity: 'warn'
    }),
    success: (message: string): INotify => ({
        title: 'Success',
        content: message,
        severity: 'success'
    }),
}