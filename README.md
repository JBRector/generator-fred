# ![Introducing Fred](http://www.jasonrectorweb.com/images/fred-1.jpg) Introducing Fred

### A personal Front-End [Yeoman](http://yeoman.io) Generator

This is a generator I made to start responsive website projects. Your project doesn't have to be responsive, though. It uses SASS and has a gruntfile that I think covers pretty much everything I have needed to do.

## ![Fred has many features](http://www.jasonrectorweb.com/images/fred-2.jpg) Features

- Uses [SASS](http://sass-lang.com/) for CSS preprocessing
- Installs [Bootstrap](http://www.getbootstrap.com) (optional)
- Installs [jQuery](http://www.jquery.com) (optional)
- Installs [jRespond](https://github.com/ten1seven/jRespond) (optional) for managing your javascript on a responsive site
- Installs [jPanelmenu](http://jpanelmenu.com/) (optional) for an easy way to handle mobile navigation
- Installs [mustache.js](https://github.com/janl/mustache.js) and/or [Handlebars](http://handlebarsjs.com/) (optional) in case you need some nifty javascript templating
- Installs [underscore.js](http://underscorejs.org/) (optional) in case you like some useful programming helpers
- Installs [jQuery Cookie](https://github.com/carhartl/jquery-cookie) (optional) for all of your cookie-ing needs
- Installs [respond.js](https://github.com/scottjehl/Respond) (optional) in case you give a crap about your site looking good in IE8

- If you have [Image Optim](https://imageoptim.com/) installed, the grunt task will run it for you. If not, just let Fred know that you don't have it when he asks.

## ![Get started with Fred](http://www.jasonrectorweb.com/images/fred-3.jpg) Getting Started

### Dependencies

- If you're using Yeoman, you probably already have [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) installed. But if not, do that.
- [SASS](http://sass-lang.com/)
- The grunt svgmin task requires [SVGO](https://github.com/svg/svgo)

### Future Development Plans

- Make SVG minification/png conversion optional

## ![How to use Fred](http://www.jasonrectorweb.com/images/fred-4.png) Usage

Install - `npm install -g generator-fred`

Generate a new project - cd in to project directory and `yo fred`

To start a local development server with node: `grunt server`

To build for production: `grunt`

Please reference [USAGE](https://github.com/JBRector/generator-fred/blob/master/app/USAGE) for specifics on how to use the starter kit.

