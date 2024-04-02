from django.urls import path
from .views import *
urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetriveuserView.as_view()),
    path('update-profile', UpdateProfileView.as_view()),
    path('get-all', getallView.as_view()),
    path('get-user/<str:email>', getUserView.as_view()),
    path('delete/<str:email>', deleteUserView.as_view()),
    
  
    
    
     
    
]