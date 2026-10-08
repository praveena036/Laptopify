from decimal import Decimal, ROUND_HALF_UP

from django.utils import timezone


def estimate_buyback_value(laptop_request, inspection):
    """Produce a provisional seller estimate from submitted device details."""
    age_years = max(0, timezone.now().year - laptop_request.purchase_year)
    age_factor = max(Decimal("0.12"), Decimal("0.72") - Decimal("0.08") * age_years)
    condition_factor = {
        "excellent": Decimal("1.00"),
        "good": Decimal("0.86"),
        "fair": Decimal("0.68"),
        "poor": Decimal("0.44"),
    }[inspection.overall_condition]

    ram_gb = int("".join(ch for ch in laptop_request.ram if ch.isdigit()) or "8")
    ram_factor = {
        4: Decimal("0.94"),
        8: Decimal("1.00"),
        16: Decimal("1.08"),
        32: Decimal("1.14"),
        64: Decimal("1.18"),
    }.get(ram_gb, Decimal("1.03") if ram_gb > 8 else Decimal("0.94"))
    storage_factor = Decimal("1.04") if "ssd" in laptop_request.storage.lower() else Decimal("0.94")
    brand_factor = Decimal("1.06") if laptop_request.brand.lower() == "apple" else Decimal("1.00")

    components = (
        inspection.physical_condition,
        inspection.screen_condition,
        inspection.keyboard_condition,
        inspection.battery_condition,
        inspection.charger_condition,
        inspection.camera_condition,
        inspection.speaker_condition,
        inspection.ports_condition,
    )
    component_factors = {
        "excellent": Decimal("1.00"),
        "good": Decimal("0.97"),
        "fair": Decimal("0.88"),
        "poor": Decimal("0.72"),
    }
    component_factor = sum((component_factors[value] for value in components), Decimal("0")) / Decimal(len(components))

    estimate = (
        laptop_request.original_purchase_price
        * age_factor
        * condition_factor
        * ram_factor
        * storage_factor
        * brand_factor
        * component_factor
    )
    estimate = min(estimate, laptop_request.original_purchase_price)
    return estimate.quantize(Decimal("1"), rounding=ROUND_HALF_UP)
