const { updateUserInfo, getPersona } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateUser(req, res) {
  let user = {};
  const {
    user: { id },
  } = req;
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    user = await updateUserInfo({ ...req.body, id });
  } catch (error) {
    user = error;
  }
  if (user.email) {
    req.session.messages = { success: profileSuccessMessage };
    req.session.userInfo = { ...user };
    return res.send({
      success: true,
      userInfo: { ...user },
      messages: { success: profileSuccessMessage },
    });
  }

  const databaseError = UPDATE_INFO_ERROR_MESSAGE;

  return res.send({
    success: false,
    messages: { errors: { databaseError } },
  });
}

/* async function loadPersona(req, res) {
  let user = {};
  const {
    user: { id },
  } = req;
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    user = await getPersona(id);
  } catch (error) {
    user = error;
  }
  if (user.email) {
    req.session.messages = { success: profileSuccessMessage };
    req.session.userInfo = { ...user };
    return res.send({
      success: true,
      userInfo: { ...user },
      messages: { success: profileSuccessMessage },
    });
  }

  const databaseError = UPDATE_INFO_ERROR_MESSAGE;

  return res.send({
    success: false,
    messages: { errors: { databaseError } },
  });
} */

module.exports = updateUser;
