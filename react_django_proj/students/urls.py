from django.urls import path
from .views import *

urlpatterns = [
    path('api/students/', students_list),
    path('api/students/edit_or_delete/<int:pk>/', students_update),
]
