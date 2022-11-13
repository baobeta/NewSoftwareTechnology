const _Registration = require('../models/registration.model');

const insert = async (topicId, studentId) => {
  const registration = await _Registration.create({
    topicId, studentId,
  });
  return registration;
};

const remove = async (id) => {
  await _Registration.deleteOne({ _id: id });
};

const list = async (topicId, studentId) => {
  let listRegistration;
  if (topicId) {
    listRegistration = await _Registration.find({ topicId })
      .populate({ path: 'studentId', select: 'name _id' })
      .populate({
        path: 'topicId',
        populate: {
          path: 'lecturerId', select: 'name _id',
        },
      });
  } else if (studentId) {
    listRegistration = await _Registration.find({ studentId })
      .populate({ path: 'studentId', select: 'name _id' })
      .populate({
        path: 'topicId',
        populate: {
          path: 'lecturerId', select: 'name _id',
        },
      });
  } else {
    listRegistration = await _Registration.find({})
      .populate({ path: 'studentId', select: 'name _id' })
      .populate({
        path: 'topicId',
        populate: {
          path: 'lecturerId', select: 'name _id',
        },
      });
  }

  return listRegistration;
};

const findOne = async (topicId) => {
  const listRegistration = await _Registration.find({ topicId })
    .populate({ path: 'studentId', select: 'name _id' })
    .populate({
      path: 'topicId',
      populate: {
        path: 'lecturerId', select: 'name _id',
      },
    });

  return listRegistration;
};

const create = async (topicId, studentId, group) => {
  const registration = await _Registration.create({
    topicId, studentId, group,
  });
  return registration;
};

const update = async (id, topicId, studentId, group) => {
  await _Registration.updateOne({ _id: id }, {
    topicId, studentId, group,
  });
};

const countTopicLimit = async (topicId) => {
  const currentLimit = await _Registration.countDocuments({ topicId });

  return currentLimit;
};

module.exports = {
  insert,
  remove,
  list,
  findOne,
  create,
  update,
  countTopicLimit,
};
