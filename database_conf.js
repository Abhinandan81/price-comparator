var mysql = require('mysql');

module.exports = function () {
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

return con;
}
