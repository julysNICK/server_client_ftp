const FtpSrv = require('ftp-srv');

const hostname = '0.0.0.0';
const port = 1111

const ftpServer = new FtpSrv('ftp://' + hostname + ':' + port,
  { anonymous: true, greeting: ["Hello Jong", "Wie gehts?"] });

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  if (username === 'anonymous' && password === 'anonymous') {

    connection.on('command', (command, callback) => {
      console.log(command)
      callback(null, '200 OK', 'Hello ' + username);
    }
    )
    connection.on('STOR', (error, fileName) => {
      if (error) {
        console.error(`FTP server error: could not receive file ${fileName} for upload ${error}`);
      }
      console.info(`FTP server: upload successfully received - ${fileName}`);
    });
    console.log(process.cwd())
    resolve({ root: `${process.cwd()}/public` });
  }
  return reject(new errors.GeneralError('Invalid username or password', 401));
  console.log('resolve: ' + resolve);
  console.log('reject: ' + reject);

});

ftpServer.on('client-error', (connection, context, error) => {
  console.log('connection: ' + connection);
  console.log('context: ' + context);
  console.log('error: ' + error);
});




ftpServer.listen()
  .then(() => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });