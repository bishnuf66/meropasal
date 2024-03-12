from django.urls import path,include
from userorders.views import PaymentMethodViewSet,OrderView,OrderUpdateView,OrderItemToSendBack,OrderItemToSendBackToSeller
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register(r'viewpaymentmethod',PaymentMethodViewSet)


urlpatterns=[
    path('api/',include(router.urls)),
    path('order/<int:userid>/',OrderView.as_view(),name='vieworders'),
    path('orderupdate/<int:pk>/<str:amount>/',OrderUpdateView.as_view(),name='updateorders'),
    path('getorderitems/<int:orderid>/',OrderItemToSendBack.as_view(),name='orderitems'),
    path('getordersforseller/<int:sellerid>/',OrderItemToSendBackToSeller.as_view(),name='ordersOfSeller'),
]
