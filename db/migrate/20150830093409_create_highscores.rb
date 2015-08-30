class CreateHighscores < ActiveRecord::Migration
  def change
    create_table :highscores do |t|
      t.integer :score, null: false
      t.string :name, null: false
      t.timestamps null: false
    end
  end
end
