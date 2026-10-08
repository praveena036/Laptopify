from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("kyc", "0001_initial")]

    operations = [
        migrations.AddField(
            model_name="kycdocument",
            name="full_name",
            field=models.CharField(default="", max_length=150),
        ),
        migrations.AddField(
            model_name="kycdocument",
            name="address",
            field=models.TextField(default=""),
        ),
    ]
