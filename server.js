const FtpSrv = require('ftp-srv');
const objectFunction = require('./allFunction');

const hostname = '0.0.0.0';
const port = 1111

const ftpServer = new FtpSrv('ftp://' + hostname + ':' + port,

  {
    whitelist: ['STOR', 'USER', 'PASS', 'TYPE', 'RETR', 'PASV', 'QUIT'],
    anonymous: true,

    greeting: ["Hello Jong", "Wie gehts?"]

  });

const users = [
  {
    name: 'admin',
    password: 'admin'
  },
  {
    name: 'user1',
    password: '123456789',
  },
  {
    name: 'user2',
    password: '123456789',
  }
]
ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  if (users.find(user => user.name === username && user.password === password)) {
    objectFunction.enablingServicesWithConnectionOn('STOR', connection, 'FTP server: upload successfully received', 'FTP server error: could not receive file');
    objectFunction.enablingServicesWithConnectionOn('RETR', connection, 'FTP server: download successfully received', 'FTP server error: could not receive file');
    objectFunction.enablingServicesWithConnectionOn("RNTO", connection, 'FTP server: rename successfully received', 'FTP server error: could not rename file');
    resolve({ root: `${process.cwd()}/public` });
  }
  return reject(new errors.GeneralError('Invalid username or password', 401));

});

ftpServer.on('client-error', (connection, context, error) => {
  console.log(connection);
  console.log('context: ' + context);
  console.log('error: ' + error);
});

ftpServer.listen()
  .then(() => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
