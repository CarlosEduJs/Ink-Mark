// utils/indexedDB.ts
export const openDB = (
  dbName: string,
  storeName: string
): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const saveToDB = async (
  dbName: string,
  storeName: string,
  key: string,
  data: any
) => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.put(data, key);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};

export const getFromDB = async (
  dbName: string,
  storeName: string,
  key: string
): Promise<any> => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  const request = store.get(key);
  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};
