import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const reset = () => setValue(initValue);

    const attributes = {
        value,
        onChange: (e) => setValue(e.target.value),
    };

    return [value, reset, attributes];
};

export default useInput;
