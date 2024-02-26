const Router = require("express").Router();
const { verifyKey } = require("../../helper/auth/auth");
const {
  addCard,
  getAddedCardList,
  deleteAddedCard,
  updateAddedCardStatus,
} = require("../../controllers/addCard/addCard");

Router.post("/add", verifyKey, addCard);

Router.get("/list", verifyKey, getAddedCardList);

Router.delete("/delete/:addedCardId", verifyKey, deleteAddedCard);

Router.put("/update/:addedCardId", verifyKey, updateAddedCardStatus);

//list

module.exports = Router;
