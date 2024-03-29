from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@db/wolf_db'

db = SQLAlchemy()

import views, models

db.init_app(app)

with app.app_context():
    db.create_all() 
