from rest_framework import serializers
from django.contrib.auth.models import User

from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from userpage.utils import Util

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','first_name','last_name','is_staff']

class ChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(write_only=True,required=True)

    def validate_password(self,password):
        if len(password)==0:
            raise serializers.ValidationError('password is not valid')
        return password



class ResetEmailSerializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255)

    class Meta:
        fields=['email']

    def validate(self,attrs):
        email=attrs.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            userid=urlsafe_base64_encode(force_bytes(user.id))  #encode the user id which will be decoded in resetting the password
            print('encoded UserId',userid)

            token=PasswordResetTokenGenerator().make_token(user)  #the valididty of the token can be predefined in settings.py ....
            print('password reset token',token)

            #this is the link that will be sent in the email
            #make a page for this link in frontend  but make sure it posts to the url in urls.py file
            link='http://localhost:3000/user/reset_password/'+userid+'/'+ token+'/'
            print('password reset link',link)

            # send email
            body='Click this link to reset your password' + link
            data={
                'subject':'Reset your password',
                'body':body,
                'to_email':user.email  

            }
            # Util.send_email(data)

            return {'link':link}

        else:
            raise serializers.ValidationError('you are not registered user')


class ResetPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(write_only=True,required=True)

    
    def validate(self,attrs):
        try:
            password=attrs.get('password')
            userid=self.context.get('userid')
            token=self.context.get('token')

            if len(password)==0:
                raise serializers.ValidationError('password is not valid')
        
        #you could probably write this code in views as well ....
            id=smart_str(urlsafe_base64_decode(userid))  #decode the user id and them convert to string
            user=User.objects.get(id=id)

            #check if the token we get is valid or not for the user 
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError('token is not valid or expired')


            user.set_password(password)
            user.save()
            return attrs
        

        #just a fail safe if somebody encoded a user id  to change password for the user, possible if you know the username and id
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError(' Token is not valid or expired')

