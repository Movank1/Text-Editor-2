import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that takes some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Database and version
  const jateDb = await openDB('jate', 1);
   // New transaction specifying db and privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open desired object store
  const store = tx.objectStore('jate');
  // Pass in content
  const request = store.put({ id: 1, value: content });
  // Confirmation
  const result = await request;
  console.log('Data saved to the database', result.value);
};

// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
// Database and version
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
// New transaction specifying db and privileges
  const tx = jateDb.transaction('jate', 'readonly');
// Open desired object store
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();
