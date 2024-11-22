from flask import Blueprint, request, jsonify, abort
from flask_login import login_required, current_user
from app.models import db, Card, Planet

card_routes = Blueprint('cards', __name__, url_prefix="/api/cards")

# GET: Fetch all cards for the current user (optionally filtered by planet_id)
@card_routes.route('', methods=['GET'])
@login_required
def get_cards():
    planet_id = request.args.get('planet_id')
    if planet_id:
        planet = Planet.query.filter_by(
            id=planet_id,
            owner_id=current_user.id
        ).first_or_404()
        cards = Card.query.filter_by(planet_id=planet_id).all()
    else:
        cards = Card.query.join(Planet).filter(
            Planet.owner_id == current_user.id
        ).all()

    return jsonify([{
            'id': card.id,
            'owner_id': card.owner_id,
            'planet_id': card.planet_id,
            'name': card.name,
            'image_url': card.image_url,
            'description': card.description,
            'hostile': card.hostile,
            'reward': card.reward,
            'base_game': card.base_game,
            'created_at': card.created_at,
            'updated_at': card.updated_at,
    } for card in cards])


# POST: Create a new card
@card_routes.route('', methods=['POST'])
@login_required
def create_card():
    data = request.get_json()
    
    
    if not data.get('name'):
        return jsonify({'error': 'name is required'}), 400
    
    planet_id = data.get('planet_id')
    
    
    planet = Planet.query.filter_by(id=planet_id, owner_id=current_user.id).first()
    if not planet:
        return jsonify({'error': 'Invalid planet or planet not found'}), 404
    
    new_card = Card(
        planet_id=planet_id,
        name=data['name'],
        image_url=data['image_url'],
        description=data['description'],
        hostile=data['hostile'],
        reward=data['reward'],
        base_game=data['base_game'],
    )

    db.session.add(new_card)
    db.session.commit()

    return jsonify({
        'id': new_card.id,
        'owner_id': new_card.owner_id,
        'planet_id': new_card.planet_id,
        'name': new_card.name,
        'image_url': new_card.image_url,
        'description': new_card.description,
        'hostile': new_card.hostile,
        'reward': new_card.reward,
        'base_game': new_card.base_game,
        'created_at': new_card.created_at,
        'updated_at': new_card.updated_at,
    }), 201


# PUT: Update an existing card
@card_routes.route('/<int:card_id>', methods=['GET', 'PUT'])
@login_required
def handle_card(card_id):
    print(f"Received card_id: {card_id}")
 
    card = Card.query.get(card_id)

    
    if not card or card.planet.owner_id != current_user.id:
        abort(404, description="Card not found or not owned by the current user")

    if request.method == 'GET':
        
        return jsonify({
            'id': card.id,
            'owner_id': card.owner_id,
            'planet_id': card.planet_id,
            'name': card.name,
            'image_url': card.image_url,
            'description': card.description,
            'hostile': card.hostile,
            'reward': card.reward,
            'base_game': card.base_game,
            'created_at': card.created_at,
            'updated_at': card.updated_at, 
        })

    elif request.method == 'PUT':
        data = request.get_json()

        if not data:
            
            return jsonify({'error': 'No data provided'}), 400

        
        name = data.get('name')
        planet_id = data.get('planet_id')
        description = data.get('description')
        image_url = data.get('image_url')
        hostile = data.get('hostile')
        reward = data.get('reward')
        base_game = data.get('base_game')


        if name:
            card.name = name
        if planet_id:
            card.planet_id = planet_id
        if description:
            card.description = description
        if image_url:
            card.image_url = image_url
        if hostile:
            card.hostile = hostile
        if reward:
            card.reward = reward
        if base_game:
            card.base_game = base_game

        db.session.commit()

        
        return jsonify({
            'id': card.id,
            'owner_id': card.owner_id,
            'planet_id': card.planet_id,
            'name': card.name,
            'image_url': card.image_url,
            'description': card.description,
            'hostile': card.hostile,
            'reward': card.reward,
            'base_game': card.base_game,
            'created_at': card.created_at,
            'updated_at': card.updated_at, 
        })


# DELETE: Delete a card by ID
@card_routes.route('/<int:card_id>', methods=['DELETE'])
@login_required
def delete_card(card_id):
    try:
       
        card = Card.query.get(card_id)
        
        if not card:
            return jsonify({'message': 'Card not found'}), 404
        
        planet = Planet.query.filter_by(id=card.planet_id).first()

        if not planet or planet.owner_id != current_user.id:
            return jsonify({'message': 'You do not have permission to delete this card'}), 403

        db.session.delete(card)
        db.session.commit()

        return jsonify({'message': 'Card deleted successfully'}), 200

    except Exception as e:
       
        print(f"Error deleting card: {e}")
        db.session.rollback() 
        return jsonify({'message': 'Internal server error'}), 500