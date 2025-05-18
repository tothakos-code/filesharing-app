import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING || require('../keys.json').MONGO_DB_CONNECTION_STRING;
const PORT = process.env.PORT || require('../keys.json').DEFAULT_PORT;

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');
    
        const app = express();
        console.log('App created');
        app.use(express.json());
        app.use(morgan('dev'));
        app.use(express.static(path.join(__dirname, 'www')));
        
        app.use((req: any, res: any, next: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
            next();
        });
        console.log('Headers set');
        app.use('/api/authentication', require('./routes/authentication.routes'));
        app.use('/api/password', require('./routes/password.routes'));
        app.use('/api/users', require('./routes/users.routes'));
        app.use('/api/verification', require('./routes/verification.routes'));
        app.use('/api/categories', require('./routes/categories.routes'));
        app.use('/api/content', require('./routes/contents.routes'));
        app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
        app.use('/api/comment', require('./routes/comments.routes'));

        console.log('Routes initialized successfully');
        // app.use((req, res) => {
        //     res.sendFile(path.join(__dirname, 'www', 'index.html'));
        // });

        console.log('Init done!');
        app.listen(PORT, () => { console.log(`Listening for requests on port ${PORT}...`); });
    })
    .catch((err: any) => {
        console.log('Cannot start the app:', err);
        process.exit(1);
    });
