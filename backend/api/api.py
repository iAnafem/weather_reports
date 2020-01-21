from rest_framework import generics
from api.models import City, Temperature, Pressure, Humidity
from api.serializers import CitySerializer


class CitiesListAPI(generics.ListAPIView):
    model = City
    serializer_class = CitySerializer
    queryset = City.objects.all()
