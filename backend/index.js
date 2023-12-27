const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect("mongodb://localhost:27017/CompanyDetails", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Connection failed:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", userSchema);



const companySchema = new mongoose.Schema({
  name: String,
  location: String,
});

const Company = mongoose.model('companies', companySchema);

app.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Create a new user instance with the specified fields
    const newUser = new User({
      name,
      email,
      password,
    });


    const result = await newUser.save();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, resp) => {
  console.log(req.body)
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user)
    }
    else {
      resp.send({ result: "No user found" })
    }

  }
  else {
    resp.send({ result: "No user found" })

  }
})




app.post("/add-company", async (req, resp) => {
  let company = new Company(req.body);
  let result = await company.save();
  resp.send(result)
})

app.get("/companies", async (req, resp) => {
  let companies = await Company.find();
  if (companies.length > 0) {
    resp.send(companies)
  }
  else {
    resp.send("No companies")
  }

})


app.delete("/company/:id", async (req, resp) => {

  const result = await Company.deleteOne({ _id: req.params.id })
  resp.send(result)
})

app.get("/company/:id", async (req, resp) => {
  const result = await Company.findOne({ _id: req.params.id })
  if (result) {
    resp.send(result)
  }
  else {
    resp.send({ result: "No api found" })
  }
})

app.put("/company/:id", async (req, resp) => {
  const result = await Company.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  )
  resp.send(result)

})


app.get("/search/:key", async (req, resp) => {
  let result = await Company.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { location: { $regex: req.params.key } },

    ]
  })
  resp.send(result)
})


app.listen(5001, () => {
  console.log("Server is running on port 5001");
});


