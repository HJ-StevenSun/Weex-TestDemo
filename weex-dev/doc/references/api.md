# APIs
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/30"  class="weex-translate">cn</a>

You can access these apis through `this`(Vm) context in script methods.

e.g.

```html
<script>
module.exports = {
    methods: {
        somemethod: function() {
            this.$vm('someId');
        }
    }
}
</script>
```

## $(id)

**Deprecated**, please use `$vm` instead.

## $el(id)

Return the element referenced by specific id.

### Arguments

* `id`*(string)*: the unique identifier.

### Returns

* *(Element)*: an Element object referenced.

### Tips
* id is only guaranteed to be unique within the current (page)components, if you are looking for the parent components or child components, you can make use of the communication mode between components.
* Further reading: [id](../syntax/id.md), [Communicate Between Components](../syntax/comm.md)

## $vm(id)

Return the vm object referenced by specific id.

### Arguments

* `id`*(string)*: the unique identifier.

### Returns

* `vm`*(Vm)*: a Vm object referenced.

### Tips
* id is only guaranteed to be unique within the current (page)components, if you are looking for the parent components or child components, you can make use of the communication mode between components.
* Further reading: [id](../syntax/id.md), [Communicate Between Components](../syntax/comm.md)

## $getConfig()

Get the current global environment variables and configuration information.

### Returns

 * `config`*(object)*: the object of config.
 * `bundleUrl`*(string)*: the url of bundle.
 * `debug`*(boolean)*: if is debug mode. 
 * `env`*(object)*: a object of envrioment.
    * `weexVersion`*(string)*: a version of weex sdk.
    * `appName`*(string)*: a name of app.
    * `appVersion`*(string)*: a version of app.
    * `platform`*(string)*: the platform, one of `iOS`, `Android` and `Web`.
    * `osVersion`*(string)*: the version of os.
    * `deviceModel`*(string)*: the model of device. **native only**
    * `deviceWidth`*(number)*: the width of device, default is `750`.
    * `deviceHeight`*(number)*: the height of device.

## $call(module, method, ...args)

**Deprecated**, please use `require('@weex-module/module')[method](...args)` instead. See [modules](../modules/REAME.md) for more information

