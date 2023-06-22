from django.urls import path
from .views import *

urlpatterns = [
    path('api/in_memory_db/<key>/', inMemoryDb),
]
