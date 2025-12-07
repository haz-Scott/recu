let db;

const request = indexedDB.open("miBD", 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;

    if (!db.objectStoreNames.contains("usuarios")) {
        const store = db.createObjectStore("usuarios", { keyPath: "usuario" });
        store.createIndex("usuario", "usuario", { unique: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
};

request.onerror = () => {
    console.error("Error abriendo la BD");
};

function agregarUsuario(usuario, pass) {
    return new Promise((resolve) => {
        const tx = db.transaction("usuarios", "readwrite");
        const store = tx.objectStore("usuarios");
        const req = store.add({ usuario, pass });

        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
    });
}

function obtenerUsuario(usuario) {
    return new Promise((resolve) => {
        const tx = db.transaction("usuarios", "readonly");
        const store = tx.objectStore("usuarios");
        const req = store.get(usuario);

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
    });
}