const openRequest = indexedDB.open('shoplite-db', 1);

openRequest.addEventListener('upgradeneeded', () => {
  const database = openRequest.result;

  if (!database.objectStoreNames.contains('products')) {
    const productStore = database.createObjectStore('products', {
      keyPath: 'id',
    });

    productStore.createIndex('name-index', 'name');
  }
});

openRequest.addEventListener('success', () => {
  const database = openRequest.result;
  const transaction = database.transaction('products', 'readwrite');
  const productStore = transaction.objectStore('products');

  productStore.put({
    id: 'p1',
    name: 'Keyboard',
    price: 99,
  });
});
