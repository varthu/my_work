from django.contrib import admin
from django.conf.urls import url, include
from django.contrib.auth.views import LoginView, LogoutView
from onboarding import views
from django.views.generic.base import RedirectView


urlpatterns = [
    url(r'^faculty/$', views.home_faculty, name='home_faculty'),
    url(r'^student/$', views.home_student, name='home_student'),
    url(r'^admin/', admin.site.urls),
    url(r'accounts/login/', views.login_, name='login'),
    url(r'rollnumber_match/', views.rollnumber_match, name='login'),
    url(r'^logout/$', LogoutView.as_view(next_page='login'), name='logout'),
]