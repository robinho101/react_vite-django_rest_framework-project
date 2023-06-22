from django.db import models

# Create your models here.


class Student(models.Model):
    name = models.CharField('name', max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField('registration date', auto_now_add=True)

    def __str__(self) -> str:
        return self.name
