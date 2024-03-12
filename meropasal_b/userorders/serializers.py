from rest_framework import serializers
from userorders.models import PaymentMethod,Order,OrderItem
from product.serializers import ProductSerializer

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model=PaymentMethod
        fields=['id','paymentmethod']


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields='__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields='__all__'

class PaymentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=['payment_status']

class OrderItemSerializerToSendBack(serializers.ModelSerializer):
    product=ProductSerializer()

    class Meta:
        model=OrderItem
        fields='__all__'


class OrderItemSerializerToSendBackToSeller(serializers.ModelSerializer):
    order=OrderDetailSerializer()  #i am doing these so that I can get all data of order and product with a single request.
    product=ProductSerializer()

    class Meta:
        model=OrderItem
        fields='__all__'
    