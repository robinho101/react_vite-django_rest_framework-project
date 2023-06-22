"""react_django_proj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from students.urls import *
from memory_db_only.urls import *
import sqlite3


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('students.urls')),
    path('', include('memory_db_only.urls')),
]

# создаём базу данных в памяти(ram) по запуску сервера - python manage.py runserver.
# после перезапуска сервера предыдущие данные стираются из памяти
# с такими параметрами доступно многократное подключение к одной базе.
c = sqlite3.connect('file::memory:?cache=shared', uri=True)

c.execute('''
        CREATE TABLE in_memory_table (
            id INTEGER PRIMARY KEY,
            page_number INTEGER,
            toggle BOOLEAN,
            create_or_edit VARCHAR(20)
        )
    ''')

c.execute(
    """INSERT INTO in_memory_table (page_number, toggle, create_or_edit) VALUES (1, False, '');""")

c.commit()
