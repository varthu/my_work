	
from django.conf.urls import url

from app1 import views

urlpatterns = [
    url('addConstituents', views.add_constituents, name='add_constituents'),
    url('addParty', views.add_parties, name='add_parties'),
    url('addMember', views.add_member, name='add_member'),
    url('view_all',views.view_all,name="view_all"),
    url('editMember',views.edit_member,name="edit_member"),
    url('updateMember',views.update_member,name="update_member"),  
          
 ]

