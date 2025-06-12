document.getElementById("formularioLogin").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = document.getElementById("user").value;
    const contraseña = document.getElementById("password").value;

    await logearUsuario(usuario, contraseña);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('mostrar').addEventListener('change', function () {
        var passwordInput = document.getElementById('password');
        passwordInput.type = this.checked ? 'text' : 'password';
        passwordInput.focus();
    });
});

async function logearUsuario(user, password) {
    try {
        console.log(user, password);
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, password }),
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json();
            let modal = document.getElementById('loadingModal');
            modal.style.display = 'flex';
            console.log(data.message);
            setTimeout(() => {
                window.location.href = '/principal';
            }, 3000);
        } else {
            const error = await response.json();
            console.error("Error:", error.error);
            var fallo = document.createElement('p');
            fallo.innerText = error.error;
            console.log(fallo);

            //Añadir un mensaje en el html aquí para indicar el resultado de la operación
            if (error.error == "Usuario inexistente") {
                const usuario = document.getElementById("user");
                usuario.parentNode.insertBefore(fallo, usuario.nextSibling);
            } else if (error.error == "Este usuario ya está conectado") {
                const usuario = document.getElementById("user");
                usuario.parentNode.insertBefore(fallo, usuario.nextSibling);
            } else if (error.error == "Contraseña incorrecta") {
                const contraseña = document.getElementById("password");
                contraseña.parentNode.insertBefore(fallo, contraseña.nextSibling);
            }
        }
    } catch (error) {
        console.error("Houston, tenemos un problema:", error);
    } finally {
        let modal = document.getElementById('loadingModal');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);

    }
}