/**
 * @description greeting-card schema
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const cardSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: Number,
      min: 0,
      require: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    }
  },
  { timestamps: true }
)

module.exports = model('Card', cardSchema)
