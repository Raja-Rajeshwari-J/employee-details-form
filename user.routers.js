const { putEmpDetails, getEmpDetails, deleteEmpDetails } = require("./user.control")

const router = require('express').Router();

router.post("/put", putEmpDetails);
router.get("/get", getEmpDetails);
router.delete("/delete/:id", deleteEmpDetails);

module.exports = router;

