"""plan
et_table

Revision ID: 47c573c7a23b
Revises: 29dc480d3c16
Create Date: 2024-11-22 10:50:23.570286

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '47c573c7a23b'
down_revision = '29dc480d3c16'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('planets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.Column('deck_size', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    
    )
    # ### end Alembic commands ###

if environment == "production":
       op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
# ### end Alembic commands ###qqqqqqqqq

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('planets')
    # ### end Alembic commands ###
