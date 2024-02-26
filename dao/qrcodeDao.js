const userModel = require("../models/userModel");

const updateById = async (userId, payload) => {
  try {
    let result = await userModel.updateOne(
      { _id: userId },
      { $set: { ...payload } }
    );
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = {
  updateById,
};