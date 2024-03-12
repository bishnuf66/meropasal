from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User

from category.models import Category
from category.serializer import CategorySerializer
from django.conf import settings

from userpage.serializer import UserSerializer

class ProductSerializer(serializers.ModelSerializer):
    category=serializers.SlugRelatedField(slug_field='category', queryset=Category.objects.all())   #This setup allows you to pass the category name as a string when creating a new product. The serializer will use the provided string to look up the corresponding Category instance based on the unique category field.

    # seller=UserSerializer()  


    # product_image_url = serializers.SerializerMethodField()  # Add this field

    # def get_product_image_url(self, obj):
    #     request = self.context['request']
    #     return request.build_absolute_uri(settings.MEDIA_URL + str(obj.product_image))

    """
    quick note: the default category value in the model will be the id of category, I have used the slug related field here to show the string instead of id 
    BUT: we can actually show the whole category data inside the product api view in browser so :
    instead of showing like this
    {
        "id":1
        "name":"product name"
        "category":1
    }
    we get :
    {
        "id":1
        "name":"product name"
        "category":{
            "id":1
            "category":"my category"
        }
    }
    I did this for seller using seller=UserSerializer()
    Simple but useful

    No not simple at all, because if you do this then when adding a new product, i have to also send teh id and category name both to the view so that serializer is valid. this is like a double edged sword. shows all data but also requires all data when being created
    """


    class Meta:
        model=Product
        fields=['id','product_name','seller','category','description','price','stock','product_image','created_at']


class ProductSerializerForAdmin(serializers.ModelSerializer):
    seller=UserSerializer()
    category=CategorySerializer()
    class Meta:
        model=Product
        fields='__all__'