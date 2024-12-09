// pages/auth/signin.js
import { getCsrfToken } from 'next-auth/react';
import styles from './signin.module.css';
import inicio_inv from '../../images/inicio_inv.jpg';

export default function SignIn({ csrfToken }) {
  return (
    <div className='body'>
      <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Control de Inventarios</h1>
        <h4>PorFavor Ingrese sus Credenciales</h4>
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username
            <input name="username" type="text" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button type="submit">Iniciar Sesion</button>
        </form>
      </div>
      <div className={styles.loginImage}>
        <img src={inicio_inv} alt="Login" />
      </div>
    </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
