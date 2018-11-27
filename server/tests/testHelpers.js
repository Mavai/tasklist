const nonExistingObjectId = async Model => {
  const modelObject = new Model({ name: 'Test name' });
  await modelObject.save();
  await modelObject.remove();
  return modelObject._id.toString();
};

const objectsInDb = async Model => {
  const modelObjects = await Model.find({});
  return modelObjects.map(Model.format);
};

module.exports = {
  nonExistingObjectId,
  objectsInDb
};
