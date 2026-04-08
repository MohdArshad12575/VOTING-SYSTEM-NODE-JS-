import express from 'express';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import candidateRoute from './routes/candidateRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/user', userRoute); //  this is mounting
app.use('/candidate', candidateRoute); 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});