from django.db import models


class City(models.Model):
    """
    This model represents cities for display weather reports
    """
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Temperature(models.Model):
    """
    This model represents reports about the temperature
    """
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    date_of_report = models.DateTimeField()
    temperature = models.DecimalField(decimal_places=1, max_digits=5)

    class Meta:
        ordering = ['date_of_report']


class Pressure(models.Model):
    """
    This model represents reports about the pressure
    """
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    date_of_report = models.DateTimeField()
    pressure = models.DecimalField(decimal_places=1, max_digits=5)

    class Meta:
        ordering = ['date_of_report']


class Humidity(models.Model):
    """
    This model represents reports about the humidity
    """
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    date_of_report = models.DateTimeField()
    humidity = models.IntegerField()

    class Meta:
        ordering = ['date_of_report']
