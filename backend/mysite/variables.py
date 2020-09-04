from dotenv import load_dotenv
load_dotenv(verbose=True)

import os

print(f"SECRET_KEY={os.getenv('SECRET_KEY', None)}")
print(f"ENVIRONMENT={os.getenv('ENVIRONMENT', None)}")
print(f"HOST={os.getenv('HOST', None)}")
print(f"PORT={os.getenv('PORT', None)}")
print(f"NAME={os.getenv('NAME', None)}")
print(f"DATABASE_USERNAME={os.getenv('DATABASE_USER', None)}")
print(f"PASSWORD={os.getenv('PASSWORD', None)}")
