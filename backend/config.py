# config.py
import os

SECRET_KEY = "#d#JCqTTW\nilK\\7m\x0bp#\tj~#H"



class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    base_dir = os.path.abspath(os.path.dirname(__file__))

    #SQLALCHEMY_TRACK_MODIFICATIONS = False

