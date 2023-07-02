const express = require('express')
const{ObjectId} = require('mongodb');
const path = require('path');
const ejs = require("ejs");
const MongoClient = require('mongodb').MongoClient
const mongoose = require("mongoose");
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
const cors = require("cors");

const Task = require("./models/taskModel")
const Train = require("./models/trainModel")
const Login = require("./models/login")
const Register = require("./models/register")
const Chatroom = require("./models/chatroomModel")
const Message = require("./models/messageModel")
const User = require("./models/Users")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://admin:james@cluster0.ujzjm.mongodb.net/todoapp?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology: true
});

const app = express();

app.use(express.json());
app.use(cors);

app.use(methodOverride('_method'))
app.set('view engine', 'ejs'); 
app.use('/public', express.static(path.join(__dirname,'public')) );

app.listen(8080, function() {
    console.log('listening on 8080')
  }) 

app.get('/', function(요청, 응답) { 
    응답.render('login.ejs')
  })

app.get("/getUsers", async (req, res) => {
  const results = await User.find();
  console.log(results)
    if (!results) {
      res.json("err");
    } else {
      res.json(results);
    }
  });

  app.post("/createUser", async (req, res) => {
    console.log(req.body)
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
  
    res.json(user);
  });

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
//app.use는 미들웨어. 요청-응답 중간에 뭔가 실행되는 코드
app.use(session({secret : '비밀번호', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

app.get('/login', function(요청,응답){
  console.log("login requested")
  응답.render('login.ejs') }
);

app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(req, res){ 
    console.log(req.body) 
    res.redirect('/train')
    }
   );

app.post('/loginreact', passport.authenticate('local', {failureRedirect : '/fail'}), function(req, res){ 
    console.log(req.body) 
    res.json("result", "Login Success");
  });

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, async function (입력한아이디, 입력한비번, done) {
    console.log(입력한아이디, 입력한비번);
    const user = await Login.findOne({ id: 입력한아이디 }); 
    
    if (!user) return done(null, false, { message: '존재하지않는 아이디요' })

    입력한아이디 = user.id
    if (입력한비번 == user.pw) {
      console.log("result2")
      return done(null, user)

    } else {
      console.log("result3")
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser( async function (아이디, done) {
  console.log(아이디)
  const 결과 = Login.findOne({ id: 아이디 });

    if (!결과) return done(null, false, { message: '로그인안하셨는데요?' })
    else {
      return done(null, 아이디)
    }
  }) 

app.post('/register', async function(요청, 응답) {
  console.log(요청.body)
  try {
    const register = await Register.create(요청.body)
    응답.status(200).json(login);
  } catch (error) {
    console.log(error)
    응답.status(500).json({message: error.message})
  }
})

app.get('/mypage', 로그인했니, function (요청, 응답) {
  
  응답.render('mypage.ejs', { 사용자: 요청.user })
}) 
  
function 로그인했니(요청, 응답, next) { 
  console.log(요청.user)
  if (요청.user) { 
      next()   } 
    else { 
     응답.send('로그인안하셨는데요?') 
  } } 

app.get('/write', function(요청, 응답) { 
  응답.render('worktable.ejs')
});

app.get('/train', 로그인했니, async function(요청, 응답) { 
  const train = await Train.find()
    console.log(train)
    응답.render('traintable.ejs', { 사용자: 요청.user, posts : train })
});

app.get('/hometrain', async function(req, res) { 
  const results = await Train.find()
  if (!results) {
    res.json("err");
  } else {
    res.json(results);
  }
});

app.post('/train', 로그인했니, async function(요청, 응답){
  
  console.log(요청.body)
 
  var my_date = new Date()
  console.log(my_date)
  date = JSON.stringify(my_date).split("T")[0]
 
  console.log(date)
 
  var 저장할거 = {
    name: 요청.user,
    pushup: 요청.body.pushup, 
    stomach: 요청.body.stomach,
    squat: 요청.body.squat,
    arm: 요청.body.arm,
    uplift: 요청.body.uplift,
    upheel: 요청.body.upheel,
    kick_on_chair: 요청.body.kick_on_chair,
    spreading_thigh: 요청.body.spreading_thigh,
    date: date
   } 
  console.log(저장할거)
  var train = await Train.create(저장할거)
  if(!train) {
    응답.status(500).json({message: "DB Error"})
  }
  응답.redirect('/train');
})

app.delete('/deletetrain', 로그인했니, async function(요청,응답){
  console.log(요청.body) 
  var id = 요청.body._id
  console.log(id)
  const train = await Train.findByIdAndDelete(id)
  if(!train) {
    응답.status(500).json({message: "DB Error"})}

  else {
    console.log("data deleted")
  응답.redirect('/train')}
})

app.post('/chatroom', 로그인했니, async function(요청, 응답){ 
  
  var 저장할거={
    title :'채팅방',
    member : [ 요청.body.당한사람id, 요청.user],
    date : new Date()
  }

  const 결과 = await Chatroom.create(저장할거)
  if(!결과) {
    응답.status(500).json({message: "Server Error"})
  }
  응답.status(200).json(결과);
  }); 

app.get('/chat', 로그인했니, async function(요청, 응답){ 

    const chatroom = await Chatroom.find()
      응답.render('chat.ejs', { data : chatroom })
    })
   
  app.post('/message', 로그인했니, async function(요청, 응답){
  
    var 저장할거 = {
      parent : 요청.body.parent,
      content : 요청.body.content,
      userid :요청.user,
      date : new Date(),
    }
    const 결과 = await Message.create(저장할거)
    if(!결과) {
      응답.status(500).json({message: "Server Error"})
    }
    응답.status(200).json(결과);
    }); 

  app.get('/message/:parentid', 로그인했니, async function(요청, 응답){

    응답.writeHead(200, {
      "Connection": "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });
  
    const message = await Message.find({ parent: 요청.params.parentid })
    console.log(message)
      응답.write('event: test\n');
      응답.write(`data: ${JSON.stringify(message)}\n\n`);

    const pipeline = [
      { $match: { 'fullDocument.parent':  요청.params.parentid} }
      ] ;
    
    const changeStream = await Message.watch(pipeline);
    changeStream.on('change', result => {
      console.log(result.fullDocument);
      var 추가된문서 = [result.fullDocument];
      응답.write('event: test\n');
      응답.write(`data: ${JSON.stringify(추가된문서)}\n\n`);
    });
    
  })

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});