// this is the express server

import express from 'express';
import router from './routes/index';

const app = express();
const PORT = 3800;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

export default app;
