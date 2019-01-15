const expect = require('expect');
const request = require('supertest');
var {ObjectId} = require('mongodb');

var app = require('../server');
var Todo = require('../models/todo');


var todos = [{
  _id: new ObjectId(),
  text: 'First test todo'
}, {
  _id: new ObjectId(),
  text: 'Second test todo',
  completed: true,
  completedAt: 1000
}];


beforeEach((done) => {
  Todo.deleteMany()
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done())
    .catch((e) => done(e));
});


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });


  it('should not create todo with invalid input', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});


describe('GET /todos/:id', () => {
  it('should get todo with id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should get 404 for invalid id value', (done) => {
    request(app)
      .get('/todos/absurd123')
      .expect(404)
      .end(done);
  });

  it('should get 404 for todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done);
  });
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var id = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if(err) return done(err);

        Todo.findById(id).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectId().toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});


describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id;
    var text = 'U text 1';

    request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: true})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
        expect(res.body.todo.text).toBe(text);
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[1]._id;
    var text = 'U text 2';

    request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: false})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
        expect(res.body.todo.text).toBe(text);
      })
      .end(done);
  });
});
