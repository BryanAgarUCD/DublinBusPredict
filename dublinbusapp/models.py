from dataclasses import fields
from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

class Stops(models.Model):
    stop_id = models.CharField(primary_key=True, max_length=30)
    stop_name = models.CharField(max_length=255, blank=True, null=True)
    stop_lat = models.FloatField(blank=True, null=True)
    stop_long = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stops'

class Account1(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Favorites = models.CharField(default='',max_length=30)
    birthday = models.DateField()
    gender = models.CharField(
        max_length=7,
        choices=[('MALE', 'MALE'),('FEMALE', 'FEMALE')]
    )

    def __str__(self):
        return self.user.username, self.Favorites.favorites

class FavoriteStops(models.Model):
    user_id = models.CharField(max_length=10, blank=True, null=True)
    stop_id = models.CharField(max_length=30)
    
    class Meta:
        managed = False
        db_table = 'FavoriteStops'


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Trips(models.Model):
    route = models.ForeignKey("Routes", models.DO_NOTHING, blank=True, null=True)
    service_id = models.CharField(max_length=30, blank=True, null=True)
    trip_id = models.CharField(primary_key=True, max_length=60)
    shape = models.ForeignKey("Shapes", models.DO_NOTHING, blank=True, null=True)
    trip_headsign = models.CharField(max_length=255, blank=True, null=True)
    direction_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trips'

class Shapes(models.Model):
    shape_id = models.CharField(primary_key=True, max_length=30)
    shape_pt_lat = models.FloatField(blank=True, null=True)
    shape_pt_lon = models.FloatField(blank=True, null=True)
    shape_pt_sequence = models.SmallIntegerField()
    shape_dist_traveled = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shapes'
        unique_together = (('shape_id', 'shape_pt_sequence'),)

class Routes(models.Model):
    route_id = models.CharField(primary_key=True, max_length=30)
    agency_id = models.CharField(max_length=10, blank=True, null=True)
    route_short_name = models.CharField(max_length=10, blank=True, null=True)
    route_long_name = models.CharField(max_length=255, blank=True, null=True)
    route_type = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'routes'

class NamesAndHeadsigns(models.Model):
    route_short_name = models.CharField(max_length=10, blank=True, null=True)
    route_id = models.CharField(max_length=30)
    trip_headsign = models.CharField(max_length=255, blank=True, null=True)
    shape_id = models.CharField(primary_key=True,max_length=30)

    class Meta:
        managed = False
        db_table = 'names_and_headsigns'
