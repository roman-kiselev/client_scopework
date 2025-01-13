export const replacementValue = (value: string | undefined): string => {
    if (value !== undefined) {
        const arrValue = Array.from(value);
        const indexPoint = arrValue.findIndex((item) => item === '.');
        const indexComma = arrValue.findIndex((item) => item === ',');

        if (indexPoint === -1 && indexComma === -1) {
            return arrValue.join('');
        }
        if (indexPoint !== -1) {
            return arrValue.join('');
        }
        if (indexComma !== -1) {
            const newArrValue = [...arrValue];
            newArrValue[indexComma] = '.';
            return newArrValue.join('');
        }
    }

    return '';
};
