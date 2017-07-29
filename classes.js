const makeClass = fn =>
    (class {
        constructor(fn2){
            fn && fn.call(this);
            fn2 && fn2.call(this);
        }

        static getFn() {
            return fn;
        }
    });

const add = (propName, prop) => cl =>
    (cl.prototype[propName] ? console.log(`${propName} already exists`) : 
        cl.prototype[propName] = prop, cl);

const addFn = fn => cl => add(fn.name, fn)(cl);

const makeObj = (cl, fn) => new cl(fn ? fn : undefined);

const child = (...classes) => fn => {
    let child = makeClass(fn);
    Object.assign(child.prototype, ...classes.map(cl => cl.prototype));
    return child;
}

const cloneClass = cl => child(cl)(cl.getFn());

const mix = (propName, prop) => cl =>
    add(propName, prop)(cloneClass(cl));

const mixin = fn => cl => mix(fn.name, fn)(cl);

module.exports = {
    makeClass: makeClass,
    add: add,
    addFn: addFn,
    makeObj: makeObj,
    child: child,
    cloneClass: cloneClass,
    mix: mix,
    mixin: mixin
}