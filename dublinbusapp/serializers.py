from rest_framework import serializers
from .models import FavoriteStops, Stops, Account1, Todo
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Stops, Shapes, Routes, Trips, NamesAndHeadsigns

# Whatever models we create 
class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('stop_id', 'stop_name', 'stop_lat', 'stop_long')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)

class UserSerializer1(serializers.ModelSerializer):
    
    class Meta:
        model = Account1
        fields = ('Favorites',)

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password',)

    
class FavoriteStopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteStops
        fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')

class RoutesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes
        fields = ('route_id', 'agency_id', 'route_short_name', 'route_long_name', 'route_type')

class ShapesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shapes
        fields = ('shape_id', 'shape_pt_lat', 'shape_pt_lon', 'shape_pt_sequence', 'shape_dist_traveled')

class TripsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trips
        fields = ('route_id', 'service_id', 'trip_id', 'shape_id', 'trip_headsign', 'direction_id')

class NamesAndHeadsignsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NamesAndHeadsigns
        fields = ['route_short_name', 'route_id', 'trip_headsign', 'shape_id']
