const express = require("express");

const router = express.Router();

//For mobile application users
router.get("/", async(req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

//For browser users
router.get("/", async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
       ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//mergining different request with same path

router.route("/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    return res.json({ status : 'pending' })
}).delete((req, res) => {
    return res.json({ status : 'pending' })
})

router.post("/api/users", async(req, res) => {
    const body = req.body;
    if (
        !body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender || 
        !body.job_title) {
        return res.status(400).json({msg : "All fields are required..."})
    }
    //inserting data using await function
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    });
    console.log("Result :", result);
    return res.status(201).json({msg : "success"});
})

exports.return = router;