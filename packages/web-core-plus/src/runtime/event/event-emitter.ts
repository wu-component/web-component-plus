interface Listener {
    (...args: any[]): void;
    fn?: Listener;
}
interface Events {
    [eventName: string]: Listener[];
}

class EventEmitter {
    protected events: Events = {};

    public on(eventName: string, listener: Listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [ listener ];
        } else {
            this.events[eventName].push(listener);
        }
        return this;
    }

    public emit(eventName: string, ...args: any[]) {
        if (!this.events[eventName]) return false;
        this.events[eventName].forEach((listener: Listener) => listener(...args));
        return true;
    }

    public off(eventName: string, listener: Listener) {
        const listeners = this.events[eventName];
        if (listeners) {
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i] === listener || listeners[i] === listener.fn) {
                    listeners.splice(i, 1);
                }
            }
        }
        return this;
    }

    public once(eventName: string, listener: Listener) {
        const on: Listener = (...args) => {
            listener(...args);
            this.off(eventName, on);
        };
        listener.fn = on;
        this.on(eventName, on);
        return this;
    }
}

export default EventEmitter;
