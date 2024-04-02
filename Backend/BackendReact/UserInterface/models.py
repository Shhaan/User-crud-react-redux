from logging import lastResort
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser,PermissionsMixin
# Create your models here.

class MyUserManager(BaseUserManager):
    def create_user(self, email, first_name,last_name, password=None):
         
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email).lower(),
            first_name=first_name,
            last_name = last_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, first_name,last_name, password=None):
        user = self.create_user( email,first_name,last_name,  password=password)
        user.is_superuser = True
        user.is_staff = True
        
        user.save(using=self._db)
        return user
class UserAccounts(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(
        verbose_name="email address",
        max_length=200,
        unique=True,
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    profile_image = models.ImageField(upload_to='image/', null=True, blank=True)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name","last_name"]

    def __str__(self):
        return self.email