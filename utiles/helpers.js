
const getNoOfItems = async (collectionName) => {
  const noOfItems = await collectionName.find().count() ;
  return noOfItems;
}

module.exports = {
  getNoOfItems
}