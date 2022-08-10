from django.contrib import admin
from .models import Stops, FavoriteStops, Todo
from dublinbusapp.models import Account1
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class StopsAdmin(admin.ModelAdmin):
    list = ('stop_id', 'stop_name', 'stop_lat', 'stop_lon')

class FavoriteStopsAdmin(admin.ModelAdmin):
    list = ('user_id', 'user_id')

class AccountInline(admin.StackedInline):
    model = Account1
    can_delete = False
    verbose_name_plural = 'Accounts1'

class CustomizedUserAdmin (UserAdmin):
    inlines = (AccountInline, )

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(Todo, TodoAdmin)

admin.site.register(Stops, StopsAdmin)
admin.site.register(FavoriteStops,FavoriteStopsAdmin)

admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)

admin.site.register(Account1)