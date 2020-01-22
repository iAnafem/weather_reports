from rest_framework import serializers
from api.models import City, Temperature, Pressure, Humidity


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'


class TemperatureSerializer(serializers.ModelSerializer):
    date_of_report = serializers.DateTimeField()

    class Meta:
        model = Temperature
        fields = '__all__'


class PressureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pressure
        fields = '__all__'


class HumiditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Humidity
        fields = '__all__'

