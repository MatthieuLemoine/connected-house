# Angular Material Express Seed

A seed for Angular Material using Express.
This seed tries to follow some of the rules of John Papa's [angular-styleguide](https://github.com/johnpapa/angular-styleguide).

This awesome seed uses a bunch of great tools and technologies such as :

<ul>
    <li>Angular</li>
    <li>Angular Material</li>
    <li>Gulp</li>
    <li>Livereload</li>
    <li>Express</li>
    <li>SASS</li>
    <li>ES6 (ES6 branch)</li>
</ul>

## Dependencies

Gulp is required to build AMES :

    npm install -g gulp

## Install

Clone the repository :

    git clone git@github.com:/MatthieuLemoine/angular-material-express-seed.git

Install the dependencies :

    cd angular-material-express-seed && npm install

## Run

    npm start

## Build

    gulp

Gulp builds sass, js files and watch for changes in it and in .html files.

To use Livereload you need to install the Livereload extension for your browser.

## ES6 Support

This seed uses babel to enable browser ES6 support.
To use AMES with ES6 you need to use the ES6 branch.

    git clone -b es6 git@github.com:/MatthieuLemoine/angular-material-express-seed.git


## John Papa compliance

For references : [angular-styleguide](https://github.com/johnpapa/angular-styleguide)

Single Responsibility  :

    In the public/js/ folder, each file contains only one component.

IIFE :

    All angular components are wrapped in IIFE.

Modules :

    Respect Definitions / Getters / Setters / Named Functions rules

Controllers / Avoid using $scope :

    This seed uses the "controllerAs View" syntax in index.html and templates/objects.html
    and the "controllerAs with vm" syntax in boths controllers.

Bindable Members Up Top

Defer Controller Logic to Services

## References

[Angular](https://angularjs.org/)<br>
[Angular Material](https://material.angularjs.org/latest/)<br>
[Gulp](http://gulpjs.com/)<br>
[Livereload](http://livereload.com/)<br>
[Express](http://expressjs.com/en/index.html)<br>
[SASS](http://sass-lang.com/)<br>
[ES6](http://es6-features.org/)<br>
[John Papa angular-styleguide](https://github.com/johnpapa/angular-styleguide)<br>
