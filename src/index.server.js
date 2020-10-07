const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin/auth.route');
const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');

//environment variable or you can say constants
env.config();

//middleware
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

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

app.use(cors());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});