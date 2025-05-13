import express from 'express';
import appealRoutes from './appeal/routes';
import { prisma } from './lib/prisma';

const PORT = process.env.BACKEND_PORT || 4001;

const app = express();
app.use(express.json());
app.use('/api', appealRoutes);

const start = async () => {
	try {
		await prisma.$connect();
		app.listen(PORT, () => {
			console.log(`Сервер запущен на порту ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

process.on('beforeExit', async () => {
	await prisma.$disconnect();
});

start();
