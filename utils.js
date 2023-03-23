
const isAlphabetic = (key) => {
    return key.length === 1 && /[a-z]+/.test(key);
}