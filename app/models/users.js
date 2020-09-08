/**
 * @description user schema
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    dingdingNumber: {
      type: String,
      required: true,
      unique: true
    },
    ownPoints: {
      type: Number,
      min: 0,
      max: 3300,
      require: true
    },
    receivedPoints: {
      type: Number,
      min: 0,
      require: true
    }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
