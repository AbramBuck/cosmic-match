from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Ship

ship_routes = Blueprint('ships', __name__)


@ship_routes.route('/', methods=['GET'])
@login_required
def ships():
    """
    Query for all ships owned by the user
    """
    ships = Ship.query.filter_by(owner_id=current_user.id)
    return {'ships': [ship.to_dict() for ship in ships]}


@ship_routes.route('/<int:ship_id>', methods=['GET'])
@login_required
def handle_ship(ship_id):
    ship = Ship.query.filter_by(
        id=ship_id,
        owner_id=current_user.id
    ).first_or_404()

    
    if request.method == 'GET':
        return jsonify({
            'id': ship.id,
            'name': ship.name,
            'owner_id': ship.owner_id,
            'fuel': ship.fuel,
            'shields': ship.shields,
            'created_at': ship.created_at,
            'updated_at': ship.updated_at,
        })

@ship_routes.route('/all', methods=['GET'])
@login_required
def all_ships():
    """
    Query for all ships and returns them in a list of user dictionaries
    """
    ships = Ship.query.all()
    return {'ships': [ship.to_dict() for ship in ships]}


@ship_routes.route('/', methods=['POST'])
@login_required
def create_ship():
    data = request.get_json()
    name = data.get('name')
    shields = data.get('shields')
    fuel = data.get('fuel')
    image_url = data.get('image_url')

    if not name:
        return jsonify({'error': 'ship name is required'}), 400
    if not shields:
        return jsonify({'error': 'shields value is required'}), 400
    if not fuel:
        return jsonify({'error': 'fuel value is required'}), 400

    ship = Ship(
        name=name,
        owner_id=current_user.id,
        fuel=fuel,
        shields=shields,
        image_url=image_url
    )

    db.session.add(ship)
    db.session.commit()
    return jsonify({
        'id': ship.id,
        'owner_id': ship.owner_id,
        'name': ship.name,
        'fuel': ship.fuel,
        'shields': ship.shields,
        'image_url': ship.image_url,
        'runs_completed': ship.runs_completed,
        'created_at': ship.created_at,
        'updated_at': ship.updated_at
    }), 201
