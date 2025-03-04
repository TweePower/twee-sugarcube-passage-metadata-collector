export default class EventHandlerCollection {
    private handlers: ((item: any) => {})[] = [];

    public add(handler: () => {}): void {
        this.handlers.push(handler);
    }

    public clear(): void {
        this.handlers = [];
    }

    public count(): number {
        return this.handlers.length;
    }

    public all(): ((item: any) => {})[] {
        return this.handlers;
    }
}
