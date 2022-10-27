import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateStorage')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateStorage', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jateStorage', 'readwrite');
    const store = tx.objectStore('jateStorage');
    const request = store.put({ jate: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  }

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jateStorage', 'readonly');
  const store = tx.objectStore('jateStorage');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
}
initdb();
