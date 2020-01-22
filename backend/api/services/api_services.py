from api.models import Temperature, Pressure, Humidity, City
from datetime import datetime, timedelta
from api.serializers import TemperatureSerializer, PressureSerializer, HumiditySerializer
from django.utils import timezone


def get_entries_from_specified_date_range(model, city, from_date, until_date):
    try:
        city_object = City.objects.get(name=city)

        entries = model.objects.filter(city=city_object.id, date_of_report__range=(from_date, until_date))
        return entries
    except City.DoesNotExist:
        return []


def get_model_by_filter(_filter):
    if _filter:
        model = Temperature
        if _filter == 'pressure':
            model = Pressure
        elif _filter == 'humidity':
            model = Humidity
        return model
    return None


def get_serializer_by_filter(_filter):
    if _filter:
        serializer = TemperatureSerializer
        if _filter == 'pressure':
            serializer = PressureSerializer
        elif _filter == 'humidity':
            serializer = HumiditySerializer
        return serializer
    return None


def get_specified_report(model, query_params):
    until_date = query_params.get('until')
    if not until_date:
        until_date = datetime.now(tz=timezone.utc)
    from_date = query_params.get('from')
    if not from_date:
        from_date = until_date - timedelta(days=31)

    city = query_params.get('city')

    queryset = get_entries_from_specified_date_range(model, city, from_date, until_date)

    return queryset


