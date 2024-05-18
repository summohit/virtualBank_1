const bankModel = require("../models/bankModel");
const pensionModel = require("../models/penisonModel");

const insert = async (data) => {
  try {
    const newBank = new bankModel(data);
    let result = await newBank.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getAll = async (query) => {
  try {
    console.log("query", query);
    let result = await bankModel.aggregate(query);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};
//getBankByUserIdAndStatus
const getBankByUserIdAndStatus = async (userId, selectedFeilds) => {
  try {
    let result = await bankModel
      .findOne({ userId: userId, isDefaultBank: true })
      .select(selectedFeilds)
      .lean();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getById = async (bankId, selectedFeilds) => {
  try {
    console.log("bankId", bankId);
    let result = await bankModel
      .findOne({ _id: bankId })
      .select(selectedFeilds)
      .lean();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getByAccountNumber = async (accountNumber, selectedFeilds) => {
  try {
    let result = await bankModel
      .findOne({ accountNumber: accountNumber })
      .select(selectedFeilds)
      .lean();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getByMobileNumber = async (mobileNumber) => {
  try {
    let result = await userModel.findOne({ mobileNumber: mobileNumber });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const getByEmail = async (email) => {
  try {
    let result = await userModel.findOne({ email: email });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};
const getByUserIdAndBankId = async (userId, bankId) => {
  try {
    let result = await bankModel.findOne({ bankId: bankId, userId: userId });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const updateById = async (bankId, payload) => {
  try {
    let result = await bankModel.updateOne(
      { _id: bankId },
      { $set: { ...payload } }
    );
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const updateByAccountNumber = async (
  accountNumber,
  balanceToBeUpdated,
  status
) => {
  try {
    let result;
    if (status === "increment") {
      console.log("Amount is incremented");
      result = await bankModel.updateOne(
        { accountNumber: accountNumber },
        { $inc: { balance: balanceToBeUpdated } }
      );
    } else if (status === "decrement") {
      console.log("Amount is decremented");
      result = await bankModel.updateOne(
        { accountNumber: accountNumber },
        { $inc: { balance: -balanceToBeUpdated } }
      );
    }
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteById = async (bankId) => {
  try {
    let result = await bankModel.deleteOne({ _id: bankId });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const deleteByMobileNumber = async (mobileNumber) => {
  try {
    let result = await userModel.deleteOne({ mobileNumber: mobileNumber });
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};

const createPensionAccount = async (data) => {
  try {
    console.log("data", data.userId);
    let pensionData = {
      userId:data.userId,
      isRequestApproved: false
    }
    const newPensionReq = new pensionModel(pensionData);
    let result = await newPensionReq.save();
    return result;
  } catch (error) {
    console.log(error.stack);
  }
};
const getPensionAccounts   = async (data) => {
  try {
    console.log("getPensionAccounts model", data.userId);
    const result =  await pensionModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user_account'
        }
      },
      {
        $addFields: {
          user_account: { $arrayElemAt: ["$user_account", 0] } // Assuming each pensionModel has only one associated user account
        }
      }
    ])
    console.log("result",result)
     return result;
  } catch (error) {
    console.log(error.stack);
  }
};
const checkPensionStatus   = async (data) => {
  try {
    console.log("checkPensionStatus model", data.userId);
    const result =  await pensionModel.findOne({"userId": data.userId})
    console.log("result",result)
     return result;
  } catch (error) {
    console.log(error.stack);
  }
};
const updatePensionDocument = async (data,pensionDocument) => {
  try {
    console.log("updatePensionDocument model", data.userId);
    // console.log(pensionDocument);
    // console.log(pensionDocument)
    pensionDocument['isDocumentUploaded'] = true;
    const result = await pensionModel.findOneAndUpdate(
      {"userId": data.userId },
      { $set:  pensionDocument }, // Update operation
      { new: true } // Option to return the updated document
    )
    console.log("result",result)
     return result;
  } catch (error) {
    console.log(error.stack);
  }
};
module.exports = {
  insert,
  getAll,
  getById,
  updateById,
  deleteById,
  getByAccountNumber,
  getByMobileNumber,
  deleteByMobileNumber,
  getByUserIdAndBankId,
  getBankByUserIdAndStatus,
  updateByAccountNumber,
  createPensionAccount,
  getPensionAccounts,
  checkPensionStatus,
  updatePensionDocument
};
