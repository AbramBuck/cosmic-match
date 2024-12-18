from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()



@user_routes.route('/update', methods=["PUT"])
@login_required
def update_user():
    
    print(current_user)

    user = User.query.get_or_404(current_user.id)
    if user.id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    
    updatable_fields = ['gold', 'current_ship', 'total_runs', 'mission_deck']
    for field in updatable_fields:
        if field in data:
            setattr(user, field, data[field])

    
    db.session.commit()

    return jsonify(user.to_dict()), 200