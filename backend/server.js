// Local development only:  npm run dev:backend   (Vercel uses api/index.js instead)
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
