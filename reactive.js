export function reactive(obj) {
    const handlers = new Map();
  
    const proxy = new Proxy(obj, {
      get(target, key) {
        return target[key];
      },
      set(target, key, value) {
        target[key] = value;
        if (handlers.has(key)) {
          handlers.get(key).forEach(handler => handler(value));
        }
        return true;
      }
    });
  
    proxy.watch = function(key, handler) {
      if (!handlers.has(key)) {
        handlers.set(key, []);
      }
      handlers.get(key).push(handler);
    };
  
    return proxy;
  }
  
 
  
