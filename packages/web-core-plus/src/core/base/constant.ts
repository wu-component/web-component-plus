import { KeyMap } from "@/share";
import { InjectConfig, PropertyDeclaration, ProvideConfig, WatchOptions } from "@/type";
import { WuComponent } from "@/core/base/WuComponent";

export const ElementProperties: KeyMap<typeof WuComponent, string, PropertyDeclaration> = new KeyMap();

export const Descriptors: KeyMap<typeof WuComponent, string, (defaultValue?: never) => PropertyDescriptor> = new KeyMap();

export const WatchDescriptors: KeyMap<typeof WuComponent, string, WatchOptions> = new KeyMap();

export const ProvideDescriptors: KeyMap<typeof WuComponent, string, ProvideConfig> = new KeyMap();

export const InjectDescriptors: KeyMap<typeof WuComponent, string, InjectConfig> = new KeyMap();

