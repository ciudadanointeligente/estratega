class Actor < ActiveRecord::Base
  validates :name, presence: true
  has_and_belongs_to_many :objectives

  def actor_type_list
    actor_type = ['Active opponents with influence', 'Active opponents with low influence', 'Passive opponents with influence', 'Passive opponents with low influence', 'Neutrals with influence', 'Neutrals with low influence', 'Passive supporters with influence', 'Passive supporters with low influence', 'Active supporters with influence', 'Active supporters with low influence']
    return actor_type
  end
end
