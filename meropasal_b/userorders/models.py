from django.db import models
from django.contrib.auth.models import User
from product.models import Product

# Create your models here.
order_status={
    ("pending","pending"),
    ("shipped","shipped"),
    ("delivered","delivered"),
    ("canceled","canceled")
}


class PaymentMethod(models.Model):
    paymentmethod=models.CharField(max_length=200, default='Cash on Delivery')

    def __str__(self):
        return self.paymentmethod



class Order(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.CharField(max_length=100,null=True)
    city=models.CharField(max_length=100,null=True)
    total_price=models.DecimalField(max_digits=10,decimal_places=2,null=False)
    payment_method=models.ForeignKey(PaymentMethod,null=True,on_delete=models.SET_NULL,)
    payment_status=models.BooleanField(default=False,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    order_status=models.CharField(max_length=100,choices=order_status,default="pending")


    def __str__(self): #you know how you are going to set order id to the orderitem below, this str is how you get that id  :)!!
        return f'id:{self.id},user:{self.user.username},price:{self.total_price}'

class OrderItem(models.Model):
    order=models.ForeignKey(Order, on_delete=models.CASCADE)
    product=models.ForeignKey(Product,null=True, on_delete=models.SET_NULL)
    price=models.DecimalField(max_digits=10,decimal_places=2,null=False)
    quantity=models.IntegerField(null=False)

    def __str__(self):  #Hey a new way to show the details in admin page
        return f'Order: {self.order.id}, Product: {self.product.product_name}, Quantity: {self.quantity}'
