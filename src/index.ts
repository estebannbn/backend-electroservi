import express from "express";
import appRoutes from "./routes/app.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api',appRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
