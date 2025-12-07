async function registrarUsuario(usuario, pass) {
    const existe = await obtenerUsuario(usuario);
    if (existe) return false;
    return await agregarUsuario(usuario, pass);
}

async function login(usuario, pass) {
    const datos = await obtenerUsuario(usuario);
    if (!datos) return false;
    return datos.pass === pass;
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
}