import { Router } from "express";
import { AccountsModel, UserModel } from "../db";
import { userMiddleware } from "../middlewares/userMiddleware";
import mongoose from "mongoose";

export const AccountRouter = Router();

AccountRouter.get("/balance", userMiddleware, async (req, res)=> {
  const id = req.body.id;

  const user = await AccountsModel.findOne({
    userId: id
  })

  if (!user) {
    res.status(401).json({
      message: "Invalid Token"
    })
    return;
  }

  res.json({
    balance: user.balance / 100
  })
})

AccountRouter.post('/transfer', userMiddleware, async (req, res)=> {
  const id = req.body.id;

  const sender = await UserModel.findOne({
    _id: id
  })

  if (!sender) {
    res.status(401).json({
      message: "Invalid token"
    })
    return;
  }

  const {to, amount} = req.body;

  const reciver = await UserModel.findOne({
    username: to
  })

  if (!reciver) {
    res.status(400).json({
      message: "Reciver not found"
    })
    return;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const reciversAccount = await AccountsModel.findOne({
      userId: reciver._id
    }).session(session);

    const sendersAccount = await AccountsModel.findOne({
      userId: id
    }).session(session);

    if (!sendersAccount || !reciversAccount) {
      res.status(400).json({
        message: "Invalid account"
      })
      return;
    }

    if (sendersAccount.balance <= amount && amount > 0) {
      await session.abortTransaction();
      await session.endSession();
      res.status(400).json({
        message: "Insufficient funds"
      })
      return;
    }
    const amountInPaise = parseInt(amount) * 100;

    sendersAccount.balance -= amountInPaise;
    await sendersAccount.save({session});

    reciversAccount.balance += amountInPaise;
    await reciversAccount.save({session});

    await session.commitTransaction();
    await session.endSession();

    res.json({
      message: "Money transfered sucessfully"
    })

  } catch (_) {
    await session.abortTransaction();
    await session.endSession();
    res.status(500).json({
      message: "Error occured while transfering money"
    })
  }
})