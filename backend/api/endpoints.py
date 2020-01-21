from django.urls import re_path
from api.api import CitiesListAPI


urlpatterns = [
    re_path(r'^cities$', CitiesListAPI.as_view(), name='cities'),
]
