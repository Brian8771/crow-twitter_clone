"""empty message

Revision ID: 006408095d18
Revises: 5505a6971fb0
Create Date: 2022-09-25 14:35:42.297527

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '006408095d18'
down_revision = '5505a6971fb0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('followers',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('followed_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], )
    )
    op.drop_table('follows')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('follower_id', sa.INTEGER(), nullable=True),
    sa.Column('followed_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ondelete='CASCADE')
    )
    op.drop_table('followers')
    # ### end Alembic commands ###
