var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));
var userSchema = mongoose.Schema({
  createTime: {type: Date, default: Date.now},
  username: String,
  password: String,
  email: String,
	sex: String,
	birthday: Date
});
exports.User = mongoose.model('user', userSchema);
