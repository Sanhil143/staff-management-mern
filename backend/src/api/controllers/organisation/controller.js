const organisationModel = require("../../../models/organisationModel");

const addOrganisation = async (req, res) => {
  try {
    const { organisationName } = req.body;
    if (!organisationName) {
      return res
        .status(400)
        .send({ Status: false, error: "organisation name is required" });
    }
    const verifyorganisation = await organisationModel.findOne({
      organisationName: organisationName,
    });
    if (verifyorganisation) {
      return res.status(400).send({ status: false, error: "already exist" });
    }
    // const lastOrganisation = await organisationModel.findOne({ organisationName }).sort({ employeeCode: -1 })
    req.body.organisationCode = `${organisationName}001`;

    const savedData = await organisationModel.create(req.body);
    return res.status(201).send({
      status: true,
      message: "organisation added successfully",
      data: savedData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { addOrganisation };
