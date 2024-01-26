//timer.js//
export const timer = (callback, initMs) => {
    let timeout = setTimeout(callback, initMs);
    let startTime = new Date().getTime();
    let currentMs = initMs;
    return {
      stop: () => clearTimeout(timeout),
      extend: (ms) => {
        clearTimeout(timeout);
        currentMs = currentMs - (new Date().getTime() - startTime) + ms;
        startTime = new Date().getTime();
        timeout = setTimeout(callback, currentMs);
      },
      reset: (ms) => {
        clearTimeout(timeout);
        currentMs = ms;
        startTime = new Date().getTime();
        timeout = setTimeout(callback, currentMs);
      },
      getRemainingTime: () => currentMs - (new Date().getTime() - startTime)
    }
  }
  
  