const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./routes/routes');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const app = express();

const dbURI =
  'mongodb+srv://Adelina:anileda@cluster0.3jr3w.mongodb.net/Assignment_Adelina?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Connected to database'));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const registerController = require('./controllers/register');
app.use(registerController);
const loginController = require('./controllers/login');
const toDoController = require('./controllers/toDoList');
app.use(toDoController);
const { checkUser } = require('./middlewares/auth.middleware');
app.get('*', checkUser);
app.use(loginController);
app.use(Routes);
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
