class Highscore < ActiveRecord::Base
  validates :name, :score, presence: true
  validates :name, length: { is: 3 }

  default_scope { order(score: :desc) }
end
