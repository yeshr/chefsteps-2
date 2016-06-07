const express = require('express');
const compression = require('compression');

const app = express();

const port = process.env.PORT || 3000;
const domain =  process.env.DOMAIN;

function ensureDomain(req, res, next) {
  if (!domain || req.hostname === domain) {
    // OK, continue
    return next();
  };

  // handle port numbers if you need non defaults
  res.redirect(`http://${domain}${req.url}`);
};


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/dist/public');
// at top of routing calls
app.all('*', ensureDomain);

app.use(compression());

// default to .html (you can omit the extension in the URL)
app.use(express.static(__dirname + '/dist/public', {'extensions': ['html']}));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, () => {
  console.log('Server running...');
});
