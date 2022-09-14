"""empty message

Revision ID: 467fbe3e60ca
Revises: 4c6ee0f585e6
Create Date: 2022-09-13 16:22:11.417324

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '467fbe3e60ca'
down_revision = '4c6ee0f585e6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('post_likes',
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['postId'], ['caws.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('postId', 'userId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('post_likes')
    # ### end Alembic commands ###