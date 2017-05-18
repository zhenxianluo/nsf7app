var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var data = {'username': 'ahahaha', 'password': 'ohehehe'};
describe('测试api', function(){
    it('测试注册接口，每次测试需要更改username', function(done){
        chai.request(server)
        .post('/register')
				.send(data)
        .end(function(err, res){
            res.should.have.status(200);
            expect(res).to.be.not.empty;
						expect(res.body.status).to.be.equal('success');
            done();
        });
    });
    it('测试登录接口', function(done){
        chai.request(server)
        .post('/login')
				.send(data)
        .end(function(err, res){
            res.should.have.status(200);
            expect(res).to.be.not.empty;
						expect(res.body.status).to.be.equal('success');
            done();
        });
    });
});
