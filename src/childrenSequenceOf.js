import assign from 'object.assign';

import sequenceOf from './sequenceOf';
import renderableChildren from './helpers/renderableChildren';
import wrapValidator from './helpers/wrapValidator';

export default function childrenSequenceOfValidator(...specifiers) {
  const seq = sequenceOf(...specifiers);

  const validator = function childrenSequenceOf(props, propName, componentName, ...rest) {
    if (propName !== 'children') {
      return new TypeError(`${componentName} is using the childrenSequenceOf validator on non-children prop "${propName}"`);
    }

    const propValue = props[propName];
    const children = renderableChildren(propValue);
    if (children.length === 0) {
      return null;
    }
    return seq(assign({}, props, { children }), propName, componentName, ...rest);
  };

  validator.isRequired = function childrenSequenceOfRequired(
    props,
    propName,
    componentName,
    ...rest
  ) {
    if (propName !== 'children') {
      return new TypeError(`${componentName} is using the childrenSequenceOf validator on non-children prop "${propName}"`);
    }

    const propValue = props[propName];
    const children = renderableChildren(propValue);
    if (children.length === 0) {
      return new TypeError(`${componentName}: renderable children are required.`);
    }
    return seq.isRequired(assign({}, props, { children }), propName, componentName, ...rest);
  };

  return wrapValidator(validator, 'childrenSequenceOf', specifiers);
}
