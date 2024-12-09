import { connectToDatabase } from '../../dbConfig';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET requests allowed' });
    }

    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM dbo.productos');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error en la conexión a la base de datos:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
