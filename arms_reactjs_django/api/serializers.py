from django.contrib.auth.models import User, Group
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
   class Meta:
      model = User
      fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
   class Meta:
      model = Group
      fields = ('url', 'name')

class IndicatorsSerializer(serializers.Serializer):
   id_form = serializers.CharField()
   name = serializers.CharField()
   total = serializers.FloatField()
   percentage = serializers.FloatField()

class top5ODsBarchartSerializer(serializers.Serializer):
   CommonRoute = serializers.CharField()
   CYRevenue = serializers.FloatField()

class MOMRevenueSerializer(serializers.Serializer):
   revenue = serializers.FloatField()
   month = serializers.CharField()
   year = serializers.CharField()
   DataType = serializers.CharField()

class MOMAvgFareAnalysisSerializer(serializers.Serializer):
   AvgFare = serializers.FloatField()
   month = serializers.CharField()
   year = serializers.CharField()
   DataType = serializers.CharField()

class ChannelWisePerformSerializer(serializers.Serializer):
   channel = serializers.CharField()
   cy_revenue = serializers.FloatField()
   ly_revenue = serializers.FloatField()
   vly_revenue = serializers.FloatField()

class TopTenroutesPivotSerializer(serializers.Serializer):
   commonroute = serializers.CharField()
   cy_revenue = serializers.CharField()
   ly_revenue = serializers.FloatField()
   vly_revenue = serializers.FloatField()

class RegionWisePerformSerializer(serializers.Serializer):
   RegionName = serializers.CharField()
   revenue = serializers.FloatField()

class MonthSerializer(serializers.Serializer):
   MonthName = serializers.CharField()
   MonthNumber = serializers.IntegerField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()
   
class POSerializer(serializers.Serializer):
   RegionName = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()

class POSCountrySerializer(serializers.Serializer):
   CountryName = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()

class POSDataSerializer(serializers.Serializer):
   POS = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()
   
# OD Level Serializer
class POSODSerializer(serializers.Serializer):
   CommonOD = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()

class POSClassSerializer(serializers.Serializer):
   CommonClass = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()

class odFlowTableSerializer(serializers.Serializer):
   CommonOD = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()   

class AgencySerializer(serializers.Serializer):
   CommonAgent = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()

class CabinSerializer(serializers.Serializer):
   CommonRBD = serializers.CharField()
   ODBookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   ODFlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   ODFlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   ODAvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()

class ClassSerializer(serializers.Serializer):
   CommonClass = serializers.CharField()

# Route Page Data Processing
class RouteMonthSerializer(serializers.Serializer):
   MonthName = serializers.CharField()
   MonthNumber = serializers.IntegerField()
   BookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   FlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   FlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   AvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()
   RASK = serializers.FloatField() 
   RASK_VY = serializers.FloatField()
   ASK = serializers.FloatField()
   ASK_VY = serializers.FloatField()

class RouteRegionSerializer(serializers.Serializer):
   RegionName = serializers.CharField()
   BookingPassengerCount = serializers.IntegerField()
   BookingRevVariance = serializers.FloatField()
   FlownPassengerCount = serializers.IntegerField()
   FlownPAXVariance = serializers.FloatField()
   FlownRevenue = serializers.FloatField()
   FlownRevVariance = serializers.FloatField()
   AvgFare = serializers.FloatField()
   AvgFareVariance = serializers.FloatField()
