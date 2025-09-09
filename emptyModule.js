// Empty module to replace react-dom
module.exports = {};
module.exports.default = {};

// Mock the specific flushSync function that @react-aria animation uses
module.exports.flushSync = fn => {
  if (typeof fn === 'function') {
    return fn();
  }
};

// Mock other react-dom functions
module.exports.render = () => {};
module.exports.hydrate = () => {};
module.exports.unmountComponentAtNode = () => {};
module.exports.findDOMNode = () => null;
module.exports.createPortal = () => null;

// Export everything as both named and default
Object.keys(module.exports).forEach(key => {
  if (key !== 'default') {
    module.exports.default[key] = module.exports[key];
  }
});
