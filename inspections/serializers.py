from rest_framework import serializers


CONDITION_OPTIONS = ("excellent", "good", "fair", "poor")


class InspectionSubmissionSerializer(serializers.Serializer):
    physical_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    screen_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    keyboard_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    battery_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    charger_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    camera_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    speaker_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    ports_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    processor_verified = serializers.BooleanField()
    ram_verified = serializers.BooleanField()
    storage_verified = serializers.BooleanField()
    overall_condition = serializers.ChoiceField(choices=CONDITION_OPTIONS)
    remarks = serializers.CharField(required=False, allow_blank=True, max_length=2000)
