// pages/products.js

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './Products.module.css';

export default function Products({ session }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Productos</h1>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.ProductID} className={styles.listItem}>
            <div className={styles.nombre}>{product.nombre}</div>
            <div className={styles.descripcion}>
              <span>Precio: ${product.precio}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


