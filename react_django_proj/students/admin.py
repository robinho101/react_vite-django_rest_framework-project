from django.contrib import admin
from .models import *

# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'registrationDate')
    list_display_links = ('name', 'email',
                          'phone', 'registrationDate')
    list_filter = ('name', 'email',  'phone', 'registrationDate')
    search_fields = ('name', 'email', 'phone', 'registrationDate')


# Register your models here.
admin.site.register(Student, StudentAdmin)

admin.site.site_title = 'управление таблицей студентов'
admin.site.site_header = 'управление таблицей студентов'
