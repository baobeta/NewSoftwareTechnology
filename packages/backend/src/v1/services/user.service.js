const mongoose = require('mongoose');
const _User = require('../models/user.model');
const _Role = require('../models/role.model');

const insert = async (name, email, code, sex, roleId, picture = '') => {
  const user = await _User.create({
    name, email, code, picture, roleId: mongoose.Types.ObjectId(roleId),
  });
  return user;
};

const list = async (roleId) => {
  let listUser;
  if (roleId) {
    listUser = await _User.find({ roleId })
      .populate({ path: 'roleId', select: 'name _id' });
  } else {
    listUser = await _User.find({})
      .populate({ path: 'roleId', select: 'name _id' });
  }
  return listUser;
};

const remove = async (id) => {
  await _User.deleteOne({ _id: id });
};

const update = async (id, name, email, code, picture, roleId) => {
  await _User.updateOne({ _id: id }, {
    name, email, code, picture, roleId,
  });
};

const getUser = async (id) => {
  const user = await _User.findOne({ _id: id })
    .populate({ path: 'roleId', select: 'name _id' });
  return user;
};

const editProfile = async (id, name, code, sex) => {
  await _User.updateOne({ _id: id }, {
    name, code, sex,
  });
};

module.exports = {
  list,
  insert,
  remove,
  update,
  getUser,
  editProfile,
};
