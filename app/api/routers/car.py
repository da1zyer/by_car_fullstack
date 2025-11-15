from fastapi import APIRouter

router = APIRouter(prefix='/car', tags=['car'])

@router.get('/{id}')
def test_endpoint(id: int):
    return {'message': 'test message {}'.format(id)}

@router.get('/')
def test_endpoint():
    return {'message': 'test message'}