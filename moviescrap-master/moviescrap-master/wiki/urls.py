from django.conf.urls import url

from app2 import views
urlpatterns = [
    url('movie_details', views.add_moviedetails, name='movie_details'),
    url('soundtrack', views.add_soundtrack, name='soundtrack'),
]
