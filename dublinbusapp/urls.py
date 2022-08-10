from django.urls import path
from .views import current_user, UserList, FavoriteStopsView

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    # path('fav_stops/<str:user_id>/',FavoriteStopsView.as_view())
]