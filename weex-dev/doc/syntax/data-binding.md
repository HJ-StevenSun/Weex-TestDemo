# Data-Binding
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/5"  class="weex-translate">cn</a>

In Weex, we use the *mustache* syntax `{{...}}` to bind data in `<template>` which are defined in `<script>`. Once data and template is bound, the data changes will influence the corresponding template content immediately and automatically.

## Binding data path

```html
<template>
  <container>
    <text style="font-size: {{size}}">{{title}}</text>
  </container>
</template>

<script>
  module.exports = {
    data: {
      size: 48,
      title: 'Alibaba Weex Team'
    }
  }
</script>
```

The code above will bind the `title` and `size` data field to `template`.

We can also use `.` syntax to bind cascading data structure. Let's look at the following code snippet:

```html
<template>
  <container>
    <text style="font-size: {{title.size}}">{{title.value}}</text>
  </container>
</template>

<script>
  module.exports = {
    data: {
      title: {
        size: 48,
        value: 'Alibaba Weex Team'
      }
    }
  }
</script>
```

## In-template expression

Inside data bindings, Weex supports simply javascript expressions, e.g.

```html
<template>
  <container style="flex-direction: row;">
    <text>{{firstName + ' ' + lastName}}</text>
  </container>
</template>
  
<script>
  module.exports = {
    data: {
      firstName: 'John',
      lastName: 'Smith'
    }
  }
</script>
```

The expression will be evaluated in the data scope of current context.

**NOTE: EACH BINDING CAN ONLY CONTAIN ONE SINGLE EXPRESSION**

## Computed Properties 
<span class="weex-version">0.5</span>

According to simple operations, in-template expressions are very convenient. But if you want to put more logic into the template, you should use a computed property.

e.g.
```html
<template>
  <container style="flex-direction: row;">
    <text>{{fullName}}</text>
    <text onclick="changeName" style="margin-left:10px;">CHANGE NAME</text>
  </container>
</template>
  
<script>
  module.exports = {
    data: {
      firstName: 'John',
      lastName: 'Smith'
    },
    computed: {
      fullName: {
        get: function() {
          return this.firstName + ' ' + this.lastName
        },

        set: function(v) {
          var s = v.split(' ')
          this.firstName = s[0]
          this.lastName = s[1]
        }
      }
    },
    methods: {
      changeName: function() {
        this.fullName = 'Terry King'
      }
    }
  }
</script>
```

Here we have declared a computed property fullName. The function we provided will be used as the getter function for concating firstName and lastName.

Otherwise when you call `changeName` after click, the setter will be invoked and this.firstName and this.lastName will be updated accordingly.

**NOTE: `data` and `methods` can't have duplicated fields. 'Cause in the execution context -- `this`, we can access both of them.**

## Usage of some special attributes in Data-Binding

### Styles: `style` or `class`

the style of a component can be bind using the `style` attribute:

```html
<template>
  <text style="font-size: {{size}}; color: {{color}}; ...">...</text>
</template>
```

while style can also get bound with `class` attribute, multiple classnames can be split by spaces:

```html
<template>
  <container>
    <text class="{{size}}"></text>
    <text class="title {{status}}"></text>
  </container>
</template>
```

here if `{{size}}` and `{{status}}` have empty value, then only `class="title"` will be rendered.

* [See more about style and class](./style-n-class.md)

### Event Handler: `on...`

The event handler is an attribute which name has a prefix `on...`. The other part of attribute name is event type and the value is event handler name. We don't need to add mustache around the method name or add parentheses to call it.

```html
<template>
  <text onclick="toggle">Toggle</text>
</template>

<script>
  module.exports = {
    methods: {
      toggle: function () {
        // todo
      }
    }
  }
</script>
```

### `if` & `repeat`

`if` attribute can control the display of a component by a truthy/falsy value.

```html
<template>
  <container style="flex-direction: column;">
    <text onclick="toggle">Toggle</text>
    <image src="..." if="{{shown}}"></image>
  </container>
</template>

<script>
  module.exports = {
    data: {
      shown: true
    },
    methods: {
      toggle: function () {
        this.shown = !this.shown
      }
    }
  }
</script>
```

We can also use `repeat` attribute to generate a list.

**NOTE: When you want to mutate an array in `data`. Something limitations existing below:**

When you directly set an item with the index (`vm.items[0] = {};`), it won't trigger view update. So we have a prototype methods: `$set(index, item)`.

```
// same as `example1.items[0] = ...` but triggers view update
example1.items.$set(0, { childMsg: 'Changed!'})
```

When you modify the length of the Array (`vm.items.length = 0`), it won't trigger view update too. We recommend you just replace `items` with an empty array instead.

```
// same as `example2.items.length = 0` but triggers view update
example2.items = []
```

* [See more about display logic control](./display-logic.md)

Next, let's have a look at [style and class](./style-n-class.md).

