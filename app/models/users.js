/**
 * @description user schema
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose
require('mongoose-type-email')

const userSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      match: /^\d{11}$/,
      require: true,
      trim: true
    },
    email: {
      type: Schema.Types.Email,
      required: true
    },
    avatarUrl: {
      type: String,
      default: '',
      trim: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    jobNumber: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    costCenter: {
      type: String,
      required: true,
      trim: true
    },
    nickName: {
      type: String,
      trim: true
    },
    dingdingNumber: {
      type: String,
      required: true,
      trim: true
    },
    points: {
      type: Number,
      min: 0,
      require: true
    },
    pointsReceived: {
      type: Number,
      min: 0,
      require: true
    }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
