const controller = {};
const models = require('../models');

controller.init = async(req, res, next) => {
    res.locals.categories = await models.Category.findAll({
    include: [
        { model: models.Blog }],
    });
    res.locals.tags = await models.Tag.findAll();
    next();
};


controller.showList = async(req, res) => {
    let options = {
        include: [
            { model: models.Comment },
        ],
    };
    let blogs = await models.Blog.findAll(options);
    res.locals.blogs = blogs;
    res.render('index');
};

controller.showDetails = async(req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    let blog = await models.Blog.findOne({
        where: {id},
        include: [
            { model: models.Comment },
            { model: models.User },
            { model: models.Category },
            { model: models.Tag },
        ],

    })
    res.locals.blog = blog;
    res.render('details');
};

module.exports = controller;