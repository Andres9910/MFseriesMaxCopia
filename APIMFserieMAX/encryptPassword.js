const bcrypt = require('bcrypt');

const encriptarContraseña = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptar con 10 rondas de salt
        console.log(`Contraseña original: ${password}`);
        console.log(`Contraseña encriptada: ${hashedPassword}`);
        return hashedPassword;
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
    }
};

// Cambia "tuContraseñaSegura" por la contraseña que quieres encriptar
encriptarContraseña('9910andres');
