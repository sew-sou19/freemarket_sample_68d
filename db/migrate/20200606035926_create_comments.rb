class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :content
      t.references :item, foreign_key: true
      t.references :user_id, foreign_key: true
      t.timestamps
      
    end
  end
end
