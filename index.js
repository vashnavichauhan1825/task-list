// require express for setting up the express server
const express = require('express');

// set up the port number
const port = 8000;

// importing the DataBase
const db = require('./config/mongoose');

// importng the Schema For tasks
const  Task  = require('./models/task');

// using express
const app = express();

// using static files
app.use(express.static("./views"));
// to use encrypted data
app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// rendering the App Page
app.get('/', function(req, res){

    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task,
        });
    }
)});


// creating Tasks
app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        //console.log(newtask);
        return res.redirect('back');

    });
});




// delete item from the table
app.get('/delete-item/', function(req,res){
    
    let id = req.query.id;

    Task.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting items from db !');
            return;
        }
        return res.redirect('back');
    })
   
})

// make the app to listen on asigned port number
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});