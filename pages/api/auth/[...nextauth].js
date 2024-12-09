// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase, sql } from '../../../dbConfig';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // Conectar a la base de datos utilizando las variables de entorno
          const pool = await connectToDatabase();

          // Consultar la base de datos para verificar las credenciales
          const result = await pool.request()
            .input('username', sql.VarChar, credentials.username)
            .input('password', sql.VarChar, credentials.password)
            .query(`
              SELECT * 
              FROM dbo.Usuarios 
              WHERE username = @username AND password = @password
            `);

          // Si se encuentra el usuario, devolver el objeto usuario
          if (result.recordset.length > 0) {
            const user = result.recordset[0];
            return { id: user.id, name: user.username, email: user.email };
          }

          // Si no se encuentran las credenciales, devolver null
          return null;
        } catch (err) {
          console.error('Error connecting to the database or executing query', err);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async signIn(user, account, profile) {
      return true;  // Puedes personalizar esta parte si necesitas hacer algo más
    },
    async redirect(url, baseUrl) {
      return '/products';  // Puedes ajustar la URL de redirección
    }
  }
});
