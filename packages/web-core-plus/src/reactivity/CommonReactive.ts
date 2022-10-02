export class CommonReactive {
    protected vm: any;
    constructor(vm) {
        this.vm = vm;
    }

    public proxy(target, sourceKey, key) {
        Object.defineProperty(target, key, {
            get() {
                return this[sourceKey][key];
            },
            set(val) {
                this[sourceKey][key] = val;
            }
        });
    }
}
