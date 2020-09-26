const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin/auth.route');
const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route');
//environment variable or you can say constants
env.config();

//middleware
app.use(express.json());

//MongoDB connection
//mongodb+srv://admin:<password>@cluster0.mfg8v.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.mfg8v.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
                {
                    useNewUrlParser: true, 
                    useUnifiedTopology: true,
                    useCreateIndex: true
}).then(() => {
    console.log("Database connected!");
});

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});