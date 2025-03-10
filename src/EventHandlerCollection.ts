export default class EventHandlerCollection<callbackArgumentType> {
    private handlers: ((item: callbackArgumentType) => void)[] = [];

    public add(handler: (item: callbackArgumentType) => void): void {
        this.handlers.push(handler);
    }

    public clear(): void {
        this.handlers = [];
    }

    public count(): number {
        return this.handlers.length;
    }

    public all(): ((item: callbackArgumentType) => void)[] {
        return this.handlers;
    }
}
