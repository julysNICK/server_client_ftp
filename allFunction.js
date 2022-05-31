

const objectFunction = {
  shootMessageSuccessOrError: (error, messageSuccess, messageError, fileName) => {
    if (error) {
      console.log(`${messageError}`);
    }
    console.log(`${messageSuccess}-fileName: ${fileName}`);
  },
  enablingServicesWithConnectionOn: (nameService, connection, messageSuccess, messageError) => {
    connection.on(nameService, (error, fileName) => {
      objectFunction.shootMessageSuccessOrError(error, messageSuccess, messageError, fileName);
    });
  }
}


module.exports = objectFunction;


