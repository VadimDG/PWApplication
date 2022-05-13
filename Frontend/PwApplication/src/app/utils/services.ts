export function getLocalStorageValueByKey(key: string): string | null {
    return localStorage.getItem(key);
}

export function setLocalStorageValueByKey(key: string, value: string ): void {
    localStorage.setItem(key, value);
}

export function tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }