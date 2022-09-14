from calendar import c
from crypt import methods
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Caw, db, Comment
from app.forms.create_caw import CreateCawForm
from app.forms.create_comment import CreateComment

caw_routes = Blueprint('caws', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# get all Caws
@caw_routes.route('/')
def all_caws():
    caws = Caw.query.all()
    cawArr = []

    for caw in caws:
        like_status=list(filter(lambda user: user.id==current_user.id, caw.caw_like_users))
        newCaw = caw.to_dict()
        newCaw['likeStatus'] = 1 if len(like_status) > 0 else 0
        cawArr.append(newCaw)
    return {'Caws': cawArr}

# Get caw by session user
@caw_routes.route('/session')
@login_required
def get_caws_by_current_user():
    caws = Caw.query.filter(current_user.id == Caw.userId).all()

    if not caws:
        return {'errors': ['caws can not be found']},404
    else:
        cawArr = []

        for caw in caws:
            like_status=list(filter(lambda user: user.id==current_user.id, caw.caw_like_users))
            newCaw = caw.to_dict()
            newCaw['likeStatus'] = 1 if len(like_status) > 0 else 0
            cawArr.append(newCaw)

        return {'Caws': cawArr}

# Get caws by user id
@caw_routes.route('/user/caws/<int:id>')
def get_caws_by_user_id(id):
    caws = Caw.query.filter(Caw.userId == id).all()

    if not caws:
        return {'errors': ['caws can not be found']},404

    else:
        cawArr = []

        for caw in caws:
            like_status=list(filter(lambda user: user.id==current_user.id, caw.caw_like_users))
            newCaw = caw.to_dict()
            newCaw['likeStatus'] = 1 if len(like_status) > 0 else 0
            cawArr.append(newCaw)

        return {'Caws': cawArr}

# Get caw by Id
@caw_routes.route('/caw/<int:id>')
def get_caw_by_id(id):
    caw = Caw.query.get(id)
    if not caw:
        return {'errors': ['caw can not be found']},404

    else:
        like_status=list(filter(lambda user: user.id==current_user.id, caw.caw_like_users))
        newCaw = caw.to_dict()
        newCaw['likeStatus'] = 1 if len(like_status) > 0 else 0

        return {'Caw': newCaw}

# Create a Caw
@caw_routes.route('/new', methods=['POST'])
def create_new_caw():
    user = current_user.to_dict()
    print(user)
    form = CreateCawForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        caw = Caw(
            # userId = user['id'],
            caw = form.data['caw']
        )
        caw.userId = user['id']
        db.session.add(caw)
        db.session.commit()
        newCaw = caw.to_dict()
        caw['likeStatus'] = 0

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# update caws
@caw_routes.route('/<int:id>', methods=['PUT'])
def update_caw(id):
    caw = Caw.query.get(id)

    if caw.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateCawForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    caw.caw = form.data['caw']
    db.session.commit()

    return caw.to_dict()

# delete caws
@caw_routes.route('/<int:id>', methods=['DELETE'])
def delete_caw(id):
    caw = Caw.query.get(id)

    if not caw:
        return {'errors': ['caw can not be found']},404

    db.session.delete(caw)
    db.session.commit()

    return {'message': f'Successfully deleted Caw {id}'}

# get all comments by post id
@caw_routes.route('/<int:id>/comments')
def get_all_comments_by_caw_id(id):
    comments = Comment.query.filter(Comment.cawId == id).all()

    if not comments:
        return {'comments': []}

    return {'comments': [comment.to_dict() for comment in comments]}

# get all comment by user id
@caw_routes.route('/user/<int:id>/comments')
def get_all_comment_by_user_id(id):
    comments = Comment.query.filter(Comment.userId == id).all()

    if not comments:
        return {'errors': ['comments can not be found']},404

    return {'comments': [comment.to_dict() for comment in comments]}

# Create Comment
@caw_routes.route('/<int:id>/comments', methods=['POST'])
def create_comment(id):
    user = current_user.to_dict()
    form = CreateComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(id, '-------------------')
        comment = Comment(
            userId = user['id'],
            cawId = id,
            data = form.data['comment']
        )
        comment.userId = user['id']
        cawId = id
        db.session.add(comment)
        db.session.commit()
        # print(comment.user.to_dict(), '-------')
        return {'comment': comment.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# edit comment by comment id
@caw_routes.route('/comment/<int:id>', methods=['PUT'])
def edit_comment_by_id(id):
    comment = Comment.query.get(id)

    if comment.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateComment()
    form['csrf_token'].data = request.cookies['csrf_token']

    comment.data = form.data['comment']
    db.session.commit()

    return comment.to_dict()

# delete comment by comment id
@caw_routes.route('/comment/<int:id>', methods=['DELETE'])
def delete_comment_by_id(id):
    comment = Comment.query.get(id)

    if comment.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(comment)
    db.session.commit()

    return {'message': f'Successfully deleted Caw {id}'}


#Get all likes for specified caw

@caw_routes.route('/<int:id>/likes')
def get_caw_likes(id):
    caw = Caw.query.get(id)

    like_users = list(caw.caw_like_users)
    res = []
    for user in like_users:
        user_dict = user.to_dict()
        res.append(user_dict)

    return {'like_users': res}

#Update the like status for a specified post
@caw_routes.route('/<int:id>/likes', methods=['PUT'])
def update_caw_likes(id):
    caw = Caw.query.get(id)

    like_users = list(caw.caw_like_users)
    current_user_like = list(filter(lambda user: user.id == current_user.id, like_users))
    if len(current_user_like) == 0:
        caw.caw_like_users.append(current_user)
        db.session.commit()

    else:
        caw.caw_like_users.remove(current_user)
        db.session.commit()

    updated_caw = Caw.query.get(id)
    updated_like_users = list(updated_caw.caw_like_users)
    updated_current_user_like = list(filter(lambda user: user.id == current_user.id, updated_like_users))
    current_user_like_status = 1 if len(updated_current_user_like) else 0
    return {"cawId": id, "likeStatus": current_user_like_status, "totalLikes": len(updated_caw.caw_like_users)}
