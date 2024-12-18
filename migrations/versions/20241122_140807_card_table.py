"""card_table

Revision ID: 2de001ecef22
Revises: 47c573c7a23b
Create Date: 2024-11-22 14:08:07.303293

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2de001ecef22'
down_revision = '47c573c7a23b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
    sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=True),
    sa.Column('planet_id', sa.Integer(), sa.ForeignKey('planets.id'), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('hostile', sa.Boolean(), nullable=False, default=False),
    sa.Column('reward', sa.Integer(), nullable=False, default=15),
    sa.Column('base_game', sa.Boolean(), nullable=False, default=False),
    sa.Column('matched', sa.Boolean(), nullable=False, default=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['planet_id'], ['planets.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('planets', schema=None) as batch_op:
        batch_op.alter_column('deck_size',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
    
# if environment == "production":
#        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
# # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('planets', schema=None) as batch_op:
        batch_op.alter_column('deck_size',
               existing_type=sa.INTEGER(),
               nullable=False)

    op.drop_table('cards')
    # ### end Alembic commands ###
