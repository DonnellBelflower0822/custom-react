export function createContext(initialValue?) {
  Provider._value = initialValue;
  function Provider(props) {
    // 让对象指向不变
    if (!Provider._value) {
      Provider._value = {};
    }
    Provider._value = Object.assign(Provider._value, props.value);
    return props.children;
  }

  function Consumer(props) {
    return props.children(Provider._value);
  }

  return {
    Consumer,
    Provider,
  };
}