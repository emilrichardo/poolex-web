export default function ({ req, redirect }) {
    const sessionCookie = req.headers.cookie
      ? req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith('session_io='))
      : null;

    if (!sessionCookie) {
      // La cookie no se encontró o no tiene el formato esperado
      return redirect('/error');
    }

    const sessionValue = sessionCookie.split('=')[1];

    // Hacer lo que necesites con el valor de la cookie en el servidor
    console.log(sessionValue);
  }
