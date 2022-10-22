## Decorators API

通过注解快速创建 WebComponent 组件。

### Component

该注解用于快速定义组件，内部实现了一些较为底层的逻辑，包括各类生命周期钩子函数、虚拟dom、dom事件等。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }
}
```

#### Api

```ts
interface CustomTagOptions {
    name: string;
    is?: ComponentEnums;
    css?: string;
    options?: ElementDefinitionOptions;
}
```

### Emit

该装饰器用于自定义 dom 事件，底层基于 CustomEvent 实现。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }

    @Emit('change')
    private change() {
        return {
            value: this.checked,
            name: this.name,
            label: this.label,
        };
    }
}
```

#### Api

Emit 必须传入事件名。

### Watch

该装饰器用于组件内部的监听。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }

    @Watch('checked')
    public checkedChange(val: any, oldVal: any) {}

}

```

#### Api

Watch 目前仅支持一个参数，为需要监听的属性，函数包含俩参数新值和旧值。

### Prop

该装饰器用于定义 Attribute。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }
    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

}
```

#### Api

```ts
export interface PropOptions {
    default?: any;
    type?: PropTyp;
}
```

### Inject

Inject 需要和 Provide 配套使用，Inject 用于接收父级组件注入的数据。

#### Example

如案例中从父级组件中接受 wuFormRef 数据，最常见的需求如在定义 Form 表单时，单个表单列需要拿到 Form 组件实例（类似 ElForm 组件）。

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }

    @Inject("wuFormRef")
    public wuForm;
}
```

#### Api

Inject 必须传入需要接收的变量名称。

### Provide

Provide 需要和 Inject 配套使用，Inject 用于向子孙组件注入数据。

#### Example

如示例中向子孙组件注入一个名为 wuFormRef 的数据。

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }

    @Provide("wuFormRef")
    public provideParentDescTitle() {
        return this;
    }
}
```

#### Api

Provide 的装饰对象必须是一个函数，该函数必须要有返回值，返回注入的数据。

### State

该装饰器用于定义组件内部的状态，用该注解装饰的属性和 Prop 一样，属性具备响应式的功能。

#### Example

```ts
@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }
    @State({ default: false, type: Boolean })
    public disabled: boolean;

}
```

#### Api

```ts
export interface StateOptions {
    default?: any;
    type?: PropTyp;
}
```
