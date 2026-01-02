const LOCALSTORAGE_KEY_PREFIX = "easybusyhub";

const StorageService = {
  get(item: string): string | null {
    try {
      return window.localStorage.getItem(`${LOCALSTORAGE_KEY_PREFIX}:${item}`);
    } catch (e) {
      return null;
    }
  },
  set(item: string, value: string): void {
    try {
      window.localStorage.setItem(`${LOCALSTORAGE_KEY_PREFIX}:${item}`, value);
    } catch (e) {}
  },
};

export default StorageService;
