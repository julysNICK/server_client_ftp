var Client = require('ftp');
var readlineSync = require('readline-sync');
var c = new Client();
var fs = require('fs');
function commands(c, command) {
  switch (command) {
    case 'mkdir':
      var dir = readlineSync.question('Digite o nome do diretorio: ');
      c.mkdir(dir, function (err) {
        if (err) throw err;
        console.log("criou");
        var isBack = readlineSync.question('Deseja voltar? (s/n) ');
        if (isBack === 'y') {
          commands(c, 'voltar');
        } else {
          commands(c, 'sair');
          c.end();
        }
      }
      )
      break;

    case "rmdir":
      var dir = readlineSync.question('Digite o nome do diretorio: ');
      c.rmdir(dir, function (err) {
        if (err) throw console.log(err);
        console.log("removido");
        var isBack = readlineSync.question('Deseja voltar? (s/n) ');
        if (isBack === 'y') {
          commands(c, 'voltar');
        } else {
          commands(c, 'sair');
          c.end();
        }
      }
      )
      break;
    case "pwd":
      c.pwd(function (err, data) {
        if (err) throw console.log(err);
        console.log(data);
        var isBack = readlineSync.question('Deseja voltar? (s/n) ');
        if (isBack === 'y') {
          commands(c, 'voltar');
        } else {
          commands(c, 'sair');
          c.end();
        }
      }
      )
      break;
    case "get":
      var file = readlineSync.question('Digite o nome do arquivo: ');
      c.get(file, function (err, stream) {
        if (err) throw console.log(err);
        stream.once('close', function () {
          console.log('Transfer complete');
          var isBack = readlineSync.question('Deseja voltar? (s/n) ');
          if (isBack === 'y') {
            commands(c, 'voltar');
          } else {
            commands(c, 'sair');
            c.end();
          }
        }
        )
      }
      )
      break;

    case "put":
      var file = readlineSync.question('Digite o nome do arquivo: ');
      //implement put command

      fs.writeFile(`${process.cwd()}/public/${file}`, '', function (err) {
        if (err) throw err;
        //if created successfully launch code successfully ftp

        var isBack = readlineSync.question('Deseja voltar? (s/n) ');
        if (isBack === 'y') {
          commands(c, 'voltar');
        } else {
          commands(c, 'sair');
          c.end();
        }
      }
      )
      break;
    default:
      console.log("comando n??o encontrado");
      c.end();
      break;
  }
}


c.on('ready', function (
) {
  var typeCommand = readlineSync.question('type command: ');
  commands(c, typeCommand);
});
// connect to localhost:21 as anonymous
c.connect({

  user: "anonymous",
  password: "anonymous"
});