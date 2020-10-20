"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,path
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'users1', views.UserViewSet)
router.register(r'groups1', views.GroupViewSet)
router.register(r'indicatorsflow',views.IndicatorsFlow, basename='IndicatorsFlowModel')
router.register(r'momrevenuMultiline',views.MOMRevenueMultilineChart, basename='MOMRevenuePosRevenueMultilineModel')
router.register(r'momavgfareanalysisMultiline',views.MOMAvgFareAnalysisMultilineChart, basename='MOMAvgFareAnalysisMultilineModel')
router.register(r'regionwiseperform',views.RegionWisePerformPie, basename='RegionWisePerformPieModel')
router.register(r'topfiveodsbar',views.top5ODsBarchart, basename='top5ODsBarchartModel')
router.register(r'channelwiseperform',views.ChannelWisePerform, basename='ChannelWisePerformModel')
router.register(r'toptenroutespivot',views.TopTenroutesPivot, basename='TopTenroutesPivotModel')
router.register(r'posMonthDetails',views.PosMonthDetails, basename='PosMonthModel')
router.register(r'posRegionDetails',views.PosRegionDetails, basename='PosRegionModel')
router.register(r'posCountryDetails',views.PosCountryDetails, basename='PosCountryModel')
router.register(r'posPOSDataDetails',views.PosDataDetails, basename='POSCountryClick')
router.register(r'posODDetails',views.POSODDetails, basename='POSODModel')
router.register(r'posClassDetails',views.POSClassDetails, basename='POSClassModel')
router.register(r'monthWiseDetails',views.MonthWiseDetails, basename='monthWiseDetails')
router.register(r'odFlowTableDetails',views.odFlowTableDetails, basename='odFlowTableDetailsModel')
router.register(r'agencyWiseDetails',views.AgencyWiseDetails, basename='agencyWiseDetails')
router.register(r'cabinWiseDetails',views.CabinWiseDetails, basename='cabinWiseDetails')
router.register(r'getClassDetails',views.GetClassDetails, basename='classDetails')

# Route Page Data Processing
router.register(r'routeMonthDetails',views.RouteMonthDetails, basename='RouteMonthModel')
router.register(r'routeRegionDetails',views.RouteRegionDetails, basename='RouteRegionModel')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
