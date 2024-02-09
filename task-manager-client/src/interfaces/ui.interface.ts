export interface INotify {
    title: string,
    content: string,
    severity:  "success" | "info" | "warn" | "error" | undefined
}