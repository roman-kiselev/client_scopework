import { RoleString } from '../config';

export const checkRole = (
    data: string[],
    name: RoleString | RoleString[]
): boolean => {
    if (Array.isArray(name)) {
        return name.some((item) => data.includes(item));
    }

    return data.includes(name);
};
