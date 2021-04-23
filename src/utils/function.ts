export function debounce(fn: Function, wait: number, callFirst: boolean = false) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const clear = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const debounceWrapper = function (this: any) {
    if (!wait) {
      return fn.apply(this as any, arguments);
    }

    const context = this;
    const args = arguments;
    const callNow = callFirst && !timeout;

    clear();

    timeout = setTimeout(function () {
      timeout = null;

      if (!callNow) {
        return fn.apply(context, args);
      }
    }, wait);

    if (callNow) {
      return fn.apply(this, arguments);
    }
  };

  debounceWrapper.cancel = clear;

  return debounceWrapper;
}
