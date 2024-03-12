from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate,get_user_model
from rest_framework import status,generics
user=get_user_model()
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from userpage.serializer import UserSerializer,ChangePasswordSerializer,ResetEmailSerializer,ResetPasswordSerializer
from rest_framework.response import Response


# Create your views here.
# In django the username field of User model needs to be unique but this can be changed by addning a custom user and modifying the User location in settings.py.This can be done but is unnecssary and complicated so here you can't use same email and usernames but this can be changed by creating a custom user which i am not in the mood to create 
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            print(data)
            email = data['email']

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'You already have an account with this email.'}, status=400)

            user = User.objects.create_user(
                username=data['email'],
                email=data['email'],
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                is_staff=data.get('is_staff', False)
            )
            user.save()
            token = Token.objects.create(user=user)

            def roles(user):
                if user.is_superuser==True:
                    role='admin'
                elif user.is_staff==True:
                    role='seller'
                else:
                    role='user' 
                return role

            user_data={
                'id':user.id,
                'email':user.email,
                'first_name':user.first_name,
                'last_name':user.last_name,
                'role':roles(user)

            }
            response_data={
                'token':str(token),
                'user':user_data
            }
            return JsonResponse(response_data, status=201)
        except IntegrityError:
            return JsonResponse({'error': 'something went wrong!'}, status=400)


@csrf_exempt
def login(request):
    if request.method== 'POST':
        data=JSONParser().parse(request)
        print(data)
        user=authenticate(request,username=data['email'],password=data['password'])  #authenticate only works with username and password
        # print(request.POST)  is for when content type is multipart/form-data
        

        if user is None:
            return JsonResponse({'error':'email or password doesnot match'},status=status.HTTP_404_NOT_FOUND)
        else:
            try:
                token=Token.objects.get(user=user)
            except:
                token=Token.objects.create(user=user)

                #i wrote this if else completely blind and it works lol :)
            def roles(user):
                if user.is_superuser==True:
                    role='admin'
                elif user.is_staff==True:
                    role='seller'
                else:
                    role='user' 
                return role

            user_data={
                'id':user.id,
                'email':user.email,
                'first_name':user.first_name,
                'last_name':user.last_name,
                'role':roles(user)

            }
            response_data={
                'token':str(token),
                'user':user_data
            }
            print(response_data)
            return JsonResponse(response_data,status=200)
            
class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,format=None):
        serializer=UserSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
# class ChangePassword(APIView):
#     permission_classes=[IsAuthenticated]
#     def put(self,request,format=None):
#         print(request.data)
#         serializer=ChangePasswordSerializer(data=request.data,context={'user':request.user})
#         if serializer.is_valid(raise_exception=True):
#             return Response({'msg':'password changed'},status=status.HTTP_200_OK)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user  # Assuming the user is authenticated
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            new_password = serializer.validated_data['password']
            user.set_password(new_password)
            user.save()

            return Response({'msg': 'Password changed'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class ResetPasswordEmail(APIView):
    permission_classes=[AllowAny]
    def post(self,request,format=None):
        print(request.data)
        serializer=ResetEmailSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            reset_link=serializer.validated_data['link']
            return Response({'msg':'Check your email for password reset link .... or the console','link':reset_link},status=status.HTTP_200_OK)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class ResetPasswordView(APIView):
    permission_classes=[AllowAny]

    def post(self,request,userid,token,format=None):
        print(request.data,userid,token)

        serializer=ResetPasswordSerializer(data=request.data,context={'userid':userid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password changed'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
            


        """
class ChangePassword(generics.UpdateAPIView):
    queryset=User.objects.all()
    serializer_class=ChangePasswordSerializer
    permission_classes=[IsAuthenticated]

    def patch(self,request,*args,**kwargs):
        user=self.get_object()  #this works if the user id is given in the url
        serializer=self.get_serializer(instance=user,data=request.data)

        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'msg':'password changed'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


        """ 