from dublinbusapp.serializers import UserSerializer,UserSerializer1


def my_jwt_response_handler(token, user=None, request=None,Favorites=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data,
        'Favorites' : UserSerializer1(Favorites, context={'request': request}).data,
    }