from flask import Blueprint,render_template, request, redirect, jsonify
from app.models import db, Image
from flask_login import current_user, login_required
from app.forms import ImageForm
from app.s3_helpers import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__, url_prefix="/api/images")


@image_routes.route("/new", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
          
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return render_template("post_form.html", form=form, errors=[upload])

        url = upload["url"]
        new_image = Post(image= url)
        db.session.add(new_image)
        db.session.commit()
        return redirect("/posts/all")

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)



@image_routes.route("/", methods=["POST"])
@login_required
def add_image():
    data = request.get_json()
    name = data.get('name')
    url = data.get('url')


    if not name:
        return jsonify({'error': 'Image name is required'}), 400
    if not url:
        return jsonify({'error': 'Image url is required'}), 400

    image = Image(
        name=name,
        owner_id=current_user.id,
        url=url,
    )

    db.session.add(image)
    db.session.commit()
    return jsonify({
        'id': image.id,
        'owner_id': image.owner_id,
        'name': image.name,
        'url': image.url,
        'created_at': image.created_at,
        'updated_at': image.updated_at
    }), 201