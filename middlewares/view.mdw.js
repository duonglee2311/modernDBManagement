const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
// const numeral = require('numeral');

module.exports = function (app) {
  app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials',
    helpers:{
      section: hbs_sections(),
      format(val){
        return numeral(val).format('0,0');
      },
      ifCondition:(a, operator, b , options) => {
        const operators = {
          '==':function(l, r) {return l == r;},
          '===': function (l, r) { return l === r; },
        };
        if(!operators[operator]){
          throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }
        var res = operators[operator](a,b);
        if(res){
          return options.fn(this);
        }
        return options.inverse(this);
      },
      isLogin: (user) => {
        if(user != null){
          return true;
        }
        return false;
      },
      show_gender: (gender, user_gender) => {
        output = 'selected'
        if(gender === user_gender){
            return output;
        }
      },
      sum: (a,b) =>{
        // console.log("davao");
        // console.log(req.session.user);
        return a+b;
      }
    }
  }));
  app.set('view engine', 'hbs');
}