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
    value: {
      type: Number,
      required: true,
      validate: value => {
        return value === 11 || value === 66 || value === 88
      }
    },
    remark: {
      type: String,
      trim: true
    },
    fromUser: {
      type: String,
      index: true,
      required: true
    },
    toUser: {
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
