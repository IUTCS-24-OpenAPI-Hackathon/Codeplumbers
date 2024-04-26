import type { AuthModel } from "pocketbase";

export const serializeNonPOJOs = (obj: AuthModel): AuthModel => {
    return structuredClone(obj);
};

export const generateUserName = (name: string): string => {
    return `${name.slice(0, 5)}${Math.random()}`;
}