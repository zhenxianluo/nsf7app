var pg = require('pg-promise')({});
var cn = "postgresql://deploy:deploy@localhost:5432/design";
var db = pg(cn);
var sco;
//console.log('haha');
//db.connect().then(obj => {
//	sco = obj;
//	return sco.any('select * from siteuser;');
//})
//.then(data => {
//	console.log(data);
//	sco.done();
//})
//.catch(error => {
//	console.log(error);
//})
//.finally(()=>{console.log('hehe');});
db.tx(t => {
	return t.any('SELECT * FROM siteuser;')
		.then(data=>{
			return t.result("update siteuser set blog='hahaha' where username='b';")//, ['username', '123']);
		}).then(data => {console.log(data)})
.then(data =>{
	console.log(t.match);
});
})
db.connect()
    .then(obj => {
        // obj.client = new connected Client object;

        sco = obj; // save the connection object;

        // execute all the queries you need:
        return sco.map('SELECT * FROM siteuser');
    })
    .then(data => {
				console.log(data);
        // success
    })
    .catch(error => {
        // error
		});


















//var config = {
//	user: 'deploy',
//	database: 'design',
//	password: 'deploy',
//	host: 'localhost',
//	port: 5432,
//	max: 20
//}
//var pool = new pg.Pool(config);
//pool.connect(function(err, client, done) {  
//    if(err) {    
//        return console.error('error fetching client from pool', err);
//    }
//    client.query("insert into siteuser(username) values('haha');",  function(err, result) {
//        done(err);    
//        if(err) {      
//            return console.error('error running query', err);
//    }    
//				console.log(result);
//  });
//});
//function _Base = {
//	query: function(text, values, cb){
		
//pool.connect().then(client=>{
//	client.query("select * from siteuser where username='aa' or email='bb';").then(res=>{
//		console.log(res.rows.length);
//		if(res.rows.length==0){
//			client.query("insert into siteuser(username) values('hello');").then(res=>{console.log(res)});
//			client.relase();
//		}
//	}).catch(e => {
//		client.relase();
//		console.error('query error');
//	})
//});






//var client = new pg.Client(config);
//client.connect();
//
////queries are queued and executed one after another once the connection becomes available
//var x = 1000;
//
//while (x > 0) {
//    client.query("INSERT INTO siteuser(username, password) values('Ted',12)");
//    client.query("INSERT INTO siteuser(username, password) values($1, $2)", ['John', x]);
//    x = x - 1;
//}
//
//var query = client.query("SELECT * FROM siteuser");
////fired after last row is emitted
//
//query.on('row', function(row) {
//    console.log(row);
//});
//
//query.on('end', function() {
//    client.end();
//});
//
//
//
////queries can be executed either via text/parameter values passed as individual arguments
////or by passing an options object containing text, (optional) parameter values, and (optional) query name
//client.query({
//    name: 'insert beatle',
//    text: "INSERT INTO siteuser(name, height, birthday) values($1, $2, $3)",
//    values: ['George', 70, new Date(1946, 02, 14)]
//});
//
////subsequent queries with the same name will be executed without re-parsing the query plan by postgres
//client.query({
//    name: 'insert beatle',
//    values: ['Paul', 63, new Date(1945, 04, 03)]
//});
//var query = client.query("SELECT * FROM siteuser WHERE name = $1", ['john']);
//
////can stream row results back 1 at a time
//query.on('row', function(row) {
//    console.log(row);
//    console.log("Beatle name: %s", row.name); //Beatle name: John
//    console.log("Beatle birth year: %d", row.birthday.getYear()); //dates are returned as javascript dates
//    console.log("Beatle height: %d' %d\"", Math.floor(row.height / 12), row.height % 12); //integers are returned as javascript ints
//});
//
////fired after last row is emitted
//query.on('end', function() {
//    client.end();
//});
