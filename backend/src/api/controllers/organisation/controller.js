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
      return res
        .status(400)
        .send({ status: false, error: "organisation already exist" });
    }
    const lastOrganisation = await organisationModel
      .findOne({ isDelete:false })
      .sort({ organisationCode: -1 });
    let nextOrganisationCode = "";
    if (lastOrganisation) {
      const lastCode = lastOrganisation.organisationCode;
      const lastNumber = parseInt(lastCode.slice(-3));
      nextOrganisationCode = `${organisationName}-${(
        lastNumber + 1
      )
        .toString()
        .padStart(3, "0")}`;
    } else {
      nextOrganisationCode = `${organisationName}-ADM001`;
    }
    req.body.organisationCode = nextOrganisationCode;

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

const allOrganisations = async (req, res) => {
  try {
    const allOrganisation = await organisationModel
      .find({ isDelete: false, isActive: true })
      .sort({ createdAt: -1 });
    if (!allOrganisation) {
      return res
        .status(404)
        .send({ status: false, error: "resource not found" });
    }
    return res
      .status(200)
      .send({
        status: true,
        message: "organisations",
        Organisations: allOrganisation,
      });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { addOrganisation, allOrganisations };
