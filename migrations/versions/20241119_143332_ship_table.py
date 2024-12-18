"""ship table

Revision ID: 29dc480d3c16
Revises: 3e3ad4327ebf
Create Date: 2024-11-19 14:33:32.659559

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29dc480d3c16'
down_revision = '2de001ecef22'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ships',
    sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
    sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('fuel', sa.Integer(), nullable=False),
    sa.Column('shields', sa.Integer(), nullable=False),
    sa.Column('gold', sa.Integer(), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('runs_completed', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###

# if environment == "production":
#        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
# # ### end Alembic commands ###qqqqqqqqq

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ships')
    # ### end Alembic commands ###
