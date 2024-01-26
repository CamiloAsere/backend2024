//Signal.js 
function createSignalObject(obj) {
  const signalObject = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      let value = obj[key];

      Object.defineProperty(signalObject, key, {
        get() {
          return value;
        },
        set(newValue) {
          value = newValue;
          console.log(`Signal updated: ${key} = ${newValue}`);
        },
      });
    }
  }

  return signalObject;
}

// Create a new signal object
const state = createSignalObject({
  count: 0,
});

// Log the initial value of count
console.log(state.count); // Output: 0

// Update the value of count
state.count = 1; // Output: Signal updated: count = 1
