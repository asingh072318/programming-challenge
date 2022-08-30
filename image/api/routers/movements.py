from fastapi import APIRouter

router = APIRouter()


@router.get("/movements", tags=["all_movements"])
async def get_movements():
    return [{"id":"Some Random Id","total_animal":"1000","movein":"150","moveout":"100"}]


@router.get("/movements/{move_type}/{premiseid}", tags=["{type}_premiseid"])
async def get_move_data(premiseid: str):
    return {"premiseid": premiseid,"type":move_type}
