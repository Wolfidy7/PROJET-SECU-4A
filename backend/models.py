from __init__ import db

# Define the Player model
class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    pseudo = db.Column(db.String, nullable=False)
    # Relationships
    answers = db.relationship('Answer', backref='player', lazy=True)
    results = db.relationship('Result', backref='player', lazy=True)

# Define the Quizz model
class Quizz(db.Model):
    __tablename__ = 'quizz'
    id = db.Column(db.Integer, primary_key=True)
    participation_key = db.Column(db.String)
    category = db.Column(db.String, nullable=False)
    # Relationships
    questions = db.relationship('Question', backref='quizz', lazy=True)
    results = db.relationship('Result', backref='quizz', lazy=True)

# Define the Question model
class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    id_quizz = db.Column(db.Integer, db.ForeignKey('quizz.id'), nullable=False)
    question = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)
    # Relationship
    choices = db.relationship('Choice', backref='question', lazy=True)
    answers = db.relationship('Answer', backref='question', lazy=True)

# Define the Choice model
class Choice(db.Model):
    __tablename__ = 'choices'
    id = db.Column(db.Integer, primary_key=True)
    id_question = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    choice = db.Column(db.String, nullable=False)

# Define the Answer model
class Answer(db.Model):
    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    id_player = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)
    id_question = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    answer = db.Column(db.String, nullable=False)

# Define the Result model
class Result(db.Model):
    __tablename__ = 'results'
    id = db.Column(db.Integer, primary_key=True)
    id_player = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)
    id_quizz = db.Column(db.Integer, db.ForeignKey('quizz.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False, default=0)



