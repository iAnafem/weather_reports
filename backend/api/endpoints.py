from django.urls import re_path
from api.api import CitiesListAPI, WeatherReportAPI


urlpatterns = [
    re_path(r'^cities$', CitiesListAPI.as_view(), name='cities'),
    re_path(r'^(?P<report>\D*|\d*)-report', WeatherReportAPI.as_view(), name='weather-reports'),
]
