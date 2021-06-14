const express = require("express");
const app = express();
const port = 8080;
const studentArray1 = require("./InitialData");
let studentArray = [...studentArray1];
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// your code goes here
app.get("/", (req, res) => {
  res.status(200).send("Home ");
});

//To get data of all students in array of json formats
app.get("/api/student", (req, res) => {
  res.status(200).send(JSON.stringify(studentArray));
});

//get data of specific student specified id
app.get("/api/student/:id", (req, res) => {
  const { id } = req.params;
  const faund = studentArray.find((stu) => stu.id == id);
  console.log(faund);
  if (faund) res.status(200).json(faund);
  else res.status(404).send("Failed");
});

//delete a element from the array
app.delete("/api/student/:id", (req, res) => {
  const { id } = req.params;
  let isId = false;
  console.log(id);
  studentArray.forEach(({ id: currid }, idx) => {
    if (currid == id) {
      studentArray[idx] = { id: currid };
      isId = true;
    }
  });
  isId ? res.status(200).send("ok") : res.status(404);
});

//adding a new data in
app.post("/api/student", (req, res) => {
  const { name, currentClass, division } = req.body;
  if (!name || !currentClass || !division) res.status(400).send("fail");
  studentArray = [
    ...studentArray,
    { name, currentClass, division, id: studentArray1.length + 1 },
  ];
  res.status(200).json({ id: studentArray.length });
});

//Putting / update request
app.put("/api/student/:id", (req, res) => {
  //const { name, currentClass, division } = JSON.parse(Object.keys(req.body)[0]);
  const data=req.body;
  console.log(data)
  const { id } = req.params;
  console.log(id);
  /*if (!name && !currentClass && !division) res.status(400);

  let isValid = false;
  studentArray1.forEach((ele, idx) => {
    if (ele.id === id) {
      ele.name = name || ele.name;
      ele.currentClass = name || ele.currentClass;
      ele.division = division || ele.division;
      //studentArray1[idx]=ele;
      isValid = true;
    }
  });
  isValid ? res.status(200).send("Updated") : res.status(400).send(id);*/
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
