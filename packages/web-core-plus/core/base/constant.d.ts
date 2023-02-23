import { KeyMap } from "@/share";
import { InjectConfig, PropertyDeclaration, ProvideConfig, WatchOptions } from "@/type";
import { WuComponent } from "@/core/base/WuComponent";
export declare const ElementProperties: KeyMap<typeof WuComponent, string, PropertyDeclaration>;
export declare const Descriptors: KeyMap<typeof WuComponent, string, (defaultValue?: never) => PropertyDescriptor>;
export declare const WatchDescriptors: KeyMap<typeof WuComponent, string, WatchOptions>;
export declare const ProvideDescriptors: KeyMap<typeof WuComponent, string, ProvideConfig>;
export declare const InjectDescriptors: KeyMap<typeof WuComponent, string, InjectConfig>;
