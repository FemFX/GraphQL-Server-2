const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const PORT       = process.env.PORT || 3000;

//GraphQL
const graphqlHttp = require('express-graphql');
const schema      = require('./schema/schema');

//MW
app.use('/graphql', graphqlHttp({
    schema 
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
//Connect to db
mongoose.connect('mongodb://localhost:27017/Graphql', { useNewUrlParser : true })
    .then(result => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
