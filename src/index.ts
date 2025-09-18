import express from "express";
import router from "./routes/app.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api',router)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
