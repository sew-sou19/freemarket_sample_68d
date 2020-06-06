class AddBuyerToItems < ActiveRecord::Migration[5.2]
  def change
    add_reference :items, :buyer, foreign_key: { to_table: :users }, index: true
  end
end
