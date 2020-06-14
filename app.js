import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
/* app.get('/', (req, res) => {
    res.send('Hello world with PEVN');
}); */
app.use('/', require('./routes/auth.routes'));
app.use('/professor', require('./routes/proffesor.routes'));
app.use('/student', require('./routes/student.routes'));

// Middleswares for Vue
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Settings
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log('Listening port ' + app.get('port'));
});