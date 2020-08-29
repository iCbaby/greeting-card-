/**
 * @description order schema
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const orderSchema = new Schema(
  {
    __v: { type: Number, select: false },
    cardType: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
      required: true
    },
    remark: {
      type: String,
      trim: true
    },
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('Order', orderSchema)
