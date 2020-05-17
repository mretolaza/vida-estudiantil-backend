const { updateUserPassword } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updatePassword(req, res) {
  let user = {};
  const {
    user: { id },
  } = req;
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    user = await updateUserPassword({ ...req.body, id });
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

module.exports = updatePassword;
