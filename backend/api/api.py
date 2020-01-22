from rest_framework import generics
from api.models import City
from api.serializers import CitySerializer
from api.services.api_services import get_specified_report, get_model_by_filter, get_serializer_by_filter
from rest_framework.response import Response


class CitiesListAPI(generics.ListAPIView):
    model = City
    serializer_class = CitySerializer
    queryset = City.objects.all()


class WeatherReportAPI(generics.ListAPIView):
    lookup_url_kwarg = 'report'

    def get_serializer_class(self, **kwargs):
        _filter = self.kwargs.get(self.lookup_url_kwarg)
        serializer = get_serializer_by_filter(_filter)
        return serializer

    def get_queryset(self):
        _filter = self.kwargs.get(self.lookup_url_kwarg)
        query_params = self.request.query_params
        model = get_model_by_filter(_filter)
        if model is not None:
            queryset = get_specified_report(model, query_params)
            return queryset
        return []

    def list(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(self.get_queryset(), many=True)
        return Response(serializer.data)

