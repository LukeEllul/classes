export const makeClass = (fn=undefined) =>
    (class {
        [name: string]: any;
        constructor(fn2){
            fn && fn.call(this);
            fn2 && fn2.call(this);
        }

        static getFn() {
            return fn;
        }
    });

export const add = (propName, prop) => cl =>
    (cl.prototype[propName] ? console.log(`${propName} already exists`) : 
        cl.prototype[propName] = prop, cl);

export const addFn = fn => cl => add(fn.name, fn)(cl);

export const makeObj = (cl, fn=undefined) => new cl(fn ? fn : undefined);

export const child = (...classes) => (fn=undefined) => {
    let child = makeClass(fn);
    Object.assign(child.prototype, ...classes.map(cl => cl.prototype));
    return child;
}

export const cloneClass = cl => child(cl)(cl.getFn());

export const mix = (propName, prop) => cl =>
    add(propName, prop)(cloneClass(cl));

export const mixin = fn => cl => mix(fn.name, fn)(cl);

hey hey