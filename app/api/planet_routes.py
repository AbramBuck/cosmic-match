from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Planet

planet_routes = Blueprint('planets', __name__, url_prefix="/api/planets")

@planet_routes.route('', methods=['GET'])
@login_required
def get_planets():
    planets = Planet.query.filter_by(owner_id=current_user.id).all()
    return jsonify([
        {
            'id': planet.id,
            'name': planet.name,
            'owner_id': planet.owner_id,
            'created_at': planet.created_at.isoformat() if planet.created_at else None,
            'updated_at': planet.updated_at.isoformat() if planet.updated_at else None
        }
        for planet in planets
    ])

@planet_routes.route('', methods=['POST'])
@login_required
def create_planet():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Planet name is required'}), 400
    planet = Planet(
        name=name,
        owner_id=current_user.id
    )
    db.session.add(planet)
    db.session.commit()
    return jsonify({
        'id': planet.id,
        'name': planet.name,
        'owner_id': planet.owner_id,
        'created_at': planet.created_at,
        'updated_at': planet.updated_at
    }), 201

@planet_routes.route('/<int:planetk_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def handle_planet(planet_id):
    planet = Planet.query.filter_by(
        id=planet_id,
        owner_id=current_user.id
    ).first_or_404()
    if request.method == 'GET':
        return jsonify({
            'id': planet.id,
            'name': planet.name,
            'owner_id': planet.owner_id,
            'created_at': planet.created_at,
            'updated_at': planet.updated_at,
            'cards': [
                {
                    'id': card.id,
                    'title': card.title,
                    'content': card.content,
                    'created_at': card.created_at,
                    'updated_at': card.updated_at
                }
                for card in planet.cards
            ] if planet.cards else []
        })
    elif request.method == 'PUT':
        data = request.get_json()
        name = data.get('name')
        if not name:
            return jsonify({'error': 'Planet name is required'}), 400
        planet.name = name
        db.session.commit()
        return jsonify({
            'id': planet.id,
            'name': planet.name,
            'owner_id': planet.owner_id,
            'created_at': planet.created_at,
            'updated_at': planet.updated_at
        })
    elif request.method == 'DELETE':
        db.session.delete(planet)
        db.session.commit()
        return jsonify({'message': 'Planet deleted successfully'}), 204