export function getLocalStorageValueByKey(key: string): string | null {
    return localStorage.getItem(key);
}

export function setLocalStorageValueByKey(key: string, value: string ): void {
    localStorage.setItem(key, value);
}