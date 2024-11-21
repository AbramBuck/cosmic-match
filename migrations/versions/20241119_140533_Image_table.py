"""image-table

Revision ID: 3e3ad4327ebf
Revises: ffdc0a98111c
Create Date: 2024-11-19 14:05:33.374326

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e3ad4327ebf'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
#     sa.UniqueConstraint('name'),
#     sa.UniqueConstraint('url'),
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('gold',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('current_ship',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('total_runs',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('total_runs',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('current_ship',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('gold',
               existing_type=sa.INTEGER(),
               nullable=False)

    op.drop_table('images')
    # ### end Alembic commands ###
