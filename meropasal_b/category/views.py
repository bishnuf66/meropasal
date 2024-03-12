from rest_framework.views import APIView
from .serializer import CategorySerializer
from django.http import JsonResponse
from rest_framework import status,permissions
from rest_framework.permissions import IsAdminUser,IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import Category
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets


# Create your views here.

class AddCategoryView(APIView):

    def post(self,request):
        permission_classes = [IsAdminUser,IsAuthenticated]
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse({'msg':'Category added successfully'},status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class CategoryView(APIView):
    permission_classes=[AllowAny]

    def get(self,request,format=None):
        category=Category.objects.all()
        print(category)
        serializer=CategorySerializer(category, many=True)   #do not forget many=True. Explanation: when you pass category to the serializer, the serializer is expecting a single instance of model i.e a single category data. so if the data being sent to the serializer is a queryset of kind which contains many category values, then we have to explicitly say to the serializer to expect many instances of category model not just one.
        print(serializer.data)
        return Response(serializer.data)



class CategoryViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer
    parser_classes=(MultiPartParser,FormParser)
    permission_classes=[permissions.AllowAny]