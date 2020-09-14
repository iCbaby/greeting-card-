/**
 * @description order schema
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const orderSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    cardType: {
      type: String,
      enum: ['玩', '美', '赢', '家'],
      required: true
    },
    remark: {
      type: String,
      trim: true
    },
    fromUserId: {
      type: String,
      index: true,
      required: true
    },
    toUserId: {
      type: String,
      index: true,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = model('Order', orderSchema)
