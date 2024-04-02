from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name","last_name","email","password"]
    def validate(self,data):
        user = User(**data)
        password = data.get('password')
        try:
            validate_password(password,user)
            print('adsf')
        except exceptions.ValidationError  as e:
            serializer_error = serializers.as_serializer_error(e)
            raise exceptions.ValidationError({
                'password':serializer_error['non_field_errors']
            })
        return data
        
    def create(self,validatedata):
         
        user = User.objects.create_user(
               first_name=validatedata['first_name'],last_name=validatedata['last_name'],email=validatedata['email'],password=validatedata['password'])
        return user
    
    
class UserSerializerRmvPassword(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = User
        fields = ["first_name","last_name","email","profile_image","id"]

class UserSerializerwithimage(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = User
        fields = ["profile_image"]


        