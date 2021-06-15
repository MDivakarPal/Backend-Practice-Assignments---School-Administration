const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

let students = require("./InitialData");


let studentRealtimeData = [...students];

app.use(express.urlencoded({extended:true}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// your code goes here

app.get("/home" ,(_, res) => {
    res.send("Home");
})
app.get("/api/student", (req, res) => {

res.status(200).json({
    students:studentRealtimeData
});
})


app.get("/api/student/:id", (req, res) => {
    const {id} = req.params;
    const foundStudent =  studentRealtimeData.find( ({id: objId}) => (id==objId));
    if(foundStudent) {
        res.status(200).json({
            student: foundStudent
        });
    }
   else{
        res.sendStatus(404)
    }

})

app.post("/api/student", (req, res) => {
    const  {name,currentClass,division} =  JSON.parse(Object.keys(req.body)[0])
    if(name && currentClass && division){
        studentRealtimeData = [...studentRealtimeData, {name,currentClass,division, id:(studentRealtimeData.length+1) }]
        res.status(200).send({
            id: studentRealtimeData.length
        })
    }
    else{
        res.sendStatus(400);
    }
});

app.put("/api/student/:id", (req, res) => {
    const {id} = req.params;
    const  {name,currentClass,division} =  JSON.parse(Object.keys(req.body)[0])
    if([name,currentClass,division].every(el => (!el)))
        res.sendStatus(400);
    let isIdPresent = false;
    studentRealtimeData.forEach(function (item) {
        if(item.id === id){
            item.name = name || item.name;
            item.currentClass = currentClass || item.currentClass;
            item.division = division || item.division;
            isIdPresent = true;
        }
    })

    isIdPresent? res.sendStatus(200): res.sendStatus(400);
})

app.delete("/api/student/:id", (req,res) => {

    const {id} = req.params;
    let isIdPresent = false;
    studentRealtimeData.forEach( item  => {
        if(item.id === id){
            isIdPresent = true;
            item = { id:item.id}
        }
    })
    isIdPresent?res.sendStatus(200): res.sendStatus(404);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
