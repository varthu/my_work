from django.conf.urls import url

from net1 import views

urlpatterns = [
    url('net1',views.index, name='net1')
]