var express = require("express");
var app = express();
require('dotenv').config();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require("mysql");

console.log('--------------the environment we are using----------------');
console.log(app.settings.env);
console.log('--------------the environment we are using----------------');

if (app.settings.env == 'development') {
    var connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: process.env.DB_PASS,
        database: "quiz_db"
    });
} else {
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
}

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

var counter = 0;
var username = "";

app.get('/', function (req, res) {
    res.render('start', {});
});

app.post('/question-one', function (req, res) {
    username = req.body.name;

    res.render('questions/questionOne');
});


app.post('/question-two', function (req, res) {
    if (req.body.question_one == "126") {
        counter++;
    }

    res.render('questions/questionTwo')
});

app.post('/question-three', function (req, res) {
    if (req.body.question_two == "13") {
        counter++;
    }
    res.render('questions/questionThree')
});

app.post('/question-four', function (req, res) {
    if (req.body.question_three == "Troy") {
        counter++;
    }
    res.render('questions/questionFour')
});

app.post('/question-five', function (req, res) {
    if (req.body.question_four == "Cotton with tape") {
        counter++;
    }
    res.render('questions/questionFive')
});

app.post('/question-six', function (req, res) {
    if (req.body.question_five == "Cooper") {
        counter++;
    }
    res.render('questions/questionSix')
});

app.post('/question-seven', function (req, res) {
    if (req.body.question_six == "56") {
        counter++;
    }
    res.render('questions/questionSeven')
});

app.post('/question-eight', function (req, res) {
    if (req.body.question_seven == "6 Months or 25 Reams Free") {
        counter++;
    }
    res.render('questions/questionEight')
});

app.post('/question-nine', function (req, res) {
    if (req.body.question_eight == "Justin") {
        counter++;
    }
    res.render('questions/questionNine')
});

app.post('/question-ten', function (req, res) {
    if (req.body.question_nine == "Chunky") {
        counter++;
    }
    res.render('questions/questionTen')
});

app.post('/results', function (req, res) {
    if (req.body.question_ten == "Egg Salad") {
        counter++;
    }
    var incorrect = 10 - parseInt(counter);

    var query = "INSERT INTO scores (user_name, score) VALUES (?, ?)";
    connection.query(query, [username, counter], function (err, result) {
        res.render('results', {
            counter: counter,
            incorrect: incorrect

        });
    });
})

app.post('/start-over', function (req, res) {
    counter = 0;
    res.render('start')
})

app.post('/highscores', function (req, res) {
    counter = 0;
    var query = "SELECT * FROM scores ORDER BY score DESC";
    connection.query(query, function (err, result) {
        res.render('highscores', {
            scores: result
        })
    })
})

var port = 3001;

if (process.env.PORT){
    port = process.env.PORT;
}

app.listen(port, function () {
    console.log('listening on port ' + port);
});
