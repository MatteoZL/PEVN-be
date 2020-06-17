import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileupload from 'express-fileupload';
import history from 'connect-history-api-fallback';
import path from 'path';

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({useTempFiles: true}));
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
/* app.get('/', (req, res) => {
    res.send('Hello world with PEVN');
}); */
app.use('/', require('./routes/auth.routes'));
app.use('/professor', require('./routes/proffesor.routes'));
app.use('/student', require('./routes/student.routes'));

// Settings
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log('Listening port ' + app.get('port'));
});