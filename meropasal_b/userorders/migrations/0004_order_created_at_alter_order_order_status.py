# Generated by Django 4.2.1 on 2023-12-07 13:35

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('userorders', '0003_alter_order_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('delivered', 'delivered'), ('shipped', 'shipped'), ('canceled', 'canceled'), ('pending', 'pending')], default='pending', max_length=100),
        ),
    ]