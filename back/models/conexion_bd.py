from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('mysql://ebarrotes_user:C0ntr4ebarrotes$@bd-ebarrotes.cqvzuclhbvcr.us-west-1.rds.amazonaws.com/ebarrotes')

Base = declarative_base()
Session = sessionmaker(bind = engine)