export function setLocalStorage(key: string, value: string) {
  if (typeof window === 'undefined') return null;
  window.localStorage.setItem(key, value);  
}

export function getLocalStorage(key: string): string | null{
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(key);  
}

export function deleteLocalStorage(key: string){
  if (typeof window === 'undefined') return null;
  return window.localStorage.removeItem(key);  
}

