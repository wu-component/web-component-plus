import 'reflect-metadata';
import { COMPONENT_EVENT_EMITTER_KEY } from '../app-data';
import EventEmitter from '../runtime/event/event-emitter';

export function Event(...arg): PropertyDecorator {
    return function(target: any, attr: any) {
        let _value = undefined;
        Object.defineProperty(target, attr, {
            get: () => {
                _value = Reflect.getMetadata(COMPONENT_EVENT_EMITTER_KEY, target);
                if (!_value) {
                    _value = new EventEmitter();
                    Reflect.defineMetadata(COMPONENT_EVENT_EMITTER_KEY, _value, target);
                }
                return _value;
            },
        });
    };
}
