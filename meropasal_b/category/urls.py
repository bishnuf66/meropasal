from django.urls import path,include
from category.views import AddCategoryView,CategoryViewSet,CategoryView
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register(r'viewcategory',CategoryViewSet)


urlpatterns=[
    path('Category/',AddCategoryView.as_view(),name='addCategory' ), 
    path('getcategory/',CategoryView.as_view(),name='viewCategory' ), 
    path('api/',include(router.urls)),
]
