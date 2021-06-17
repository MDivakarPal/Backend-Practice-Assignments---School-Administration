const express = require("express");
const app = express();
const port = 8080;
const studentArray1 = require("./InitialData");
let studentArray = [...studentArray1];
let stuId=studentArray.length;
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// your code goes here
app.get("/", (req, res) => {
  res.status(200).send("Home ");
});

//To get data of all students in array of json formats
app.get("/api/student", (req, res) => {
  res.status(200).json((studentArray));
});

//get data of specific student specified id
app.get("/api/student/:id", (req, res) => {
  const { id } = req.params;
  const faund = studentArray.find((stu) => stu.id == id);
  if (faund) res.status(200).json(faund);
  else res.sendStatus(404);
});

//delete a element from the array
app.delete("/api/student/:id", (req, res) => {
  const { id } = req.params;
  let isId = false;
  studentArray=studentArray.filter(({ id: currid }, idx) => {
    if (currid == id) {
      isId = true;
      return false;
    }else
    return true
    });
  isId ? res.sendStatus(200) : res.sendStatus(404);
});

//adding a new data in
app.post("/api/student", (req, res) => {
  const {name,currentClass,division} =  JSON.parse(Object.keys(req.body)[0]);
  if (name && currentClass &&division) 
  {  
    stuId+=1; 
    studentArray=[...studentArray , {id:(stuId),name,currentClass,division}]
    res.status(200).json({ id: stuId});}
     else res.sendStatus(400);
});

//Putting / update request
app.put("/api/student/:id", (req, res) => {
  const { name, currentClass, division } = JSON.parse(Object.keys(req.body)[0]);
  const { id } = req.params;
  if ([name,currentClass,division].every(el=>(!el))) res.sendStatus(400);
  let isValid = false;
  studentArray1.forEach((ele, idx) => {
    if (ele.id == id) {
      ele.name = name || ele.name;
      ele.currentClass = currentClass || ele.currentClass;
      ele.division = division || ele.division;
      isValid = true;
    }
  });
  isValid ? res.sendStatus(200) : res.sendStatus(400);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;


