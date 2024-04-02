from distutils.command.build_scripts import first_line_re
from math import log

from django.forms import ValidationError
from .models import UserAccounts
from rest_framework import permissions,status
from rest_framework.views import APIView
from rest_framework.response  import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from .serializers import UserSerializer,UserSerializerRmvPassword, UserSerializerwithimage
User = get_user_model()
class RegisterView(APIView):
    def post(self,request):
        print(request.data)
        data = request.data
        serilizer = UserSerializer(data=data)
        print(serilizer.is_valid())
        if not serilizer.is_valid():
            return Response(serilizer.errors,status=status.HTTP_400_BAD_REQUEST)
         
        user = serilizer.create(serilizer.validated_data)
        user = UserSerializerRmvPassword(user)
        return Response(user.data,status=status.HTTP_201_CREATED)

class RetriveuserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request):
        user = request.user
        user = UserSerializerRmvPassword(user)
        return Response(user.data,status=status.HTTP_200_OK)
class UpdateProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    def patch(self,request):
        if 'image' not in request.FILES:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_image = request.FILES.get('image')

        posts_serializer = UserSerializerwithimage(data=request.data)

        if posts_serializer.is_valid():
            
            
           user =  UserAccounts.objects.get(id=request.user.id)
            
           user.profile_image=uploaded_image
           user.save()
           s = UserSerializerwithimage(user)
           return Response(s.data, status=status.HTTP_201_CREATED)
        else:
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

         


class getallView(APIView):
    def get(self,request):
         
        if request.user.is_superuser:
            
            users = User.objects.all()
            user_serializer = UserSerializerRmvPassword(users, many=True)
            
            return Response(user_serializer.data, status=status.HTTP_200_OK)

class getUserView(APIView):
    def get(self,request,email):
         
        if request.user.is_superuser:
            user = User.objects.get(email = email)
            serilize = UserSerializerRmvPassword(user)
            return Response(serilize.data,status=status.HTTP_200_OK)
    def post(self,request,email):
         
        if request.user.is_superuser:
             
            user = UserAccounts.objects.get(id=email)
             

            if UserAccounts.objects.exclude(id=int(email)).filter(email = request.data.get('email')).exists():
                 
                return Response({"error": "User already exist with this email"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user.first_name = request.data.get('first_name')
                user.last_name = request.data.get('last_name')
                user.email = request.data.get('email')
                user.save()
                serializer = UserSerializerRmvPassword(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
        else:
            return Response({"error": "Permission Denied"}, status=status.HTTP_403_FORBIDDEN)
class deleteUserView(APIView):
    def delete(self,request,email):
        UserAccounts.objects.filter(email=email).delete()
        return Response({"Deleted": "User deleted"}, status=status.HTTP_200_OK)