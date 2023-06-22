from django.apps import AppConfig
from django.core.management import call_command


class MemoryDbOnlyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'memory_db_only'
