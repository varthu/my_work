from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from api.serializers import UserSerializer, GroupSerializer
import pyodbc, pymssql
import pandas as pd
import json as json
from django.db import connection
from django.http import HttpResponse
from rest_framework.generics import ListAPIView
from rest_framework import viewsets, serializers, views
from .serializers import *

def connectiveToMSSQL(que):
    cursor_connection = connection.cursor()
    # df = pd.DataFrame()
    # resp = pd.read_sql(que, connection)
    getConn = cursor_connection.execute(que)
    field_names = [item[0] for item in cursor_connection.description]
    results = cursor_connection.fetchall()

    fetchdata = []
    for row in results:
        objDict = {}
        for index, value in enumerate(row):
            objDict[field_names[index]] = value
        fetchdata.append(objDict)
    cursor_connection.close()
    return fetchdata

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class PosMonthDetails(viewsets.ModelViewSet):
    query = "EXEC OD_POS_Months null, 'R', null, null"
    queryset = connectiveToMSSQL(query)
    serializer_class = MonthSerializer

class top5ODsBarchart(viewsets.ModelViewSet):
    top5O_Ds_barChart_conn = connection.cursor()
    top5O_Ds_barChart_query = top5O_Ds_barChart_conn.execute(
        """ select * from vw_Top5OD """)

    top5O_Ds_barChart_Table = top5O_Ds_barChart_query.fetchall()

    top5O_Ds_barChart_Data = []
    for top5O_Ds_barChart_Tabl in top5O_Ds_barChart_Table:
        record = {
            "CommonRoute": top5O_Ds_barChart_Tabl[0],
            "CYRevenue": top5O_Ds_barChart_Tabl[1]
        }
        top5O_Ds_barChart_Data.append(record)
    top5O_Ds_barChart_conn.close()
    queryset = top5O_Ds_barChart_Data
    serializer_class = top5ODsBarchartSerializer

class MOMRevenueMultilineChart(viewsets.ModelViewSet):
    cursor = connection.cursor()
    getConn = cursor.execute("select * from vw_MOMRevenue")

    field_names = [item[0] for item in cursor.description]
    results = cursor.fetchall()

    fetchdata1 = []
    for row in results:
        objDict = {}
        for index, value in enumerate(row):
            objDict[field_names[index]] = value
        fetchdata1.append(objDict)
    cursor.close()
    queryset = fetchdata1
    serializer_class = MOMRevenueSerializer

class MOMAvgFareAnalysisMultilineChart(viewsets.ModelViewSet):
    MOMAvgFareAnalysis_cursor = connection.cursor()
    getConn = MOMAvgFareAnalysis_cursor.execute("select * from vw_AvgFare")

    field_names = [item[0] for item in MOMAvgFareAnalysis_cursor.description]
    results = MOMAvgFareAnalysis_cursor.fetchall()

    fetchdata1 = []
    for row in results:
        objDict = {}
        for index, value in enumerate(row):
            objDict[field_names[index]] = value
        fetchdata1.append(objDict)
    MOMAvgFareAnalysis_cursor.close()
    queryset = fetchdata1
    serializer_class = MOMAvgFareAnalysisSerializer

class RegionWisePerformPie(viewsets.ModelViewSet):
    RegionWisePerform_cursor = connection.cursor()
    getConn = RegionWisePerform_cursor.execute("select * from vw_Region")

    field_names = [item[0] for item in RegionWisePerform_cursor.description]
    results = RegionWisePerform_cursor.fetchall()

    fetchdata1 = []
    for row in results:
        objDict = {}
        for index, value in enumerate(row):
            objDict[field_names[index]] = value
        fetchdata1.append(objDict)
    RegionWisePerform_cursor.close()
    queryset = fetchdata1
    serializer_class = RegionWisePerformSerializer


class ChannelWisePerform(viewsets.ModelViewSet):
    channal_pivot_conn = connection.cursor()
    channal_pivot_query = channal_pivot_conn.execute(""" select * from vw_Channel """)

    channal_pivot_Table = channal_pivot_query.fetchall()

    channal_pivot_Data = []
    for channal_pivot_Tabl in channal_pivot_Table:
        record = {
            "channel": channal_pivot_Tabl[0],
            "cy_revenue": channal_pivot_Tabl[1],
            "ly_revenue": channal_pivot_Tabl[2],
            "vly_revenue": channal_pivot_Tabl[3]
        }
        channal_pivot_Data.append(record)
    channal_pivot_conn.close()
    queryset = channal_pivot_Data
    serializer_class = ChannelWisePerformSerializer


class TopTenroutesPivot(viewsets.ModelViewSet):
    top10_pivot_conn = connection.cursor()
    top10_pivot_query = top10_pivot_conn.execute(""" select * from vw_Top10Routes """)

    top10_pivot_Table = top10_pivot_query.fetchall()

    top10_pivot_Data = []
    for top10_pivot_Tabl in top10_pivot_Table:
        record = {
            "commonroute": top10_pivot_Tabl[0],
            "cy_revenue": top10_pivot_Tabl[1],
            "ly_revenue": top10_pivot_Tabl[2],
            "vly_revenue": top10_pivot_Tabl[3]
        }
        top10_pivot_Data.append(record)
    top10_pivot_conn.close()
    queryset = top10_pivot_Data
    serializer_class = TopTenroutesPivotSerializer

class PosRegionDetails(viewsets.ModelViewSet):
    serializer_class = POSerializer
    def get_queryset(self):
        queryParams = self.request.query_params.get('gettingMonth', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)
        if queryParams is not None:
            que = "EXEC OD_POS_Flown " + queryParams +", 'R', NULL, " + cabinParams
            print(que)
            queryset = connectiveToMSSQL(que)
            return queryset

class PosCountryDetails(viewsets.ModelViewSet):
    serializer_class = POSCountrySerializer
    def get_queryset(self):
        monthParams = self.request.query_params.get('gettingMonth', None)
        regionParams = self.request.query_params.get('gettingRegion', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)

        if regionParams is not None:
            que = "EXEC OD_POS_Flown " + monthParams + ",'C'," + regionParams + "," + cabinParams
            queryset = connectiveToMSSQL(que)
            return queryset

class PosDataDetails(viewsets.ModelViewSet):
    serializer_class = POSDataSerializer
    def get_queryset(self):
        queryParams = self.request.query_params.get('gettingMonth', None)
        regionParams = self.request.query_params.get('gettingRegion', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)
        if queryParams is not None:
            # que = "EXEC OD_POS_Flown_dev " + queryParams + ",'P',"'"' + regionParams + '"'
            que = "EXEC OD_POS_Flown " + queryParams + ",'P', [{}]".format(regionParams) + "," + cabinParams

            queryset = connectiveToMSSQL(que)
            return queryset

class POSODDetails(viewsets.ModelViewSet):
    serializer_class = POSODSerializer
    def get_queryset(self):
        monthParams = self.request.query_params.get('gettingMonth', None)
        posParams = self.request.query_params.get('gettingRegion', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)
        if posParams is not None:
            que = "EXEC OD_POS_Flown " + monthParams + ",'O'," + posParams + "," + cabinParams
            queryset = connectiveToMSSQL(que)
            return queryset

class POSClassDetails(viewsets.ModelViewSet):
    serializer_class = POSClassSerializer
    def get_queryset(self):
        monthParams = self.request.query_params.get('gettingMonth', None)
        posParams = self.request.query_params.get('gettingRegion', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)
        if posParams is not None:
            que = "EXEC OD_POS_Flown " + monthParams + ",'S', [{}]".format(posParams) + "," + cabinParams
            queryset = connectiveToMSSQL(que)
            return queryset


class IndicatorsFlow(viewsets.ModelViewSet):
    connectingCursor = connection.cursor()

    query = """ select * from vw_ODFlownRevenue """

    paxytd = """ select * from vw_ODPAX """

    averageFare_Ytd = """ select * from vw_ODAvgFare """

    economy_ytd = """ select * from vw_EconomyYTD """

    business_ytd = """ select * from vw_BusinessYTD """

    ex_rate = """ select * from vw_exRate """

    load_factor = """ select * from vw_LoadFactor """

    CYFlownReven = connectiveToMSSQL(query)
    pax_ytd_indicator = connectiveToMSSQL(paxytd)
    averageFare_Ytd_indicator = connectiveToMSSQL(averageFare_Ytd)
    economy_ytd_indicator = connectiveToMSSQL(economy_ytd)
    business_ytd_indicator = connectiveToMSSQL(business_ytd)
    ex_rate_indicator = connectiveToMSSQL(ex_rate)
    load_factor_indicator = connectiveToMSSQL(load_factor)

    # Indicators Data Handle...
    indicators = [
        {'id_form': 'revenue_YTD', 'name': 'Revenue-YTD', 'total': CYFlownReven[0]['CYFlownRevenue'],
         'percentage': CYFlownReven[0]['Variance']},
        {'id_form': 'pax_YTD', 'name': 'PAX-YTD', 'total': pax_ytd_indicator[0]['CYHEADCOUNT'],
         'percentage': pax_ytd_indicator[0]['Variance']},
        {'id_form': 'AverageFare_Ytd', 'name': 'AverageFare-YTD', 'total': averageFare_Ytd_indicator[0]['CYfare'],
         'percentage': averageFare_Ytd_indicator[0]['Variance']},
        {'id_form': 'economy_YTD', 'name': 'Economy-YTD', 'total': economy_ytd_indicator[0]['CYEconomyRev'],
         'percentage': economy_ytd_indicator[0]['Variance']},
        {'id_form': 'business_YTD', 'name': 'Business-YTD', 'total': business_ytd_indicator[0]['CYBusiness'],
         'percentage': business_ytd_indicator[0]['Variance']},
        {'id_form': 'ex_rate', 'name': 'EX-RATE', 'total': ex_rate_indicator[0]['CYExrate'],
         'percentage': ex_rate_indicator[0]['Variance']},
        {'id_form': 'load_factor', 'name': 'Load Factor', 'total': load_factor_indicator[0]['Cyfactor'],
         'percentage': ex_rate_indicator[0]['Variance']}
    ]
    queryset = indicators
    serializer_class = IndicatorsSerializer

#class for getting month wise details
class MonthWiseDetails(viewsets.ModelViewSet):
    serializer_class = MonthSerializer
    def get_queryset(self):
        gettingRegion = self.request.query_params.get('gettingRegion', None)
        inputLevel = self.request.query_params.get('inputLevel', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)
        if gettingRegion is not None:
            # que = "EXEC OD_POS_Flown " + monthParams + ",'S', [{}]".format(posParams)

            if gettingRegion == 'Null':
                que = "EXEC OD_POS_Months NULL, " + inputLevel + "," + gettingRegion + "," + cabinParams
            else:
                que = "EXEC OD_POS_Months NULL, " + inputLevel + ", [{}]".format(gettingRegion) + "," + cabinParams

            # que = "EXEC OD_POS_Months NULL, " + inputLevel + ", [{}]".format(gettingRegion) + "," + cabinParams
            print("Month Wise Query : ", que)
            queryset = connectiveToMSSQL(que)
            return queryset

class odFlowTableDetails(viewsets.ModelViewSet):
    serializer_class = odFlowTableSerializer
    def get_queryset(self):
        gettingMonth = self.request.query_params.get('gettingMonth', None)
        gettingRegion = self.request.query_params.get('gettingRegion', None)
        gettingRegionCode = self.request.query_params.get('gettingRegionCode', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)
        if gettingMonth is not None:
            que = "EXEC OD_POS " + gettingMonth + "," + gettingRegion + "," + gettingRegionCode + "," + cabinParams
            print("Check OD Flow Details Enter que: ", que)
            queryset = connectiveToMSSQL(que)
            return queryset

class AgencyWiseDetails(viewsets.ModelViewSet):
    serializer_class = AgencySerializer
    def get_queryset(self):
        gettingMonth = self.request.query_params.get('gettingMonth', None)
        inputLevel = self.request.query_params.get('inputLevel', None)
        posFlowData = self.request.query_params.get('posFlowData', None)
        cabinParams = self.request.query_params.get('getCabinValue', None)
        if gettingMonth is not None:
            que = "EXEC OD_POS_Agents " + gettingMonth + "," + inputLevel + "," + posFlowData + "," + cabinParams
            print("Query RESULT Test : ", que)
            print("Query Result Data L ", connectiveToMSSQL(que))
        queryset = connectiveToMSSQL(que)
        return queryset

class CabinWiseDetails(viewsets.ModelViewSet):
    serializer_class = CabinSerializer
    def get_queryset(self):
        que = "EXEC OD_Class 4,'S','Business'"
        queryset = connectiveToMSSQL(que)
        print("Query Set Of Cabin Wise Details : ", queryset)
        return queryset

class GetClassDetails(viewsets.ModelViewSet):
    serializer_class = ClassSerializer
    def get_queryset(self):
        que = "select distinct CommonClass from OD_Booking_Flown_Monthly"
        queryset = connectiveToMSSQL(que)
        print("Query Set Of Class Details : ", queryset)
        return queryset


# Route Page Wise Data Processing using API calls
class RouteMonthDetails(viewsets.ModelViewSet):
    query = "EXEC Route_Months Null,'R', Null, Null"
    queryset = connectiveToMSSQL(query)
    serializer_class = RouteMonthSerializer

class RouteRegionDetails(viewsets.ModelViewSet):
    serializer_class = RouteRegionSerializer
    def get_queryset(self):
        gettingMonth = self.request.query_params.get('gettingMonth', None)
        getCabinValue = self.request.query_params.get('getCabinValue', None)
        query = "EXEC Route_Region " + gettingMonth + ", 'R', Null ," + getCabinValue
        queryset = connectiveToMSSQL(query)
        return queryset