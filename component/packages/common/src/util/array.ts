// TODO: use native Array.find, Array.findIndex when IE support is dropped
const arrayFindIndex = function(arr, pred) {
    for (let i = 0; i !== arr.length; ++i) {
        if (pred(arr[i])) {
            return i;
        }
    }
    return -1;
};

export { arrayFindIndex };
