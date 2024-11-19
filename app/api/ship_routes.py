from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Ship

ship_routes = Blueprint('ships', __name__, url_prefix="api/ships")


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
