const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressHbs = require('express-handlebars');
const { createPagination } = require('express-handlebars-paginate');

// Cau hinh tinh
app.use(express.static(__dirname + '/html'));


// Cau hinh view template
app.engine('hbs', expressHbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        createPagination,
        formatDate: (date) => {
            return new Date(date).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        },
    },
    })
);
app.set('view engine', 'hbs');

// Routes
// Trang chu (index): /, /blogs
// Details" /blogs/:id
app.get('/', (req, res) => res.redirect('/blogs'));
app.use('/blogs', require('./routes/blogRouter.js'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
