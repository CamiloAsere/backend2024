import express from 'express'; 
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
const app = express(); 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 
app.use('/static', express.static(path.join(__dirname, 'public')));

//../react-js/dist/index.html
app.use(express.static(path.join(__dirname, 'dist')));

// PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(5000);
console.log('Server is listening on http://localhost:5000');