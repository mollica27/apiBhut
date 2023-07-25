const app = require('./app');


// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acessar http://localhost:${port}`);
});