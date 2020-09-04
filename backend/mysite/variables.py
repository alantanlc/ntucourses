import os

print(f"SECRET_KEY={os.getenv('NTUCOURSES_DJANGO_SECRET_KEY', None)}")
print(f"ENVIRONMENT={os.getenv('NTUCOURSES_ENVIRONMENT', None)}")
print(f"HOST={os.getenv('NTUCOURSES_HOST', None)}")
print(f"PORT={os.getenv('NTUCOURSES_PORT', None)}")
print(f"NAME={os.getenv('NTUCOURSES_NAME', None)}")
print(f"PASSWORD={os.getenv('NTUCOURSES_PASSWORD', None)}")
